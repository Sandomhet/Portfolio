import {Box, Typography} from "@mui/material";

/**
 * Table of Contents component.
 * Renders a list of heading links with active-state highlighting.
 *
 * @param {Array<{id: string, text: string, level: number}>} headings
 * @param {string} activeId  — id of the currently-visible heading
 * @param {(id: string) => void} onItemClick
 */
export default function TOC({headings, activeId, onItemClick}) {
  if (!headings || headings.length === 0) return null;

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
            key={`${h.id}-${i}`}
            href={`#${h.id}`}
            className={`toc-link level-${h.level}${activeId === h.id ? " active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onItemClick?.(h.id);
            }}
          >
            {h.text}
          </a>
        ))}
      </Box>
    </Box>
  );
}
