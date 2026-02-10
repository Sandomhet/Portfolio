import {Box, Button, List, Typography} from "@mui/material";
import PreviewWidget from "./PreviewWidget";
import {useParams} from "react-router-dom";
import files from "../assets/mdStorage.json";
import {useEffect, useState} from "react";

export default function ContentTabs() {
  
  const {type} = useParams();
  const filteredByType = type ? files.filter(file => file.type === type) : files;
  const categories = type === "blogs"
      ? ["All", ...new Set(
          filteredByType
              .map(file => file.category)
              .filter(category => category.trim() !== "")
      )]
      : [];
  
  const [activeCategory, setActiveCategory] = useState("All");
  useEffect(() => {
    setActiveCategory("All");
  }, [type]);
  
  const filtered = activeCategory === "All" ? filteredByType : filteredByType.filter(file => file.category === activeCategory);
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
      <Box>
        <Typography variant="h2" sx={{fontWeight: "Bold"}}>
          {type ? capitalizeFirstLetter(type) : "All"}
        </Typography>
        {categories.length > 0 && (
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
              {categories.map(category => (
                  <Button
                      key={category}
                      color={"black"}
                      // variant="outlined"
                      variant={activeCategory === category ? "contained" : "outlined"}
                      onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
              ))}
            </Box>
        )}
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
