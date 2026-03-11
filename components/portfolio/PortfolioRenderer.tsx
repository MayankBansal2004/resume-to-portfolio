"use client";

import type { PortfolioSections } from "@/types/portfolio";
import { getTheme } from "@/themes";
import { ThemeSwitcher } from "@/components/portfolio/ThemeSwitcher";
import Link from "next/link";
import { Home } from "lucide-react";

interface PortfolioRendererProps {
    themeId: string;
    portfolioId: string;
    publicId: string | null;
    title: string;
    headline: string | null;
    avatar: string | null;
    sections: PortfolioSections;
    isOwner: boolean;
}

export function PortfolioRenderer({
    themeId,
    portfolioId,
    publicId,
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
            {/* Home Navigation — Top Left */}
            <div className="fixed top-5 left-5 z-50 flex gap-2">
                <Link
                    href="/"
                    className="flex h-10 w-10 sm:h-10 sm:w-auto items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 backdrop-blur-md sm:px-4 text-sm font-medium text-zinc-100 shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all hover:bg-zinc-800 active:scale-95"
                >
                    <Home size={16} />
                    <span className="hidden sm:inline">Home</span>
                </Link>
                {isOwner && (
                    <Link
                        href="/dashboard"
                        className="flex h-10 w-10 sm:h-10 sm:w-auto items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/80 backdrop-blur-md sm:px-4 text-sm font-medium text-indigo-300 shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all hover:bg-zinc-700 active:scale-95"
                    >
                        <span className="hidden sm:inline">Dashboard</span>
                        <span className="sm:hidden">D</span>
                    </Link>
                )}
            </div>

            {/* Theme switcher — visible to everyone so they can preview themes */}
            <ThemeSwitcher portfolioId={portfolioId} publicId={publicId} currentThemeId={theme.id} isOwner={isOwner} />

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
