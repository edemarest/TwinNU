"use client";

import { scroller } from "react-scroll";
import { navItems } from "@/lib/content";
import { Button } from "@/components/ui/button";

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
          <p className="font-semibold text-foreground">TwinNU</p>
          <p className="text-xs">
            © {new Date().getFullYear()} Slow Social for meaningful circles.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="transition-colors hover:text-foreground"
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Button variant="secondary" size="sm" onClick={() => scrollTo("contact")}>
          Request a Demo
        </Button>
      </div>
    </footer>
  );
}
