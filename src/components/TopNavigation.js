import {useContext, useState} from "react";
import {
  AppBar, Box, Button, Divider, Drawer, IconButton,
  List, ListItemButton, ListItemText, Toolbar, Tooltip, Typography,
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import MenuIcon from "@mui/icons-material/Menu";
import {ThemeModeContext} from "../App";

const NAV_ITEMS = [
  {label: "All",      path: "/"},
  {label: "Articles", path: "/articles"},
  {label: "Blogs",    path: "/blogs"},
  {label: "Projects", path: "/projects"},
  {label: "Notes",    path: "/notes"},
];

export default function TopNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const {mode, toggleMode} = useContext(ThemeModeContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const handleNav = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          background: "var(--nav-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--nav-border)",
          boxShadow: "var(--nav-shadow)",
        }}
      >
        <Toolbar sx={{minHeight: 64, px: {xs: 2, md: 4}, justifyContent: "space-between"}}>
          {/* Brand */}
          <Typography
            variant="h6"
            onClick={() => navigate("/")}
            sx={{
              fontWeight: 700,
              cursor: "pointer",
              background: "var(--brand-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "1.15rem",
              letterSpacing: "-0.03em",
              userSelect: "none",
              transition: "opacity 0.2s ease",
              "&:hover": {opacity: 0.8},
            }}
          >
            Sandomhet
          </Typography>

          {/* Desktop nav + toggle */}
          <Box sx={{display: {xs: "none", md: "flex"}, alignItems: "center", gap: 0.25}}>
            {NAV_ITEMS.map(({label, path}) => (
              <Button
                key={path}
                onClick={() => navigate(path)}
                sx={{
                  color: isActive(path) ? "var(--nav-active)" : "text.disabled",
                  fontWeight: isActive(path) ? 600 : 400,
                  fontSize: "0.85rem",
                  px: 1.5,
                  py: 0.75,
                  minWidth: 0,
                  position: "relative",
                  transition: "all 0.18s ease",
                  letterSpacing: "0.01em",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 5,
                    left: "50%",
                    width: "55%",
                    height: "2px",
                    background: "linear-gradient(90deg, #8B5CF6, #A78BFA)",
                    borderRadius: "2px",
                    transform: isActive(path)
                      ? "translateX(-50%) scaleX(1)"
                      : "translateX(-50%) scaleX(0)",
                    transition: "transform 0.2s ease",
                  },
                  "&:hover": {
                    color: "var(--text-primary)",
                    background: "var(--nav-hover-bg)",
                    "&::after": {transform: "translateX(-50%) scaleX(1)"},
                  },
                }}
              >
                {label}
              </Button>
            ))}

            <Tooltip
              title={mode === "light" ? "Switch to dark" : "Switch to light"}
              placement="bottom"
            >
              <IconButton
                onClick={toggleMode}
                size="small"
                sx={{
                  ml: 0.5,
                  color: "text.disabled",
                  border: "1px solid var(--surface-border)",
                  width: 34,
                  height: 34,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "var(--nav-active)",
                    borderColor: "var(--surface-border-hover)",
                    background: "var(--nav-hover-bg)",
                  },
                }}
              >
                {mode === "light"
                  ? <Brightness4Icon sx={{fontSize: 17}}/>
                  : <Brightness7Icon sx={{fontSize: 17}}/>}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Mobile: theme toggle + hamburger */}
          <Box sx={{display: {xs: "flex", md: "none"}, alignItems: "center", gap: 0.75}}>
            <Tooltip
              title={mode === "light" ? "Switch to dark" : "Switch to light"}
              placement="bottom"
            >
              <IconButton
                onClick={toggleMode}
                size="small"
                sx={{
                  color: "text.disabled",
                  border: "1px solid var(--surface-border)",
                  width: 34,
                  height: 34,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "var(--nav-active)",
                    borderColor: "var(--surface-border-hover)",
                    background: "var(--nav-hover-bg)",
                  },
                }}
              >
                {mode === "light"
                  ? <Brightness4Icon sx={{fontSize: 17}}/>
                  : <Brightness7Icon sx={{fontSize: 17}}/>}
              </IconButton>
            </Tooltip>

            <IconButton
              onClick={() => setDrawerOpen(true)}
              size="small"
              sx={{
                color: "text.disabled",
                border: "1px solid var(--surface-border)",
                width: 34,
                height: 34,
                "&:hover": {
                  color: "var(--nav-active)",
                  borderColor: "var(--surface-border-hover)",
                  background: "var(--nav-hover-bg)",
                },
              }}
            >
              <MenuIcon sx={{fontSize: 18}}/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 220,
            background: "var(--drawer-bg)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderLeft: "1px solid var(--drawer-border)",
            pt: 2,
          },
        }}
      >
        <Typography
          sx={{
            px: 2.5,
            pb: 1,
            fontWeight: 700,
            background: "var(--brand-gradient)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "1.05rem",
            letterSpacing: "-0.02em",
          }}
        >
          Sandomhet
        </Typography>
        <Divider sx={{borderColor: "var(--nav-border)", mb: 1}}/>
        <List dense disablePadding>
          {NAV_ITEMS.map(({label, path}) => (
            <ListItemButton
              key={path}
              onClick={() => handleNav(path)}
              selected={isActive(path)}
              sx={{
                px: 2.5,
                py: 1,
                color: isActive(path) ? "var(--nav-active)" : "text.secondary",
                fontWeight: isActive(path) ? 600 : 400,
                borderLeft: isActive(path)
                  ? "2px solid var(--nav-active)"
                  : "2px solid transparent",
                "&:hover": {
                  background: "var(--nav-hover-bg)",
                  color: "var(--nav-active)",
                },
                "&.Mui-selected": {
                  background: "var(--chip-bg)",
                  "&:hover": {background: "var(--nav-hover-bg)"},
                },
              }}
            >
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: isActive(path) ? 600 : 400,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
