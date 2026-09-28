import { EnquiryStrip } from "@/components/sections/EnquiryStrip";
import { PageHero } from "@/components/page/PageHero";
import { ServicesStickyIndex } from "@/components/page/ServicesStickyIndex";
import { Container } from "@/components/layout/Container";
import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { TextLink } from "@/components/primitives/TextLink";
import { VesselScale } from "@/components/sections/VesselScale/VesselScale";
import { IncludedList } from "@/components/ui/IncludedList";
import { services, servicesPage } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata(servicesPage.lines.join(" "), servicesPage.lead, "/services");

export default function ServicesPage() {
  return (
    <>
      <PageHero lines={servicesPage.lines} lead={servicesPage.lead} meta={servicesPage.meta} />
      <section className="svc-section bg-water text-ink">
        <Container>
          <div className="lg:grid lg:grid-cols-12" style={{ columnGap: "var(--gutter)" }}>
            <div className="lg:col-span-3">
              <ServicesStickyIndex />
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              {services.map((service) => (
                <article key={service.slug} id={`service-${service.slug}`} className="mb-40 last:mb-0" data-placeholder="true">
                  <div className="aspect-video overflow-hidden">
                    <ResponsiveImage id={service.imageId} sizes="(min-width: 1024px) 60vw, 100vw" />
                  </div>
                  <h2 className="t-display-m mt-8">{service.name}</h2>
                  <p className="t-lead mt-4 text-slate">{service.descriptor}</p>
                  <div className="mt-8">
                    <IncludedList items={service.included.slice(0, 4).map((item) => item.term)} />
                  </div>
                  <div className="mt-8">
                    <TextLink href={`/services/${service.slug}`}>{servicesPage.details}</TextLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <VesselScale />
      <EnquiryStrip />
    </>
  );
}
