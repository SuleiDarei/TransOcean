import { contentMode, hasUnapprovedContent } from "@/content/meta";
import type { Metadata } from "next";

export function siteUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  // Vercel sets this on every deployment; it is the production domain, not the preview URL.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export function indexingBlocked(): boolean {
  return contentMode() !== "strict" || hasUnapprovedContent();
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: indexingBlocked() ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Logo",
    },
  };
}
