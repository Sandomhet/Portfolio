import {Avatar, Box, Typography} from "@mui/material";
import ExternalLinks from "./ExternalLinks";
import QuoteWidget from "./QuoteWidget";

const pictureLink = "avatar.jpg";

export default function Profile({compact}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: compact ? "row" : "column",
        alignItems: "center",
        gap: compact ? 3 : 0,
      }}
    >
      {/* Avatar with glow ring */}
      <Box sx={{position: "relative", mb: compact ? 0 : 2, mt: compact ? 0 : 1, flexShrink: 0}}>
        <Box
          sx={{
            position: "absolute",
            inset: -3,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8B5CF6, #A78BFA, #6D3FC8)",
            zIndex: 0,
            opacity: 0.85,
          }}
        />
        <Avatar
          alt="SZ"
          src={pictureLink}
          sx={{
            width: compact ? 72 : 96,
            height: compact ? 72 : 96,
            position: "relative",
            zIndex: 1,
            border: "3px solid var(--avatar-border)",
          }}
        />
      </Box>

      {/* Name & subtitle */}
      <Box sx={{textAlign: compact ? "left" : "center"}}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: "var(--brand-gradient)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            mb: 0.25,
          }}
        >
          Sandom
        </Typography>
        <Typography
          variant="body2"
          sx={{color: "text.disabled", fontSize: "0.8rem", mb: compact ? 0 : 1}}
        >
          Student · Developer
        </Typography>
        {compact && <ExternalLinks inline/>}
      </Box>

      {!compact && (
        <>
          <ExternalLinks/>
          <QuoteWidget/>
        </>
      )}
    </Box>
  );
}
