"use client";

import { useMotionSafe } from "@/lib/hooks/useMotionSafe";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** A restrained camera move, tied to native scroll instead of a wheel handler. */
export function ScrollFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = !useMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.16, 1.04]);

  return (
    <div ref={ref} className={`scroll-frame ${className}`}>
      <m.div className="scroll-frame__image" style={reduced ? undefined : { y, scale }}>
        {children}
      </m.div>
    </div>
  );
}
