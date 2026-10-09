import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { posts } from "@/content/posts";
import { getProject, projects } from "@/content/projects";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, personId } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-display text-2xl leading-tight font-extrabold text-ink [font-stretch:120%] md:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const path = `/projects/${project.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.name, path },
  ];
  const related = posts.filter((post) => project.related.includes(post.slug));
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: project.name,
            headline: project.title,
            description: project.description,
            url: absoluteUrl(path),
            codeRepository: project.repo,
            programmingLanguage: project.language,
            keywords: project.stack.join(", "),
            dateCreated: project.year,
            author: { "@id": personId },
            creator: { "@id": personId },
          },
        ]}
      />
      <main id="main" className="relative px-5 pt-36 pb-28 md:px-10 md:pt-44">
        <article className="mx-auto max-w-7xl">
          <PageHeader
            crumbs={crumbs}
            code={`WORK//0${index + 1}`}
            title={project.name}
            intro={<p>{project.tagline}</p>}
          >
            <dl className="mt-4 grid gap-6 border-y border-white/[0.06] py-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Type", project.kind],
                ["Platform", project.platform],
                ["Role", project.role],
                ["Year", project.year],
              ].map(([term, value]) => (
                <div key={term} className="flex flex-col gap-1.5">
                  <dt className="hud">{term}</dt>
                  <dd className="text-sm text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3">
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-full px-5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:text-accent"
              >
                Source on GitHub ↗
              </a>
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="glass rounded-full px-5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:text-accent"
                >
                  Live demo ↗
                </a>
              ) : null}
            </div>
          </PageHeader>

          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
            <div className="flex max-w-3xl flex-col gap-14 text-base leading-[1.8] text-ink-dim md:text-[1.0625rem]">
              <Section title="Overview">
                {project.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Section>

              <Section title="The problem">
                <p>{project.problem}</p>
              </Section>

              <Section title="What I built">
                <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-[var(--accent)]">
                  {project.features.map((feature) => (
                    <li key={feature} className="pl-1">
                      {feature}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Architecture & key decisions">
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.architecture.map((item) => (
                    <div key={item.title} className="glass p-6 [--glass-blur:12px]">
                      <h3 className="font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Challenges">
                {project.challenges.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-bold text-ink">{item.title}</h3>
                    <p className="mt-2">{item.body}</p>
                  </div>
                ))}
              </Section>

              <Section title="Outcome">
                <p>{project.outcome}</p>
              </Section>
            </div>

            <aside className="flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
              <div className="flex flex-col gap-4">
                <h2 className="hud">Tech stack</h2>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-ink-dim"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              {related.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <h2 className="hud">Deep dives</h2>
                  <ul className="flex flex-col gap-3">
                    {related.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm text-ink transition-colors hover:text-accent"
                        >
                          {post.title} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="flex flex-col gap-3">
                <h2 className="hud">Need something similar?</h2>
                <Link
                  href="/services"
                  className="text-sm text-ink transition-colors hover:text-accent"
                >
                  See how I work with clients →
                </Link>
              </div>
            </aside>
          </div>

          <nav
            aria-label="More projects"
            className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.06] pt-10"
          >
            <Link href="/projects" className="hud transition-colors hover:text-accent">
              ← All projects
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="font-display text-xl font-extrabold uppercase [font-stretch:125%] transition-colors hover:text-accent"
            >
              Next: {next.name} →
            </Link>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
