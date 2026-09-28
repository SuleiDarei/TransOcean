import { ph } from "./placeholder";

export const aboutContent = {
  lines: ["An agency built", "on the Omani coast."],
  whatLead: "Trans Ocean acts for owners, operators and charterers whose vessels call at Oman's ports.",
  whatBody:
    "We arrange what a call needs ashore: clearance, berth, pilotage, cargo coordination, crew matters, supplies and accounts, and we attend the vessel while it is alongside.",
  how: [
    {
      title: "Ahead of the vessel.",
      body: "Requirements, documents and bookings are settled before arrival, so time alongside is spent working.",
    },
    {
      title: "Present alongside.",
      body: "A boarding agent attends in person. Questions are answered on the quay, not by email the next day.",
    },
    {
      title: "Accounts that close.",
      body: "Costs are estimated before the call and reconciled after it, line by line.",
    },
  ],
  oman: {
    heading: "The coast is the office.",
    body: "From the Strait of Hormuz to the Arabian Sea, see where we work.",
    link: "Oman network",
  },
  work: {
    body: "We hire people who know ports. Send your details to careers@example.com.",
    meta: {
      placeholder: true,
      approved: false,
      omitIfUnapproved: true,
      note: "Careers line omitted until a real hiring contact is approved.",
    },
  },
  cta: "Tell us the vessel, the port and the date",
  meta: ph("About page"),
};
