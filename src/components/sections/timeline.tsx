"use client";

import { motion } from "framer-motion";
import { timelineSteps } from "@/lib/content";
import { fadeInUp } from "@/lib/animation";
import { FrostedCard } from "@/components/ui/frosted-card";
import {
  PiRocketLaunchFill,
  PiShareNetworkFill,
  PiGlobeHemisphereWestFill,
} from "react-icons/pi";

const timelineIcons = [
  PiRocketLaunchFill,
  PiShareNetworkFill,
  PiGlobeHemisphereWestFill,
];

const railGradients = [
  "from-[rgba(82,124,242,0.8)] to-[rgba(108,191,249,0.5)]",
  "from-[rgba(193,118,214,0.8)] to-[rgba(255,182,138,0.5)]",
  "from-[rgba(117,196,158,0.85)] to-[rgba(74,144,240,0.45)]",
];

export function TimelineSection() {
  return (
    <section id="plan" className="section">
      <div className="section-heading">
        <span>Plan</span>
        <h2>Plan: Our Replication Playbook.</h2>
      </div>

      <div className="relative mt-12">
        <div className="pointer-events-none absolute left-24 right-24 top-[92px] hidden h-[2px] bg-gradient-to-r from-[rgba(82,124,242,0.45)] via-[rgba(255,182,138,0.4)] to-[rgba(117,196,158,0.5)] md:block" />

        <div className="grid gap-8 md:grid-cols-3">
          {timelineSteps.map((step, index) => {
            const Icon = timelineIcons[index] ?? PiRocketLaunchFill;
            const gradient = railGradients[index] ?? railGradients[0];
            return (
              <motion.div key={step.title} {...fadeInUp(index * 0.1)}>
                <FrostedCard className="group h-full bg-surface-soft/90 p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-muted">
                    <span>Step {index + 1}</span>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <div
                      className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-shadow group-hover:shadow-[0_16px_35px_rgba(0,0,0,0.2)]`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-muted">{step.detail}</p>
                </FrostedCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
