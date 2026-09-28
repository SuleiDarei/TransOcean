import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }),
}));

import { resetRateLimitStore } from "@/lib/rateLimit";
import { submitEnquiry } from "./actions";

function form(fields: Record<string, string | string[]>): FormData {
  const data = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    (Array.isArray(value) ? value : [value]).forEach((item) => data.append(key, item));
  });
  return data;
}

const base = {
  name: "Ahmed",
  email: "ahmed@example.com",
  message: "Bulk carrier calling Sohar.",
  consent: "on",
  startedAt: String(Date.now() - 60_000),
};

describe("submitEnquiry", () => {
  beforeEach(() => {
    resetRateLimitStore();
    vi.spyOn(console, "info").mockImplementation(() => undefined);
  });

  it("accepts a valid enquiry and logs it when SMTP is unset", async () => {
    const state = await submitEnquiry({ status: "idle" }, form(base));
    expect(state.status).toBe("success");
    const logged = vi.mocked(console.info).mock.calls[0]?.[1] as string;
    expect(logged).toContain("Name: Ahmed");
  });

  it("includes the vessel, port, arrival, company, and services in the body", async () => {
    await submitEnquiry(
      { status: "idle" },
      form({
        ...base,
        company: "Acme Shipping",
        vessel: "MV Example / 9999999",
        port: "Sohar",
        arrival: "2026-10-03",
        services: ["Port Agency", "Cargo Operations"],
        dial: "+968",
        phone: "9123 4567",
      }),
    );
    const logged = vi.mocked(console.info).mock.calls[0]?.[1] as string;
    expect(logged).toContain("Company: Acme Shipping");
    expect(logged).toContain("Vessel: MV Example / 9999999");
    expect(logged).toContain("Port: Sohar");
    expect(logged).toContain("Arrival: 2026-10-03");
    expect(logged).toContain("Services: Port Agency, Cargo Operations");
    expect(logged).toContain("Phone: +968 9123 4567");
  });

  it("returns keyed field errors for invalid input", async () => {
    const state = await submitEnquiry({ status: "idle" }, form({ ...base, name: "", email: "x", consent: "" }));
    expect(state.status).toBe("error");
    expect(Object.keys(state.fieldErrors ?? {}).sort()).toEqual(["consent", "email", "name"]);
  });

  it("silently accepts honeypot submissions without sending", async () => {
    const state = await submitEnquiry({ status: "idle" }, form({ ...base, website: "http://spam" }));
    expect(state.status).toBe("success");
    expect(console.info).not.toHaveBeenCalled();
  });

  it("rejects submissions filled in under three seconds", async () => {
    const state = await submitEnquiry({ status: "idle" }, form({ ...base, startedAt: String(Date.now()) }));
    expect(state.status).toBe("error");
    expect(state.fieldErrors).toBeUndefined();
  });

  it("skips the timing check when the client did not send a timestamp", async () => {
    const state = await submitEnquiry({ status: "idle" }, form({ ...base, startedAt: "" }));
    expect(state.status).toBe("success");
  });

  it("rate limits the sixth submission from one address", async () => {
    for (let i = 0; i < 5; i += 1) {
      expect((await submitEnquiry({ status: "idle" }, form(base))).status).toBe("success");
    }
    const state = await submitEnquiry({ status: "idle" }, form(base));
    expect(state.status).toBe("error");
  });
});
