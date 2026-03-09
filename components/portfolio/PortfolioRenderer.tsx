"use client";

import type { PortfolioSections } from "@/types/portfolio";
import { getTheme } from "@/themes";
import { ThemeSwitcher } from "@/components/portfolio/ThemeSwitcher";

interface PortfolioRendererProps {
    themeId: string;
    portfolioId: string;
    title: string;
    headline: string | null;
    avatar: string | null;
    sections: PortfolioSections;
    isOwner: boolean;
}

export function PortfolioRenderer({
    themeId,
    portfolioId,
    title,
    headline,
    avatar,
    sections,
    isOwner,
}: PortfolioRendererProps) {
    // Resolved on the client — no non-serializable values cross the server/client boundary
    const theme = getTheme(themeId);
    const { Layout, Hero, Experience, Projects, Skills, Education, Contact } = theme.components;

    return (
        <Layout>
            {/* Theme switcher — only visible to the portfolio owner */}
            {isOwner && (
                <ThemeSwitcher portfolioId={portfolioId} currentThemeId={theme.id} />
            )}

            <Hero
                name={title}
                headline={headline}
                avatar={avatar}
                summary={sections.summary}
            />

            {sections.experience?.length > 0 && (
                <Experience experience={sections.experience} />
            )}

            {sections.projects?.length > 0 && (
                <Projects projects={sections.projects} />
            )}

            {sections.skills?.length > 0 && (
                <Skills skills={sections.skills} />
            )}

            {sections.education?.length > 0 && (
                <Education education={sections.education} />
            )}

            {sections.contact && (
                <Contact contact={sections.contact} />
            )}

            {/* Powered-by footer */}
            <footer className="border-t border-current/10 px-6 py-8 text-center text-xs opacity-40">
                Built with{" "}
                <a href="/" className="underline hover:opacity-80">
                    Resume-to-Portfolio
                </a>{" "}
                · Turn your résumé into a portfolio in 30 seconds
            </footer>
        </Layout>
    );
}
