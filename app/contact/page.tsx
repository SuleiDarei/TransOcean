import { ContactSection } from "@/components/sections/ContactSection/ContactSection";
import { DuskBand } from "@/components/sections/DuskBand";
import { homepage } from "@/content/homepage";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata(homepage.contact.lines.join(" "), homepage.contact.sub, "/contact");

export default function ContactPage() {
  return (
    <>
      <div className="pt-8">
        <ContactSection urgent />
      </div>
      <DuskBand />
    </>
  );
}
