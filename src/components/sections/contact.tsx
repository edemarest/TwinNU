"use client";

import { PilotInterestForm } from "./pilot-interest-form";

export function ContactSection() {
  return (
    <section id="waitlist" className="section">
      <div className="section-heading">
        <span>Waitlist</span>
        <h2>Join the Twin<strong>NU</strong> Institutional Pilot Waitlist.</h2>
      </div>
      <PilotInterestForm />
    </section>
  );
}
