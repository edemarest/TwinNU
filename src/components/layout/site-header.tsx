"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Link, scroller } from "react-scroll";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { heroContent, navItems } from "@/lib/content";

const NAV_OFFSET = -120;

export function SiteHeader() {
  const [active, setActive] = useState(navItems[0]?.id ?? "problem");

  const scrollTo = useCallback((id: string) => {
    scroller.scrollTo(id, {
      smooth: true,
      duration: 600,
      offset: NAV_OFFSET,
    });
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="glass-panel flex items-center justify-between gap-4 rounded-full px-6 py-3">
          <button
            className="text-sm font-semibold uppercase tracking-[0.3em] text-inverted"
            onClick={() => scrollTo("hero")}
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-2xl border border-white/15 bg-white/90 shadow-[0_6px_18px_rgba(0,0,0,0.15)] dark:bg-white">
                <Image
                  src="/images/app-logo.png"
                  alt="TwinNU logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </span>
              TwinNU
            </span>
          </button>

          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            {navItems.map((anchor) => (
              <Link
                key={anchor.id}
                to={anchor.id}
                spy
                smooth
                duration={600}
                offset={NAV_OFFSET}
                onSetActive={() => setActive(anchor.id)}
                className={`cursor-pointer transition-colors ${
                  active === anchor.id
                    ? "text-foreground"
                    : "hover:text-foreground"
                }`}
              >
                {anchor.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollTo("contact")}
            >
              {heroContent.primaryCta}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
