type Bucket = { hits: number[] };

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

const store = new Map<string, Bucket>();

export function rateLimit(key: string): boolean {
  const now = Date.now();
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
