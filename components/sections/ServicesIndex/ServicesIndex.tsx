"use client";

import { useMotionSafe } from "@/lib/hooks/useMotionSafe";

import { homepage } from "@/content/homepage";
import { services } from "@/content/services";
import { Container } from "@/components/layout/Container";
import { Col, Grid } from "@/components/layout/Grid";
import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { Display, Text } from "@/components/primitives/Type";
import { TextLink } from "@/components/primitives/TextLink";
import { phProps } from "@/lib/phProps";
import Link from "next/link";
import { useState } from "react";
import { m } from "framer-motion";
import { Icon } from "@/components/primitives/Icon";

export function ServicesIndex() {
  const [active, setActive] = useState(0);
  const reduced = !useMotionSafe();
  // Dim the other rows only while the pointer is over the list. At rest every row
  // keeps full contrast; `active` still drives the sticky preview image.
  const [hovering, setHovering] = useState(false);
  const current = services[active];

  return (
    <section id="services" className="bg-water pb-[var(--space-section)] text-ink" aria-labelledby="services-title">
      <Container>
        <Grid className="items-end">
          <Col span={4} lg={6}>
            <Display id="services-title" lines={[homepage.services.heading]} variant="l" meta={homepage.services.meta} />
          </Col>
          <Col span={4} lg={4} lgStart={9} className="mt-8 lg:mt-0">
            <Text variant="lead" className="text-slate" meta={homepage.services.meta}>
              {homepage.services.intro}
            </Text>
          </Col>
        </Grid>

        <div className="mt-16 lg:grid lg:grid-cols-12" style={{ columnGap: "var(--gutter)" }}>
          <div className="lg:col-span-8" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            {services.map((service, index) => {
              const isActive = index === active;
              const dimmed = hovering && !isActive;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="service-row group grid min-h-[88px] grid-cols-4 items-end gap-4 border-t py-7 lg:grid-cols-8"
                  style={{
                    borderColor: "var(--rule-light)",
                    opacity: isActive ? 1 : undefined,
                  }}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  {...phProps(service.meta)}
                >
                  <span className="t-service-name col-span-4 lg:col-span-5 max-lg:!opacity-100" style={{ opacity: dimmed ? 0.45 : 1 }}>
                    {service.name}<Icon name="arrow" className="service-row__arrow" />
                  </span>
                  <span className="t-body col-span-3 text-slate lg:col-span-2 max-lg:!opacity-100" style={{ opacity: dimmed ? 0.45 : 1 }}>
                    {service.descriptor}
                  </span>
                </Link>
              );
            })}
            <div className="border-t" style={{ borderColor: "var(--rule-light)" }} />
            <div className="mt-8">
              <TextLink href="/services">{homepage.services.allLink}</TextLink>
            </div>
          </div>

          <div className="mt-10 hidden lg:col-span-4 lg:mt-0 lg:block">
            <div className="sticky top-[120px]">
              <div className="relative aspect-[4/5] overflow-hidden">
                {services.map((service, index) => (
                  <m.div key={service.slug} className="absolute inset-0" aria-hidden={index !== active}
                    initial={false}
                    animate={{ opacity: index === active ? 1 : 0, scale: index === active ? 1 : 1.06 }}
                    transition={{ duration: reduced ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}>
                    <ResponsiveImage id={service.imageId} sizes="30vw" decorative />
                  </m.div>
                ))}
              </div>
              <p className="t-small mt-3">{current.name}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
