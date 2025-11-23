"use client";

import { motion } from "framer-motion";
import { PiWarningCircleFill } from "react-icons/pi";
import { PiBroadcastFill, PiHandshakeFill, PiUsersThreeFill } from "react-icons/pi";
import { problemPoints } from "@/lib/content";
import { fadeInUp } from "@/lib/animation";
import { FrostedCard } from "@/components/ui/frosted-card";

export function ProblemSection() {
  return (
    <section id="problem" className="section">
      <div className="section-heading">
        <span>Problem</span>
        <h2>Networking is Broken.</h2>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {problemPoints.map((point, index) => {
          const icons = [
            PiWarningCircleFill,
            PiBroadcastFill,
            PiUsersThreeFill,
            PiHandshakeFill,
          ];
          const Icon = icons[index % icons.length];
          return (
            <motion.div key={point} {...fadeInUp(index * 0.08)}>
              <FrostedCard className="flex h-full items-start gap-4 bg-surface-soft p-6">
                <div className="flex h-14 w-14 min-h-14 min-w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/25 to-transparent text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-base text-muted">{point}</p>
              </FrostedCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
