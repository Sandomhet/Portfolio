import {Box, Drawer, IconButton, Tooltip, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import "katex/dist/katex.min.css";
import {useNavigate, useParams} from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import files from "../assets/mdMap.json";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import TOC from "./TOC";

export default function MarkdownViewer() {
  const {name} = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("lg"));

  const contentRef = useRef(null);
  const [markdown, setMarkdown] = useState("");
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fileInfo = files[name];
  const isArticle = fileInfo?.type === "articles";

  useEffect(() => {
    if (!fileInfo) return;
    fetch(fileInfo.path)
      .then(r => r.text())
      .then(setMarkdown)
      .catch(err => console.error("Error loading markdown:", err));
  }, [name, fileInfo]);

  // Extract headings from rendered DOM (handles Chinese via rehype-slug correctly)
  useEffect(() => {
    if (!markdown || !contentRef.current || isArticle) {
      setHeadings([]);
      return;
    }
    // Defer until after react-markdown renders
    const id = requestAnimationFrame(() => {
      const nodes = contentRef.current?.querySelectorAll("h1,h2,h3,h4,h5,h6") || [];
      const list = Array.from(nodes)
        .filter(n => n.id)
        .map(n => ({
          id: n.id,
          text: n.textContent || "",
          level: Number(n.tagName.slice(1)),
        }));
      setHeadings(list);

      // Handle initial URL hash (after content mounts)
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (hash) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({behavior: "smooth", block: "start"});
      }
    });
    return () => cancelAnimationFrame(id);
  }, [markdown, isArticle]);

  // Scroll-spy
  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {rootMargin: "-15% 0% -70% 0%", threshold: 0},
    );
    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const handleTocClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: "smooth", block: "start"});
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
    setDrawerOpen(false);
  };

  const langClass = fileInfo?.lang === "en" ? "markdown-en" : "markdown-zh";
  const hasToc = headings.length > 1 && !isArticle;

  return (
    <Box sx={{display: "flex", minHeight: "calc(100vh - 64px)"}}>

      {/* ── Desktop TOC sidebar (left) ── */}
      {!isSmall && hasToc && (
        <Box
          sx={{
            width: 240,
            flexShrink: 0,
            position: "sticky",
            top: 64,
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            borderRight: "1px solid var(--sidebar-border)",
            display: {xs: "none", lg: "block"},
            scrollbarWidth: "thin",
            scrollbarColor: "var(--scrollbar-thumb) transparent",
          }}
        >
          <TOC headings={headings} activeId={activeId} onItemClick={handleTocClick}/>
        </Box>
      )}

      {/* ── Main content column ── */}
      <Box sx={{flex: 1, minWidth: 0, display: "flex", flexDirection: "column"}}>

        {/* Sticky action bar */}
        <Box
          sx={{
            position: "sticky",
            top: 64,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: {xs: 2, sm: 3, md: 5},
            py: 1.25,
            background: "var(--nav-bg)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--nav-border)",
          }}
        >
          {/* Mobile TOC toggle (left) */}
          {isSmall && hasToc && (
            <Tooltip title="Table of contents" placement="right">
              <IconButton
                size="small"
                onClick={() => setDrawerOpen(true)}
                sx={{
                  color: "text.disabled",
                  border: "1px solid var(--surface-border)",
                  "&:hover": {color: "var(--nav-active)", borderColor: "var(--surface-border-hover)"},
                }}
              >
                <MenuIcon sx={{fontSize: 16}}/>
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Go back" placement="bottom">
            <IconButton
              onClick={() => navigate(-1)}
              size="small"
              sx={{
                color: "text.disabled",
                border: "1px solid var(--surface-border)",
                transition: "all 0.18s ease",
                "&:hover": {
                  borderColor: "var(--surface-border-hover)",
                  color: "var(--nav-active)",
                  background: "var(--nav-hover-bg)",
                },
              }}
            >
              <ArrowBackIcon sx={{fontSize: 16}}/>
            </IconButton>
          </Tooltip>

          <Typography variant="caption" sx={{color: "text.disabled", fontSize: "0.75rem"}}>
            {fileInfo?.type && fileInfo.type.charAt(0).toUpperCase() + fileInfo.type.slice(1)}
            {fileInfo?.category && ` · ${fileInfo.category.replace(/-/g, " ")}`}
          </Typography>
        </Box>

        {/* Markdown body (centered) */}
        <Box sx={{flex: 1, display: "flex", justifyContent: "center"}}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 820,
              px: {xs: 2, sm: 3, md: 5},
              py: 4,
              minWidth: 0,
            }}
          >
            <Box ref={contentRef} className={langClass}>
              <Markdown
                remarkPlugins={[remarkGfm, remarkFrontmatter, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex, rehypeSlug, rehypePrism]}
              >
                {markdown}
              </Markdown>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Mobile TOC Drawer (left) ── */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: "var(--drawer-bg)",
            borderRight: "1px solid var(--drawer-border)",
            pt: 1,
          },
        }}
      >
        <TOC
          headings={headings}
          activeId={activeId}
          onItemClick={handleTocClick}
        />
      </Drawer>
    </Box>
  );
}
