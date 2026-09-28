import { Uncover } from "@/components/motion/Uncover";
import { Container } from "@/components/layout/Container";
import { Col, Grid } from "@/components/layout/Grid";
import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { Display, Text } from "@/components/primitives/Type";
import type { ContentMeta } from "@/content/types";

export function PageHero({
  lines,
  lead,
  meta,
  imageId,
  variant = "type",
}: {
  lines: string[];
  lead?: string;
  meta?: ContentMeta;
  imageId?: string;
  variant?: "type" | "split" | "fullbleed";
}) {
  if (variant === "fullbleed" && imageId) {
    return (
      <section className="relative h-[100svh] bg-night text-limestone">
        <ResponsiveImage id={imageId} sizes="100vw" priority className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 bg-night" style={{ height: "30%" }}>
          <Container className="flex h-full items-end pb-12">
            <Display as="h1" lines={lines} variant="xl" meta={meta} className="text-limestone" />
          </Container>
        </div>
      </section>
    );
  }

  if (variant === "split" && imageId) {
    return (
      <section className="bg-limestone text-night lg:grid lg:min-h-[100svh] lg:grid-cols-12" style={{ columnGap: "var(--gutter)" }}>
        <div className="px-[var(--margin)] pb-16 pt-[calc(var(--nav-h)+64px)] lg:col-span-6">
          <Display as="h1" lines={lines} variant="xl" meta={meta} />
          {lead ? (
            <Text variant="lead" className="mt-8 text-slate" meta={meta}>
              {lead}
            </Text>
          ) : null}
        </div>
        <div className="relative min-h-[70svh] lg:col-span-6 lg:min-h-[100svh]">
          <ResponsiveImage id={imageId} sizes="(min-width: 1024px) 50vw, 100vw" priority />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-limestone text-night">
      <Container className="pb-16 pt-[calc(var(--nav-h)+64px)]">
        <Grid>
          <Col span={4} lg={10}>
            <Display as="h1" lines={lines} variant="xl" meta={meta} />
          </Col>
          {lead ? (
            <Col span={4} lg={3} lgStart={10} className="mt-8 lg:mt-4">
              <Text variant="lead" className="text-slate" meta={meta}>
                {lead}
              </Text>
            </Col>
          ) : null}
        </Grid>
      </Container>
      {imageId ? (
        <Uncover className="aspect-[21/9] w-full">
          <ResponsiveImage id={imageId} sizes="100vw" priority />
        </Uncover>
      ) : null}
    </section>
  );
}
