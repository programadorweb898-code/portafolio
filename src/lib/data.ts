import {
  Linkedin,
  Github,
  type LucideIcon,
} from "lucide-react";

// Importar logos reales de tecnologías
import { SiHtml5 } from 'react-icons/si';
import { SiCss3 } from 'react-icons/si';
import { SiJavascript } from 'react-icons/si';
import { SiPython } from 'react-icons/si';
import { SiReact } from 'react-icons/si';
import { SiNodedotjs } from 'react-icons/si';
import { SiBootstrap } from 'react-icons/si';
import { SiNextdotjs } from 'react-icons/si';
import { SiTypescript } from 'react-icons/si';
import { SiFirebase } from 'react-icons/si';
import { SiTailwindcss } from 'react-icons/si';
import { SiMui } from 'react-icons/si';
import { SiMongodb } from 'react-icons/si';
import { SiGit } from 'react-icons/si';
import { SiN8N } from 'react-icons/si';
import { TbSparkles } from 'react-icons/tb';
import type { IconType } from 'react-icons';

type Skill = {
  name: string;
  icon: IconType;
  color?: string;
};

export const skills: Skill[] = [
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss3, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "React / React Native", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { name: "Material UI", icon: SiMui, color: "#007FFF" },
  { name: "SQL & NoSQL", icon: SiMongodb, color: "#47A248" },
  { name: "Git & GitHub", icon: SiGit, color: "#F05032" },
  { name: "Integración de IA", icon: TbSparkles, color: "#FF6B6B" },
  { name: "n8n", icon: SiN8N, color: "#EA4B71" },
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
    title: "Aplicación del Clima",
    description: "Una aplicación moderna del clima que proporciona datos meteorológicos en tiempo real y pronósticos para cualquier ubicación en el mundo, utilizando una API de clima de terceros.",
    tech: [
      "Next.js 15",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "Google Genkit AI",
      "Shadcn/ui",
      "Lucide Icons",
      "React Hook Form",
      "Zod"
    ],
    imageId: "project-weather",
    liveUrl: "https://studio--studio-7002244696-f3e59.us-central1.hosted.app",
    repoUrl: "https://github.com/programadorweb898-code/clima",
  },
  {
    title: "Gestor de Cuentas de Deudores",
    description: "Una aplicación colaborativa para gestionar cuentas de deudores, realizar seguimiento de pagos y administrar información financiera de manera eficiente.",
    tech: [
      "Next.js 15",
      "React 18",
      "TypeScript",
      "Firebase",
      "Firebase Admin",
      "Firestore",
      "Tailwind CSS",
      "Google Genkit AI",
      "Shadcn/ui",
      "Framer Motion",
      "React Hook Form",
      "Zod"
    ],
    imageId: "project-dashboard",
    liveUrl: "https://debttracker-repo-1.onrender.com",
    repoUrl: "https://github.com/programadorweb898-code/DebtTracker-repo",
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
    description: "Retrato de Luis Alberto Gómez",
    imageUrl: "https://picsum.photos/seed/1/400/400",
    imageHint: "man portrait",
  },
  {
    id: "project-weather",
    description: "Captura de pantalla de la aplicación del clima",
    imageUrl: "https://picsum.photos/seed/2/500/300",
    imageHint: "weather forecast application",
  },
  {
    id: "project-dashboard",
    description: "Captura de pantalla del gestor de cuentas de deudores",
    imageUrl: "https://picsum.photos/seed/3/500/300",
    imageHint: "debt tracker dashboard",
  },
];

type SocialLink = {
  name: string;
  url: string;
  icon: LucideIcon;
};

export const socialLinks: SocialLink[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/luis-programadorweb", icon: Linkedin },
  { name: "GitHub", url: "https://github.com/programadorweb898-code", icon: Github },
];

type NavLink = {
    href: string;
    label: string;
};

export const navLinks: NavLink[] = [
    { href: "#about", label: "Acerca de" },
    { href: "#skills", label: "Habilidades" },
    { href: "#projects", label: "Proyectos" },
    { href: "#contact", label: "Contacto" },
]
