// @ts-check
import {defineConfig} from "astro/config";
import {unified} from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// Many notes keep an empty "## Table of Contents" heading from the editor they were
// written in. The page renders its own TOC, so drop those headings.
function remarkDropTocHeading() {
  /** @param {any} node */
  const isToc = node =>
    node.type === "heading" &&
    /^(table of contents|contents|目录)$/i.test(
      (node.children ?? []).map(/** @param {any} c */ c => c.value ?? "").join("").trim(),
    );
  return /** @param {any} tree */ tree => {
    tree.children = tree.children.filter(/** @param {any} node */ node => !isToc(node));
  };
}

export default defineConfig({
  trailingSlash: "never",
  build: {format: "file"},
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkDropTocHeading],
      rehypePlugins: [[rehypeKatex, {strict: false, throwOnError: false}]],
      smartypants: false,
    }),
    shikiConfig: {
      themes: {light: "github-light", dark: "github-dark-dimmed"},
      defaultColor: false,
      wrap: false,
    },
  },
});
