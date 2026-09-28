"use client";

import { homepage } from "@/content/homepage";
import { vesselClasses } from "@/content/vesselClasses";
import { silhouettes } from "@/lib/vessels/silhouettes";
import { phProps } from "@/lib/phProps";
import { useEffect, useRef } from "react";

const SCALE = 1.2;

export function VesselScale({ filter, className }: { filter?: string[]; className?: string }) {
  const classes = filter ? vesselClasses.filter((vessel) => filter.includes(vessel.id)) : vesselClasses;
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

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
        const end = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
        section.dataset.scrollable = scrollable ? "true" : "false";
        section.dataset.end = end ? "true" : "false";
        const progress = rail.scrollWidth ? (rail.scrollLeft + rail.clientWidth) / rail.scrollWidth : 1;
        bar.style.setProperty("--p", String(progress));
      });
    };

    measure();
    rail.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [classKey]);

  return (
    <section
      ref={sectionRef}
      className={`svc-section vessels bg-water text-ink${className ? ` ${className}` : ""}`}
      aria-labelledby="vessel-classes-title"
    >
      <header className="vessels__head">
        <div>
          <h2 id="vessel-classes-title" className="t-heading-s" {...phProps(homepage.vessels.meta)}>
            {homepage.vessels.heading}
          </h2>
          <p className="vessels__sub" {...phProps(homepage.vessels.meta)}>
            {homepage.vessels.note}
          </p>
        </div>
        <p className="vessels__hint t-small" aria-hidden="true">
          {homepage.vessels.scrollHint}
        </p>
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
    </section>
  );
}
