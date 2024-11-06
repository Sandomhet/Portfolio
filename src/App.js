import { AppBar, Box, Container, Drawer } from "@mui/material";
import { blue, deepPurple } from "@mui/material/colors";
import TopNavigation from "./components/TopNavigation";

function App() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          flex: 1,
          width: 250,
          // height: "100vh",
          // margin: 1,
          border: "5px solid red",
          padding: "20px",
          bgcolor: blue[500],
        }}
      >
        Profile
      </Box>
      <Box
        sx={{ flex: 4, border: "5px solid yellow", bgcolor: deepPurple[500] }}
      >
        <TopNavigation />
        {/* <AppBar sx={{ position: "sticky" }}>Blogs</AppBar> */}
        <Container>Latest News</Container>
      </Box>
    </Box>
  );
}

export default App;
