import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem";
import { SolutionSection } from "@/components/sections/solution";
import { TeamSection } from "@/components/sections/team";
import { TimelineSection } from "@/components/sections/timeline";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-base text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <TeamSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
