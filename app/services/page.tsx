import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { projects } from "@/content/projects";
import { faqs, services, workflow } from "@/content/services";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, personId } from "@/lib/seo";

const path = "/services";
const description =
  "Hire Siva Sundar, an iOS developer in Chennai, for native SwiftUI iPhone apps, Flutter apps for iOS and Android, and React and Next.js web apps for startups.";

export const metadata = pageMetadata({
  title: "iOS App Developer in Chennai — Services",
  description,
  path,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "iOS and web app development",
            serviceType: "Mobile and web application development",
            description,
            url: absoluteUrl(path),
            provider: { "@id": personId },
            areaServed: [
              { "@type": "City", name: "Chennai" },
              { "@type": "Country", name: "India" },
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Development services",
              itemListElement: services.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.title,
                  description: service.summary,
                },
              })),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
        ]}
      />
      <main id="main" className="relative px-5 pt-36 pb-28 md:px-10 md:pt-44">
        <div className="mx-auto flex max-w-7xl flex-col gap-24">
          <PageHeader
            crumbs={crumbs}
            code="SVC//OFFER"
            title="iOS & web development in Chennai"
            intro={
              <>
                <p>
                  I&apos;m Siva Sundar, a software engineer in Chennai. I build native
                  iPhone apps with Swift and SwiftUI, cross-platform apps with Flutter,
                  and fast web apps with React and Next.js, for startups, small businesses
                  and product teams in India and abroad.
                </p>
                <p className="mt-4">
                  Alongside my full-time role at ADRIG AI Technologies, I take on a small
                  number of freelance projects where I can own the work end to end.
                </p>
              </>
            }
          >
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="glass rounded-full px-6 py-3 font-mono text-xs tracking-[0.2em] text-accent uppercase"
              >
                Start a project
              </Link>
              <Link
                href="/projects"
                className="glass rounded-full px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:text-accent"
              >
                See my work
              </Link>
            </div>
          </PageHeader>

          <section aria-labelledby="what-title" className="flex flex-col gap-10">
            <h2
              id="what-title"
              className="font-display text-3xl leading-tight font-extrabold uppercase [font-stretch:125%] md:text-4xl"
            >
              What I build
            </h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <li key={service.id} className="glass flex flex-col gap-4 p-7 md:p-9">
                  <h3 className="font-display text-xl font-extrabold text-ink [font-stretch:115%]">
                    {service.title}
                  </h3>
                  <p className="text-ink-dim">{service.summary}</p>
                  <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-ink-dim marker:text-[var(--accent)]">
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="how-title" className="flex flex-col gap-10">
            <h2
              id="how-title"
              className="font-display text-3xl leading-tight font-extrabold uppercase [font-stretch:125%] md:text-4xl"
            >
              How a project runs
            </h2>
            <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {workflow.map((step, i) => (
                <li
                  key={step.title}
                  className="flex flex-col gap-3 border-t border-white/10 pt-6"
                >
                  <span className="hud text-accent tabular-nums">0{i + 1}</span>
                  <h3 className="font-bold text-ink">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-dim">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="proof-title" className="flex flex-col gap-10">
            <h2
              id="proof-title"
              className="font-display text-3xl leading-tight font-extrabold uppercase [font-stretch:125%] md:text-4xl"
            >
              Recent work
            </h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group glass flex h-full flex-col gap-3 p-6 [--glass-blur:12px]"
                  >
                    <span className="hud">{project.kind}</span>
                    <span className="font-display text-lg font-extrabold uppercase [font-stretch:120%] transition-colors group-hover:text-accent">
                      {project.name}
                    </span>
                    <span className="text-sm text-ink-dim">{project.tagline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="faq-title" className="flex flex-col gap-10">
            <h2
              id="faq-title"
              className="font-display text-3xl leading-tight font-extrabold uppercase [font-stretch:125%] md:text-4xl"
            >
              Questions clients ask
            </h2>
            <dl className="flex max-w-4xl flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {faqs.map((faq) => (
                <div key={faq.q} className="flex flex-col gap-3 py-7">
                  <dt className="text-lg font-bold text-ink">{faq.q}</dt>
                  <dd className="leading-relaxed text-ink-dim">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
