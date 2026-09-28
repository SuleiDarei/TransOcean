import { CtaStrip } from "@/components/page/CtaStrip";
import { PageHero } from "@/components/page/PageHero";
import { Container } from "@/components/layout/Container";
import { Col, Grid } from "@/components/layout/Grid";
import { Button } from "@/components/primitives/Button";
import { Text } from "@/components/primitives/Type";
import { aboutContent } from "@/content/about";
import { contentMode } from "@/content/meta";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = pageMetadata(
  aboutContent.lines.join(" "),
  aboutContent.whatLead,
  "/about",
);

export default function AboutPage() {
  const showWork = !(contentMode() === "strict" && aboutContent.work.meta.omitIfUnapproved && !aboutContent.work.meta.approved);

  return (
    <>
      <PageHero lines={aboutContent.lines} meta={aboutContent.meta} imageId="GM-19" />
      <section className="bg-limestone py-[var(--space-section)] text-night">
        <Container>
          <Grid>
            <Col span={4} lg={6}>
              <Text variant="lead" meta={aboutContent.meta}>
                {aboutContent.whatLead}
              </Text>
            </Col>
            <Col span={4} lg={5} lgStart={8} className="mt-8 lg:mt-0">
              <Text meta={aboutContent.meta}>{aboutContent.whatBody}</Text>
            </Col>
          </Grid>
          <div className="mt-24">
            {aboutContent.how.map((row) => (
              <div key={row.title} className="grid grid-cols-4 gap-6 border-t py-10 md:grid-cols-8 lg:grid-cols-12" style={{ columnGap: "var(--gutter)", borderColor: "var(--rule-light)" }}>
                <h2 className="t-display-m col-span-4 lg:col-span-6">{row.title}</h2>
                <p className="t-body col-span-4 text-slate lg:col-span-5 lg:col-start-8">{row.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="coast-office text-limestone">
        <div className="coast-office__field" aria-hidden="true">
          <Image src="/media/bands/gm-cta.jpg" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "center 100%" }} />
        </div>
        <Container className="relative z-[1]">
          <Grid>
            <Col span={4} lg={6}>
              <h2 className="t-display-m">{aboutContent.oman.heading}</h2>
              <p className="t-lead mt-6">{aboutContent.oman.body}</p>
              <div className="mt-8">
                <Button href="/network" surface="dark">
                  See where we work
                </Button>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>
      {showWork ? (
        <section className="bg-limestone py-24 text-night">
          <Container>
            <p className="t-body max-w-measure" data-placeholder="true">
              {aboutContent.work.body}
            </p>
          </Container>
        </section>
      ) : null}
      <CtaStrip />
    </>
  );
}
