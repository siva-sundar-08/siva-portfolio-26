import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { posts } from "@/content/posts";
import { site } from "@/content/site";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, personId } from "@/lib/seo";
import { formatDate, readingMinutes } from "@/lib/text";

export const metadata = pageMetadata({
  title: "Blog — SwiftUI, iOS & Web Development",
  description:
    "Practical articles by Siva Sundar on Swift, SwiftUI, SwiftData, iOS app architecture, WebRTC and web development, written from real projects and real code.",
  path: "/blog",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${site.name} — Blog`,
            url: absoluteUrl("/blog"),
            author: { "@id": personId },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: absoluteUrl(`/blog/${post.slug}`),
              datePublished: post.published,
            })),
          },
        ]}
      />
      <main id="main" className="relative px-5 pt-36 pb-28 md:px-10 md:pt-44">
        <div className="mx-auto max-w-5xl">
          <PageHeader
            crumbs={crumbs}
            code="LOG//INDEX"
            title="Blog"
            intro={
              <p>
                Notes from building real apps: Swift and SwiftUI architecture, getting
                money maths right, real-time video on the web, and the decisions behind
                the code.
              </p>
            }
          />
          <ol className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-3 py-8 md:py-10"
                >
                  <p className="hud tabular-nums">
                    <time dateTime={post.published}>{formatDate(post.published)}</time>
                    {" · "}
                    {readingMinutes(post.body)} min read
                  </p>
                  <h2 className="font-display text-2xl leading-tight font-extrabold text-ink [font-stretch:120%] transition-colors group-hover:text-accent md:text-3xl">
                    {post.title}
                  </h2>
                  <p className="max-w-3xl text-ink-dim">{post.description}</p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}
