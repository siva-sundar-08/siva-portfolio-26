import type { Project } from "./types";

/**
 * Case studies, newest first. Every claim here is taken from the project's own
 * README and source on GitHub, so keep them in sync when a project changes.
 */
export const projects: Project[] = [
  {
    slug: "moneylog",
    name: "MoneyLog",
    title: "MoneyLog — SwiftUI Expense Tracker App",
    tagline: "A private, offline expense tracker built with SwiftUI and SwiftData.",
    description:
      "MoneyLog is a private SwiftUI expense tracker for iPhone, built with SwiftData and Swift Charts. Case study: exact money maths, repositories, MVVM and tests.",
    kind: "iOS app",
    year: "2026",
    platform: "iPhone · iOS 18+",
    role: "Solo: design, architecture, code and tests",
    stack: [
      "Swift",
      "SwiftUI",
      "SwiftData",
      "Swift Charts",
      "Observation",
      "Swift Testing",
    ],
    language: "Swift",
    repo: "https://github.com/siva-sundar-08/MoneyLog",
    overview: [
      "MoneyLog is a personal finance app for iPhone that keeps everything on the device. There is no account to create, no server to talk to and no analytics. You log income, expenses and transfers between accounts, set monthly budgets and savings goals, and see where the money went on a set of Swift Charts.",
      "I built it to practise the parts of iOS development that matter in real products: a data model that can't drift, a clear separation between screens and storage, and tests around the code where being wrong would be expensive.",
    ],
    problem:
      "Most expense trackers either want your bank login or your email address. I wanted one that works fully offline, opens instantly, and whose totals you can trust to the last paisa: no floating-point drift and no stored balance that can quietly go out of sync.",
    features: [
      "Today screen with net worth, this month's income and spending, a daily spend chart and a plain-English insight such as “You're ₹1,200 under pace with 9 days to go”",
      "Activity history with search and filters by type, category and account",
      "Insights: Swift Charts for the selected month, broken down by category",
      "Plan: monthly budgets with a pace marker, and savings goals with the monthly amount needed to hit a target date",
      "Multiple accounts and transfers between them, which never count as income or spending",
      "Recurring transactions, duplicate detection and a recent-merchants list for fast entry",
      "Appearance, currency and an erase-everything option in Settings",
    ],
    architecture: [
      {
        title: "Money is stored as whole paise",
        body: "₹250.75 is saved as the integer 25075 in an Int64, never as a Double. Adding two different currencies stops the app in debug instead of quietly producing nonsense.",
      },
      {
        title: "Balances are calculated, never saved",
        body: "An account's balance is its opening amount plus every transaction since. A pure BalanceCalculator works on lightweight LedgerLine values, so it can be tested without a database.",
      },
      {
        title: "Only repositories touch SwiftData",
        body: "Screens ask a repository for “recent transactions” or “save this”. Validation lives in one place, and tests swap in an in-memory store.",
      },
      {
        title: "One @Observable view model per screen",
        body: "The view describes layout; the view model does the arithmetic. A small AppRouter owns navigation state and a data-version counter that tells every screen to reload after a save.",
      },
      {
        title: "A real design system",
        body: "Every colour, font, spacing value, animation timing and haptic comes from DesignSystem tokens. Change Palette.swift and the whole app follows.",
      },
    ],
    challenges: [
      {
        title: "Comparing half a month with a whole one",
        body: "“You've spent less than last month” is always true on the 5th. The dashboard compares this month to the same elapsed stretch of last month instead, so the comparison is fair on any day.",
      },
      {
        title: "Budgets that tell you something useful",
        body: "A progress bar alone doesn't say whether you're on track. The budget calculator works out where you should be today if you spent evenly, and the gap between that and what you've actually spent drives the insight copy.",
      },
    ],
    outcome:
      "A codebase a new developer can learn from its README alone. The README explains the five decisions that shape the code and follows one action end to end. Unit tests cover money arithmetic, balance maths, budget pace, recurrence rules and repositories, and a UI test catches launch crashes.",
    related: ["swift-money-integer-paise", "swiftui-swiftdata-architecture"],
  },
  {
    slug: "playspace",
    name: "Playspace",
    title: "Playspace — Flutter Game Zone Booking App",
    tagline: "Book indoor turf, VR, trampoline and PC gaming slots in real time.",
    description:
      "Playspace is a Flutter and Firebase booking app for indoor turf, VR, trampoline parks and PC gaming hubs, with live slot availability, maps and notifications.",
    kind: "Cross-platform mobile app",
    year: "2025",
    platform: "iOS & Android · Flutter",
    role: "Mobile developer: UI, state management and Firebase integration",
    stack: [
      "Flutter",
      "Dart",
      "Provider",
      "Firebase Auth",
      "Cloud Firestore",
      "Firebase Cloud Messaging",
      "Google Maps",
    ],
    language: "Dart",
    repo: "https://github.com/siva-sundar-08/playspace-flutter",
    overview: [
      "Playspace is a cross-platform app for discovering and booking recreational venues: indoor turf for football and cricket, PC gaming hubs, VR experiences and trampoline parks. It is built with Flutter and backed by Firebase.",
      "The goal was to replace phone calls and walk-ins with a booking flow where you can see what's actually free, reserve a slot and get reminded before it starts.",
    ],
    problem:
      "Small venues usually manage bookings by phone or WhatsApp. Customers can't see availability, and staff spend time on double bookings and no-shows.",
    features: [
      "Venue discovery by category, with photos, details and an interactive map",
      "Real-time slot availability and pricing on a calendar",
      "Booking confirmation with a QR code, plus modify and cancel options",
      "Booking reminders, updates and offers through push notifications",
      "Profiles with booking history and Firebase sign-in",
    ],
    architecture: [
      {
        title: "Firestore for live availability",
        body: "Slots live in Cloud Firestore, so every open client sees a booking the moment it's made. That's what makes real-time availability work without polling.",
      },
      {
        title: "Provider for app state",
        body: "Provider keeps the signed-in user, the selected venue and the booking in progress in one place, so screens stay simple widgets.",
      },
      {
        title: "Firebase Cloud Messaging for reminders",
        body: "Reminders and booking updates go out as push notifications instead of relying on the user to check the app.",
      },
    ],
    challenges: [
      {
        title: "One codebase, two platforms",
        body: "Maps, notifications and authentication each need platform-specific setup on iOS and Android. Flutter keeps the UI shared while the native configuration stays small and documented.",
      },
    ],
    outcome:
      "A working booking flow from discovery to confirmation on both iOS and Android, and practical experience with Flutter, Firebase and real-time data. That experience fed straight into my Flutter iOS internship.",
    related: [],
  },
  {
    slug: "incogni-tv",
    name: "Incogni.tv",
    title: "Incogni.tv — WebRTC Random Video Chat App",
    tagline: "Anonymous one-to-one video chat with matching, skip and report.",
    description:
      "Incogni.tv is a random video chat app built with React, WebRTC and a Node.js Socket.IO server: anonymous matching, peer-to-peer video, chat, skip and report.",
    kind: "Real-time web app",
    year: "2026",
    platform: "Web · React + Node.js",
    role: "Full-stack: React client, WebRTC and the Socket.IO signalling server",
    stack: ["React", "Vite", "WebRTC", "Socket.IO", "Node.js", "Express"],
    language: "JavaScript",
    repo: "https://github.com/siva-sundar-08/incogni.tv",
    overview: [
      "Incogni.tv pairs two strangers for a one-to-one video chat, in the style of Omegle or OmeTV. You confirm your camera and microphone, join a queue, get matched, and talk peer-to-peer, with text chat, skip and report alongside the video.",
      "The interesting work is everything around the video itself: matching people fairly, setting up a direct connection between two browsers, and handling the many ways that connection can fail.",
    ],
    problem:
      "Browsers can stream video to each other directly, but they can't find each other on their own. They need a signalling server to exchange offers, answers and network candidates. They also need a fallback when a strict NAT or mobile network blocks a direct path.",
    features: [
      "18+ confirmation and a camera and microphone permission check before entering",
      "Anonymous queue with live position and random partner matching",
      "Peer-to-peer video and audio over WebRTC, with text chat capped at 500 characters on the server",
      "Skip to leave a chat instantly, and report to flag a user and be rematched",
      "Live stats for people online, waiting and in active sessions, plus a /health endpoint",
    ],
    architecture: [
      {
        title: "A Socket.IO signalling server",
        body: "An Express and Socket.IO server keeps a waiting queue and a session map. When two people are free it puts them in a room and tells exactly one of them to create the WebRTC offer, which avoids both sides offering at once.",
      },
      {
        title: "Queued ICE candidates",
        body: "Network candidates can arrive before the remote description is set. The client buffers them and flushes the queue once the offer or answer lands, which removes a whole class of “connected but no video” bugs.",
      },
      {
        title: "STUN by default, TURN when configured",
        body: "Five public STUN servers handle most networks. A TURN server can be added through environment variables for users behind strict NATs, where a direct connection is impossible.",
      },
      {
        title: "Split hosting",
        body: "The static React client deploys to Vercel. The long-running WebSocket server runs on Render, because serverless functions can't hold WebSocket connections open.",
      },
    ],
    challenges: [
      {
        title: "Matched, but no video",
        body: "On some mobile networks both sides connect to the signalling server but the media never flows. STUN isn't enough there, so the app supports a TURN relay, and the README documents why it's needed for a real launch.",
      },
      {
        title: "Safety for a public launch",
        body: "Reports are stored in memory today. The README lists what a real launch would need: persistent moderation storage, rate limits, bans and automated content detection.",
      },
    ],
    outcome:
      "A working real-time product that taught me WebRTC from the ground up: signalling, ICE, STUN/TURN and connection lifecycles, plus how to deploy a stateful WebSocket server.",
    related: ["webrtc-socketio-video-chat"],
  },
  {
    slug: "student-management-system",
    name: "Student Management System",
    title: "Student Management System — Spring Boot",
    tagline: "A full-stack CRUD system for students, courses and departments.",
    description:
      "A full-stack student management system: React and Bootstrap frontend, Spring Boot REST API and MySQL, with search, filters and course and department management.",
    kind: "Full-stack web app",
    year: "2026",
    platform: "Web · React + Spring Boot",
    role: "Full-stack: REST API, database schema and React frontend",
    stack: [
      "React",
      "Bootstrap 5",
      "Axios",
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "MySQL",
    ],
    language: "Java",
    repo: "https://github.com/siva-sundar-08/student-management-system",
    overview: [
      "A classic three-tier application done carefully: a React frontend talks to a Spring Boot REST API, which stores students, courses and departments in MySQL.",
      "It's the kind of internal tool every college and training centre needs, and a good test of clean backend layering.",
    ],
    problem:
      "Student records kept in spreadsheets drift out of sync: the same student in two courses, departments renamed in one place but not another. A small relational app with validation fixes that.",
    features: [
      "Student list with search and filters",
      "Add and edit forms with validation",
      "Course and department management (full CRUD)",
      "Each student assigned to one course and one department",
    ],
    architecture: [
      {
        title: "Layered Spring Boot API",
        body: "Controllers, services, repositories, entities and DTOs are kept separate, with a global exception handler that turns missing records into clean 404 responses.",
      },
      {
        title: "Relational schema",
        body: "A MySQL schema with foreign keys from students to courses and departments, shipped as schema.sql so the database can be recreated in one step.",
      },
      {
        title: "React + Axios frontend",
        body: "Pages for students, courses and departments call the API through a single Axios service, styled with Bootstrap 5.",
      },
    ],
    challenges: [
      {
        title: "Keeping requests and entities apart",
        body: "Request and response DTOs stop the API from leaking database entities and make validation explicit.",
      },
    ],
    outcome:
      "A complete, documented full-stack project covering REST design, JPA and relational modelling in Java, alongside my mobile work.",
    related: [],
  },
  {
    slug: "bill-ocr",
    name: "Bill OCR",
    title: "Bill OCR — AI Invoice Extraction in Next.js",
    tagline: "Upload a bill and get structured fields back, powered by LlamaCloud.",
    description:
      "A Next.js and TypeScript prototype that extracts structured data from bills and invoices (PDF, JPG, PNG, WEBP) using LlamaCloud OCR and schema-based extraction.",
    kind: "AI prototype",
    year: "2026",
    platform: "Web · Next.js",
    role: "Solo: API route, OCR provider layer and dashboard",
    stack: ["Next.js", "TypeScript", "LlamaCloud", "Route Handlers"],
    language: "TypeScript",
    repo: "https://github.com/siva-sundar-08/sample-ocr",
    overview: [
      "Bill OCR takes an uploaded bill or invoice (PDF, JPG, PNG, WEBP or plain text), runs it through LlamaCloud for OCR, and extracts structured fields that appear on a dashboard. It also saves the original file, the extracted JSON and the raw text.",
    ],
    problem:
      "Typing invoice details into a system by hand is slow and error-prone. Modern OCR plus LLM-based extraction can turn a photo of a bill into clean, structured data.",
    features: [
      "Upload PDF, image or text bills from a dashboard",
      "OCR plus schema-based field extraction",
      "Missing fields always come back as null, never undefined or absent",
      "Original file, JSON and TXT saved together only after OCR succeeds",
      "Tunable parse and extraction tiers to trade cost against accuracy",
    ],
    architecture: [
      {
        title: "A provider interface",
        body: "OCR sits behind an OCRProvider interface, with LlamaCloud as one implementation, so another provider can be swapped in without touching the API route or the UI.",
      },
      {
        title: "Server-only API key",
        body: "The upload goes to a Next.js Route Handler. The LlamaCloud key stays on the server and is never sent to the browser.",
      },
    ],
    challenges: [
      {
        title: "Messy real-world bills",
        body: "Every vendor lays out invoices differently. A single normalising step guarantees a predictable shape, whatever the model returns.",
      },
    ],
    outcome:
      "A focused prototype of AI document extraction, with deliberate scope: no database, auth or background jobs, documented in the README as intentional.",
    related: [],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
