"use client";

import { useEffect } from "react";

const TRANSITION_DURATION = 650;
let timeoutRef: number | null = null;

export function startThemeTransition() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.add("theme-transition");
  if (timeoutRef) {
    window.clearTimeout(timeoutRef);
  }
  timeoutRef = window.setTimeout(() => {
    root.classList.remove("theme-transition");
    timeoutRef = null;
  }, TRANSITION_DURATION);
}

export function ThemeTransitionLayer() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemToggle = () => startThemeTransition();
    media.addEventListener("change", handleSystemToggle);
    return () => media.removeEventListener("change", handleSystemToggle);
  }, []);

  return <div aria-hidden className="theme-change-overlay" />;
}
