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
  CloudSun,
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
    title: "Weather Forecast App",
    description: "A clean and modern weather application that provides real-time weather data and forecasts for any location worldwide, using a third-party weather API.",
    tech: ["React", "TypeScript", "Tailwind CSS", "REST API"],
    imageId: "project-weather",
    liveUrl: "https://studio--studio-7002244696-f3e59.us-central1.hosted.app",
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
    imageUrl: "https://placehold.co/400x400/3F51B5/FFFFFF?text=LAG&font=playfairdisplay",
    imageHint: "man portrait",
  },
  {
    id: "project-weather",
    description: "Screenshot of a weather forecast application",
    imageUrl: "https://picsum.photos/seed/weather-app/600/400",
    imageHint: "weather forecast",
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
