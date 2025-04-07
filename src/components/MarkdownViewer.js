import {Container} from "@mui/material";
import React, {useEffect, useState} from "react";
import "katex/dist/katex.min.css";
import {useParams} from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import matter from "gray-matter";

export default function MarkdownViewer() {
  const {type, category, name} = useParams();
  
  const [metadata, setMetadata] = useState({});
  const [presentMarkdown, setPresentMarkdown] = useState("");
  
  useEffect(() => {
    const mdUrl = `/markdown/${type}${category ? `/${category}` : ""}/${name}`
    fetch(mdUrl)
        .then((response) => response.text())
        .then((text) => {
          // const {data: frontmatter, content} = matter(text);
          // console.log(frontmatter, " ", content);
          // setMetadata(frontmatter);
          // setPresentMarkdown(content);
          setPresentMarkdown(text);
        })
        .catch((err) => console.error("Error loading markdown file:", err));
  }, [type, category, name]);
  useEffect(() => {
  }, [presentMarkdown]);
  
  // useEffect(() => {
  //   const processMarkdown = async () => {
  //     const result = await unified()
  //         .use(remarkParse) // Parse Markdown
  //         .use(remarkGfm) // Support for GitHub-flavored Markdown
  //         .use(remarkMath) // Enable Math support (MathJax)
  //         .use(remarkToc) // Table of Contents support
  //         .use(remarkRehype) // Convert Markdown to HTML
  //         .use(rehypeKatex) // Math rendering with KaTeX
  //         .use(rehypeSlug) // Slugify headings for anchor links
  //         .use(rehypePrism)
  //         // .use(rehypeHighlight)
  //         // .use(rehypeStarryNight) // Add syntax highlighting for code blocks
  //         .use(rehypeHighlightCodeLines, {
  //           showLineNumbers: true,
  //           lineContainerTagName: 'span'
  //         })
  //         .use(rehypeStringify) // Convert HTML back to string
  //         .process(presentMarkdown);
  //
  //     console.log(String(result));
  //     setProcessedMarkdown(String(result));
  //   };
  //
  //   processMarkdown();
  // }, [presentMarkdown]);
  
  
  return (
      <Container className={type == "articles" ? "article-body" : "markdown-body"}>
        {/*<div*/}
        {/*    dangerouslySetInnerHTML={{*/}
        {/*      __html: processedMarkdown, // The HTML string you want to render*/}
        {/*    }}*/}
        {/*/>*/}
        {/*<ReactTOC markdownText={presentMarkdown}/>*/}
        <Markdown
            remarkPlugins={[remarkGfm, remarkMath, remarkToc, remarkFrontmatter]}
            rehypePlugins={[rehypeKatex, rehypeRaw, rehypeSlug, rehypePrism]}
        >
          {presentMarkdown}
        </Markdown>
      </Container>
  );
}
