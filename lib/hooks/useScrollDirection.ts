"use client";

import { useEffect, useState } from "react";

export function useScrollDirection(): { direction: "up" | "down"; y: number } {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [y, setY] = useState(0);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setY(current);
      if (Math.abs(current - last) > 4) {
        setDirection(current > last ? "down" : "up");
        last = current;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { direction, y };
}
