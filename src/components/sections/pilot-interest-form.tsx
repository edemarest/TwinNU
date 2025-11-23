"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiUsers, FiCompass, FiMessageCircle, FiUser } from "react-icons/fi";
import { PiSparkleFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";

const fields = [
  { id: "email", label: "Email", required: true, icon: FiMail, type: "email", placeholder: "you@university.edu" },
  {
    id: "affiliation",
    label: "Affiliation (program, grad year, orgs)",
    icon: FiUsers,
    placeholder: "Example: Northeastern CS · 2026 · HuskyAI",
  },
  {
    id: "interests",
    label: "People / events you'd like to encounter",
    icon: FiCompass,
    textarea: true,
    placeholder: "Which communities or experiences excite you?",
  },
  {
    id: "comments",
    label: "Thoughts or comments",
    icon: FiMessageCircle,
    textarea: true,
    placeholder: "Anything you'd like us to know",
  },
  { id: "name", label: "Your name", icon: FiUser, placeholder: "Your name" },
];

const successVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export function PilotInterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        body: data,
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("There was a problem submitting your application. Please email us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className="glass-panel rounded-3xl p-8 text-center text-inverted"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={successVariants}
          >
            <PiSparkleFill className="mx-auto mb-3 h-8 w-8 text-secondary" />
            <h3 className="text-2xl font-semibold">You&apos;re on the Twiniverse pilot radar!</h3>
            <p className="mt-3 text-soft">
              We&apos;ll follow up when a slot is available for your community. Keep an eye on your inbox.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            name="pilot-interest"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="glass-panel rounded-3xl p-8"
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={successVariants}
          >
            <input type="hidden" name="form-name" value="pilot-interest" />
            <p className="hidden">
              <label>
                Don&apos;t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="space-y-6">
              {fields.map((field) => {
                const Icon = field.icon;
                return (
                  <label key={field.id} className="block text-left text-soft">
                    <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.35em]">
                      <Icon className="h-4 w-4 text-inverted/70" />
                      {field.label}
                      {field.required ? "*" : null}
                    </span>
                    {field.textarea ? (
                      <textarea
                        name={field.id}
                        rows={3}
                        placeholder={field.placeholder}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-soft shadow-inner shadow-black/5 focus:border-white/40 focus:outline-none"
                      />
                    ) : (
                      <input
                        type={field.type ?? "text"}
                        name={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-soft shadow-inner shadow-black/5 focus:border-white/40 focus:outline-none"
                      />
                    )}
                  </label>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 text-left">
              <p className="text-xs uppercase tracking-[0.35em] text-soft">Pilot priorities</p>
              <p className="text-sm text-muted">
                We are focusing on student research communities. Tell us why your group should go slow social first.
              </p>
            </div>

            <div className="mt-8 flex justify-end">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Interest"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
