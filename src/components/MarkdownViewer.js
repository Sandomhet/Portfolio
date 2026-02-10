import {Container} from "@mui/material";
import {useEffect, useState} from "react";
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
import files from "../assets/mdMap.json";

export default function MarkdownViewer() {
  const {type, name} = useParams();
  
  const [presentMarkdown, setPresentMarkdown] = useState("");
  
  useEffect(() => {
    console.log(files[name]["path"]);
    // const mdUrl = `/markdown/${type}${category ? `/${category}` : ""}/${name}.md`
    fetch(files[name]["path"])
        .then((response) => response.text())
        .then((text) => setPresentMarkdown(text))
        .catch((err) => console.error("Error loading markdown file:", err));
  }, [type, name]);
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
      <Container className={files[name]["lang"] == "en" ? "markdown-en" : "markdown-zh"} lang={files[name]["lang"]}>
        {/*<div*/}
        {/*    dangerouslySetInnerHTML={{*/}
        {/*      __html: processedMarkdown, // The HTML string you want to render*/}
        {/*    }}*/}
        {/*/>*/}
        {/*<ReactTOC markdownText={presentMarkdown}/>*/}
        <Markdown
            remarkPlugins={[remarkGfm, remarkFrontmatter, remarkToc, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex, rehypeSlug, rehypePrism]}
        >
          {presentMarkdown}
        </Markdown>
      </Container>
  );
}
