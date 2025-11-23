"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { PiMoonStarsFill, PiSunFill } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { startThemeTransition } from "@/components/layout/theme-transition";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return (
      <div className="h-8 w-8 rounded-full border border-white/10" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => {
        startThemeTransition();
        setTheme(isDark ? "light" : "dark");
      }}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full border bg-white/90 text-[#0f111a] transition shadow-[0_3px_10px_rgba(0,0,0,0.15)] dark:bg-black/40 dark:text-white/80 dark:border-white/15",
        "hover:scale-105"
      )}
    >
      {isDark ? (
        <PiMoonStarsFill className="h-4 w-4 text-accent" />
      ) : (
        <PiSunFill className="h-4 w-4 text-secondary" />
      )}
    </button>
  );
}
