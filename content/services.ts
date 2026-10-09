import type { Faq, Service } from "./types";

export const services: Service[] = [
  {
    id: "ios",
    title: "Native iOS app development",
    summary:
      "iPhone apps built in Swift and SwiftUI, from first screen to App Store, with an architecture that stays easy to change.",
    points: [
      "SwiftUI interfaces with UIKit where it's still the better tool",
      "SwiftData or Core Data persistence, offline-first when it suits the product",
      "MVVM with @Observable view models and repositories that own the data",
      "Swift Charts dashboards, haptics and purposeful animation",
      "Unit tests for the logic that has to be right, plus TestFlight and App Store releases",
    ],
  },
  {
    id: "swiftui-ui",
    title: "SwiftUI UI & interaction design",
    summary:
      "Turning Figma designs into polished, accessible SwiftUI screens with a reusable design system.",
    points: [
      "Design tokens for colour, type, spacing and motion",
      "Reusable components: cards, rows, sheets, charts, empty states",
      "Dynamic Type, VoiceOver labels and reduced-motion support",
      "Navigation with NavigationStack, tab bars and sheets",
    ],
  },
  {
    id: "cross-platform",
    title: "Flutter apps for iOS and Android",
    summary:
      "When one codebase for both platforms is the right trade-off, I build in Flutter with Firebase.",
    points: [
      "Flutter and Dart with Provider for state management",
      "Firebase Auth, Cloud Firestore and Cloud Messaging",
      "Google Maps, real-time data and push notifications",
    ],
  },
  {
    id: "web",
    title: "Web apps with React and Next.js",
    summary:
      "Fast, search-friendly websites and web apps, from marketing sites to real-time tools.",
    points: [
      "Next.js and React with TypeScript and Tailwind CSS",
      "Motion-rich interfaces with GSAP and Motion",
      "Node.js, Express and Socket.IO backends, or Spring Boot with MySQL",
      "Technical SEO: metadata, structured data, sitemaps and Core Web Vitals",
    ],
  },
];

export const workflow = [
  {
    title: "Understand",
    body: "A short call to understand the problem, the users and what success looks like. You get a written scope with what's in and what's not.",
  },
  {
    title: "Design",
    body: "Screens and flows agreed before code, in Figma or as a clickable SwiftUI prototype.",
  },
  {
    title: "Build",
    body: "Weekly builds on TestFlight or a preview URL, so you see progress every week rather than at the end.",
  },
  {
    title: "Ship & support",
    body: "App Store submission or production deploy, then a support window for fixes and small changes.",
  },
];

export const faqs: Faq[] = [
  {
    q: "Are you available for freelance iOS projects?",
    a: "Yes. I work full-time as a Software Engineer at ADRIG AI Technologies in Chennai and take on a limited number of freelance iOS and web projects alongside. Use the contact form to describe your project and I'll reply with whether it's a good fit.",
  },
  {
    q: "Should I build my app natively in SwiftUI or with Flutter?",
    a: "If your users are mostly on iPhone, or the app depends on native features like widgets, HealthKit or Apple Pay, build natively in SwiftUI. If you need iOS and Android from day one on a tight budget, Flutter is a strong choice. I've built apps in both and will recommend the one that fits your product, not the one I prefer.",
  },
  {
    q: "How long does it take to build an iPhone app?",
    a: "It depends on scope. A focused first version with a handful of screens and local data is much quicker than an app with accounts, a backend, payments or real-time features. After the first call you get a written estimate broken down by feature.",
  },
  {
    q: "Do you work with clients outside Chennai?",
    a: "Yes. I'm based in Chennai, Tamil Nadu, and work with clients anywhere in India and abroad remotely, with weekly demos and shared builds.",
  },
  {
    q: "Can you take over or improve an existing iOS app?",
    a: "Yes. I can review an existing Swift or SwiftUI codebase, fix bugs and crashes, migrate UIKit screens to SwiftUI, or restructure the code so new features are easier to add.",
  },
  {
    q: "Do you also build the website or backend?",
    a: "Yes. I build websites and web apps with React and Next.js, and backends with Node.js or Spring Boot, so a small product can have its app, website and API built by one person.",
  },
];
