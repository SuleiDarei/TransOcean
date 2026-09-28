import { ph } from "./placeholder";
import type { Service } from "./types";

const serviceMeta = ph("Illustrative service. Replace without changing layout.");

export const services: Service[] = [
  {
    slug: "port-agency",
    name: "Port Agency",
    descriptor:
      "Full agency for vessel calls: clearance, berth coordination, attendance and disbursement accounts.",
    intro: "One point of contact for everything a vessel's call requires ashore.",
    layout: "sequence",
    imageId: "GM-11",
    included: [
      { term: "Pre-arrival requirements and clearance" },
      { term: "Berth, pilot and tug coordination" },
      { term: "Boarding agent attendance" },
      { term: "Pro forma and final disbursement accounts" },
    ],
    sequence: [
      { title: "Port call appointment" },
      { title: "Pre-arrival" },
      { title: "Vessel attendance" },
      { title: "Cargo and crew" },
      { title: "Documentation" },
      { title: "Sail-away" },
    ],
    meta: serviceMeta,
  },
  {
    slug: "husbandry-and-crew",
    name: "Husbandry and Crew",
    descriptor: "Crew changes, visas, medical attendance, provisions and cash to Master.",
    intro: "What the crew and the Master need while the vessel is in port.",
    layout: "scope",
    imageId: "GM-12",
    included: [
      { term: "Crew change", definition: "Joining and leaving crew, visas, transport and accommodation." },
      { term: "Medical", definition: "Clinic and hospital visits arranged and accompanied." },
      { term: "Provisions", definition: "Fresh provisions and stores ordered and delivered to the ship." },
      { term: "Cash to Master", definition: "Cash delivered on board as requested." },
    ],
    meta: serviceMeta,
  },
  {
    slug: "cargo-operations",
    name: "Cargo Operations",
    descriptor:
      "Coordination with terminals, stevedores and surveyors for dry, liquid, containerised and project cargo.",
    intro: "Cargo work alongside, coordinated with every party on the quay.",
    layout: "scale",
    imageId: "GM-13",
    included: [
      { term: "Terminal and stevedore coordination" },
      { term: "Surveyor and tally attendance" },
      { term: "Cargo documentation" },
      { term: "Statement of facts and time sheets" },
    ],
    meta: serviceMeta,
  },
  {
    slug: "documentation-and-clearance",
    name: "Documentation and Clearance",
    descriptor:
      "Customs, immigration and port authority paperwork, prepared ahead and followed through.",
    intro: "The paperwork of a port call, prepared early and followed to completion.",
    layout: "sequence",
    imageId: "GM-14",
    included: [
      { term: "Inward and outward clearance" },
      { term: "Crew and passenger lists" },
      { term: "Cargo manifests and declarations" },
      { term: "Port dues and authority filings" },
    ],
    sequence: [
      { title: "Prepare", text: "Documents are gathered from the vessel and the owner before arrival." },
      { title: "Submit", text: "Filings go to the authorities that govern the call." },
      { title: "Follow up", text: "Queries are answered while the vessel is alongside." },
      { title: "Close", text: "Outward clearance and the final set of papers are issued." },
    ],
    meta: serviceMeta,
  },
  {
    slug: "spares-and-logistics",
    name: "Spares and Logistics",
    descriptor: "Clearance and delivery of spare parts and stores to vessels at berth or at anchorage.",
    intro: "Parts and stores cleared and delivered where the vessel is.",
    layout: "scope",
    imageId: "GM-15",
    included: [
      { term: "Import clearance", definition: "Customs clearance of ship spares in transit." },
      { term: "Storage", definition: "Holding until the vessel arrives." },
      { term: "Delivery at berth", definition: "Delivered to the gangway." },
      { term: "Delivery at anchorage", definition: "Launch delivery to vessels offshore." },
    ],
    meta: serviceMeta,
  },
  {
    slug: "offshore-and-project-support",
    name: "Offshore and Project Support",
    descriptor: "Agency and logistics for offshore support vessels and project cargo movements.",
    intro: "Agency and logistics for offshore units and heavy project movements.",
    layout: "scale",
    imageId: "GM-16",
    included: [
      { term: "Offshore support vessel agency" },
      { term: "Project cargo coordination" },
      { term: "Crew logistics for offshore units" },
      { term: "Permits and authority liaison" },
    ],
    meta: serviceMeta,
  },
];

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function relatedServices(slug: string): Service[] {
  const index = services.findIndex((service) => service.slug === slug);
  if (index < 0) return [];
  return [1, 2].map((offset) => services[(index + offset) % services.length]);
}

export const servicesPage = {
  lines: ["Services for vessels", "calling at Oman."],
  lead: "Six lines of work, each handled by people who do it every day. Illustrative list pending confirmation.",
  jump: "Jump to",
  details: "Service details",
  meta: ph("Services index page"),
};
