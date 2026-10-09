import type { Block } from "@/content/types";

/** Splits on backticks so `inline code` in content strings renders as <code>. */
export function Inline({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="rounded-md bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.88em] text-ink"
          >
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Renders article blocks with readable measure and spacing. */
export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6 text-base leading-[1.8] text-ink-dim md:text-[1.0625rem]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i}>
                <Inline text={block.text} />
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                id={block.id}
                className="mt-8 scroll-mt-28 font-display text-2xl leading-tight font-extrabold text-ink [font-stretch:120%] md:text-3xl"
              >
                <Inline text={block.text} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-4 text-lg font-bold text-ink">
                <Inline text={block.text} />
              </h3>
            );
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List
                key={i}
                className={
                  block.type === "ul"
                    ? "flex list-disc flex-col gap-2 pl-6 marker:text-[var(--accent)]"
                    : "flex list-decimal flex-col gap-2 pl-6 marker:font-mono marker:text-[var(--accent)]"
                }
              >
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    <Inline text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "code":
            return (
              <figure
                key={i}
                className="glass overflow-hidden rounded-2xl! [--glass-blur:12px]"
              >
                <figcaption className="border-b border-white/[0.06] px-5 py-2.5 hud">
                  {block.lang}
                </figcaption>
                <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-ink">
                  <code>{block.code}</code>
                </pre>
              </figure>
            );
          case "note":
            return (
              <aside
                key={i}
                className="rounded-2xl border-l-2 border-[var(--accent)] bg-white/[0.03] px-5 py-4 text-ink"
              >
                <Inline text={block.text} />
              </aside>
            );
        }
      })}
    </div>
  );
}
