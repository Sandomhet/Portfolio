import {Box, Chip, Typography} from "@mui/material";
import PreviewWidget from "./PreviewWidget";
import {useParams} from "react-router-dom";
import files from "../assets/mdStorage.json";
import {useEffect, useState} from "react";

export default function ContentTabs() {
  const {type} = useParams();
  const filteredByType = type ? files.filter(f => f.type === type) : files;

  const categories =
    type === "blogs"
      ? ["All", ...new Set(filteredByType.map(f => f.category).filter(Boolean))]
      : [];

  const [activeCategory, setActiveCategory] = useState("All");
  useEffect(() => { setActiveCategory("All"); }, [type]);

  const filtered =
    activeCategory === "All"
      ? filteredByType
      : filteredByType.filter(f => f.category === activeCategory);

  const title = type ? type.charAt(0).toUpperCase() + type.slice(1) : "All";

  return (
    <Box sx={{animation: "fadeIn 0.35s ease"}}>
      {/* Section header */}
      <Box sx={{mb: 3}}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "var(--title-gradient)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.025em",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{color: "text.disabled", fontSize: "0.8rem"}}>
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        </Typography>
      </Box>

      {/* Category filter chips */}
      {categories.length > 0 && (
        <Box sx={{display: "flex", flexWrap: "wrap", gap: 1, mb: 3}}>
          {categories.map(cat => (
            <Chip
              key={cat}
              label={cat.replace(/-/g, " ")}
              onClick={() => setActiveCategory(cat)}
              sx={{
                cursor: "pointer",
                fontSize: "0.78rem",
                height: 30,
                transition: "all 0.18s ease",
                ...(activeCategory === cat
                  ? {
                      background: "linear-gradient(135deg, #8B5CF6, #6D3FC8)",
                      color: "#fff",
                      border: "1px solid transparent",
                      fontWeight: 600,
                      boxShadow: "var(--chip-active-shadow)",
                    }
                  : {
                      background: "transparent",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--chip-inactive-border)",
                      "&:hover": {
                        borderColor: "var(--chip-inactive-hover-border)",
                        color: "var(--chip-inactive-hover-color)",
                        background: "var(--chip-inactive-hover-bg)",
                      },
                    }),
              }}
            />
          ))}
        </Box>
      )}

      {/* Item list */}
      <Box sx={{display: "flex", flexDirection: "column", gap: 1.5}}>
        {filtered.map(file => (
          <PreviewWidget key={file.name} file={file}/>
        ))}
      </Box>
    </Box>
  );
}
