import { describe, expect, it } from "vitest";
import { contactSchema } from "./contactSchema";

const valid = {
  name: "Ahmed",
  email: "ahmed@example.com",
  message: "Bulk carrier, Sohar, 3 May.",
  consent: "on",
  startedAt: "0",
};

describe("contactSchema", () => {
  it("accepts the minimum required fields", () => {
    const parsed = contactSchema.safeParse(valid);
    expect(parsed.success).toBe(true);
  });

  it("reports missing required fields by key", () => {
    const parsed = contactSchema.safeParse({ ...valid, name: " ", email: "nope", message: "", consent: "" });
    expect(parsed.success).toBe(false);
    if (parsed.success) return;
    const keys = parsed.error.issues.map((issue) => issue.message).sort();
    expect(keys).toEqual(["consent", "email", "message", "name"]);
  });

  it("trims strings and defaults optional fields", () => {
    const parsed = contactSchema.parse({ ...valid, name: "  Ahmed  " });
    expect(parsed.name).toBe("Ahmed");
    expect(parsed.company).toBe("");
    expect(parsed.services).toEqual([]);
  });
});
