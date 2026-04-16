import {Box, IconButton, Tooltip} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import CodeIcon from "@mui/icons-material/Code";

const LINKS = [
  {
    href: "https://github.com/Sandomhet",
    Icon: GitHubIcon,
    label: "GitHub",
    hoverColor: "#ffffff",
    hoverBg: "rgba(255,255,255,0.1)",
  },
  {
    href: "https://www.linkedin.com/in/shaojia-zhang/",
    Icon: LinkedInIcon,
    label: "LinkedIn",
    hoverColor: "#0A66C2",
    hoverBg: "rgba(10,102,194,0.12)",
  },
  {
    href: "https://leetcode.com/u/sandomhet/",
    Icon: CodeIcon,
    label: "LeetCode",
    hoverColor: "#FFA116",
    hoverBg: "rgba(255,161,22,0.12)",
  },
  {
    href: "mailto:sandomhet@gmail.com",
    Icon: EmailIcon,
    label: "Email",
    hoverColor: "#EA4335",
    hoverBg: "rgba(234,67,53,0.12)",
  },
];

export default function ExternalLinks({inline}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: inline ? "flex-start" : "center",
        gap: 0.25,
        mb: inline ? 0 : 2,
        mt: inline ? 0.5 : 0,
      }}
    >
      {LINKS.map(({href, Icon, label, hoverColor, hoverBg}) => (
        <Tooltip key={label} title={label} placement="bottom" arrow>
          <IconButton
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            sx={{
              color: "text.disabled",
              transition: "all 0.2s ease",
              "&:hover": {
                color: hoverColor,
                background: hoverBg,
                transform: "translateY(-2px)",
              },
            }}
          >
            <Icon sx={{fontSize: 20}}/>
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}
