import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/content/Prose";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPost, posts } from "@/content/posts";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, personId } from "@/lib/seo";
import { formatDate, readingMinutes } from "@/lib/text";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
      tags: post.keywords,
    }),
    // The article titles are already descriptive; skip the " — Siva Sundar" suffix.
    title: { absolute: post.title },
  };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path },
  ];
  const project = post.project ? getProject(post.project) : undefined;
  const toc = post.body.filter((block) => block.type === "h2");
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.published,
            dateModified: post.updated ?? post.published,
            url: absoluteUrl(path),
            mainEntityOfPage: absoluteUrl(path),
            image: absoluteUrl("/opengraph-image.png"),
            keywords: post.keywords.join(", "),
            inLanguage: "en-IN",
            author: {
              "@id": personId,
              "@type": "Person",
              name: site.name,
              url: site.url,
            },
            publisher: { "@id": personId },
          },
        ]}
      />
      <main id="main" className="relative px-5 pt-36 pb-28 md:px-10 md:pt-44">
        <article className="mx-auto max-w-6xl">
          <PageHeader
            crumbs={crumbs}
            code="LOG//ENTRY"
            title={post.title}
            compact
            intro={<p>{post.description}</p>}
          >
            <p className="hud tabular-nums">
              By{" "}
              <Link href="/" className="text-ink transition-colors hover:text-accent">
                {site.name}
              </Link>
              {" · "}
              <time dateTime={post.published}>{formatDate(post.published)}</time>
              {" · "}
              {readingMinutes(post.body)} min read
            </p>
          </PageHeader>

          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-20">
            <div className="max-w-3xl min-w-0">
              <Prose blocks={post.body} />
            </div>

            <aside className="order-first flex flex-col gap-8 lg:sticky lg:top-32 lg:order-none lg:self-start">
              {toc.length > 0 ? (
                <nav aria-label="On this page" className="flex flex-col gap-4">
                  <h2 className="hud">On this page</h2>
                  <ol className="flex flex-col gap-2.5 border-l border-white/10 pl-4">
                    {toc.map((heading) =>
                      heading.type === "h2" ? (
                        <li key={heading.id}>
                          <a
                            href={`#${heading.id}`}
                            className="text-sm text-ink-dim transition-colors hover:text-accent"
                          >
                            {heading.text.replace(/`/g, "")}
                          </a>
                        </li>
                      ) : null,
                    )}
                  </ol>
                </nav>
              ) : null}
              {project ? (
                <div className="flex flex-col gap-3">
                  <h2 className="hud">From the project</h2>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm text-ink transition-colors hover:text-accent"
                  >
                    {project.name} case study →
                  </Link>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-ink-dim transition-colors hover:text-accent"
                  >
                    Source on GitHub ↗
                  </a>
                </div>
              ) : null}
            </aside>
          </div>

          <footer className="mt-24 flex flex-col gap-8 border-t border-white/[0.06] pt-10">
            <div className="glass flex flex-col gap-4 p-7 md:flex-row md:items-center md:justify-between md:p-9">
              <div>
                <p className="hud text-accent">Written by {site.name}</p>
                <p className="mt-2 max-w-xl text-ink-dim">
                  iOS and web developer in Chennai, building with Swift, SwiftUI, React
                  and Next.js. Software Engineer at ADRIG AI Technologies.
                </p>
              </div>
              <Link
                href="/#contact"
                className="glass shrink-0 rounded-full px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:text-accent"
              >
                Get in touch
              </Link>
            </div>
            {others.length > 0 ? (
              <div className="flex flex-col gap-4">
                <h2 className="hud">Keep reading</h2>
                <ul className="grid gap-4 md:grid-cols-2">
                  {others.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/blog/${other.slug}`}
                        className="font-display text-lg leading-snug font-extrabold text-ink [font-stretch:115%] transition-colors hover:text-accent"
                      >
                        {other.title} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
