"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PiLinkedinLogoFill } from "react-icons/pi";
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
                  <div className="flex-shrink-0 h-24 w-24 aspect-square overflow-hidden rounded-[28px] border border-white/20 bg-black/20 shadow-[0_12px_25px_rgba(0,0,0,0.25)] dark:border-white/15">
                    <Image
                      src={member.photo ?? "/images/app-logo.png"}
                      alt={member.name}
                      width={96}
                      height={96}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-foreground">
                      {member.name}
                    </p>
                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted transition-colors hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] rounded-full"
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <PiLinkedinLogoFill className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
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
