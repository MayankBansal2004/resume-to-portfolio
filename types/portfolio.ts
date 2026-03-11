import { z } from "zod";

export const ExperienceSchema = z.object({
    title: z.string(),
    company: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.array(z.string()),
});

export const EducationSchema = z.object({
    degree: z.string(),
    institution: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

export const ProjectSchema = z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().optional(),
    technologies: z.array(z.string()).optional(),
});

export const ContactSchema = z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
});

export const PortfolioSchema = z.object({
    name: z.string().optional(),
    summary: z.string(),
    experience: z.array(ExperienceSchema),
    education: z.array(EducationSchema),
    skills: z.array(z.string()),
    projects: z.array(ProjectSchema),
    contact: ContactSchema,
});

export type PortfolioSections = z.infer<typeof PortfolioSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Contact = z.infer<typeof ContactSchema>;
