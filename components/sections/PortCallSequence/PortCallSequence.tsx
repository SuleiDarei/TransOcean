"use client";

import { useMotionSafe } from "@/lib/hooks/useMotionSafe";

import { homepage } from "@/content/homepage";
import { stages } from "@/content/portCall";
import { Container } from "@/components/layout/Container";
import { Display, Text } from "@/components/primitives/Type";
import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { phProps } from "@/lib/phProps";
import { m, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";

function StageImage({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const reduced = !useMotionSafe();
  const start = index / stages.length;
  const end = (index + 1) / stages.length;
  const clipPath = useTransform(progress, [start - 0.035, start + 0.035], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const scale = useTransform(progress, [start, end], [1.12, 1]);
  const y = useTransform(progress, [start, end], ["-3%", "3%"]);
  return (
    <m.div className="port-story__image" style={{ zIndex: index, clipPath: index === 0 || reduced ? undefined : clipPath }}>
      <m.div className="h-full" style={reduced ? undefined : { scale, y }}>
        <ResponsiveImage id={stages[index].imageId} sizes="(min-width: 1024px) 55vw, 100vw" decorative />
      </m.div>
    </m.div>
  );
}

function StageCopy({ index }: { index: number }) {
  const stage = stages[index];
  const ref = useRef<HTMLElement>(null);
  const reduced = !useMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.45, 1], [48, 0, -48]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [0.35, 1, 1, 0.35]);

  return (
    <article ref={ref} id={`stage-${stage.id}`} className="port-story__stage" {...phProps(stage.meta)}>
      <div className="port-story__mobile-image"><ResponsiveImage id={stage.imageId} sizes="100vw" /></div>
      <m.div style={reduced ? undefined : { y, opacity }}>
        <p className="t-small port-story__number"><span className="nums">{String(index + 1).padStart(2, "0")}</span><span> / {String(stages.length).padStart(2, "0")}</span></p>
        <h3 className="t-display-m mt-6">{stage.title}</h3>
        <p className="t-body mt-6 max-w-measure"><strong className="font-semibold">{stage.lead}</strong> {stage.body}</p>
        <p className="t-small mt-6 text-slate">Involves: {stage.involves.join(", ")}.</p>
      </m.div>
    </article>
  );
}

export function PortCallSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = !useMotionSafe();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActive(Math.min(stages.length - 1, Math.floor(progress * stages.length)));
  });

  return (
    <section id="port-call" className="port-story" aria-labelledby="port-call-title" data-still={reduced ? "true" : undefined}>
      <Container>
        <div className="port-story__heading">
          <Display id="port-call-title" lines={homepage.portCall.lines} variant="l" meta={homepage.portCall.meta} />
          <Text variant="lead" className="max-w-[32ch] text-slate" meta={homepage.portCall.meta}>{homepage.portCall.intro}</Text>
        </div>
      </Container>
      <div ref={ref} className="port-story__body">
        <div className="port-story__cinema" aria-hidden="true">
          <div className="port-story__screen">
            {stages.map((stage, index) => <StageImage key={stage.id} index={index} progress={scrollYProgress} />)}
            <div className="port-story__caption t-small"><span>{stages[active].title}</span><span className="nums">{String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}</span></div>
            <m.div className="port-story__progress" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
        <nav className="port-story__nav" aria-label="Port call stages">
          {stages.map((stage, index) => (
            <a key={stage.id} href={`#stage-${stage.id}`} className="t-small port-story__stop" aria-current={active === index ? "step" : undefined} aria-label={`Stage ${index + 1}: ${stage.title}`}>
              <span className="nums">{String(index + 1).padStart(2, "0")}</span><span className="port-story__stop-name">{stage.title}</span>
            </a>
          ))}
        </nav>
        <div className="port-story__copy">{stages.map((stage, index) => <StageCopy key={stage.id} index={index} />)}</div>
      </div>
    </section>
  );
}
