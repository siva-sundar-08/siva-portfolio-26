import type { Metadata } from "next";
import { site } from "@/content/site";

export const personId = `${site.url}/#person`;

const ogImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.roles.join(" & ")}`,
};

export function absoluteUrl(path: string): string {
  return path === "/" ? site.url : `${site.url}${path}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};

/**
 * Metadata for an inner page. Next merges `openGraph` shallowly, so a page that sets
 * any Open Graph field has to restate the shared ones (site name, locale) here.
 * That includes the image: once a page sets `openGraph`, the root
 * `opengraph-image.png` no longer carries through on its own.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      title,
      description,
      images: [ogImage],
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors: [site.url], tags }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: site.twitterHandle,
      creator: site.twitterHandle,
      title,
      description,
      images: [ogImage],
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
