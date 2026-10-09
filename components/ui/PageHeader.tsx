import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { name: string; path: string };

type PageHeaderProps = {
  /** Trail above the title; the last crumb is the current page. */
  crumbs: Crumb[];
  code: string;
  title: string;
  intro?: ReactNode;
  /** Smaller headline for long titles such as article headlines. */
  compact?: boolean;
  children?: ReactNode;
};

/** Header for inner pages: visible breadcrumbs, a HUD code, the page's only h1, and an intro. */
export function PageHeader({
  crumbs,
  code,
  title,
  intro,
  compact,
  children,
}: PageHeaderProps) {
  return (
    <header className="mb-14 flex flex-col gap-6 md:mb-20">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 hud">
          {crumbs.map((crumb, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink-dim">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.path}
                      className="transition-colors hover:text-accent"
                    >
                      {crumb.name}
                    </Link>
                    <span aria-hidden>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <p className="flex items-center gap-3 hud">
        <span className="h-px w-10 bg-[var(--accent)]" aria-hidden />
        <span className="text-accent">{code}</span>
      </p>
      <h1
        className={
          compact
            ? "max-w-5xl font-display text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.02] font-extrabold [overflow-wrap:anywhere] uppercase [font-stretch:125%]"
            : "max-w-5xl display-wide text-[clamp(1.5rem,7vw,5rem)] [overflow-wrap:anywhere] uppercase"
        }
      >
        {title}
      </h1>
      {intro ? (
        <div className="max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
          {intro}
        </div>
      ) : null}
      {children}
    </header>
  );
}
