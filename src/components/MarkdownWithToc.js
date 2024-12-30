import { unified } from "unified";
import React, { useEffect, useState } from "react";
import remarkParse from "remark-parse";
import remarkToc from "remark-toc";
import remarkStringify from "remark-stringify";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function MarkdownWithToc({ markdownContent }) {
  const [toc, setToc] = useState("");

  useEffect(() => {
    async function processor() {
      const file = await unified()
        .use(remarkParse)
        .use(remarkToc, { heading: "Table of Contents" })
        .use(remarkStringify)
        .process(markdownContent);

      console.log(String(file));
      setToc(String(file));
    }

    processor();
  }, [markdownContent]);

  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={rehypeKatex}
    >
      {toc}
    </Markdown>
  );
}
