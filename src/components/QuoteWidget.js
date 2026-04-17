import {Box, IconButton, Typography} from "@mui/material";
import quotes from "../assets/quoteStorage.json";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import {useState} from "react";

export default function QuoteWidget() {
  const randomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];
  const [quote, setQuote] = useState(randomQuote);

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2.5,
        overflow: "hidden",
        border: "1px solid var(--surface-border)",
        background: "var(--surface)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        mt: 1,
        transition: "border-color 0.2s ease",
        "&:hover": {borderColor: "var(--surface-border-hover)"},
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          px: 1.5,
          py: 0.75,
          background: "var(--chip-bg)",
          borderBottom: "1px solid var(--surface-border)",
        }}
      >
        <Box sx={{display: "flex", alignItems: "center", justifySelf: "start"}}>
          <MenuBookOutlinedIcon sx={{fontSize: 16, color: "var(--nav-active)"}}/>
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            color: "var(--nav-active)",
            letterSpacing: "0.06em",
            fontSize: "0.8rem",
            textAlign: "center",
            justifySelf: "center",
          }}
        >
          QUOTE OF THE DAY
        </Typography>
        <IconButton
          onClick={() => setQuote(randomQuote)}
          size="small"
          sx={{
            p: 0.25,
            color: "text.disabled",
            justifySelf: "end",
            transition: "all 0.2s ease",
            "&:hover": {color: "var(--nav-active)", rotate: "90deg"},
          }}
        >
          <RefreshIcon sx={{fontSize: 15}}/>
        </IconButton>
      </Box>

      {/* Quote body */}
      <Box sx={{px: 2, py: 1.5}}>
        <Typography
          variant="body2"
          sx={{
            color: "text.primary",
            lineHeight: 1.75,
            fontStyle: "italic",
            fontSize: "0.82rem",
            mb: 1,
          }}
        >
          "{quote.quote}"
        </Typography>
        <Typography
          variant="caption"
          sx={{color: "text.disabled", display: "block", textAlign: "right", fontSize: "0.73rem"}}
        >
          {quote.writer && `— ${quote.writer}`}
          {quote.source && <em style={{opacity: 0.8}}> · {quote.source}</em>}
        </Typography>
      </Box>
    </Box>
  );
}
