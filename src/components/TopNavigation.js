import { AppBar, Container, IconButton, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";

const NavButton = ({ navto, text }) => {
  const navigate = useNavigate();
  return (
    <IconButton
      onClick={() => {
        navigate(navto);
      }}
      sx={{
        blockSize: "50%",
        ":hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Customize shadow here
          borderRadius: 0, // Removes the circular effect
        },
      }}
    >
      <h4>{text}</h4>
    </IconButton>
  );
};

export default function TopNavigation() {
  return (
    <AppBar
      sx={{
        background: deepPurple[200],
        position: "sticky",
        minHeight: "2",
      }}
    >
      <Container>
        <Toolbar
          sx={{ display: "flex", justifyContent: "end", minHeight: "48px" }}
        >
          <NavButton navto="/" text="ALL" />
          <NavButton navto="/blogs" text="BLOGS" />
          <NavButton navto="/projects" text="PROJECTS" />
          <NavButton navto="/thoughts" text="THOUGHTS" />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
