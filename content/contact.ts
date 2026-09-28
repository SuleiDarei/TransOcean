import { ph } from "./placeholder";

export const contactContent = {
  details: [
    { label: "Operations email", value: "operations@example.com", href: "mailto:operations@example.com" },
    { label: "Phone", value: "+968 XXXX XXXX", href: "tel:+96800000000" },
    { label: "Office", value: "Street, Area, City (PLACEHOLDER), Sultanate of Oman" },
    { label: "Hours", value: "Office hours (PLACEHOLDER)" },
  ],
  urgent: "Urgent vessel matters: +968 XXXX XXXX (PLACEHOLDER)",
  fields: {
    name: "Full name",
    company: "Company",
    email: "Email address",
    phone: "Phone",
    vessel: "Vessel name or IMO number",
    port: "Port of call",
    arrival: "Expected arrival",
    services: "Services needed",
    message: "Message",
    consent: "I have read the Privacy notice.",
    required: "(required)",
  },
  ports: ["Not yet confirmed", "Sample port A (PLACEHOLDER)", "Sample port B (PLACEHOLDER)", "Sample port C (PLACEHOLDER)"],
  submit: "Send enquiry",
  sending: "Sending…",
  errors: {
    name: "Error: enter your name.",
    email: "Error: enter a valid email address.",
    message: "Error: tell us briefly what you need.",
    consent: "Error: confirm you have read the Privacy notice.",
    summary: "Please correct the fields below.",
  },
  success: {
    heading: "Enquiry received.",
    body: "A member of our operations team will reply to the email address you provided.",
  },
  failure: "Your enquiry was not sent. Please try again, or email operations@example.com.",
  honeypot: "website",
  meta: ph("Contact form copy and placeholder contact details"),
};
