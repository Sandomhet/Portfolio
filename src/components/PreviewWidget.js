import {Box, Card, CardContent, Chip, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function PreviewWidget({file}) {
  return (
    <RouterLink
      to={`/${file.type}/${file.name}`}
      style={{textDecoration: "none", display: "block"}}
    >
      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid var(--surface-border)",
          background: "var(--surface)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          cursor: "pointer",
          transition: "all 0.22s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "var(--shadow-purple)",
            borderColor: "var(--surface-border-hover)",
            background: "var(--surface-hover)",
            "& .arrow-icon": {opacity: 1, transform: "translateX(0)"},
          },
        }}
      >
        <CardContent sx={{p: 2.5, "&:last-child": {pb: 2.5}}}>
          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
            <Box sx={{flex: 1, minWidth: 0}}>
              {/* Meta row */}
              <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 0.75, flexWrap: "wrap"}}>
                <Typography variant="caption" sx={{color: "text.disabled", fontSize: "0.73rem"}}>
                  {file.time}
                </Typography>
                {file.category && (
                  <Chip
                    label={file.category.replace(/-/g, " ")}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: "0.65rem",
                      background: "var(--chip-bg)",
                      color: "var(--chip-color)",
                      border: "1px solid var(--chip-border)",
                      "& .MuiChip-label": {px: 0.75},
                    }}
                  />
                )}
              </Box>

              {/* Title */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  lineHeight: 1.35,
                  mb: file.description ? 0.5 : 0,
                  fontSize: "1rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {file.title}
              </Typography>

              {/* Description */}
              {file.description && (
                <Typography
                  variant="body2"
                  sx={{color: "text.secondary", fontSize: "0.85rem", lineHeight: 1.55}}
                >
                  {file.description}
                </Typography>
              )}
            </Box>

            {/* Arrow */}
            <Box
              className="arrow-icon"
              sx={{
                ml: 2,
                flexShrink: 0,
                opacity: 0,
                transform: "translateX(-6px)",
                transition: "all 0.2s ease",
                color: "var(--nav-active)",
                mt: 0.5,
              }}
            >
              <ArrowForwardIcon sx={{fontSize: 18}}/>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </RouterLink>
  );
}
