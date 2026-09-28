import { ph } from "./placeholder";
import type { Stage } from "./types";

const stageMeta = ph("Illustrative port-call stage, not a verified company workflow.");

export const stages: Stage[] = [
  {
    id: "appointment",
    title: "Port call appointment",
    lead: "Appointment confirmed.",
    body: "We confirm the berth window, share port requirements and open the call with owners and operators.",
    involves: ["Owners", "operators", "charterers"],
    imageId: "GM-05",
    meta: stageMeta,
  },
  {
    id: "pre-arrival",
    title: "Pre-arrival",
    lead: "Paperwork ahead of the ship.",
    body: "Clearance documents, crew lists and cargo declarations are prepared and submitted before the vessel reaches the anchorage.",
    involves: ["Port authority", "customs", "immigration"],
    imageId: "GM-06",
    meta: stageMeta,
  },
  {
    id: "attendance",
    title: "Vessel attendance",
    lead: "Pilot, tugs and berth in order.",
    body: "Our boarding agent meets the Master once the vessel is alongside.",
    involves: ["Pilots", "tug operators", "terminal"],
    imageId: "GM-07",
    meta: stageMeta,
  },
  {
    id: "cargo-crew",
    title: "Cargo and crew",
    lead: "Work alongside, coordinated.",
    body: "Cargo operations run with the terminal and stevedores; crew changes, provisions, spares and medical visits fit around them.",
    involves: ["Terminal", "stevedores", "suppliers", "clinics"],
    imageId: "GM-08",
    meta: stageMeta,
  },
  {
    id: "documentation",
    title: "Documentation",
    lead: "Every account current.",
    body: "Customs, immigration and port dues are settled, and the statement of facts is kept up to date for owners and charterers.",
    involves: ["Customs", "port authority", "owners"],
    imageId: "GM-09",
    meta: stageMeta,
  },
  {
    id: "sail-away",
    title: "Sail-away",
    lead: "Released to sea.",
    body: "Outward clearance is issued, the final disbursement account is prepared, and the vessel departs.",
    involves: ["Port authority", "pilots", "owners"],
    imageId: "GM-10",
    meta: stageMeta,
  },
];
