"use client";

import { cn } from "@/lib/cn";
import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function Uncover({
  children,
  className,
  active = true,
  from = "bottom",
  duration = 0.9,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  from?: "bottom" | "top";
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const shown = reduced || !active ? true : inView;
  const hidden = from === "bottom" ? "100%" : "-100%";

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <m.div
        className="h-full w-full"
        initial={false}
        animate={{ y: shown ? "0%" : hidden }}
        transition={{ duration: reduced ? 0 : duration, ease: [0.65, 0, 0.35, 1] }}
      >
        {children}
      </m.div>
    </div>
  );
}
