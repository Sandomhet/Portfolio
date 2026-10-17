import {defineCollection} from "astro:content";
import {glob} from "astro/loaders";
import {z} from "astro/zod";

// Slug = file name without extension, so URLs stay the same as the old site.
const fileSlug = ({entry}: {entry: string}) =>
  entry.split("/").pop()!.replace(/\.mdx?$/, "");

// Category = first folder under the collection root ("" for top level files).
export const categoryOf = (filePath: string | undefined, collection: string) => {
  if (!filePath) return "";
  const rel = filePath.split(`/content/${collection}/`)[1] ?? "";
  const parts = rel.split("/");
  return parts.length > 1 ? parts[0] : "";
};

const docSchema = z.object({
  title: z.string(),
  description: z.string().default(""),
  time: z.coerce.date(),
  lang: z.enum(["zh", "en"]).default("zh"),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const docs = (dir: string) =>
  defineCollection({
    loader: glob({pattern: "**/*.md", base: `./src/content/${dir}`, generateId: fileSlug}),
    schema: docSchema,
  });

const projects = defineCollection({
  loader: glob({pattern: "**/*.md", base: "./src/content/projects", generateId: fileSlug}),
  schema: docSchema.extend({
    summary: z.string(),
    tech: z.array(z.string()).default([]),
    repo: z.url().optional(),
    demo: z.url().optional(),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  code: docs("code"),
  notes: docs("notes"),
  writing: docs("writing"),
  blog: docs("blog"),
  projects,
};
