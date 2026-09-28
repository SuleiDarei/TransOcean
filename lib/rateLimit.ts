/**
 * Fixed-window rate limit: LIMIT hits per WINDOW_MS per key.
 *
 * Two stores:
 * - Upstash Redis over its REST API when UPSTASH_REDIS_REST_URL and
 *   UPSTASH_REDIS_REST_TOKEN are set. This is the durable path for Vercel,
 *   where each serverless invocation may start with a fresh process.
 * - An in-memory Map otherwise. This only limits within one warm process
 *   and is fine for development and self-hosted single-instance deploys.
 */

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

type Bucket = { hits: number[] };
const store = new Map<string, Bucket>();

function memoryLimit(key: string, now: number): boolean {
  const bucket = store.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((time) => now - time < WINDOW_MS);
  if (bucket.hits.length >= LIMIT) {
    store.set(key, bucket);
    return false;
  }
  bucket.hits.push(now);
  store.set(key, bucket);
  return true;
}

async function upstashLimit(key: string, url: string, token: string): Promise<boolean> {
  const redisKey = `ratelimit:${key}`;
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", redisKey],
      ["PEXPIRE", redisKey, String(WINDOW_MS), "NX"],
    ]),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Upstash responded ${response.status}`);
  const [incr] = (await response.json()) as Array<{ result?: unknown; error?: string }>;
  if (incr?.error || typeof incr?.result !== "number") throw new Error("Unexpected Upstash reply");
  return incr.result <= LIMIT;
}

let warned = false;

/** Returns true when the request may proceed. Fails open if the remote store errors. */
export async function rateLimit(key: string, now = Date.now()): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      return await upstashLimit(key, url, token);
    } catch (error) {
      console.error("[contact] rate limit store unavailable, allowing request", error);
      return true;
    }
  }
  if (process.env.VERCEL && !warned) {
    warned = true;
    console.warn("[contact] in-memory rate limit on Vercel only covers one warm instance; set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.");
  }
  return memoryLimit(key, now);
}

/** Test hook. */
export function resetRateLimitStore(): void {
  store.clear();
}
