import { company } from "@/content/company";
import { services } from "@/content/services";
import { SeaBackground } from "@/components/ui/SeaBackground";
import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="surface-ink relative isolate overflow-hidden bg-ink text-water"
      style={{ paddingTop: 96, paddingBottom: 48, background: "var(--ink)" }}
    >
      <SeaBackground variant="night" calm />
      <div className="relative mx-auto w-full max-w-container" style={{ paddingInline: "var(--margin)" }}>
        <div className="grid grid-cols-4 gap-y-10 md:grid-cols-8 lg:grid-cols-12" style={{ columnGap: "var(--gutter)" }}>
          <div className="col-span-4 lg:col-span-5">
            {/* TODO(CLIENT): swap this wordmark for public/brand/logo-reversed.svg when an official reversed logo is supplied. */}
            <p className="t-heading-s" data-placeholder="true">
              {company.legalName}
            </p>
          </div>
          <FooterGroup title="Company" className="lg:col-start-7 lg:col-span-2">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/network">Network</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterGroup>
          <FooterGroup title="Services" className="lg:col-start-9 lg:col-span-2">
            {services.map((service) => (
              <FooterLink key={service.slug} href={`/services/${service.slug}`}>
                {service.name}
              </FooterLink>
            ))}
          </FooterGroup>
          <FooterGroup title="Legal" className="lg:col-start-11 lg:col-span-2">
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </FooterGroup>
        </div>
        <div className="mt-12 border-t pt-6" style={{ borderColor: "var(--rule-dark)" }}>
          <p className="t-small" style={{ color: "var(--on-dark-2)" }}>
            © {year} {company.legalName} · {company.country}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`col-span-2 flex flex-col gap-3 ${className ?? ""}`}>
      <p className="t-label" style={{ color: "var(--on-dark-2)" }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="t-small inline-flex min-h-11 items-center text-water">
      {children}
    </Link>
  );
}
