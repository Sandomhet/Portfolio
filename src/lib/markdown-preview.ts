// Browser side Markdown renderer for the /edit preview. It mirrors the build pipeline that
// Astro runs (see astro.config.mjs and @astrojs/markdown-remark): GFM, math, the TOC heading
// filter, Prism, KaTeX and raw HTML, so the preview matches the published page.
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import {visit} from "unist-util-visit";
import {toText} from "hast-util-to-text";
import {fromHtml} from "hast-util-from-html";
import type {Element, Root} from "hast";
import {parse as parseYaml} from "yaml";
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-latex";
import "prismjs/components/prism-markdown";
import remarkDropTocHeading from "./remark-drop-toc.mjs";

// Highlighting is driven by the pipeline below, not by Prism scanning the page.
Prism.manual = true;

// Same output shape as Astro's rehype-prism: <pre class="language-x"><code class="language-x">.
function rehypePrism() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "pre" || !parent || index === undefined) return;
      const code = node.children[0];
      if (node.children.length !== 1 || code.type !== "element" || code.tagName !== "code") return;
      const classes = (code.properties.className as string[] | undefined) ?? [];
      const lang = classes.find(c => c.startsWith("language-"))?.slice(9) || "plaintext";
      if (lang === "math") return;
      const grammar = Prism.languages[lang];
      const source = toText(code, {whitespace: "pre"});
      const html = grammar ? Prism.highlight(source, grammar, lang) : escapeHtml(source);
      const cls = `language-${lang}`;
      const replacement = fromHtml(`<pre class="${cls}" data-language="${lang}"><code class="${cls}">${html}</code></pre>`, {fragment: true}).children[0];
      parent.children[index] = replacement as Element;
    });
  };
}

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkDropTocHeading)
  .use(remarkRehype, {allowDangerousHtml: true})
  .use(rehypePrism)
  .use(rehypeKatex, {strict: false, throwOnError: false})
  .use(rehypeRaw)
  .use(rehypeStringify, {allowDangerousHtml: true});

export type FrontMatter = Record<string, unknown>;

// Split "---\nyaml\n---\nbody". A file without front matter is all body.
export function splitFrontMatter(source: string): {data: FrontMatter; body: string; error?: string} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return {data: {}, body: source};
  const body = source.slice(match[0].length);
  try {
    const data = parseYaml(match[1]);
    return {data: data && typeof data === "object" ? data as FrontMatter : {}, body};
  } catch (e) {
    return {data: {}, body, error: e instanceof Error ? e.message : String(e)};
  }
}

export async function renderMarkdown(body: string): Promise<string> {
  return String(await processor.process(body));
}
