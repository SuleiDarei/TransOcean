import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { rateLimit, resetRateLimitStore } from "./rateLimit";

describe("rateLimit (memory store)", () => {
  beforeEach(() => {
    resetRateLimitStore();
    vi.unstubAllEnvs();
  });

  it("allows five hits then blocks the sixth within the window", async () => {
    const t0 = 1_000_000;
    for (let i = 0; i < 5; i += 1) expect(await rateLimit("a", t0 + i)).toBe(true);
    expect(await rateLimit("a", t0 + 5)).toBe(false);
  });

  it("frees the window after ten minutes", async () => {
    const t0 = 1_000_000;
    for (let i = 0; i < 5; i += 1) await rateLimit("b", t0);
    expect(await rateLimit("b", t0 + 10 * 60 * 1000 - 1)).toBe(false);
    expect(await rateLimit("b", t0 + 10 * 60 * 1000)).toBe(true);
  });

  it("keeps keys independent", async () => {
    for (let i = 0; i < 5; i += 1) await rateLimit("c");
    expect(await rateLimit("c")).toBe(false);
    expect(await rateLimit("d")).toBe(true);
  });
});

describe("rateLimit (Upstash store)", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://example.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "token");
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("sends INCR + PEXPIRE and reads the counter", async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => [{ result: 3 }, { result: 1 }] });
    expect(await rateLimit("ip")).toBe(true);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://example.upstash.io/pipeline");
    expect(JSON.parse(init.body)).toEqual([
      ["INCR", "ratelimit:ip"],
      ["PEXPIRE", "ratelimit:ip", "600000", "NX"],
    ]);
  });

  it("blocks once the counter passes the limit", async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => [{ result: 6 }, { result: 0 }] });
    expect(await rateLimit("ip")).toBe(false);
  });

  it("fails open when the store errors", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
    fetchMock.mockResolvedValue({ ok: false, status: 500, json: async () => [] });
    expect(await rateLimit("ip")).toBe(true);
    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });
});
