import {Box, Container, Divider} from "@mui/material";
import Profile from "./Profile";
import ContentTabs from "./ContentTabs";

export default function HomePage() {
  return (
      <Box sx={{display: "flex", minHeight: "100vh", height: "100%"}}>
        <Box
            sx={{
              flex: 1,
              width: 250,
              padding: "20px",
            }}
        >
          <Profile/>
        </Box>
        <Divider orientation="vertical" flexItem sx={{borderWidth: 1}}/>
        <Box sx={{flex: 4}}>
          <Container>
            <ContentTabs/>
          </Container>
        </Box>
      </Box>
  );
}
