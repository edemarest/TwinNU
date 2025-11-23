"use client";

import { motion } from "framer-motion";
import { PiEnvelopeFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/animation";
import { PilotInterestForm } from "./pilot-interest-form";

export function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="section-heading">
        <span>Contact</span>
        <h2>Request a Twiniverse Demo.</h2>
      </div>

      <motion.div
        className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-surface-soft p-8"
        {...fadeInUp()}
      >
        <p className="text-sm text-inverted">
          Tell us about your institution and we’ll tailor a Twiniverse roll-out
          plan. Expect a response within 48 hours.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <label className="glass-chip flex flex-1 items-center gap-3 rounded-full px-5 text-sm text-muted focus-within:border-[var(--color-accent)]/60">
            <PiEnvelopeFill className="h-4 w-4 text-accent" />
            <input
              type="email"
              placeholder="you@university.edu"
              className="h-12 flex-1 bg-transparent text-foreground outline-none"
            />
          </label>
          <Button className="whitespace-nowrap" variant="secondary">
            Send Request
          </Button>
        </div>
        <p className="text-xs text-muted">
          Institutional Pricing: Currently in pilot negotiation.
        </p>
      </motion.div>

      <PilotInterestForm />
    </section>
  );
}
