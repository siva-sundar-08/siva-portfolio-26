import type { Block } from "@/content/types";

/** "2026-10-10" → "10 Oct 2026", fixed to en-IN so server and client agree. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function blockText(block: Block): string {
  switch (block.type) {
    case "ul":
    case "ol":
      return block.items.join(" ");
    case "code":
      return block.code;
    default:
      return block.text;
  }
}

/** Reading time at ~220 words a minute, never less than one. */
export function readingMinutes(blocks: Block[]): number {
  const words = blocks.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
