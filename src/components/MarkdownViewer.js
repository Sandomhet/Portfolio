import {Box, Drawer, IconButton, Tooltip, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
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

/* ── Heading extraction ─────────────────────────────────── */

// Approximate github-slugger behavior for matching rehype-slug output
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const extractHeadings = (markdown) => {
  const headings = [];
  for (const line of markdown.split("\n")) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (!match) continue;
    const level = match[1].length;
    const text = match[2]
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/__(.+?)__/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/_(.+?)_/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\[(.+?)\]\(.+?\)/g, "$1")
      .trim();
    headings.push({level, text, id: slugify(text)});
  }
  return headings;
};

/* ── TOC Component ──────────────────────────────────────── */

function TOCSidebar({headings, activeId, onLinkClick}) {
  return (
    <Box sx={{p: 2, pt: 2.5}}>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "text.disabled",
          textTransform: "uppercase",
          fontSize: "0.65rem",
          px: 1,
          mb: 1.5,
        }}
      >
        On This Page
      </Typography>
      <Box component="nav" className="toc-sidebar">
        {headings.map((h, i) => (
          <a
            key={i}
            href={`#${h.id}`}
            className={`toc-link level-${h.level}${activeId === h.id ? " active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(h.id);
              if (el) el.scrollIntoView({behavior: "smooth", block: "start"});
              if (onLinkClick) onLinkClick();
            }}
          >
            {h.text}
          </a>
        ))}
      </Box>
    </Box>
  );
}

/* ── Main Component ─────────────────────────────────────── */

export default function MarkdownViewer() {
  const {name} = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("lg"));

  const [markdown, setMarkdown] = useState("");
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fileInfo = files[name];

  useEffect(() => {
    if (!fileInfo) return;
    fetch(fileInfo.path)
      .then(r => r.text())
      .then(text => {
        setMarkdown(text);
        setHeadings(extractHeadings(text));
      })
      .catch(err => console.error("Error loading markdown:", err));
  }, [name, fileInfo]);

  // Scroll-spy via IntersectionObserver
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

  const langClass = fileInfo?.lang === "en" ? "markdown-en" : "markdown-zh";
  const hasToc = headings.length > 1;

  return (
    <Box sx={{display: "flex", minHeight: "calc(100vh - 64px)"}}>

      {/* ── Desktop TOC sidebar ── */}
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
          <TOCSidebar headings={headings} activeId={activeId}/>
        </Box>
      )}

      {/* ── Main content ── */}
      <Box sx={{flex: 1, display: "flex", justifyContent: "center"}}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 820,
            px: {xs: 2, sm: 3, md: 5},
            py: 4,
          }}
        >
          {/* Back bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 3,
            }}
          >
            <Tooltip title="Go back" placement="right">
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

            {/* TOC toggle on small screens */}
            {isSmall && hasToc && (
              <Tooltip title="Table of contents" placement="left">
                <IconButton
                  size="small"
                  onClick={() => setDrawerOpen(true)}
                  sx={{
                    ml: "auto",
                    color: "text.disabled",
                    border: "1px solid var(--surface-border)",
                    "&:hover": {color: "var(--nav-active)", borderColor: "var(--surface-border-hover)"},
                  }}
                >
                  <MenuIcon sx={{fontSize: 16}}/>
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {/* Markdown */}
          <Box className={langClass}>
            <Markdown
              remarkPlugins={[remarkGfm, remarkFrontmatter, remarkMath]}
              rehypePlugins={[rehypeRaw, rehypeKatex, rehypeSlug, rehypePrism]}
            >
              {markdown}
            </Markdown>
          </Box>
        </Box>
      </Box>

      {/* ── Mobile TOC Drawer ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: "var(--drawer-bg)",
            borderLeft: "1px solid var(--drawer-border)",
            pt: 1,
          },
        }}
      >
        <TOCSidebar
          headings={headings}
          activeId={activeId}
          onLinkClick={() => setDrawerOpen(false)}
        />
      </Drawer>
    </Box>
  );
}
