---
title: "This Portfolio"
description: "The site you are reading: a fast, static home for notes, code and essays."
summary: "A static site for 80+ Markdown notes with math, highlighted code, full text search and light / dark themes."
time: "Sat Oct 17, 2026"
lang: "en"
tech: ["Astro", "TypeScript", "KaTeX", "Shiki", "Pagefind"]
repo: "https://github.com/Sandomhet/Portfolio"
featured: true
---

## Why

The site started as a React single page app that downloaded and rendered every Markdown file in the browser. It worked, but pages were slow to show up, search engines saw an empty shell, and adding a note meant regenerating a JSON index by hand.

## How it works now

- **Static first.** Every note, template and essay is rendered to plain HTML at build time with [Astro](https://astro.build), so pages load instantly and work without JavaScript.
- **Content collections.** Markdown files are dropped into folders (`code`, `notes`, `writing`, `blog`, `projects`); the folder name becomes the category and the front matter is validated with a schema.
- **Math and code.** Formulas are typeset with KaTeX and code is highlighted with Shiki in both light and dark themes, with one click copy.
- **Search.** [Pagefind](https://pagefind.app) builds a full text index after each build, including the Chinese notes.
- **Design.** A frosted glass interface in a purple palette, with a sticky table of contents and scroll spy for long notes.
