import type { ContentMeta } from "@/content/types";

export function phProps(meta?: ContentMeta): { "data-placeholder"?: "true" } {
  if (!meta?.placeholder) return {};
  return { "data-placeholder": "true" };
}
