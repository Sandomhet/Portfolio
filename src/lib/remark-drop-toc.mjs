// Many notes keep an empty "## Table of Contents" heading from the editor they were
// written in. The page renders its own TOC, so drop those headings.
// Shared by astro.config.mjs and the live preview on /edit.
export default function remarkDropTocHeading() {
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
