import { ph } from "./placeholder";

export const homepage = {
  hero: {
    lines: ["Alongside", "in Oman."],
    subline:
      "Port agency, husbandry and cargo coordination for vessels calling at Oman's ports, from first notice of arrival to sail-away.",
    cta: "Request port services",
    meta: ph("Homepage hero copy"),
  },
  statement: {
    paragraphs: [
      "A vessel arrives with a schedule, a cargo and a crew. Ashore, the port authority, pilots, terminal, customs, immigration and suppliers must all move in the right order. The agent keeps that order.",
      "Trans Ocean's work is to make it hold, from the first message to the last line cast off.",
    ],
    meta: ph("Homepage statement"),
  },
  portCall: {
    lines: ["One port call,", "start to finish."],
    intro: "An illustrative sequence. Every call is different; the discipline is the same.",
    meta: ph("Port call section intro. Stages are an illustrative workflow."),
  },
  services: {
    heading: "Services",
    intro: "What we handle for vessels, owners and operators in Omani ports.",
    allLink: "All services",
    meta: ph("Homepage services intro"),
  },
  vessels: {
    heading: "Vessel classes we attend",
    note: "Drawn to a shared scale.",
    scrollHint: "Scroll to compare",
    meta: ph("Vessel scale band"),
  },
  network: {
    heading: "Along Oman's coast",
    intro:
      "Oman's ports face three waters: the Strait of Hormuz, the Gulf of Oman and the Arabian Sea. Select a location to see what is handled there.",
    sampleLabel: "Sample location",
    footnote:
      "Locations shown are samples for design review and do not represent confirmed offices.",
    meta: ph("Homepage network intro"),
  },
  people: {
    heading: "The work is done by people who know the port.",
    body: "Boarding agents, operators and documentation staff who know each port's procedures, authorities and working hours. That knowledge is the service.",
    link: "About Trans Ocean",
    meta: ph("People interlude"),
  },
  contact: {
    lines: ["Tell us the vessel,", "the port and the date."],
    sub: "Our operations team replies with port requirements, a pro forma disbursement account and a named contact for the call.",
    meta: ph("Homepage contact intro"),
  },
  meta: ph("Homepage assembly"),
};
