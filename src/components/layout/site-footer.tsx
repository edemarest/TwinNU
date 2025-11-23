"use client";

import { scroller } from "react-scroll";
import { navItems } from "@/lib/content";

const NAV_OFFSET = -120;

export function SiteFooter() {
  const scrollTo = (id: string) =>
    scroller.scrollTo(id, {
      smooth: true,
      duration: 600,
      offset: NAV_OFFSET,
    });

  return (
    <footer className="mx-auto mt-24 max-w-6xl px-6 pb-10 text-sm text-muted">
      <div className="flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-foreground">
            <span className="text-lg tracking-tight">
              <span className="font-light lowercase">twin</span>
              <span className="font-bold uppercase">NU</span>
            </span>
          </p>
          <p className="text-xs">
            © {new Date().getFullYear()} Slow Social for meaningful circles.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="cursor-pointer transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] rounded-full px-2 py-1"
              onClick={() => scrollTo(item.id)}
              aria-label={`Scroll to ${item.label} section`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
