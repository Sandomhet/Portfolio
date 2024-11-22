import { Avatar, Box, Container } from "@mui/material";

const pictureLink =
  "https://www.purina.in/sites/default/files/2023-05/feast.png";
function Profile() {
  return (
    <Box>
      <Box>
        <h1>Profile</h1>
        <Avatar
          alt="SZ"
          src={pictureLink}
          sx={{ width: "90%", height: "90%" }}
        />
        {/* <img src={pictureLink} alt="Profile Missing" width="70%" /> */}
      </Box>
      <Box>
        <h2>Daily Words</h2>
        <p>asdjasdahkj</p>
      </Box>
    </Box>
  );
}

export default Profile;
