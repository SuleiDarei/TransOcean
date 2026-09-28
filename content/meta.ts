import { aboutContent } from "./about";
import { company } from "./company";
import { contactContent } from "./contact";
import { homepage } from "./homepage";
import { legal } from "./legal";
import { media } from "./media";
import { locations } from "./network";
import { stages } from "./portCall";
import { seo } from "./seo";
import { services } from "./services";
import type { ContentMeta } from "./types";
import { vesselClasses } from "./vesselClasses";

export { ph } from "./placeholder";

export type ContentMode = "review" | "strict";

export function contentMode(): ContentMode {
  return process.env.CONTENT_MODE === "strict" ? "strict" : "review";
}

export function publishable<T extends { meta: ContentMeta }>(items: T[]): T[] {
  if (contentMode() !== "strict") return items;
  return items.filter((item) => !(item.meta.omitIfUnapproved && !item.meta.approved));
}

function walk(value: unknown, found: ContentMeta[]): void {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((item) => walk(item, found));
    return;
  }
  const record = value as Record<string, unknown>;
  if (
    typeof record.placeholder === "boolean" &&
    typeof record.approved === "boolean" &&
    Object.keys(record).every((key) =>
      ["placeholder", "approved", "omitIfUnapproved", "note"].includes(key),
    )
  ) {
    found.push(record as ContentMeta);
  }
  Object.values(record).forEach((child) => walk(child, found));
}

export function collectMeta(): ContentMeta[] {
  const found: ContentMeta[] = [];
  walk(
    {
      company,
      homepage,
      stages,
      services,
      vesselClasses,
      locations,
      aboutContent,
      contactContent,
      legal,
      seo,
      media,
    },
    found,
  );
  return found;
}

export function placeholderWarnings(): string[] {
  return collectMeta()
    .filter((meta) => meta.placeholder)
    .map((meta) => meta.note ?? "unspecified placeholder");
}

export function logPlaceholderWarnings(): void {
  const notes = Array.from(new Set(placeholderWarnings()));
  if (notes.length === 0) return;
  console.warn(`[content] ${notes.length} placeholder groups remain:`);
  notes.forEach((note) => console.warn(`  - ${note}`));
}

export function hasUnapprovedContent(): boolean {
  return collectMeta().some((meta) => meta.placeholder || !meta.approved);
}
