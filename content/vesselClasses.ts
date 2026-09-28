import { ph } from "./placeholder";
import type { VesselClass } from "./types";

const vesselMeta = ph("Illustrative vessel class drawn to a shared scale. Length is internal and never shown.");

export const vesselClasses: VesselClass[] = [
  { id: "tug", name: "Harbour tug", length: 32, meta: vesselMeta },
  { id: "osv", name: "Offshore support vessel", length: 80, meta: vesselMeta },
  { id: "general-cargo", name: "General cargo ship", length: 140, meta: vesselMeta },
  { id: "product-tanker", name: "Product tanker", length: 183, meta: vesselMeta },
  { id: "bulk", name: "Bulk carrier", length: 200, meta: vesselMeta },
  { id: "car", name: "Car carrier", length: 200, meta: vesselMeta },
  { id: "crude", name: "Crude tanker", length: 333, meta: vesselMeta },
  { id: "container", name: "Container ship", length: 366, meta: vesselMeta },
];

export const VESSEL_GAP = 40;
