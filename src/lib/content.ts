import {getCollection, type CollectionEntry} from "astro:content";
import {categoryOf} from "../content.config";
import type {SectionKey} from "../data/site";

export type Entry = CollectionEntry<SectionKey>;

export type Item = {
  section: SectionKey;
  slug: string;
  href: string;
  category: string;
  entry: Entry;
};

export const SECTION_KEYS: SectionKey[] = ["code", "notes", "writing", "blog", "projects"];

const byDateDesc = (a: Item, b: Item) =>
  b.entry.data.time.getTime() - a.entry.data.time.getTime();

export async function getItems(section: SectionKey): Promise<Item[]> {
  const entries = (await getCollection(section, (e: Entry) => !e.data.draft)) as Entry[];
  return entries
    .map(entry => ({
      section,
      slug: entry.id,
      href: `/${section}/${entry.id}`,
      category: categoryOf(entry.filePath, section),
      entry,
    }))
    .sort(byDateDesc);
}

export async function getAllItems(): Promise<Item[]> {
  const all = await Promise.all(SECTION_KEYS.map(getItems));
  return all.flat().sort(byDateDesc);
}

export function groupBy<T>(items: T[], key: (t: T) => string): [string, T[]][] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const k = key(item);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(item);
  }
  return [...map.entries()];
}

export const formatDate = (d: Date, style: "long" | "short" = "long") =>
  d.toLocaleDateString("en-US", style === "long"
    ? {year: "numeric", month: "short", day: "numeric", timeZone: "UTC"}
    : {year: "numeric", month: "short", timeZone: "UTC"});

// CJK text is read per character, everything else per word.
export function readingMinutes(body = "") {
  const text = body.replace(/```[\s\S]*?```/g, "").replace(/\$\$[\s\S]*?\$\$/g, "");
  const cjk = (text.match(/[㐀-鿿]/g) ?? []).length;
  const words = (text.replace(/[㐀-鿿]/g, " ").match(/[A-Za-z0-9]+/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 400 + words / 220));
}
