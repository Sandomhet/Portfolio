// @ts-check
import {defineConfig} from "astro/config";
import {unified} from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkDropTocHeading from "./src/lib/remark-drop-toc.mjs";

export default defineConfig({
  trailingSlash: "never",
  build: {format: "file"},
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkDropTocHeading],
      rehypePlugins: [[rehypeKatex, {strict: false, throwOnError: false}]],
      smartypants: false,
    }),
    syntaxHighlight: "prism",
  },
});
