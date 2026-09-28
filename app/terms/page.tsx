import { LegalDocument } from "@/components/page/LegalDocument";
import { legal } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata(legal.terms.title, legal.banner, "/terms");

export default function TermsPage() {
  return <LegalDocument title={legal.terms.title} sections={legal.terms.sections} />;
}
