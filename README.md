# Sandomhet's Portfolio

Samuel Zhang's personal site: programming knowledge and C++ templates, class notes, literature essays, a personal blog, projects and an about page.

Built with [Astro](https://astro.build) as a fully static site. Markdown is rendered at build time with KaTeX for math and Shiki for code, and [Pagefind](https://pagefind.app) provides full text search.

![Home page](docs/home-light.png)
![A note in dark mode](docs/note-dark.png)

## Sections

| Route | What lives there | Source folder |
| --- | --- | --- |
| `/code` | Algorithms, data structures and code templates | `src/content/code/<Category>/` |
| `/notes` | Class notes, grouped by department | `src/content/notes/<Department>/` |
| `/writing` | Literature articles and essays | `src/content/writing/` |
| `/blog` | Personal blog posts | `src/content/blog/` |
| `/projects` | Project showcase with illustrated cards | `src/content/projects/` |
| `/about` | About me, built from `src/data/site.ts` | |

The folder a file sits in becomes its category, and the file name becomes its URL (`src/content/code/Graph/mst.md` → `/code/mst`). File names must be unique within a section.

## Adding content

Create a Markdown file in the right folder with this front matter:

```md
---
title: "Segment Tree"
description: "One line shown in lists and search."
time: "Sat Oct 17, 2026"   # any date JavaScript can parse
lang: "zh"                 # "zh" (default) or "en"
draft: false               # true keeps the file out of the site
---
```

Projects take a few extra fields:

```md
summary: "One or two sentences for the card."
tech: ["C++", "Astro"]
repo: "https://github.com/..."   # optional
demo: "https://..."              # optional
cover: "/images/my-cover.png"    # optional, otherwise an illustration is generated
featured: true                   # shows on the home page first
```

A blog post template is in `src/content/blog/_template.md`. Images go in `public/images/` and are referenced as `/images/name.png`.

Personal details (name, intro, about text, social links, section names) are all in `src/data/site.ts`.

The quote widget reads `src/data/quotes.json`. To regenerate it from `src/data/Quotes.xlsx`, run `npm run quotes`.

## Development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/, plus the search index
npm run preview   # serve the built site (search works here)
npm run check     # type check
```

Search only works on a built site because the index is generated after `astro build`.

## Deployment

The site is deployed on Vercel. `vercel.json` sets the framework to Astro, the output folder to `dist`, clean URLs, and permanent redirects from the old routes (`/blogs/*` → `/code/*`, `/articles/*` → `/writing/*`, and the documents that used to live under `/projects`).
