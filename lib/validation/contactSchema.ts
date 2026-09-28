import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "name"),
  company: z.string().trim().optional().default(""),
  email: z.string().trim().email("email"),
  phone: z.string().trim().optional().default(""),
  vessel: z.string().trim().optional().default(""),
  port: z.string().trim().optional().default(""),
  arrival: z.string().trim().optional().default(""),
  services: z.array(z.string()).default([]),
  message: z.string().trim().min(1, "message"),
  consent: z.literal("on", { errorMap: () => ({ message: "consent" }) }),
  website: z.string().optional().default(""),
  startedAt: z.string(),
});

export type ContactInput = z.infer<typeof contactSchema>;
