import { Avatar, Box, Container, Typography } from "@mui/material";
import ExternalLinks from "./ExternalLinks";
import QuoteWidget from "./QuoteWidget";

const pictureLink =
  "https://www.purina.in/sites/default/files/2023-05/feast.png";

export default function Profile() {
  return (
    <Box>
      <Container>
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          Sandom
        </Typography>
        <Avatar
          alt="SZ"
          src={pictureLink}
          sx={{ width: "90%", height: "90%" }}
        />
      </Container>
      <ExternalLinks />
      <QuoteWidget />
    </Box>
  );
}
