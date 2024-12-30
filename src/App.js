import TopNavigation from "./components/TopNavigation";
import ContentTabs from "./components/ContentTabs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MarkdownViewer from "./components/MarkdownViewer";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" }, // Custom primary color
    secondary: { main: "#ff4081" }, // Custom secondary color
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "2.5rem", fontWeight: 700 },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <TopNavigation />
        <Routes>
          <Route path="" element={<HomePage />}>
            <Route path=":category" element={<ContentTabs />} />
          </Route>
          <Route path=":category/:name" element={<MarkdownViewer />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
