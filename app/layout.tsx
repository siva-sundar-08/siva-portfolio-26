import type { Metadata, Viewport } from "next";
import { Anybody, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav/Nav";
import { modeInitScript } from "@/components/providers/ModeProvider";
import { Providers } from "@/components/providers/Providers";
import { Cursor } from "@/components/ui/Cursor";
import { site } from "@/content/site";
import "@/styles/globals.css";

const display = Anybody({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-anybody",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitterHandle,
    creator: site.twitterHandle,
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#030309",
  colorScheme: "dark",
};

const personId = `${site.url}/#person`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      url: site.url,
      image: new URL(site.portrait.src, site.url).toString(),
      jobTitle: "Software Engineer — iOS & Web",
      description: site.description,
      sameAs: site.socials.map((s) => s.href),
      worksFor: { "@type": "Organization", name: "ADRIG AI Technologies Pvt. Ltd." },
      alumniOf: { "@type": "CollegeOrUniversity", name: site.alumniOf },
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        addressCountry: site.location.country,
      },
      knowsAbout: [
        "iOS development",
        "Swift",
        "SwiftUI",
        "SwiftData",
        "UIKit",
        "React",
        "Next.js",
        "TypeScript",
        "Flutter",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": personId },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeInitScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Providers>
          <Cursor />
          <Nav />
          {children}
        </Providers>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
