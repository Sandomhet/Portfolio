import {Box, Divider, IconButton, Typography} from "@mui/material";
import quotes from "../assets/quoteStorage.json";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import {useState} from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import {grey} from "@mui/material/colors";

export default function QuoteWidget() {
  const randomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };
  const [quote, setQuote] = useState(randomQuote);
  const refreshQuote = () => {
    setQuote(randomQuote);
  };
  
  return (
      <Box
          sx={{
            // border: 1,
            background: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
          }}
      >
        <Box
            sx={{
              background: grey[300],
              display: "flex",
              justifyContent: "space-between",
            }}
        >
          <Box sx={{padding: 1}}>
            <MenuBookOutlinedIcon/>
          </Box>
          <Box sx={{padding: 0.5, justifySelf: 'center'}}>
            <Typography variant="h6" sx={{fontWeight: "Bold"}}>
              Quote of the Day
            </Typography>
          </Box>
          <IconButton onClick={refreshQuote}>
            <RefreshIcon/>
          </IconButton>
        </Box>
        <Divider/>
        <Box sx={{padding: 0.7}}>
          <Box sx={{color: "text.primary", fontSize: 16}}>{quote.quote}</Box>
          <Box
              sx={{
                textAlign: "right",
                color: "text.secondary",
                fontSize: 13,
                padding: 0.1,
              }}
          >
            {quote.writer && <span>--{quote.writer} <br/></span>}
            <span style={{fontStyle: "italic"}}>{quote.source}</span>
          </Box>
        </Box>
      
      </Box>
  );
}
