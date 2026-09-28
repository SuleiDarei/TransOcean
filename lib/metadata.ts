import { contentMode, hasUnapprovedContent } from "@/content/meta";
import type { Metadata } from "next";

export function siteUrl(): string {
  return process.env.SITE_URL ?? "http://localhost:3000";
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
