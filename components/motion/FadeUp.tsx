"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function FadeUp({
  children,
  className,
  delay = 0,
  threshold = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  const reduced = useReducedMotion();

  return (
    <m.div
      ref={ref}
      className={className}
      initial={false}
      animate={reduced || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
