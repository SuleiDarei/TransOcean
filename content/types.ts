export type ContentMeta = {
  placeholder: boolean;
  approved: boolean;
  omitIfUnapproved?: boolean;
  note?: string;
};

export type MediaClass = "generated" | "client-photo" | "svg" | "code-motion";

export type MediaAsset = {
  id: string;
  assetClass: MediaClass;
  src: string;
  alt: string;
  width: number;
  height: number;
  focal: { x: number; y: number };
  placeholder: boolean;
  replacementId?: string;
  meta: ContentMeta;
};

export type ServiceIncluded = {
  term: string;
  definition?: string;
};

export type ServiceStep = {
  title: string;
  text?: string;
};

export type ServiceLayout = "sequence" | "scope" | "scale";

export type Service = {
  slug: string;
  name: string;
  descriptor: string;
  intro: string;
  layout: ServiceLayout;
  included: ServiceIncluded[];
  sequence?: ServiceStep[];
  imageId: string;
  meta: ContentMeta;
};

export type Stage = {
  id: string;
  title: string;
  lead: string;
  body: string;
  involves: string[];
  imageId: string;
  meta: ContentMeta;
};

export type VesselClass = {
  id: string;
  name: string;
  /** Internal drawing length in metres. Never displayed. */
  length: number;
  meta: ContentMeta;
};

export type Location = {
  id: string;
  name: string;
  role: string;
  description: string;
  serviceSlugs: string[];
  contact: string;
  /** Placeholder position in map viewBox units. Not a real coordinate. */
  x: number;
  y: number;
  meta: ContentMeta;
};

export type NavLink = {
  href: string;
  label: string;
  meta: ContentMeta;
};
