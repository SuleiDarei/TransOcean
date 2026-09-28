"use client";

import { useEffect, useState } from "react";

const QUERY = "(max-width: 767px), (orientation: portrait) and (max-width: 1023px)";

export function usePortraitHero(): boolean {
  const [portrait, setPortrait] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const update = () => setPortrait(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return portrait;
}
