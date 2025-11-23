"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Link, scroller } from "react-scroll";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { navItems } from "@/lib/content";

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
        <div className="glass-panel header-glass flex items-center justify-between gap-4 rounded-full px-6 py-3">
          <button
            className="text-sm font-medium text-foreground"
            onClick={() => scrollTo("hero")}
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-2xl border border-white/15 bg-white/90 shadow-[0_6px_18px_rgba(0,0,0,0.15)] dark:bg-white">
                <Image
                  src="/images/app-logo.png"
                  alt="twinNU logo"
                  width={40}
                  height={40}
                  priority
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="flex items-baseline text-lg tracking-tight">
                <span className="font-light lowercase">twin</span>
                <span className="font-extrabold uppercase">NU</span>
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.3em] md:flex">
            {navItems.map((anchor) => (
              <Link
                key={anchor.id}
                to={anchor.id}
                spy
                smooth
                duration={350}
                offset={NAV_OFFSET}
                onSetActive={() => setActive(anchor.id)}
                onClick={() => setActive(anchor.id)}
                className={`relative overflow-hidden rounded-full px-4 py-2 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 dark:focus-visible:ring-white/60 ${
                  active === anchor.id
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {active === anchor.id ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full border border-black/5 bg-white shadow-[0_8px_20px_rgba(15,23,42,0.15)] dark:border-white/20 dark:bg-white/10"
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  />
                ) : null}
                <span className="relative z-10">{anchor.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
