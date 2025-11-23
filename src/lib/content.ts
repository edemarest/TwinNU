export type SectionId =
  | "hero"
  | "problem"
  | "solution"
  | "team"
  | "plan"
  | "contact";

export const navItems: { id: SectionId; label: string }[] = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Vision" },
  { id: "team", label: "Team" },
  { id: "plan", label: "Plan" },
  { id: "contact", label: "Contact" },
];

export const heroContent = {
  headline: "The Future of Meaningful Connections is Slow Social.",
  subhead:
    "Your digital twin is building the network you deserve—without noisy feeds or forced outreach.",
  primaryCta: "Join the Pilot",
  secondaryCta: "Request a Demo",
  comingSoonNote: "Currently in Closed Pilot at Northeastern University.",
};

export const problemPoints = [
  "The “Missing Middle” of ties—where meaningful opportunities live but rarely form.",
  "Connection fatigue from endless feeds, cold outreach, and inbox overload.",
  "High effort, low reward from traditional networking events or random coffee chats.",
  "Teams need verified, low-risk introductions inside trusted communities.",
];

export const solutions = [
  {
    title: "AI Digital Twin",
    description:
      "Your agent orchestrates weekly, low-pressure, context-aware encounters in the background.",
  },
  {
    title: "Closed Twiniverses",
    description:
      "Verified, private networks aligned with your university or company keep every interaction trusted.",
  },
  {
    title: "Rapport Visualization",
    description:
      "Watch relationships evolve without spreadsheets—your Circle shows when to re-engage.",
  },
];

export const teamMembers = [
  {
    name: "Matej Zecic",
    role: "Co-founder · Full-stack mobile engineer (Northeastern MS).",
    photo: "/images/photos/matej.jpeg",
  },
  {
    name: "Ella Demarest",
    role: "Co-founder · UI/UX + Engine lead crafting the slow social loop.",
    photo: "/images/photos/ella.jpeg",
  },
  {
    name: "Professor Kevin Boudreau",
    role: "Research co-founder · Originator of the Twiniverse thesis.",
    photo: "/images/photos/dr-boudreau.jpeg",
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

export const institutionalPlaceholder = {
  heading: "Twiniverse Enterprise Package",
  copy: "Enterprise Pricing: Currently in pilot negotiation.",
  cta: "Contact for Institutional License",
};

export const tractionCopy =
  "Generating early insights across the Northeastern community. Metrics forthcoming.";
