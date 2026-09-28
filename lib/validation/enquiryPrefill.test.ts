import { describe, expect, it } from "vitest";
import { contactContent } from "@/content/contact";
import { enquiryPrefill } from "./enquiryPrefill";

describe("enquiryPrefill", () => {
  it("carries the vessel, valid port, date, and selected service into an enquiry", () => {
    const value = enquiryPrefill(new URLSearchParams({ vessel: "MV Example", port: contactContent.ports[0], arrival: "2026-10-03", service: "port-agency" }));
    expect(value).toEqual({ vessel: "MV Example", port: contactContent.ports[0], arrival: "2026-10-03", service: "Port Agency" });
  });
  it("ignores unknown options and calendar dates that roll into the next month", () => {
    expect(enquiryPrefill(new URLSearchParams("port=unknown&service=unknown&arrival=2026-02-30"))).toEqual({ vessel: "", port: "", arrival: "", service: "" });
  });
  it("bounds query text and ignores malformed dates", () => {
    const value = enquiryPrefill(new URLSearchParams({ vessel: "x".repeat(1000), arrival: "tomorrow" }));
    expect(value.vessel).toHaveLength(200);
    expect(value.arrival).toBe("");
  });
});
