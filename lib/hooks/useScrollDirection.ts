"use client";

import { useEffect, useState } from "react";

type Direction = "up" | "down";

/**
 * Reports scroll direction and whether the page has scrolled past `threshold`.
 * Work is coalesced to one read per animation frame, and state only changes
 * when a value flips, so consumers do not re-render on every scroll pixel.
 */
export function useScrollDirection(threshold = 120): { direction: Direction; scrolled: boolean } {
  const [direction, setDirection] = useState<Direction>("up");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const current = window.scrollY;
      setScrolled(current > threshold);
      if (Math.abs(current - last) > 4) {
        setDirection(current > last ? "down" : "up");
        last = current;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return { direction, scrolled };
}
