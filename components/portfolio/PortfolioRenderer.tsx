"use client";

import { useMemo, useState } from "react";
import type { AtsInsights, PortfolioSections } from "@/types/portfolio";
import { getTheme } from "@/themes";
import { ThemeSwitcher } from "@/components/portfolio/ThemeSwitcher";
import Link from "next/link";
import { ExternalLink, FileText, Home, Sparkles, TrendingUp, X } from "lucide-react";

interface PortfolioRendererProps {
    themeId: string;
    portfolioId: string;
    publicId: string | null;
    title: string;
    headline: string | null;
    avatar: string | null;
    sections: PortfolioSections;
    isOwner: boolean;
    showAtsInsights: boolean;
    atsInsights: AtsInsights | null;
    resumeDocument: {
        fileUrl: string;
        filename: string;
    } | null;
}

const ownerPanelStyles: Record<string, { border: string; glow: string; badge: string }> = {
    minimalist: {
        border: "border-zinc-600/60",
        glow: "shadow-[0_12px_50px_rgba(0,0,0,0.35)]",
        badge: "from-zinc-700 to-zinc-800",
    },
    nebula: {
        border: "border-indigo-400/30",
        glow: "shadow-[0_14px_55px_rgba(79,70,229,0.35)]",
        badge: "from-indigo-500 to-violet-500",
    },
    aurora: {
        border: "border-emerald-400/30",
        glow: "shadow-[0_14px_55px_rgba(16,185,129,0.3)]",
        badge: "from-emerald-500 to-cyan-500",
    },
    terminal: {
        border: "border-green-400/40",
        glow: "shadow-[0_14px_55px_rgba(74,222,128,0.25)]",
        badge: "from-green-500 to-lime-500",
    },
};

function getPreviewUrl(fileUrl: string, filename: string) {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return fileUrl;
    if (ext === "doc" || ext === "docx") {
        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
    }
    return null;
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
    showAtsInsights,
    atsInsights,
    resumeDocument,
}: PortfolioRendererProps) {
    const [showInsights, setShowInsights] = useState(true);
    const [showPreview, setShowPreview] = useState(false);

    // Resolved on the client — no non-serializable values cross the server/client boundary
    const theme = getTheme(themeId);
    const { Layout, Hero, Experience, Projects, Skills, Education, Contact } = theme.components;
    const panelStyle = ownerPanelStyles[theme.id] ?? ownerPanelStyles.minimalist;
    const previewUrl = useMemo(() => {
        if (!resumeDocument) return null;
        return getPreviewUrl(resumeDocument.fileUrl, resumeDocument.filename);
    }, [resumeDocument]);

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

            {showAtsInsights && atsInsights && showInsights && (
                <div className={`fixed right-4 top-20 z-50 w-[min(92vw,380px)] rounded-2xl border bg-zinc-900/80 p-4 text-zinc-100 backdrop-blur-xl ${panelStyle.border} ${panelStyle.glow}`}>
                    <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">Owner Insights</p>
                            <h3 className="mt-1 text-sm font-semibold text-white">ATS Optimization</h3>
                        </div>
                        <button
                            onClick={() => setShowInsights(false)}
                            className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                            aria-label="Hide insights panel"
                        >
                            <X size={14} />
                        </button>
                    </div>

                    <div className="mb-3 rounded-xl border border-white/10 bg-black/20 p-3">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs text-zinc-300">Current ATS Score</span>
                            <span className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r px-2.5 py-1 text-xs font-semibold text-white ${panelStyle.badge}`}>
                                <TrendingUp size={12} /> {atsInsights.score}/100
                            </span>
                        </div>
                        <p className="text-xs text-zinc-400">{atsInsights.summary ?? "AI analyzed your resume and found key improvement areas."}</p>
                    </div>

                    <div className="space-y-2">
                        {atsInsights.suggestions.slice(0, 6).map((item, idx) => (
                            <div key={`${item.title}-${idx}`} className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <p className="flex items-center gap-2 text-sm font-medium text-zinc-100">
                                    <Sparkles size={13} className="text-indigo-300" />
                                    {item.title}
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-zinc-400">{item.detail}</p>
                            </div>
                        ))}
                    </div>

                </div>
            )}

            {showAtsInsights && !showInsights && atsInsights && (
                <button
                    onClick={() => setShowInsights(true)}
                    className={`fixed right-4 top-20 z-50 inline-flex items-center gap-2 rounded-full border bg-zinc-900/80 px-3 py-2 text-xs font-medium text-zinc-100 backdrop-blur-xl ${panelStyle.border}`}
                >
                    <Sparkles size={13} /> Show ATS insights
                </button>
            )}

            {resumeDocument && (
                <button
                    onClick={() => setShowPreview(true)}
                    className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border bg-zinc-900/85 px-4 py-2.5 text-sm font-medium text-zinc-100 backdrop-blur-xl transition hover:bg-zinc-800/90 ${panelStyle.border}`}
                >
                    <FileText size={15} />
                    Preview raw resume
                </button>
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

            {showPreview && resumeDocument && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="relative flex h-[88vh] w-[min(1100px,96vw)] flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-950">
                        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                            <p className="truncate text-sm font-medium text-zinc-100">{resumeDocument.filename}</p>
                            <div className="flex items-center gap-2">
                                <a
                                    href={resumeDocument.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-2.5 py-1.5 text-xs text-zinc-200 hover:bg-white/10"
                                >
                                    Open <ExternalLink size={12} />
                                </a>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white"
                                    aria-label="Close resume preview"
                                >
                                    <X size={15} />
                                </button>
                            </div>
                        </div>

                        {previewUrl ? (
                            <iframe src={previewUrl} className="h-full w-full" title="Resume preview" />
                        ) : (
                            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-zinc-300">
                                <FileText size={28} />
                                <p className="text-sm">Preview is not supported for this file type.</p>
                                <a
                                    href={resumeDocument.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/10"
                                >
                                    Open raw resume
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
}
