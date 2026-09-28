"use client";

import { useReducedMotion } from "framer-motion";

export function useMotionSafe(): boolean {
  return useReducedMotion() !== true;
}
