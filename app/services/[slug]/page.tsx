import { CtaStrip } from "@/components/page/CtaStrip";
import { IncludedList } from "@/components/ui/IncludedList";
import { PageHero } from "@/components/page/PageHero";
import { SequenceLine } from "@/components/page/SequenceLine";
import { Container } from "@/components/layout/Container";
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
      <PageHero
        lines={[service.name]}
        lead={service.layout === "sequence" ? service.descriptor : service.intro}
        meta={service.meta}
        imageId={service.imageId}
        variant={service.layout === "scope" ? "split" : service.layout === "scale" ? "fullbleed" : "type"}
      />
      <section className="bg-limestone py-[var(--space-section)] text-night">
        <Container>
          <p className="t-lead max-w-measure">{service.intro}</p>
          <h2 className="t-heading-s mt-16">What&apos;s included</h2>
          <div className="mt-8">
            <IncludedList
              items={service.included.map((item) => ({ label: item.term, detail: item.definition }))}
            />
          </div>
          {service.sequence ? (
            <div className="mt-20">
              <h2 className="t-heading-s mb-10">How it runs</h2>
              <SequenceLine steps={service.sequence} />
            </div>
          ) : null}
          {service.layout === "scope" ? (
            <div className="mt-16">
              <TextLink href="/network">Along Oman&apos;s coast</TextLink>
            </div>
          ) : null}
        </Container>
      </section>
      {service.layout === "scale" ? <VesselScale filter={scaleFilters[service.slug]} /> : null}
      <section className="bg-limestone pb-8 text-night">
        <Container>
          <h2 className="t-heading-s">Related services</h2>
          <div className="mt-6 flex flex-col gap-4">
            {related.map((item) => (
              <TextLink key={item.slug} href={`/services/${item.slug}`}>
                {item.name}
              </TextLink>
            ))}
          </div>
        </Container>
      </section>
      <CtaStrip />
    </>
  );
}
