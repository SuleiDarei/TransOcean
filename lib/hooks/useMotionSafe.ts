"use client";

import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
function subscribe(notify: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}
const getSnapshot = () => window.matchMedia(query).matches;
const getServerSnapshot = () => true;

export function useMotionSafe(): boolean {
  // Framer's hook supplies its platform preference, while the external store
  // keeps SSR/hydration identical and reacts to preference changes at runtime.
  const reduced = useReducedMotion();
  const preference = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return !(preference ?? reduced ?? true);
}
