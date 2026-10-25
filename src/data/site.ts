// Everything personal lives here so the profile and About me text stay easy to edit.

export const profile = {
  name: "Samuel (Shaojia) Zhang",
  handle: "Sandomhet",
  short: "Sandom",
  avatar: "/avatar.jpg",
  // Two short lines under the name in the profile card.
  focus: ["Backend · Databases · Full stack", "AI agents & LLM training"],
  email: "sandomhet@gmail.com",
  about: [
    "I love programming and shipping *reliable products*. My focus is on backend systems and databases, and I'm comfortable working across the full stack, including frontend. I'm also interested in AI agent development and LLM training.",
    "I've led engineering teams, and I care about both the product as a whole and the technical details underneath it. I enjoy taking ownership of problems and keeping a team coordinated around solving them.",
  ],
};

export type SocialLink = {label: string; handle: string; href: string; icon: "github" | "linkedin" | "leetcode" | "mail"};

export const socials: SocialLink[] = [
  {label: "GitHub", handle: "Sandomhet", href: "https://github.com/Sandomhet", icon: "github"},
  {label: "LinkedIn", handle: "shaojia-zhang", href: "https://www.linkedin.com/in/shaojia-zhang/", icon: "linkedin"},
  {label: "LeetCode", handle: "sandomhet", href: "https://leetcode.com/u/sandomhet/", icon: "leetcode"},
  {label: "Email", handle: "sandomhet@gmail.com", href: "mailto:sandomhet@gmail.com", icon: "mail"},
];

export type SectionKey = "code" | "notes" | "writing" | "blog" | "projects";

export const sections: Record<SectionKey, {label: string; title: string; blurb: string; icon: string}> = {
  code: {
    label: "Code",
    title: "Programming Knowledge",
    blurb: "Algorithms, data structures and battle tested C++ templates.",
    icon: "code",
  },
  notes: {
    label: "Notes",
    title: "Class Notes",
    blurb: "Course notes and cheat sheets across CS, math and physics.",
    icon: "notebook",
  },
  writing: {
    label: "Writing",
    title: "Literature Articles",
    blurb: "Essays on books, identity and the culture around us.",
    icon: "feather",
  },
  blog: {
    label: "Blog",
    title: "Personal Blog",
    blurb: "Life, thoughts and everything in between.",
    icon: "coffee",
  },
  projects: {
    label: "Projects",
    title: "Projects",
    blurb: "Things I have built, with the story behind them.",
    icon: "spark",
  },
};

export const nav: {label: string; href: string}[] = [
  {label: "Home", href: "/"},
  {label: "Code", href: "/code"},
  {label: "Notes", href: "/notes"},
  {label: "Writing", href: "/writing"},
  {label: "Blog", href: "/blog"},
  {label: "Projects", href: "/projects"},
];

// Display names for folder based categories.
export const categoryNames: Record<string, string> = {
  "Data-Structures": "Data Structures",
  "Dynamic-Programming": "Dynamic Programming",
  "PHYS+CHEM": "Physics & Chemistry",
  CMPSC: "Computer Science",
  EECS: "EECS",
  MATH: "Math & Statistics",
};

export const categoryName = (c: string) => categoryNames[c] ?? c.replace(/-/g, " ");

// The /edit page loads and commits Markdown through the GitHub API on this branch.
// Vercel deploys every commit to it, so a save goes live after the next build.
export const editor = {owner: "Sandomhet", repo: "Portfolio", branch: "main"};
