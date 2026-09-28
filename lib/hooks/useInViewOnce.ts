"use client";

import { useEffect, useState } from "react";

export function useInViewOnce<T extends Element>(
  ref: React.RefObject<T | null>,
  threshold = 0.2,
): boolean {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || seen) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, seen, threshold]);

  return seen;
}
