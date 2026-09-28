import { company } from "@/content/company";
import { logPlaceholderWarnings } from "@/content/meta";
import { seo } from "@/content/seo";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { indexingBlocked, siteUrl } from "@/lib/metadata";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: seo.homeTitle,
    template: seo.titleTemplate,
  },
  description: seo.homeDescription,
  robots: indexingBlocked() ? { index: false, follow: false } : { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  logPlaceholderWarnings();
  const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "1";

  const jsonLd = company.meta.approved
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: company.legalName,
        url: siteUrl(),
      }
    : null;

  return (
    <html
      lang="en"
      dir="ltr"
      data-show-placeholders={showPlaceholders ? "true" : undefined}
      className={`${archivo.variable} h-full`}
    >
      <body className="min-h-full bg-limestone font-sans text-night antialiased">
        <MotionProvider>
          <SkipLink />
          <SiteHeader />
          <main id="content">{children}</main>
          <SiteFooter />
        </MotionProvider>
        <Analytics />
        {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> : null}
      </body>
    </html>
  );
}
