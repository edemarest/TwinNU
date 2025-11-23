"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMessageCircle, FiUser } from "react-icons/fi";
import { PiSparkleFill, PiPaperPlaneRightFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";

const fields = [
  { id: "name", label: "Full name", required: true, icon: FiUser, placeholder: "First Last" },
  { id: "email", label: "Email", required: true, icon: FiMail, type: "email", placeholder: "you@university.edu" },
  {
    id: "communityIntent",
    label: "Community + intent",
    icon: FiMessageCircle,
    textarea: true,
    placeholder: "Share your affiliation and what you hope to unlock with twinNU.",
  },
];

const successVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export function PilotInterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name")?.toString().trim() ?? "",
      email: data.get("email")?.toString().trim() ?? "",
      communityIntent: data.get("communityIntent")?.toString().trim() ?? "",
      botField: data.get("bot-field")?.toString().trim() ?? "",
    };

    if (payload.botField) {
      form.reset();
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/forms/pilot-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Netlify submission failed: ${response.status}`);
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "There was a problem submitting your application. Please retry or email us."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
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
            <h3 className="text-2xl font-semibold">You&apos;re on the twinNU interest list.</h3>
            <p className="mt-3 text-soft">
              Expect a personal note when your community matches the next slow-social cohort—we&apos;ll share rollout timing before anyone else.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            name="pilot-interest"
            className="glass-panel rounded-3xl p-7 sm:p-8"
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={successVariants}
          >
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
                        required={field.required}
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
              <p className="text-xs uppercase tracking-[0.35em] text-soft">What happens next</p>
              <p className="text-sm text-muted">
                We review submissions weekly and invite aligned communities when a pilot slot unlocks.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                disabled={submitting}
                className="px-6 bg-white/90 text-[#050a13] shadow-[0_8px_18px_rgba(0,0,0,0.12)] hover:bg-white hover:shadow-[0_12px_22px_rgba(0,0,0,0.18)]"
              >
                <span className="flex items-center gap-2">
                  <PiPaperPlaneRightFill className="h-4 w-4" />
                  {submitting ? "Submitting..." : "Submit"}
                </span>
              </Button>
            </div>
            {errorMessage ? (
              <p className="mt-4 text-sm text-red-300">{errorMessage}</p>
            ) : null}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
