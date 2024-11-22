import { AppBar, Box, Toolbar } from "@mui/material";

function TopNavigation() {
  // return <Box></Box>;
  return (
    <AppBar sx={{ position: "sticky" }}>
      <Toolbar>Blogs</Toolbar>
    </AppBar>
  );
}

export default TopNavigation;
