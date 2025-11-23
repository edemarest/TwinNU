"use client";

import { motion } from "framer-motion";
import {
  timelineSteps,
  institutionalPlaceholder,
  tractionCopy,
} from "@/lib/content";
import { fadeInUp } from "@/lib/animation";
import { FrostedCard } from "@/components/ui/frosted-card";
import { Button } from "@/components/ui/button";

export function TimelineSection() {
  return (
    <section id="plan" className="section">
      <div className="section-heading">
        <span>Plan</span>
        <h2>The Growth Trajectory.</h2>
      </div>

      <div className="mt-10 space-y-6">
        {timelineSteps.map((step, index) => (
          <motion.div key={step.title} {...fadeInUp(index * 0.05)}>
            <FrostedCard className="bg-surface-soft">
              <div className="text-xs uppercase tracking-[0.35em] text-accent">
                Step {index + 1}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{step.detail}</p>
            </FrostedCard>
          </motion.div>
        ))}
      </div>

      <motion.div className="mt-10" {...fadeInUp(0.2)}>
        <FrostedCard className="p-8 border-dashed border-white/10 bg-surface-soft/70">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Placeholder
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-foreground">
            {institutionalPlaceholder.heading}
          </h3>
          <p className="mt-2 text-sm text-muted">
            {institutionalPlaceholder.copy}
          </p>
          <Button
            className="mt-6"
            variant="secondary"
            size="sm"
            disabled
          >
            {institutionalPlaceholder.cta}
          </Button>
        </FrostedCard>
      </motion.div>

      <p className="mt-6 text-sm text-muted">{tractionCopy}</p>
    </section>
  );
}
