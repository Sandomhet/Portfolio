import { Avatar, Box, Container, Typography } from "@mui/material";
import ExternalLinks from "./ExternalLinks";
import QuoteWidget from "./QuoteWidget";
import { deepPurple } from '@mui/material/colors';

const pictureLink = "avatar.jpg";

export default function Profile() {
  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h1">
          Sandom
        </Typography>
        {/* <Avatar sx={{
          width: "100px",
          height: "100px",
          bgcolor: deepPurple[500],
        }}>
          SZ
        </Avatar> */}
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
