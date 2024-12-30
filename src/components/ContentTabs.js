import { Box, List, Typography } from "@mui/material";
import PreviewWidget from "./PreviewWidget";
import { useParams } from "react-router-dom";
import files from "../assets/mdStorage.json";

export default function ContentTabs() {
  const { category } = useParams();
  let filtered = files.filter((file) => {
    // console.log(category);
    if (category === undefined) {
      return true;
    }
    return file.category === category;
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Box>
      <Typography variant="h2" sx={{ fontWeight: "Bold" }}>
        {category ? capitalizeFirstLetter(category) : "All"}
      </Typography>
      <List>
        {filtered.map((file) => (
          <List key={file.name}>
            <PreviewWidget file={file} key={file.name} />
          </List>
        ))}
      </List>
    </Box>
  );
}
