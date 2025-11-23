"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scroller } from "react-scroll";
import { PiSparkleFill, PiPlayFill } from "react-icons/pi";
import { heroContent } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { HERO_STAGGER, SLOW_DURATION, SLOW_EASE } from "@/lib/animation";
import { OrbitSystem } from "@/components/ui/orbit-system";

const scrollTo = (id: string) =>
  scroller.scrollTo(id, {
    smooth: true,
    duration: 650,
    offset: -120,
  });

const centerSize = 120;

const ringConfigs = [
  { width: 60, color: "rgba(241, 200, 104, 0.6)", speed: 85, avatars: ["/images/ella.png", "/images/matej.png", "/images/kevin.png"] },
  { width: 55, color: "rgba(193, 118, 214, 0.5)", speed: -95, avatars: ["/images/steve.png", "/images/conor.png", "/images/kevin.png"] },
  {
    width: 50,
    color: "rgba(82, 124, 242, 0.5)",
    speed: 120,
    avatars: ["/images/matej.png", "/images/steve.png", "/images/ella.png", "/images/kevin.png"],
  },
  {
    width: 46,
    color: "rgba(92, 183, 229, 0.45)",
    speed: -140,
    avatars: ["/images/conor.png", "/images/matej.png", "/images/kevin.png", "/images/ella.png"],
  },
  {
    width: 42,
    color: "rgba(117, 196, 158, 0.45)",
    speed: 160,
    avatars: ["/images/steve.png", "/images/conor.png", "/images/ella.png", "/images/matej.png", "/images/kevin.png"],
  },
];

const baseInnerRadius = centerSize / 2 + 26;

const orbitLayers = ringConfigs.reduce<
  {
    innerRadius: number;
    outerRadius: number;
    bandColor: string;
    speed: number;
    avatarSize: number;
    avatars: { src: string; alt: string }[];
    zIndex: number;
  }[]
>((acc, config, index) => {
  const prevOuter = acc[index - 1]?.outerRadius ?? baseInnerRadius;
  const innerRadius = index === 0 ? baseInnerRadius : prevOuter;
  const outerRadius = innerRadius + config.width;
  const avatarSize = Math.max(32, config.width * 0.6);

  acc.push({
    innerRadius,
    outerRadius,
    bandColor: config.color,
    speed: config.speed,
    avatarSize,
    avatars: config.avatars.map((src) => ({ src, alt: "Twin avatar" })),
    zIndex: ringConfigs.length - index,
  });
  return acc;
}, []);

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100vh] flex-col items-center justify-center px-6 pb-32 pt-44 text-center"
    >
      <div className="hero-galaxy" />
      <div className="hero-dim" />
      <div className="hero-aurora" />

      <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.span
            className="glass-chip mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: SLOW_DURATION, ease: SLOW_EASE }}
          >
            <PiSparkleFill className="h-4 w-4 text-accent" />
            Slow Social · Closed Pilot
          </motion.span>

          <motion.h1
            className="max-w-4xl text-balance text-4xl font-semibold leading-tight text-inverted sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: SLOW_DURATION,
              ease: SLOW_EASE,
              delay: HERO_STAGGER,
            }}
          >
            {heroContent.headline}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-pretty text-base text-inverted sm:text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: SLOW_DURATION,
              ease: SLOW_EASE,
              delay: HERO_STAGGER * 2,
            }}
          >
            {heroContent.subhead}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: SLOW_DURATION,
              ease: SLOW_EASE,
              delay: HERO_STAGGER * 3,
            }}
          >
            <Button onClick={() => scrollTo("contact")}>
              <span className="flex items-center gap-2">
                <PiSparkleFill className="h-4 w-4" />
                {heroContent.primaryCta}
              </span>
            </Button>
            <Button variant="secondary" onClick={() => scrollTo("plan")}>
              <span className="flex items-center gap-2 text-sm">
                <PiPlayFill className="h-4 w-4 text-accent" />
                {heroContent.secondaryCta}
              </span>
            </Button>
          </motion.div>

          <motion.p
            className="mt-6 text-xs uppercase tracking-[0.3em] text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: SLOW_DURATION,
              ease: SLOW_EASE,
              delay: HERO_STAGGER * 4,
            }}
          >
            {heroContent.comingSoonNote}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex justify-center overflow-visible"
        >
          <OrbitSystem
            layers={orbitLayers}
            centerContent={
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-black/50" />
                <div className="absolute inset-3 rounded-full border-[10px] border-[rgba(241,200,104,0.55)]" />
                <Image
                  src="/images/ella.png"
                  alt="Twin avatar"
                  width={centerSize}
                  height={centerSize}
                  className="relative z-10 rounded-full border border-white/20 object-cover"
                />
              </div>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
