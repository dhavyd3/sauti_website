import { readFileSync } from "node:fs";
import { join } from "node:path";

export type NewsItem = {
  /** As written in the file: 2026, 2026-11 or 2026-11-20. Goes into <time datetime>. */
  date: string;
  /** For people: "2026", "November 2026" or "20 November 2026". */
  label: string;
  title: string;
  body: string;
  link?: string;
  image?: { src: string; alt: string };
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function dateLabel(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  if (!month) return String(year);
  const monthName = MONTHS[month - 1] ?? "";
  return day ? `${day} ${monthName} ${year}` : `${monthName} ${year}`;
}

/**
 * Reads content/news.md at build time. Each item is a "## date | headline"
 * line followed by its text, plus optional "Link: https://..." and
 * "Image: /images/news/file.jpg | what the picture shows" lines.
 * A heading that does not match is skipped rather than breaking the build.
 */
export function getNews(limit?: number): NewsItem[] {
  const raw = readFileSync(join(process.cwd(), "content", "news.md"), "utf8").replace(/<!--[\s\S]*?-->/g, "");
  const items: NewsItem[] = [];

  for (const block of raw.split(/^## /m).slice(1)) {
    const [heading, ...rest] = block.split(/\r?\n/);
    const match = heading.match(/^\s*(\d{4}(?:-\d{1,2}(?:-\d{1,2})?)?)\s*\|\s*(.+?)\s*$/);
    if (!match) continue;

    const [, date, title] = match;
    const lines = rest.map((line) => line.trim()).filter(Boolean);
    const linkLine = lines.find((line) => /^link:\s*https?:\/\//i.test(line));
    const imageLine = lines.find((line) => /^image:\s*\//i.test(line));
    const body = lines.filter((line) => line !== linkLine && line !== imageLine).join(" ");

    let image: NewsItem["image"];
    if (imageLine) {
      const [src, alt = ""] = imageLine.replace(/^image:\s*/i, "").split("|").map((part) => part.trim());
      image = { src, alt: alt || title };
    }

    items.push({ date, label: dateLabel(date), title, body, link: linkLine?.replace(/^link:\s*/i, ""), image });
  }

  return limit ? items.slice(0, limit) : items;
}
