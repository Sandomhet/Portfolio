import {Box, List, Typography} from "@mui/material";
import PreviewWidget from "./PreviewWidget";
import {useParams} from "react-router-dom";
import files from "../assets/mdStorage.json";

export default function ContentTabs() {
  const {type} = useParams();
  let filtered = files.filter((file) => {
    // console.log(type);
    if (type === undefined) {
      return true;
    }
    return file.type === type;
  });
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
      <Box>
        <Typography variant="h2" sx={{fontWeight: "Bold"}}>
          {type ? capitalizeFirstLetter(type) : "All"}
        </Typography>
        <List>
          {filtered.map((file) => (
              <List key={file.name}>
                <PreviewWidget file={file} key={file.name}/>
              </List>
          ))}
        </List>
      </Box>
  );
}
