"use client";

import { useMotionSafe } from "@/lib/hooks/useMotionSafe";

import { homepage } from "@/content/homepage";
import { vesselClasses } from "@/content/vesselClasses";
import { silhouettes } from "@/lib/vessels/silhouettes";
import { phProps } from "@/lib/phProps";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Icon } from "@/components/primitives/Icon";

const SCALE = 1.2;

export function VesselScale({ filter, className, cinematic = false }: { filter?: string[]; className?: string; cinematic?: boolean }) {
  const classes = filter ? vesselClasses.filter((vessel) => filter.includes(vessel.id)) : vesselClasses;
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const reduced = !useMotionSafe();
  const [edges, setEdges] = useState({ start: true, end: false });
  const [travel, setTravel] = useState(0);
  const [wide, setWide] = useState(false);
  const pinned = cinematic && wide && !reduced && travel > 0;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (pinned && railRef.current) railRef.current.scrollLeft = progress * travel;
  });

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (min-height: 600px)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  function move(direction: number) {
    const rail = railRef.current;
    const section = sectionRef.current;
    if (!rail || !section) return;
    const step = Math.max(280, rail.clientWidth * 0.7) * direction;
    if (pinned) {
      const progress = Math.max(0, Math.min(1, (rail.scrollLeft + step) / travel));
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + progress * (section.offsetHeight - window.innerHeight), behavior: "smooth" });
    } else {
      rail.scrollBy({ left: step, behavior: reduced ? "instant" : "smooth" });
    }
  }

  const classKey = classes.map((vessel) => vessel.id).join("|");

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    const bar = barRef.current;
    if (!section || !rail || !bar) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = rail.scrollWidth > rail.clientWidth + 4;
        setTravel(Math.max(0, rail.scrollWidth - rail.clientWidth));
        const end = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
        const start = rail.scrollLeft <= 4;
        setEdges((previous) => previous.start === start && previous.end === end ? previous : { start, end });
        section.dataset.scrollable = scrollable ? "true" : "false";
        section.dataset.end = end ? "true" : "false";
        const progress = rail.scrollWidth ? (rail.scrollLeft + rail.clientWidth) / rail.scrollWidth : 1;
        bar.style.setProperty("--p", String(progress));
      });
    };

    measure();
    rail.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      rail.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [classKey]);

  return (
    <section
      id="vessels"
      ref={sectionRef}
      className={`svc-section vessels bg-water text-ink${className ? ` ${className}` : ""}`}
      data-pinned={pinned ? "true" : undefined}
      style={pinned ? { height: `calc(100svh + ${travel * 0.85}px)` } : undefined}
      aria-labelledby="vessel-classes-title"
    >
      <div className="vessels__viewport">
      <header className="vessels__head">
        <div>
          <h2 id="vessel-classes-title" className={cinematic ? "t-display-m max-w-[22ch]" : "t-heading-s"} {...phProps(homepage.vessels.meta)}>
            {homepage.vessels.heading}
          </h2>
          <p className="vessels__sub" {...phProps(homepage.vessels.meta)}>
            {homepage.vessels.note}
          </p>
        </div>
        <div className="vessels__controls">
          <button className="vessels__control" type="button" aria-label="Previous vessel classes" disabled={edges.start} onClick={() => move(-1)}><Icon name="arrow" className="rotate-180" /></button>
          <button className="vessels__control" type="button" aria-label="Next vessel classes" disabled={edges.end} onClick={() => move(1)}><Icon name="arrow" /></button>
        </div>
      </header>

      <div
        ref={railRef}
        className="vessels__rail"
        tabIndex={0}
        role="group"
        aria-label="Vessel classes drawn to a shared scale. Scroll sideways to compare."
      >
        <ul className="vessels__track" role="list">
          {classes.map((vessel) => {
            const art = silhouettes[vessel.id];
            return (
              <li className="vessel" key={vessel.id}>
                <figure>
                  <div className="vessel__art">
                    <svg
                      viewBox={`0 0 ${vessel.length} 100`}
                      width={vessel.length * SCALE}
                      height={100 * SCALE}
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d={art.below} fill="var(--shallows)" />
                      <path d={art.above} fill="var(--ink)" />
                    </svg>
                  </div>
                  <figcaption>
                    <span className="vessel__tick" aria-hidden="true" />
                    <span className="vessel__name">{vessel.name}</span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="vessels__progress" aria-hidden="true">
        <span ref={barRef} />
      </div>
      </div>
    </section>
  );
}
