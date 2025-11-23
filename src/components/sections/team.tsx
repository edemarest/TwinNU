"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { teamMembers } from "@/lib/content";
import { fadeInUp } from "@/lib/animation";
import { FrostedCard } from "@/components/ui/frosted-card";

export function TeamSection() {
  return (
    <section id="team" className="section">
      <div className="section-heading">
        <span>The Team</span>
        <h2>Research-Backed. Student-Driven.</h2>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {teamMembers.map((member, index) => (
          <motion.div key={member.name} {...fadeInUp(index * 0.08)}>
            <FrostedCard className="h-full bg-surface-soft">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-[24px] border border-white/20 bg-black/20 shadow-[0_12px_25px_rgba(0,0,0,0.25)] dark:border-white/15">
                  <Image
                    src={member.photo ?? "/images/app-logo.png"}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {member.name}
                  </p>
                  <p className="text-sm text-muted">{member.role}</p>
                </div>
              </div>
            </FrostedCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
