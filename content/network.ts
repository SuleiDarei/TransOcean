import { ph } from "./placeholder";
import type { Location } from "./types";

const locationMeta = ph("Sample location marker. Not a confirmed office.");

export const locations: Location[] = [
  {
    id: "sample-a",
    name: "Sample A",
    role: "Head office (PLACEHOLDER)",
    description: "Description of services and contacts at this location, to be confirmed.",
    serviceSlugs: ["port-agency", "husbandry-and-crew", "documentation-and-clearance"],
    contact: "+968 XXXX XXXX",
    x: 910,
    y: 516.9,
    meta: locationMeta,
  },
  {
    id: "sample-b",
    name: "Sample B",
    role: "Port office (PLACEHOLDER)",
    description: "Description of services and contacts at this location, to be confirmed.",
    serviceSlugs: ["port-agency", "cargo-operations", "spares-and-logistics"],
    contact: "+968 XXXX XXXX",
    x: 437.5,
    y: 450.7,
    meta: locationMeta,
  },
  {
    id: "sample-c",
    name: "Sample C",
    role: "Port office (PLACEHOLDER)",
    description: "Description of services and contacts at this location, to be confirmed.",
    serviceSlugs: ["port-agency", "cargo-operations", "husbandry-and-crew"],
    contact: "+968 XXXX XXXX",
    x: 362.8,
    y: 1123.6,
    meta: locationMeta,
  },
  {
    id: "sample-d",
    name: "Sample D",
    role: "Coverage by attendance (PLACEHOLDER)",
    description: "Description of services and contacts at this location, to be confirmed.",
    serviceSlugs: ["port-agency", "offshore-and-project-support", "spares-and-logistics"],
    contact: "+968 XXXX XXXX",
    x: 799.2,
    y: 711.5,
    meta: locationMeta,
  },
  {
    id: "sample-e",
    name: "Sample E",
    role: "Coverage by attendance (PLACEHOLDER)",
    description: "Description of services and contacts at this location, to be confirmed.",
    serviceSlugs: ["port-agency", "husbandry-and-crew", "offshore-and-project-support"],
    contact: "+968 XXXX XXXX",
    x: 570.2,
    y: 97,
    meta: locationMeta,
  },
];

export const waters = [
  {
    id: "hormuz",
    name: "Strait of Hormuz",
    body: "The northern tip at Musandam, facing one of the busiest straits in world shipping.",
    meta: ph("Geographic description only"),
  },
  {
    id: "gulf",
    name: "Gulf of Oman",
    body: "The Batinah coast and the capital area, where most of the country's population lives.",
    meta: ph("Geographic description only"),
  },
  {
    id: "arabian",
    name: "Arabian Sea",
    body: "The long southern coast, open to the Indian Ocean.",
    meta: ph("Geographic description only"),
  },
];

export const networkPage = {
  heading: "Along Oman's coast",
  tableCaption: "All locations (sample data)",
  meta: ph("Network page"),
};

export function locationById(id: string): Location | undefined {
  return locations.find((location) => location.id === id);
}
