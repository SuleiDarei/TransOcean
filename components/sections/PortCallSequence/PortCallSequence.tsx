"use client";

import { homepage } from "@/content/homepage";
import { stages } from "@/content/portCall";
import { Container } from "@/components/layout/Container";
import { Col, Grid } from "@/components/layout/Grid";
import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { Display, Text } from "@/components/primitives/Type";
import { phProps } from "@/lib/phProps";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function PortCallSequence() {
  const count = stages.length;
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fromTop, setFromTop] = useState(false);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const { direction } = useScrollDirection();
  const reduced = useReducedMotion() === true;

  useEffect(() => {
    const nodes = stageRefs.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        setFromTop(direction === "up");
        setActive(index);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [direction]);

  useEffect(() => {
    const onScroll = () => {
      const first = stageRefs.current[0];
      const last = stageRefs.current[count - 1];
      if (!first || !last) return;
      const start = first.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5;
      const end = last.getBoundingClientRect().bottom + window.scrollY - window.innerHeight * 0.5;
      const next = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start || 1)));
      setProgress(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [count]);

  return (
    <section ref={sectionRef} className="bg-limestone text-night" style={{ paddingTop: 160 }} aria-labelledby="port-call-title">
      <Container>
        <Grid className="items-end">
          <Col span={4} md={8} lg={7}>
            <Display id="port-call-title" lines={homepage.portCall.lines} variant="l" meta={homepage.portCall.meta} />
          </Col>
          <Col span={4} md={8} lg={4} lgStart={9} className="mt-8 lg:mt-0">
            <Text variant="lead" className="text-slate" meta={homepage.portCall.meta}>
              {homepage.portCall.intro}
            </Text>
          </Col>
        </Grid>
      </Container>

      <div className="sticky top-0 z-20 border-b bg-limestone px-[var(--margin)] lg:hidden" style={{ borderColor: "var(--rule-light)", height: 48 }}>
        <div className="flex h-full items-center">
          <p className="t-small font-semibold">
            Stage {active + 1} of {count} · {stages[active]?.title}
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-sodium" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <div className="mt-16 lg:mt-32">
        <div className="lg:grid lg:grid-cols-12" style={{ columnGap: "var(--gutter)" }}>
          <div className="relative hidden lg:col-span-6 lg:block">
            <div className="sticky top-0 h-[100svh] overflow-hidden">
              {stages.map((stage, index) => (
                <div
                  key={stage.id}
                  className="absolute inset-0"
                  style={{
                    transform: index === active ? "translateY(0%)" : fromTop ? "translateY(-100%)" : "translateY(100%)",
                    transition: reduced ? "none" : "transform 700ms var(--ease-move)",
                    zIndex: index === active ? 1 : 0,
                  }}
                >
                  <ResponsiveImage id={stage.imageId} sizes="50vw" className="h-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:col-span-1 lg:block">
            <div className="sticky flex justify-center" style={{ top: "20svh", height: "60svh" }}>
              <div className="relative h-full w-px bg-sand">
                <div className="absolute inset-x-0 top-0 w-0.5 origin-top bg-sodium" style={{ height: "100%", transform: `scaleY(${progress})` }} />
                {stages.map((stage, index) => (
                  <span
                    key={stage.id}
                    className="absolute h-px w-2 bg-night"
                    style={{ top: `${(index / (count - 1 || 1)) * 100}%`, insetInlineStart: -3 }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pe-[var(--margin)]">
            {stages.map((stage, index) => (
              <article
                key={stage.id}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                data-index={index}
                className="flex min-h-0 flex-col justify-center px-[var(--margin)] py-12 lg:min-h-[90svh] lg:px-0"
                {...phProps(stage.meta)}
              >
                <div className="lg:hidden">
                  <div className="mb-6 aspect-[4/3] overflow-hidden">
                    <ResponsiveImage id={stage.imageId} sizes="100vw" />
                  </div>
                </div>
                <p className="t-label text-slate">
                  Stage {index + 1} of {count}
                </p>
                <h3 className="t-display-m mt-4">{stage.title}</h3>
                <p className="t-body mt-6 max-w-measure">
                  <strong className="font-semibold">{stage.lead}</strong> {stage.body}
                </p>
                <p className="t-small mt-6 text-slate">Involves: {stage.involves.join(", ")}.</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Container>
        <div className="mb-16 mt-16 border-t lg:mb-24 lg:mt-40" style={{ borderColor: "var(--rule-light)" }} />
      </Container>
    </section>
  );
}
