// Everything personal lives here so the About page and footer stay easy to edit.

export const profile = {
  name: "Samuel Zhang",
  handle: "Sandomhet",
  short: "Sandom",
  tagline: "Student · Developer",
  avatar: "/avatar.jpg",
  email: "sandomhet@gmail.com",
  // TODO(Samuel): replace with your own words. Kept to facts the site itself shows.
  intro:
    "I write down what I learn: competitive programming notes and C++ templates, class notes from CS, math and physics courses, and the occasional essay.",
  about: [
    "This site is my notebook in public. Most of it grew out of preparing for ICPC style contests, where a clean, trusted template is worth a lot, and out of turning lecture material into notes I can actually revise from.",
    "Alongside the technical side I keep a small set of literature essays, written in English, about books, identity and the media we live in.",
  ],
};

export type SocialLink = {label: string; href: string; icon: "github" | "linkedin" | "leetcode" | "mail"};

export const socials: SocialLink[] = [
  {label: "GitHub", href: "https://github.com/Sandomhet", icon: "github"},
  {label: "LinkedIn", href: "https://www.linkedin.com/in/shaojia-zhang/", icon: "linkedin"},
  {label: "LeetCode", href: "https://leetcode.com/u/sandomhet/", icon: "leetcode"},
  {label: "Email", href: "mailto:sandomhet@gmail.com", icon: "mail"},
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
  AI: "AI",
};

export const categoryName = (c: string) => categoryNames[c] ?? c.replace(/-/g, " ");
