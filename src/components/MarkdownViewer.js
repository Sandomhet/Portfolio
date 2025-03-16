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

export default function MarkdownViewer() {
  const {category, name} = useParams();
  
  // const [toc, setToc] = useState([]);
  const [presentMarkdown, setPresentMarkdown] = useState("");
  // const [processedMarkdown, setProcessedMarkdown] = useState("");
  
  useEffect(() => {
    fetch(`/markdown/${category}/${name}.md`)
        .then((response) => response.text())
        .then((text) => setPresentMarkdown(text))
        .catch((err) => console.error("Error loading markdown file:", err));
  }, [category, name]);
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
      <Container>
        {/*<div style={{width: '200px', padding: '20px', position: 'fixed', top: '0', left: '0'}}>*/}
        {/*  <h3>Table of Contents</h3>*/}
        {/*  <ul>*/}
        {/*    {toc.map((item, index) => (*/}
        {/*        <li key={index} style={{marginLeft: `${(item.level - 1) * 10}px`}}>*/}
        {/*          <a href={`#${item.id}`} style={{textDecoration: 'none'}}>*/}
        {/*            {item.content}*/}
        {/*          </a>*/}
        {/*        </li>*/}
        {/*    ))}*/}
        {/*  </ul>*/}
        {/*</div>*/}
        {/*<div*/}
        {/*    dangerouslySetInnerHTML={{*/}
        {/*      __html: processedMarkdown, // The HTML string you want to render*/}
        {/*    }}*/}
        {/*/>*/}
        {/*<ReactTOC markdownText={presentMarkdown}/>*/}
        <Markdown
            remarkPlugins={[remarkGfm, remarkMath, remarkToc, remarkFrontmatter]}
            rehypePlugins={[rehypeKatex, rehypeSlug, rehypePrism]}
        >
          {presentMarkdown}
        </Markdown>
      </Container>
  );
}
