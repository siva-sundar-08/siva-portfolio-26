import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { projects } from "@/content/projects";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const description =
  "iOS, Flutter and web projects by Siva Sundar: a SwiftUI expense tracker, a Flutter booking app, a WebRTC video chat, a Spring Boot system and an AI OCR tool.";

export const metadata = pageMetadata({
  title: "Projects — iOS, SwiftUI & Web Case Studies",
  description,
  path: "/projects",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
];

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Projects by Siva Sundar",
            itemListElement: projects.map((project, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(`/projects/${project.slug}`),
              name: project.name,
            })),
          },
        ]}
      />
      <main id="main" className="relative px-5 pt-36 pb-28 md:px-10 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            crumbs={crumbs}
            code="WORK//INDEX"
            title="Projects"
            intro={
              <p>
                Case studies from the apps and tools I&apos;ve built: native iOS with
                Swift and SwiftUI, cross-platform with Flutter, and full-stack web with
                React, Next.js, Node.js and Spring Boot. Each one covers the problem, the
                architecture and what I learned.
              </p>
            }
          />

          <ol className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group glass flex h-full flex-col gap-5 p-7 transition-transform duration-500 hover:-translate-y-1 md:p-9"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="hud tabular-nums">
                      0{i + 1} · {project.kind}
                    </span>
                    <span className="hud">{project.year}</span>
                  </div>
                  <h2 className="font-display text-2xl leading-tight font-extrabold uppercase [font-stretch:125%] md:text-3xl">
                    {project.name}
                  </h2>
                  <p className="text-ink-dim">{project.tagline}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                    {project.stack.slice(0, 5).map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-ink-dim"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <span className="hud text-accent transition-transform duration-500 group-hover:translate-x-1">
                    Read case study →
                  </span>
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
