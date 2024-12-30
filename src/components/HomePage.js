import { Box, Container, Divider } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import Profile from "./Profile";
import ContentTabs from "./ContentTabs";

export default function HomePage() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          flex: 1,
          width: 250,
          // height: "100vh",
          // margin: 1,
          // border: "5px solid ",
          padding: "20px",
        }}
      >
        <Profile />
      </Box>
      <Divider orientation="vertical" flexItem sx={{ borderWidth: 1 }} />
      <Box sx={{ flex: 4, background: deepPurple[0] }}>
        {/*<TopNavigation />*/}
        <Container>
          <ContentTabs />
        </Container>
      </Box>
    </Box>
  );
}
