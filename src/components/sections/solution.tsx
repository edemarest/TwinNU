"use client";

import { motion } from "framer-motion";
import {
  PiRobotFill,
  PiShieldCheckFill,
  PiPulseFill,
} from "react-icons/pi";
import { solutions } from "@/lib/content";
import { fadeInUp } from "@/lib/animation";
import { FrostedCard } from "@/components/ui/frosted-card";

const icons = [PiRobotFill, PiShieldCheckFill, PiPulseFill];

export function SolutionSection() {
  return (
    <section id="solution" className="section">
      <div className="section-heading">
        <span>Solution</span>
        <h2>TwinNU: The Twiniverse Advantage.</h2>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {solutions.map((feature, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div key={feature.title} {...fadeInUp(index * 0.08)}>
              <FrostedCard className="h-full bg-surface-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/30 to-transparent text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-muted">{feature.description}</p>
              </FrostedCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
