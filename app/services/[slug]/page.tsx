import { EnquiryStrip } from "@/components/sections/EnquiryStrip";
import { IncludedList } from "@/components/ui/IncludedList";
import { PageHero } from "@/components/page/PageHero";
import { SequenceLine } from "@/components/page/SequenceLine";
import { Container } from "@/components/layout/Container";
import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { TextLink } from "@/components/primitives/TextLink";
import { VesselScale } from "@/components/sections/VesselScale/VesselScale";
import { relatedServices, serviceBySlug, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return pageMetadata(service.name, service.descriptor, `/services/${service.slug}`);
}

const scaleFilters: Record<string, string[]> = {
  "cargo-operations": ["bulk", "container", "general-cargo", "product-tanker"],
  "offshore-and-project-support": ["osv", "tug", "general-cargo"],
};

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();
  const related = relatedServices(service.slug);

  return (
    <>
      <PageHero lines={[service.name]} lead={service.descriptor} meta={service.meta} />
      <section className="bg-water pb-[var(--space-section)] text-ink">
        <Container>
          <div className="lg:grid lg:grid-cols-12" style={{ columnGap: "var(--gutter)" }}>
            <div className="lg:col-span-7">
              <p className="t-lead max-w-measure">{service.intro}</p>
              <div className="scope mt-10">
                <h2 className="t-heading-s">What&apos;s included</h2>
                <div className="mt-6">
                  <IncludedList items={service.included.map((item) => ({ label: item.term, detail: item.definition }))} />
                </div>
              </div>
              {service.sequence ? (
                <div className="mt-16">
                  <h2 className="t-heading-s mb-8">How it runs</h2>
                  <SequenceLine steps={service.sequence} />
                </div>
              ) : null}
            </div>
            <aside className="mt-14 lg:col-span-4 lg:col-start-9 lg:mt-0">
              <div className="aspect-[4/5] overflow-hidden">
                <ResponsiveImage id={service.imageId} sizes="(min-width: 1024px) 33vw, 100vw" priority />
              </div>
              <h2 className="t-heading-s mt-10">Related services</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <TextLink href={`/services/${item.slug}`}>{item.name}</TextLink>
                  </li>
                ))}
              </ul>
              {service.layout === "scope" ? (
                <p className="mt-10">
                  <TextLink href="/network">Along Oman&apos;s coast</TextLink>
                </p>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>
      {service.layout === "scale" ? <VesselScale filter={scaleFilters[service.slug]} /> : null}
      <EnquiryStrip service={service.slug} />
    </>
  );
}
