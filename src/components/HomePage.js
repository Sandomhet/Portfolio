import {Box, Divider, useMediaQuery, useTheme} from "@mui/material";
import Profile from "./Profile";
import ContentTabs from "./ContentTabs";

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return (
      <Box sx={{px: 2, py: 3, maxWidth: 680, mx: "auto"}}>
        <Profile compact/>
        <Divider sx={{my: 3}}/>
        <ContentTabs/>
      </Box>
    );
  }

  return (
    <Box sx={{display: "flex", minHeight: "calc(100vh - 64px)"}}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 280,
          flexShrink: 0,
          px: 2.5,
          py: 3.5,
          position: "sticky",
          top: 64,
          height: "calc(100vh - 64px)",
          overflowY: "auto",
          borderRight: "1px solid var(--sidebar-border)",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--scrollbar-thumb) transparent",
        }}
      >
        <Profile/>
      </Box>

      {/* Content */}
      <Box sx={{flex: 1, minWidth: 0, px: {md: 4, lg: 6}, py: 4, maxWidth: 900}}>
        <ContentTabs/>
      </Box>
    </Box>
  );
}
