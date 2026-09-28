import { afterEach, describe, expect, it, vi } from "vitest";
import { siteUrl } from "./metadata";

describe("siteUrl", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("prefers SITE_URL", () => {
    vi.stubEnv("SITE_URL", "https://example.com");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "site.vercel.app");
    expect(siteUrl()).toBe("https://example.com");
  });

  it("falls back to the Vercel production host", () => {
    vi.stubEnv("SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "site.vercel.app");
    expect(siteUrl()).toBe("https://site.vercel.app");
  });

  it("defaults to localhost", () => {
    vi.stubEnv("SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    expect(siteUrl()).toBe("http://localhost:3000");
  });
});
