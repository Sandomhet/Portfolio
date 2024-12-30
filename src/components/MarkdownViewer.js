import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import { useParams } from "react-router-dom";
import MarkdownWithToc from "./MarkdownWithToc";

export default function MarkdownViewer() {
  const { category, name } = useParams();

  const [presentMarkdown, setPresentMarkdown] = useState("");
  useEffect(() => {
    fetch(`/markdown/${category}/${name}.md`)
      .then((response) => response.text())
      .then((text) => setPresentMarkdown(text))
      .catch((err) => console.error("Error loading markdown file:", err));
  }, []);

  return (
    <Container>
      <MarkdownWithToc markdownContent={presentMarkdown} />
    </Container>
  );
}
