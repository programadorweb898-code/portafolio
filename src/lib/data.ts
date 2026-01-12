import {
  Linkedin,
  Github,
  type LucideIcon,
} from "lucide-react";

// Importar logos reales de tecnologías
import { 
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaGitAlt,
} from 'react-icons/fa';

import {
  SiNextdotjs,
  SiTypescript,
  SiFirebase,
  SiTailwindcss,
  SiMui,
  SiMongodb,
  SiN8N,
} from 'react-icons/si';

import { TbSparkles } from 'react-icons/tb';
import type { IconType } from 'react-icons';

type Skill = {
  name: string;
  icon: IconType;
  color?: string;
};

export const skills: Skill[] = [
  { name: "HTML", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
  { name: "Python", icon: FaPython, color: "#3776AB" },
  { name: "React / React Native", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
  { name: "Material UI", icon: SiMui, color: "#007FFF" },
  { name: "SQL & NoSQL", icon: SiMongodb, color: "#47A248" },
  { name: "Git & GitHub", icon: FaGitAlt, color: "#F05032" },
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
    tech: ["React", "TypeScript", "Tailwind CSS", "REST API"],
    imageId: "project-weather",
    liveUrl: "https://clima-5nko.onrender.com",
    repoUrl: "#",
  },
  {
    title: "Gestor de Cuentas de Deudores",
    description: "Una aplicación colaborativa para gestionar cuentas de deudores, realizar seguimiento de pagos y administrar información financiera de manera eficiente.",
    tech: ["React", "Firebase", "Tailwind CSS", "Node.js"],
    imageId: "project-dashboard",
    liveUrl: "https://debttracker-repo-1.onrender.com",
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
    description: "Retrato de Luis Alberto Gómez",
    imageUrl: "https://placehold.co/400x400/3F51B5/FFFFFF?text=LAG&font=playfairdisplay",
    imageHint: "man portrait",
  },
  {
    id: "project-weather",
    description: "Captura de pantalla de la aplicación del clima",
    imageUrl: "/copilot_image_1768194640523.jpeg",
    imageHint: "weather forecast application",
  },
  {
    id: "project-dashboard",
    description: "Captura de pantalla del gestor de cuentas de deudores",
    imageUrl: "/debtTracker_image.jpeg",
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
