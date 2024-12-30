import { Card, CardContent, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const predesigntheme = {
  borderRadius: 4,
  boxShadow: 3,
};

export default function PreviewWidget({ file }) {
  return (
    <Link
      component={RouterLink}
      to={`/${file.category}/${file.name}`}
      underline="none"
    >
      <Card variant="outlined" sx={predesigntheme}>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {file.time}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {file.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "gray" }}>
            {file.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
