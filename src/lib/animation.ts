import type { MotionProps, Transition } from "framer-motion";

export const SLOW_DURATION = 0.5;
export const SLOW_EASE: Transition["ease"] = [0.22, 1, 0.36, 1];
export const HERO_STAGGER = 0.12;

export function fadeInUp(delay = 0): MotionProps {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: SLOW_DURATION, ease: SLOW_EASE, delay },
  };
}
