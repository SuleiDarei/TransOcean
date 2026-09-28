"use server";

import { contactContent } from "@/content/contact";
import { rateLimit } from "@/lib/rateLimit";
import { contactSchema } from "@/lib/validation/contactSchema";
import { headers } from "next/headers";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message" | "consent", string>>;
};

const fieldCopy = {
  name: contactContent.errors.name,
  email: contactContent.errors.email,
  message: contactContent.errors.message,
  consent: contactContent.errors.consent,
} as const;

export async function submitEnquiry(_previous: FormState, formData: FormData): Promise<FormState> {
  const services = formData.getAll("services").map(String);
  const localPhone = String(formData.get("phone") ?? "").trim();
  const dial = String(formData.get("dial") ?? "").replace(/^\+/, "");
  const phone = localPhone ? `+${dial} ${localPhone}` : "";
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company") ?? "",
    email: formData.get("email"),
    phone,
    vessel: formData.get("vessel") ?? "",
    port: formData.get("port") ?? "",
    arrival: formData.get("arrival") ?? "",
    services,
    message: formData.get("message"),
    consent: formData.get("consent") ?? "",
    website: formData.get("website") ?? "",
    startedAt: formData.get("startedAt") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: FormState["fieldErrors"] = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.message as keyof typeof fieldCopy;
      if (key in fieldCopy) fieldErrors[key] = fieldCopy[key];
    });
    if (Object.keys(fieldErrors).length === 0) {
      fieldErrors.message = contactContent.errors.message;
    }
    return { status: "error", message: contactContent.errors.summary, fieldErrors };
  }

  const data = parsed.data;
  if (data.website) {
    return { status: "success" };
  }

  const started = Number(data.startedAt);
  if (Number.isFinite(started) && Date.now() - started < 3000) {
    return { status: "error", message: "Please wait a moment and send the enquiry again." };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(ip)) {
    return { status: "error", message: contactContent.failure };
  }

  const body = [
    `Name: ${data.name}`,
    data.company ? `Company: ${data.company}` : "",
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : "",
    data.vessel ? `Vessel: ${data.vessel}` : "",
    data.port ? `Port: ${data.port}` : "",
    data.arrival ? `Arrival: ${data.arrival}` : "",
    data.services.length ? `Services: ${data.services.join(", ")}` : "",
    `Message: ${data.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const sent = await sendMail(body, data.email);
  if (!sent) return { status: "error", message: contactContent.failure };
  return { status: "success" };
}

async function sendMail(body: string, replyTo: string): Promise<boolean> {
  if (!process.env.MAIL_HOST) {
    if (process.env.NODE_ENV === "production") return false;
    console.info("TODO(CLIENT): enquiry not emailed\n", body);
    return true;
  }

  try {
    const nodemailer = await import("nodemailer");
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT ?? 587),
      secure: process.env.MAIL_PORT === "465",
      auth: process.env.MAIL_USER
        ? { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
        : undefined,
    });
    await transport.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo,
      subject: "Port enquiry",
      text: body,
    });
    return true;
  } catch (error) {
    console.error("Mail delivery failed", error);
    return false;
  }
}
