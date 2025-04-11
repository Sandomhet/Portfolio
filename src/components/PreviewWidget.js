import {Card, CardContent, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";
import {deepPurple} from "@mui/material/colors";

export default function PreviewWidget({file}) {
  return (
      <Link
          component={RouterLink}
          to={`/${file.type}/${file.name}`}
          underline="none"
      >
        <Card variant="outlined" className={"cardStyle"} sx={{
          borderRadius: 5,
          boxShadow: 5,
        }}>
          <CardContent>
            <Typography
                gutterBottom
                sx={{color: "text.secondary", fontSize: 14}}
            >
              {file.time}
            </Typography>
            <Typography variant="h4" sx={{fontWeight: "bold"}}>
              {file.title}
            </Typography>
            <Typography variant="body1" sx={{color: "gray"}}>
              {file.description}
            </Typography>
          </CardContent>
        </Card>
      </Link>
  );
}
