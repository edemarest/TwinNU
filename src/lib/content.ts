export type SectionId =
  | "hero"
  | "problem"
  | "solution"
  | "team"
  | "plan"
  | "waitlist";

export const navItems: { id: SectionId; label: string }[] = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Vision" },
  { id: "team", label: "Team" },
  { id: "plan", label: "Plan" },
  { id: "waitlist", label: "Waitlist" },
];

export const heroContent = {
  headline: "The Future of Meaningful Connections is Slow Social.",
  subhead:
    "TwinNU is currently in build mode for its institutional pilots. Join this waitlist to line up your research group, lab, or founder team for the next closed Twiniverse launch.",
  primaryCta: "Join the Waitlist",
  secondaryCta: "View the Pilot Plan",
  comingSoonNote: "",
};

export const problemPoints = [
  "The “Missing Middle” of ties—where serendipity, support, and real opportunity rarely form.",
  "Connection fatigue from endless feeds, cold outreach, and manual upkeep.",
  "High effort, low reward from event-based networking that crowds out consistent follow-ups.",
  "Teams need verified, low-risk introductions inside trusted communities.",
];

export const solutions = [
  {
    title: "AI Digital Twin",
    description:
      "Your agent offloads the initiation and light maintenance of ties, facilitating weekly, low-pressure, context-aware encounters.",
  },
  {
    title: "Closed Twiniverses",
    description:
      "Verified, private networks aligned with your university or company keep every interaction trusted.",
  },
  {
    title: "My Circle Visualization",
    description:
      "Watch relationships evolve without spreadsheets—your rapport shows when to re-engage.",
  },
];

export const teamMembers = [
  {
    name: "Matej Zecic",
    role: "Co-founder · Full-stack mobile engineer (Northeastern MS).",
    photo: "/images/photos/matej.jpeg",
    linkedin: "https://www.linkedin.com/in/mzecic/",
  },
  {
    name: "Ella Demarest",
    role: "Co-founder · UI/UX + Engine lead crafting the slow social loop.",
    photo: "/images/photos/ella.jpeg",
    linkedin: "https://www.linkedin.com/in/ella-demarest-b48553189/",
  },
  {
    name: "Professor Kevin Boudreau",
    role: "Research co-founder · Originator of the Twiniverse thesis.",
    photo: "/images/photos/dr-boudreau.jpeg",
    linkedin: "https://www.linkedin.com/in/kevin-b-707b29/",
  },
];

export const timelineSteps = [
  {
    title: "Flagship Proof",
    detail:
      "Launch and validate the Northeastern University pilot with measurable, slow-social outcomes.",
  },
  {
    title: "Local Cluster Replication",
    detail:
      "Expand to BU, MIT, and Harvard using on-campus playbooks and proven engagement metrics.",
  },
  {
    title: "National Expansion",
    detail:
      "Scale nationally through configurable Twiniverse packages—no rebuilds, only configuration.",
  },
];
