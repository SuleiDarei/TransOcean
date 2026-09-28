import type { ContentMeta } from "./types";

export const ph = (note: string): ContentMeta => ({
  placeholder: true,
  approved: false,
  note,
});
