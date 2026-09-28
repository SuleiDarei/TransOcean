import { LegalDocument } from "@/components/page/LegalDocument";
import { legal } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata(legal.privacy.title, legal.banner, "/privacy");

export default function PrivacyPage() {
  return <LegalDocument title={legal.privacy.title} sections={legal.privacy.sections} />;
}
