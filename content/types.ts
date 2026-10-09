export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  summary: string;
  skills: string[];
};

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  type: "Full-time" | "Internship";
  period: string;
  location: string;
  mode: "On-site" | "Hybrid" | "Remote";
  note: string;
  href?: string;
  current?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  /** <title>, kept under ~45 characters so the " — Siva Sundar" suffix fits. */
  title: string;
  tagline: string;
  /** Meta description, 150–160 characters. */
  description: string;
  kind: string;
  year: string;
  platform: string;
  role: string;
  stack: string[];
  language: string;
  repo: string;
  live?: string;
  overview: string[];
  problem: string;
  features: string[];
  architecture: { title: string; body: string }[];
  challenges: { title: string; body: string }[];
  outcome: string;
  /** Slugs of blog posts that go deeper on this project. */
  related: string[];
};

/** A block of article content. Inline `code` in text is written with backticks. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "note"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date */
  published: string;
  updated?: string;
  keywords: string[];
  project?: string;
  body: Block[];
};

export type Service = {
  id: string;
  title: string;
  summary: string;
  points: string[];
};

export type Faq = { q: string; a: string };
