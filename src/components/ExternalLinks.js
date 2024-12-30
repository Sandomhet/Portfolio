import { Container } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const LinkButton = ({ reflink, Comp }) => {
  return (
    <a
      href={reflink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "inherit",
        textDecoration: "none",
        filter: "grayscale(100%)",
      }}
    >
      <Comp sx={{ mr: 2 }} />
    </a>
  );
};

export default function ExternalLinks() {
  return (
    <Container sx={{ marginY: 3, display: "flex", justifyContent: "center" }}>
      <LinkButton reflink={"https://github.com/sandom"} Comp={GitHubIcon} />
      <LinkButton
        reflink={"https://www.linkedin.com/in/shaojia-zhang-279007332/"}
        Comp={LinkedInIcon}
      />
      <LinkButton reflink={"sandomhet@gmail.com"} Comp={EmailIcon} />
    </Container>
  );
}
