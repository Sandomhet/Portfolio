import {createContext, useEffect, useMemo, useState} from "react";
import TopNavigation from "./components/TopNavigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import MarkdownViewer from "./components/MarkdownViewer";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

export const ThemeModeContext = createContext({
  mode: "light",
  toggleMode: () => {},
});

const buildTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {main: "#8B5CF6", light: "#A78BFA", dark: "#6D3FC8"},
      secondary: {main: mode === "light" ? "#6D3FC8" : "#A78BFA"},
      background: {
        default: mode === "light" ? "#E4DCFF" : "#221940",
        paper:   mode === "light" ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.09)",
      },
      text: {
        primary:   mode === "light" ? "#1E0A4E" : "#F0ECFF",
        secondary: mode === "light" ? "#4C2D98" : "#C4B5FD",
        disabled:  mode === "light" ? "#7C6FAD" : "#8B7CB8",
      },
      divider: mode === "light"
        ? "rgba(109,63,200,0.15)"
        : "rgba(167,139,250,0.15)",
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      h1: {fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.02em"},
      h2: {fontSize: "2rem",   fontWeight: 700, letterSpacing: "-0.02em"},
      h3: {fontSize: "1.5rem", fontWeight: 600},
      h4: {fontSize: "1.25rem", fontWeight: 600},
      h5: {fontSize: "1.05rem", fontWeight: 600},
      h6: {fontSize: "0.9rem",  fontWeight: 600},
      body1: {lineHeight: 1.7},
      body2: {lineHeight: 1.65},
    },
    shape: {borderRadius: 12},
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {scrollbarColor: "var(--scrollbar-thumb) transparent"},
        },
      },
      MuiPaper: {
        styleOverrides: {root: {backgroundImage: "none"}},
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            background: "var(--surface)",
            border: "1px solid var(--surface-border)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {textTransform: "none", borderRadius: 8, fontWeight: 500},
          contained: {
            background: "linear-gradient(135deg, #8B5CF6, #6D3FC8)",
            color: "#fff",
            boxShadow: "none",
            "&:hover": {
              background: "linear-gradient(135deg, #A78BFA, #8B5CF6)",
              boxShadow: "var(--shadow-md)",
            },
          },
          outlined: {
            borderColor: "var(--surface-border)",
            "&:hover": {
              borderColor: "var(--surface-border-hover)",
              background: "var(--nav-hover-bg)",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {root: {borderRadius: 8}},
      },
      MuiDivider: {
        styleOverrides: {root: {borderColor: "var(--surface-border)"}},
      },
      MuiAppBar: {
        styleOverrides: {root: {backgroundImage: "none"}},
      },
      MuiDrawer: {
        styleOverrides: {paper: {backgroundImage: "none"}},
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            background: "var(--drawer-bg)",
            color: "var(--text-primary)",
            border: "1px solid var(--surface-border)",
            fontSize: "0.75rem",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "all 0.2s ease",
          },
        },
      },
    },
  });

export default function App() {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("theme-mode") || "light";
    // Set the attribute synchronously so CSS vars are ready on first paint
    document.documentElement.setAttribute("data-theme", saved);
    return saved;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const toggleMode = () => setMode(m => (m === "light" ? "dark" : "light"));

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{mode, toggleMode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
          <TopNavigation/>
          <Routes>
            <Route path="" element={<HomePage/>}>
              <Route path=":type" element={null}/>
            </Route>
            <Route path=":type/:name" element={<MarkdownViewer/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
