import type { ImageAsset, SocialLink } from "./types";

export const site = {
  name: "Siva Sundar",
  firstName: "Siva",
  lastName: "Sundar",
  year: 2026,
  roles: ["iOS App Developer", "Web Developer"],
  title: "Siva Sundar | iOS & SwiftUI Developer in Chennai",
  description:
    "Siva Sundar is an iOS developer in Chennai building fast, polished SwiftUI apps and motion-rich web interfaces with React and Next.js. View projects and contact.",
  location: { city: "Chennai", region: "Tamil Nadu", country: "IN" },
  alumniOf: "Sathyabama Institute of Science and Technology",
  twitterHandle: "@sivaspectrum",
  tagline:
    "I build polished product interfaces with a bias toward motion, structure, and clean front-end execution across web and mobile.",
  bio: [
    "I'm Siva Sundar, an iOS-focused developer who enjoys building clean, structured, and usable interfaces. My strongest interest is in crafting mobile experiences with clear navigation, practical interaction design, and product thinking that translates well across both app and web interfaces.",
    "I place more importance on iPhone application development, especially UI building in SwiftUI, while also using frontend web skills to design, present, and ship complete digital experiences.",
  ],
  cvUrl:
    "https://drive.google.com/file/d/1yU2qlXJwt_IL1XOZVh8M_uM00A78jgsI/view?usp=sharing",
  // Production fallback so a missing env var never leaks localhost into canonical/OG/sitemap URLs.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sivasundar.world").replace(
    /\/$/,
    "",
  ),
  portrait: {
    src: "/images/profile.jpg",
    width: 896,
    height: 940,
    alt: "Portrait of Siva Sundar in a dark jacket against a black background",
  } satisfies ImageAsset,
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/siva-sundar-08",
      handle: "siva-sundar-08",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/siva-sundar-ios",
      handle: "siva-sundar-ios",
    },
    {
      label: "X",
      href: "https://x.com/sivaspectrum",
      handle: "@sivaspectrum",
    },
  ] satisfies SocialLink[],
} as const;

export const sections = [
  { id: "hero", label: "Signal" },
  { id: "about", label: "Operator" },
  { id: "skills", label: "Systems" },
  { id: "experience", label: "Trajectory" },
  { id: "work", label: "Artifacts" },
  { id: "contact", label: "Uplink" },
] as const;

/** Inner pages, linked from the nav and footer so every page is a click from anywhere. */
export const pages = [
  { path: "/projects", label: "Projects" },
  { path: "/services", label: "Services" },
  { path: "/blog", label: "Blog" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
