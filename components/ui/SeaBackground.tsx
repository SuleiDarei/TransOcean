"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "framer-motion";
import { ChartField } from "./ChartField";

type Props = { variant?: "deep" | "night"; calm?: boolean; coast?: boolean };

export function SeaBackground({ variant = "deep", calm = false, coast = false }: Props) {
  const reduced = useReducedMotion() === true;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        el.dataset.paused = entry.isIntersecting ? "false" : "true";
      },
      { rootMargin: "120px" },
    );
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduced || calm) return;
      const box = el.getBoundingClientRect();
      const x = ((event.clientX - box.left) / box.width - 0.5) * 10;
      const y = ((event.clientY - box.top) / box.height - 0.5) * 6;
      el.style.setProperty("--chart-x", `${x.toFixed(2)}px`);
      el.style.setProperty("--chart-y", `${y.toFixed(2)}px`);
    };

    const host = el.parentElement;
    io.observe(el);
    if (host && !calm && !reduced) host.addEventListener("pointermove", onMove);
    return () => {
      io.disconnect();
      host?.removeEventListener("pointermove", onMove);
    };
  }, [calm, reduced]);

  return (
    <div
      ref={ref}
      className={`sea sea--${variant}${calm ? " sea--calm" : " sea--chart"}${coast ? " sea--coast" : ""}`}
      aria-hidden="true"
    >
      <div className="sea__base" />
      {calm ? (
        <>
          <div className="sea__drift sea__drift--a" />
          <div className="sea__drift sea__drift--b" />
        </>
      ) : (
        <ChartField coast={coast} />
      )}
      <div className="sea__swell" />
      <div className="sea__grain" />
    </div>
  );
}
