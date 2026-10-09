import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";

/**
 * Selected work: links every case study and the latest writing from the home page,
 * so search engines (and people) reach the inner pages in one click.
 */
export function Work() {
  return (
    <section
      id="work"
      data-section="work"
      aria-labelledby="work-title"
      className="relative px-5 py-28 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          section="work"
          title="Work"
          intro="Apps and tools I've built, from a SwiftUI expense tracker to real-time video on the web. Each one has a full case study."
        />

        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <li
              key={project.slug}
              className={i === 0 ? "md:col-span-2 lg:col-span-1" : undefined}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group glass flex h-full flex-col gap-4 p-7 transition-transform duration-500 hover:-translate-y-1"
              >
                <span className="hud tabular-nums">
                  0{i + 1} · {project.kind}
                </span>
                <h3 className="font-display text-2xl leading-tight font-extrabold uppercase [font-stretch:125%]">
                  {project.name}
                </h3>
                <p className="text-sm leading-relaxed text-ink-dim">{project.tagline}</p>
                <p className="mt-auto pt-2 font-mono text-[11px] text-ink-faint">
                  {project.stack.slice(0, 4).join(" · ")}
                </p>
                <span className="hud text-accent transition-transform duration-500 group-hover:translate-x-1">
                  Case study →
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid gap-10 border-t border-white/[0.06] pt-12 lg:grid-cols-[16rem_1fr]">
          <div className="flex flex-col gap-3">
            <h3 className="hud text-accent">Writing</h3>
            <Link href="/blog" className="hud transition-colors hover:text-accent">
              All articles →
            </Link>
          </div>
          <ul className="flex flex-col gap-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-1.5">
                  <span className="font-display text-lg leading-snug font-extrabold text-ink [font-stretch:115%] transition-colors group-hover:text-accent md:text-xl">
                    {post.title}
                  </span>
                  <span className="text-sm text-ink-dim">{post.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-16 text-ink-dim">
          Need an iOS or web app built?{" "}
          <Link
            href="/services"
            className="text-ink underline decoration-[var(--accent)] underline-offset-4 hover:text-accent"
          >
            See services and FAQs
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
