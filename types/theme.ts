import type { ComponentType, ReactNode } from "react";
import type { PortfolioSections, Experience, Education, Project, Contact } from "./portfolio";

// ─── Per-section prop shapes ─────────────────────────────────────────────────

export interface HeroProps {
    name: string;
    headline: string | null;
    avatar: string | null;
    summary: string;
}

export interface ExperienceProps {
    experience: Experience[];
}

export interface ProjectsProps {
    projects: Project[];
}

export interface SkillsProps {
    skills: string[];
}

export interface EducationProps {
    education: Education[];
}

export interface ContactProps {
    contact: Contact;
}

export interface LayoutProps {
    children: ReactNode;
}

// ─── Theme Component Bundle ───────────────────────────────────────────────────

export interface ThemeComponents {
    Layout: ComponentType<LayoutProps>;
    Hero: ComponentType<HeroProps>;
    Experience: ComponentType<ExperienceProps>;
    Projects: ComponentType<ProjectsProps>;
    Skills: ComponentType<SkillsProps>;
    Education: ComponentType<EducationProps>;
    Contact: ComponentType<ContactProps>;
}

// ─── Theme Descriptor ────────────────────────────────────────────────────────

export interface ThemeDescriptor {
    id: string;
    name: string;
    description: string;
    /** Emoji or short string for the theme switcher preview */
    badge: string;
    /** Tailwind background color for preview swatch */
    swatchClass: string;
    components: ThemeComponents;
}
