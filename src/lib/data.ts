import {
  Atom,
  AppWindow,
  ServerCog,
  Code,
  Cloud,
  Wind,
  Database,
  GitMerge,
  Linkedin,
  Github,
  Twitter,
  type LucideIcon,
  Sparkles,
} from "lucide-react";

type Skill = {
  name: string;
  icon: LucideIcon;
};

export const skills: Skill[] = [
  { name: "React / React Native", icon: Atom },
  { name: "Next.js", icon: AppWindow },
  { name: "Node.js", icon: ServerCog },
  { name: "TypeScript", icon: Code },
  { name: "Firebase", icon: Cloud },
  { name: "Tailwind CSS", icon: Wind },
  { name: "SQL & NoSQL", icon: Database },
  { name: "Git & GitHub", icon: GitMerge },
];

type Project = {
  title: string;
  description: string;
  tech: string[];
  imageId: string;
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
    {
    title: "AI-Powered Portfolio",
    description: "An interactive personal portfolio built in Firebase Studio, featuring a voice-enabled AI assistant to answer questions and navigate the site.",
    tech: ["Next.js", "Genkit", "Firebase", "Tailwind CSS", "ShadCN UI"],
    imageId: "project-portfolio-ai",
    liveUrl: "/",
  },
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce website with a custom CMS for product management, user authentication, and a Stripe-powered checkout process.",
    tech: ["Next.js", "React", "TypeScript", "Node.js", "Stripe", "PostgreSQL"],
    imageId: "project-ecommerce",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Management Dashboard",
    description: "A collaborative dashboard for teams to manage tasks, track project progress, and communicate in real-time. Built with a focus on UX.",
    tech: ["React", "Firebase", "Tailwind CSS", "Chart.js"],
    imageId: "project-dashboard",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Mobile Fitness App",
    description: "A cross-platform mobile application for tracking workouts, setting fitness goals, and connecting with a community of users.",
    tech: ["React Native", "TypeScript", "Firebase Auth", "Firestore"],
    imageId: "project-fitness",
    repoUrl: "#",
  },
];

type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const placeholderImages: ImagePlaceholder[] = [
  {
    id: "hero-portrait",
    description: "Portrait of Luis Alberto Gómez",
    imageUrl: "https://picsum.photos/seed/luis-portrait/400/400",
    imageHint: "man portrait",
  },
  {
    id: "project-portfolio-ai",
    description: "Screenshot of the AI-powered portfolio website",
    imageUrl: "https://picsum.photos/seed/portfolio-view/600/400",
    imageHint: "portfolio website",
  },
  {
    id: "project-ecommerce",
    description: "Screenshot of an e-commerce website",
    imageUrl: "https://picsum.photos/seed/ecom-app/600/400",
    imageHint: "online store",
  },
  {
    id: "project-dashboard",
    description: "Screenshot of a project management dashboard",
    imageUrl: "https://picsum.photos/seed/dash-app/600/400",
    imageHint: "dashboard chart",
  },
  {
    id: "project-fitness",
    description: "Screenshot of a mobile fitness application",
    imageUrl: "https://picsum.photos/seed/fit-app/600/400",
    imageHint: "mobile app",
  },
];

type SocialLink = {
  name: string;
  url: string;
  icon: LucideIcon;
};

export const socialLinks: SocialLink[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/", icon: Linkedin },
  { name: "GitHub", url: "https://github.com/", icon: Github },
  { name: "Twitter", url: "https://twitter.com/", icon: Twitter },
];

type NavLink = {
    href: string;
    label: string;
};

export const navLinks: NavLink[] = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
]
