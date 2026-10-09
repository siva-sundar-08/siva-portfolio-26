import type { Post } from "./types";

/**
 * Articles, newest first. Code samples come from the linked projects' public
 * repositories, so they compile in context rather than being pseudo-code.
 */
export const posts: Post[] = [
  {
    slug: "swift-money-integer-paise",
    title: "Why I Store Money as Integers in Swift, Not Double",
    description:
      "Double can't hold 0.1 exactly, so money totals drift. How MoneyLog stores rupees as whole paise in an Int64, converts from Decimal safely and blocks mixed currencies.",
    published: "2026-10-10",
    keywords: [
      "Swift money Double",
      "currency in Swift",
      "Int64 minor units",
      "SwiftData money",
      "floating point rounding",
    ],
    project: "moneylog",
    body: [
      {
        type: "p",
        text: "When I started MoneyLog, my SwiftUI expense tracker, the first decision I made had nothing to do with UI. It was how to store a number like ₹250.75. Getting that wrong doesn't crash the app. It does something worse: the totals slowly stop agreeing with each other, and nobody notices until a user does.",
      },
      {
        type: "p",
        text: "This post explains the problem with `Double`, the `Money` type I use instead, and the small rules around it that keep every total in the app exact.",
      },
      { type: "h2", id: "the-problem", text: "The problem: Double can't hold 0.1" },
      {
        type: "p",
        text: "`Double` is a binary floating-point type. It's great for physics and graphics, but it can only represent fractions whose denominator is a power of two exactly. One tenth isn't one of them, so `0.1` is stored as the nearest binary value, which is very slightly off.",
      },
      {
        type: "code",
        lang: "swift",
        code: `let total = 0.1 + 0.2
print(total == 0.3)        // false
print(total)               // 0.30000000000000004`,
      },
      {
        type: "p",
        text: "One error like that is invisible once you format to two decimal places. The trouble is that money apps add things up all day: every expense in a month, every transaction on an account, every category in a chart. Tiny errors accumulate, and different screens that sum the same data in a different order can round to different answers. A budget screen that says ₹4,999.99 while the dashboard says ₹5,000.00 destroys trust in the whole app.",
      },
      { type: "h2", id: "minor-units", text: "The fix: store whole paise in an Int64" },
      {
        type: "p",
        text: "Every currency has a smallest unit. For the rupee it's the paisa, one hundredth of a rupee. If you store amounts as a whole number of those units, there's nothing to round: ₹250.75 becomes the integer `25075`, and integer addition is exact.",
      },
      {
        type: "code",
        lang: "swift",
        code: `struct Money: Hashable, Codable, Sendable {
    var minorUnits: Int64
    var currency: CurrencyCode

    init(minorUnits: Int64, currency: CurrencyCode = .default) {
        self.minorUnits = minorUnits
        self.currency = currency
    }

    var decimalValue: Decimal {
        Decimal(minorUnits) / Decimal(currency.minorUnitScale)
    }
}`,
      },
      {
        type: "p",
        text: "The currency travels with the number, and `minorUnitScale` says how many minor units make one major unit (100 for INR). An `Int64` holds about 9.2 quintillion paise, far more than any personal finance app will ever need.",
      },
      {
        type: "note",
        text: "Why not `Decimal`? Swift's `Decimal` is base-10, so it represents 0.1 exactly too. I still store an `Int64` because it's simpler to persist, cheap to sum, and easy to compare inside a SwiftData `#Predicate`. MoneyLog's duplicate check filters on `amountMinor == amount` directly in the store.",
      },
      { type: "h2", id: "converting-input", text: "Converting user input safely" },
      {
        type: "p",
        text: "People type decimals, so somewhere you have to turn `250.75` into `25075`. That conversion is the one place rounding is allowed to happen, and it should happen once, deliberately:",
      },
      {
        type: "code",
        lang: "swift",
        code: `init?(decimal: Decimal, currency: CurrencyCode = .default) {
    guard decimal.isFinite else { return nil }
    var scaled = decimal * Decimal(currency.minorUnitScale)
    var rounded = Decimal()
    NSDecimalRound(&rounded, &scaled, 0, .plain)
    guard rounded <= Decimal(Int64.max),
          rounded >= Decimal(Int64.min + 1) else { return nil }
    self.init(minorUnits: NSDecimalNumber(decimal: rounded).int64Value,
              currency: currency)
}`,
      },
      { type: "p", text: "Three details matter here:" },
      {
        type: "ul",
        items: [
          "The input is a `Decimal`, not a `Double`, so the value the user typed isn't already wrong before we start.",
          "Rounding to the nearest paisa uses `.plain` rounding (half away from zero), the rule people expect on a receipt.",
          "The initialiser is failable. If a number is too large to fit, it returns `nil` instead of silently wrapping around to a nonsense value. The range stops at `Int64.min + 1` so that negating any stored amount is always safe.",
        ],
      },
      {
        type: "p",
        text: "In the add-transaction sheet, the amount entry builds up digits directly: rupees first, then paise only after you tap the decimal point. So the common path never goes through floating point at all.",
      },
      {
        type: "h2",
        id: "mixed-currencies",
        text: "Making mixed currencies impossible to ignore",
      },
      {
        type: "p",
        text: "Adding ₹100 to $100 has no correct answer without an exchange rate. A lot of code quietly adds the raw numbers anyway. In MoneyLog, arithmetic between different currencies is treated as a programming error:",
      },
      {
        type: "code",
        lang: "swift",
        code: `extension Money {
    static func + (lhs: Money, rhs: Money) -> Money {
        precondition(lhs.currency == rhs.currency,
            "Cannot add \\(lhs.currency.rawValue) to \\(rhs.currency.rawValue)")
        return Money(minorUnits: lhs.minorUnits + rhs.minorUnits,
                     currency: lhs.currency)
    }
}`,
      },
      {
        type: "p",
        text: "`precondition` stops the app in debug builds, at the exact line where the mistake happens, instead of letting a wrong total reach the screen. The same check guards subtraction and comparison, so sorting a list of mixed-currency amounts fails loudly too.",
      },
      { type: "h2", id: "formatting", text: "Formatting is a separate job" },
      {
        type: "p",
        text: "Storage and display are different concerns. `Money` knows its value. A separate `MoneyFormatter` turns it into text for the user's region: ₹1,50,000 in India (grouped in lakhs) and $150,000 in the US. It shows ₹250 for a round number and ₹250.75 when there are paise. Keeping formatting out of the model means the maths never depends on a locale setting.",
      },
      {
        type: "h2",
        id: "testing",
        text: "Testing the parts where being wrong is expensive",
      },
      {
        type: "p",
        text: "Money arithmetic and formatting have their own tests, written with Swift Testing. They're cheap to write because `Money` is a plain value type with no database or UI attached. The cases MoneyLog checks:",
      },
      {
        type: "ul",
        items: [
          "A decimal like `1234.56` round-trips to exactly `123456` minor units and back",
          "Rounding at half a paisa goes the way people expect",
          "Zero-decimal currencies such as the Japanese yen, where one unit is the minor unit",
          "Addition, subtraction, comparison, negative results and magnitude",
          "Indian grouping (₹1,50,000), no “.00” on whole amounts, and a plus sign only for positive values",
        ],
      },
      { type: "h2", id: "takeaways", text: "Takeaways" },
      {
        type: "ol",
        items: [
          "Never store money in `Double` or `Float`.",
          "Store an integer count of the currency's smallest unit, together with the currency.",
          "Round exactly once, when converting user input, and make that conversion fail instead of overflowing.",
          "Treat cross-currency arithmetic as a bug, not something to guess at.",
          "Keep formatting separate from storage, and test the arithmetic directly.",
        ],
      },
      {
        type: "p",
        text: "None of this is visible in the UI, and that's the point. When the numbers are right, users never think about them. The full source, including the tests, is in the MoneyLog repository on GitHub.",
      },
    ],
  },
  {
    slug: "swiftui-swiftdata-architecture",
    title: "SwiftUI + SwiftData Architecture: Repositories, MVVM and Tests",
    description:
      "A practical SwiftUI and SwiftData architecture from a real app: repositories that own the database, @Observable view models, computed balances and fast tests.",
    published: "2026-10-10",
    keywords: [
      "SwiftUI architecture",
      "SwiftData repository pattern",
      "SwiftUI MVVM Observable",
      "SwiftData testing",
      "iOS app architecture",
    ],
    project: "moneylog",
    body: [
      {
        type: "p",
        text: "SwiftData makes it easy to put `@Query` straight into a SwiftUI view and start shipping. For a small app that's fine. But once screens start computing balances, validating input and sharing data, logic spreads across views and becomes hard to test. These are the five decisions I made in MoneyLog, my offline expense tracker, to keep it simple to change.",
      },
      { type: "h2", id: "structure", text: "The folder structure" },
      {
        type: "code",
        lang: "text",
        code: `MoneyLog/
├── App/            Launch: open the database, seed, top-level view
├── Core/
│   ├── Models/        Transactions, accounts, categories, budgets, goals
│   ├── Money/         Amounts and currency formatting
│   ├── Persistence/   Database, sample data, erase-and-reset
│   ├── Repositories/  The only code that reads and writes the database
│   └── Services/      Pure calculations: balances, budget pace, recurrence
├── DesignSystem/   Tokens (colour, type, spacing, motion) and components
└── Features/       One folder per screen: Today, Activity, Insights, Plan…`,
      },
      {
        type: "p",
        text: "The rule of thumb: `Core` doesn't know SwiftUI exists, `Features` doesn't know SwiftData exists, and `DesignSystem` knows neither.",
      },
      { type: "h2", id: "repositories", text: "1. Only repositories touch SwiftData" },
      {
        type: "p",
        text: "Screens never call `ModelContext` directly. They ask a repository for what they need. Each repository is a protocol plus a SwiftData implementation:",
      },
      {
        type: "code",
        lang: "swift",
        code: `@MainActor
protocol TransactionRepository: AnyObject {
    func transactions(matching query: TransactionQuery) throws -> [TransactionRecord]
    func ledgerLines(in interval: DateInterval?) throws -> [LedgerLine]
    @discardableResult func create(_ draft: TransactionDraft) throws -> TransactionRecord
    func update(_ transaction: TransactionRecord, with draft: TransactionDraft) throws
    func delete(_ transaction: TransactionRecord) throws
}`,
      },
      {
        type: "p",
        text: "This gives two concrete benefits. First, the rules about valid data live in one place: `create` validates the draft, checks that the account exists and that the category matches the transaction type, then saves or rolls back. Second, tests can run the real repository against an in-memory store, or swap in a fake.",
      },
      {
        type: "p",
        text: "Queries are plain values too. A `TransactionQuery` describes a date range, types, categories, accounts and search text. The repository decides which filters the store can do with a `#Predicate` and which are easier in Swift after the fetch.",
      },
      {
        type: "h2",
        id: "computed-balances",
        text: "2. Balances are calculated, never stored",
      },
      {
        type: "p",
        text: "There's no `balance` column anywhere in MoneyLog. An account's balance is its opening amount plus every transaction since. A stored balance is a number that can go wrong silently: a delete that forgets to update it, or a migration that misses it. A calculated one can't.",
      },
      {
        type: "p",
        text: "To keep that maths testable, repositories hand calculators a stripped-down `LedgerLine` value rather than the SwiftData model:",
      },
      {
        type: "code",
        lang: "swift",
        code: `struct LedgerLine: Equatable, Sendable {
    let amountMinor: Int64
    let type: TransactionType
    let date: Date
    let accountID: UUID?
    let destinationAccountID: UUID?
    let categoryID: UUID?
}

enum BalanceCalculator {
    static func cashFlow(of lines: [LedgerLine]) -> CashFlowSummary {
        lines.reduce(into: CashFlowSummary()) { summary, line in
            switch line.type {
            case .income:   summary.incomeMinor += line.amountMinor
            case .expense:  summary.expenseMinor += line.amountMinor
            case .transfer: break // moving money isn't earning or spending it
            }
        }
    }
}`,
      },
      {
        type: "p",
        text: "`BalanceCalculator` is a caseless `enum` of pure functions: values in, values out. Testing it needs no database, no simulator and no async setup. Recalculating on every load sounds wasteful, but with a local store and a personal-sized dataset it takes a fraction of a millisecond.",
      },
      { type: "h2", id: "view-models", text: "3. One @Observable view model per screen" },
      {
        type: "p",
        text: "Each screen has a view model that asks repositories for data, does the arithmetic and exposes plain values. With the Observation framework that's just a class marked `@Observable`. No `@Published` boilerplate:",
      },
      {
        type: "code",
        lang: "swift",
        code: `@MainActor
@Observable
final class TodayViewModel {
    private(set) var snapshot = DashboardSnapshot()
    private(set) var isLoaded = false
    var errorMessage: String?

    func load(now: Date = .now) {
        do {
            let month = periods.month(containing: now)
            let lines = try container.transactions.ledgerLines(in: month)
            let cashFlow = BalanceCalculator.cashFlow(of: lines)
            // …build the snapshot from plain values
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}`,
      },
      {
        type: "p",
        text: "`load(now:)` takes the current date as a parameter, which makes date-dependent logic testable. One example: the dashboard compares this month's spending with the same elapsed stretch of last month, because comparing a half-finished month to a whole one would always look good. The view itself reads like a layout file.",
      },
      { type: "h2", id: "router", text: "4. A router and a data-version counter" },
      {
        type: "p",
        text: "Screens shouldn't need to talk to each other. A small `@Observable` `AppRouter` owns the selected tab and which sheets are open, so anything can say “open the add sheet”. It also holds a counter:",
      },
      {
        type: "code",
        lang: "swift",
        code: `@MainActor
@Observable
final class AppRouter {
    var selectedTab: AppTab = .today
    var isPresentingAdd = false
    private(set) var dataVersion = 0

    func dataDidChange() { dataVersion += 1 }
}`,
      },
      {
        type: "p",
        text: "After any save or delete, the counter goes up and every screen watching it reloads. It's deliberately blunt: every screen reloads even if the change didn't affect it. But with a local database that costs almost nothing, and it's impossible to forget to refresh a screen.",
      },
      {
        type: "h2",
        id: "design-system",
        text: "5. Every visual value comes from the design system",
      },
      {
        type: "p",
        text: "Colours, fonts, spacing, corner radii, animation timings and haptics all live in `DesignSystem/Tokens`. Views never invent a colour or a padding value. Restyling the app means editing `Palette.swift`, not hunting through forty views.",
      },
      { type: "h2", id: "tests", text: "How this pays off in tests" },
      {
        type: "ul",
        items: [
          "Calculators (balances, budget pace, recurrence) are tested as pure functions.",
          "Repositories are tested against a throwaway in-memory SwiftData container, so tests never touch real data.",
          "View models can be driven with a fixed `now` date.",
          "One UI test launches the app and checks the first screen appears, which is enough to catch a launch crash.",
        ],
      },
      { type: "h2", id: "when-not-to", text: "When this is overkill" },
      {
        type: "p",
        text: "For a two-screen app, `@Query` in the view is the right call. The structure above earns its keep once you have rules about valid data, numbers that must be right, and more than one screen showing the same data in different ways. That point arrives sooner than you'd expect in almost any real product.",
      },
    ],
  },
  {
    slug: "webrtc-socketio-video-chat",
    title: "Building a Random Video Chat App with WebRTC and Socket.IO",
    description:
      "How I built Incogni.tv, an Omegle-style video chat: a Socket.IO matching server, WebRTC offers and answers, queued ICE candidates, STUN vs TURN, and deployment.",
    published: "2026-10-10",
    keywords: [
      "WebRTC Socket.IO",
      "random video chat app",
      "WebRTC signaling server",
      "STUN TURN server",
      "React WebRTC",
    ],
    project: "incogni-tv",
    body: [
      {
        type: "p",
        text: "Incogni.tv pairs two strangers for a one-to-one video chat. The video itself is the easy part: browsers can stream camera and microphone to each other directly with WebRTC. The hard parts are helping two browsers find each other, and coping when the network won't let them connect directly. Here's how the pieces fit together.",
      },
      { type: "h2", id: "architecture", text: "The architecture in one paragraph" },
      {
        type: "p",
        text: "A React client (built with Vite) captures media and runs the WebRTC connection. A Node.js server with Express and Socket.IO does matchmaking and signalling: it queues people, pairs them, and relays connection messages between the two browsers. Once connected, video and audio flow peer-to-peer and never touch the server.",
      },
      { type: "h2", id: "matching", text: "Matching people with a queue" },
      {
        type: "p",
        text: "The server keeps a waiting queue of socket IDs and a map of active sessions. Whenever two people are waiting, it pairs them, puts them in a room and tells each one who their partner is:",
      },
      {
        type: "code",
        lang: "js",
        code: `function tryMatch() {
  while (waitingQueue.length >= 2) {
    const firstId = waitingQueue.shift();
    const secondId = waitingQueue.shift();
    // …skip sockets that disconnected while waiting

    const roomId = \`room:\${firstId}:\${secondId}\`;
    sessions.set(firstId, { partnerId: secondId, roomId });
    sessions.set(secondId, { partnerId: firstId, roomId });

    firstSocket.emit("matched", { roomId, partnerId: secondId, createOffer: true });
    secondSocket.emit("matched", { roomId, partnerId: firstId, createOffer: false });
  }
}`,
      },
      {
        type: "p",
        text: "Note the `createOffer` flag. In WebRTC one side creates an offer and the other answers. If both sides offer at once you get “glare”, and the connection stalls. Letting the server decide removes the race entirely.",
      },
      {
        type: "h2",
        id: "signalling",
        text: "Signalling: offer, answer and ICE candidates",
      },
      {
        type: "p",
        text: "WebRTC doesn't specify how peers exchange setup messages; that's your job. Incogni.tv uses the existing Socket.IO connection. The server simply forwards `offer`, `answer` and `ice_candidate` events to the caller's partner:",
      },
      {
        type: "ol",
        items: [
          "The offerer calls `createOffer()`, sets it as its local description, and sends it.",
          "The answerer sets it as the remote description, creates an answer, and sends that back.",
          "Both sides trickle ICE candidates (possible network paths) to each other as they're discovered.",
          "The browsers test the candidates and pick a working path. Media starts flowing.",
        ],
      },
      {
        type: "h2",
        id: "ice-race",
        text: "The bug everyone hits: candidates arriving too early",
      },
      {
        type: "p",
        text: "ICE candidates can arrive before the remote description has been set, and `addIceCandidate` fails if there's no remote description yet. The symptom is maddening: both users are “connected” but there's no video. The fix is to buffer early candidates and flush them once the description lands:",
      },
      {
        type: "code",
        lang: "js",
        code: `async addIceCandidate(candidate) {
  if (!candidate || !this.pc) return;

  if (!this.pc.remoteDescription) {
    this.pendingCandidates.push(candidate);
    return;
  }
  await this.pc.addIceCandidate(new RTCIceCandidate(candidate));
}

async handleAnswer(answer) {
  await this.pc.setRemoteDescription(new RTCSessionDescription(answer));
  await this.flushCandidates();
}`,
      },
      {
        type: "h2",
        id: "stun-turn",
        text: "STUN vs TURN, and why you need TURN in production",
      },
      {
        type: "p",
        text: "Most devices sit behind a router doing NAT, so they don't know their own public address. A STUN server tells them. Incogni.tv uses Google's public STUN servers by default, and that's enough on many home networks.",
      },
      {
        type: "p",
        text: "But on strict NATs, corporate firewalls and a lot of mobile networks, a direct path simply doesn't exist. The two users match, signalling succeeds, and media never arrives. The only fix is a TURN server, which relays the media. It costs bandwidth, so the client adds one only when it's configured:",
      },
      {
        type: "code",
        lang: "js",
        code: `const servers = [{ urls: "stun:stun.l.google.com:19302" } /* + 4 more */];

if (import.meta.env.VITE_TURN_URL) {
  servers.push({
    urls: import.meta.env.VITE_TURN_URL,
    username: import.meta.env.VITE_TURN_USERNAME,
    credential: import.meta.env.VITE_TURN_CREDENTIAL,
  });
}`,
      },
      {
        type: "note",
        text: "If you're building anything like this for real users, budget for TURN from day one. Without it, a meaningful share of mobile users will match and then see a black screen.",
      },
      { type: "h2", id: "lifecycle", text: "Skip, disconnect and clean-up" },
      {
        type: "p",
        text: "Real users skip, close tabs and lose signal mid-call. The server ends a session from either side, removes both entries from the session map, and tells the remaining partner `partner_disconnected` so their UI can rematch. On the client, `close()` detaches every event handler before closing the peer connection, so a stale connection can't fire callbacks into the next chat.",
      },
      {
        type: "h2",
        id: "deployment",
        text: "Deployment: static client, stateful server",
      },
      {
        type: "p",
        text: "The React client is static and deploys to Vercel. The Socket.IO server can't: serverless functions don't keep long-lived WebSocket connections open. It runs on Render as a normal web service with a `/health` endpoint. CORS is locked to the client's domain through an environment variable.",
      },
      { type: "h2", id: "safety", text: "What a public launch would still need" },
      {
        type: "p",
        text: "Today the app has an 18+ confirmation, a camera and microphone gate, skip, report (stored in memory) and a 500-character cap on chat messages. A real launch needs persistent moderation storage, rate limiting, bans and automated detection of abuse. Random video chat is a safety problem first and a technical problem second.",
      },
      { type: "h2", id: "takeaways", text: "Takeaways" },
      {
        type: "ul",
        items: [
          "Let the server decide who sends the offer, to avoid glare.",
          "Buffer ICE candidates until the remote description is set.",
          "STUN works in testing; TURN is what makes it work for everyone.",
          "Host the signalling server somewhere that supports long-lived connections.",
          "Design for disconnects. They're the normal case, not the edge case.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
