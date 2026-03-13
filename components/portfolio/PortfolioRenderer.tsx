"use client";

import { useMemo, useState } from "react";
import type { AtsInsights, PortfolioSections } from "@/types/portfolio";
import { getTheme } from "@/themes";
import { ThemeSwitcher } from "@/components/portfolio/ThemeSwitcher";
import { RecruiterView } from "@/components/portfolio/RecruiterView";
import Link from "next/link";
import { ExternalLink, FileText, Home, Sparkles, TrendingUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    if (ext === "pdf") return `${fileUrl}#navpanes=0&view=FitH`;
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

    // Framer motion variants for the drawer
    const drawerVariants = {
        hidden: { x: "100%", opacity: 0.5 },
        visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 30, stiffness: 300 } },
        exit: { x: "100%", opacity: 0.5, transition: { type: "spring", damping: 30, stiffness: 300 } }
    };

    return (
        <Layout>
            {/* Drawer with scale down effect on main layout */}
            <div 
                className="transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] origin-left min-h-screen"
                style={{ 
                    width: showPreview ? "50vw" : "100%",
                }}
            >
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
            <ThemeSwitcher portfolioId={portfolioId} publicId={publicId} currentThemeId={theme.id} isOwner={isOwner} previewActive={showPreview} />

            {showAtsInsights && atsInsights && showInsights && (
                <div 
                    className={`fixed top-20 z-50 w-[min(92vw,380px)] rounded-2xl border bg-zinc-900/80 p-4 text-zinc-100 backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${panelStyle.border} ${panelStyle.glow}`}
                    style={{ right: showPreview ? "calc(50vw + 1rem)" : "1rem" }}
                >
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
                    className={`fixed top-20 z-50 inline-flex items-center gap-2 rounded-full border bg-zinc-900/80 px-3 py-2 text-xs font-medium text-zinc-100 backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${panelStyle.border}`}
                    style={{ right: showPreview ? "calc(50vw + 1rem)" : "1rem" }}
                >
                    <Sparkles size={13} /> Show ATS insights
                </button>
            )}

            {resumeDocument && (
                <button
                    onClick={() => setShowPreview(true)}
                    className={`fixed bottom-5 z-50 inline-flex items-center gap-2 rounded-full border bg-zinc-900/85 px-4 py-2.5 text-sm font-medium text-zinc-100 backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-zinc-800/90 ${panelStyle.border} ${showPreview ? 'hidden' : ''}`}
                    style={{ right: "1.25rem" }}
                >
                    <FileText size={15} />
                    Preview raw resume
                </button>
            )}

            {publicId && <RecruiterView publicId={publicId} themeId={theme.id} previewActive={showPreview} />}

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
                <Link href="/" className="underline hover:opacity-80">
                    Resume-to-Portfolio
                </Link>{" "}
                · Turn your résumé into a portfolio in 30 seconds
            </footer>
            </div>

            <AnimatePresence>
                {showPreview && resumeDocument && (
                    <div className="fixed inset-0 z-[100] flex justify-end pointer-events-none">
                        <motion.div
                            variants={drawerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`relative z-10 flex h-full w-[50vw] flex-col border-l bg-zinc-950 shadow-[-20px_0_80px_rgba(0,0,0,0.5)] pointer-events-auto ${panelStyle.border}`}
                        >
                            <div className={`flex items-center justify-between border-b px-6 py-4 bg-white/5 ${panelStyle.border}`}>
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.15em] text-zinc-400">Raw Document</p>
                                    <h3 className="mt-1 truncate text-sm font-semibold text-white max-w-[300px] sm:max-w-md">{resumeDocument.filename}</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <a
                                        href={resumeDocument.fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/10 hover:text-white"
                                    >
                                        Open New Tab <ExternalLink size={14} />
                                    </a>
                                    <button
                                        onClick={() => setShowPreview(false)}
                                        className="rounded-full bg-black/20 p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                                        aria-label="Close resume preview"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-hidden bg-black/20">
                                {previewUrl ? (
                                    <object 
                                        data={previewUrl} 
                                        type="application/pdf" 
                                        className="h-full w-full rounded-b-none border-none bg-white"
                                        aria-label="Resume preview"
                                    >
                                        <embed src={previewUrl} type="application/pdf" className="h-full w-full rounded-b-none border-none bg-white" />
                                    </object>
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-zinc-300">
                                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border ${panelStyle.border}`}>
                                            <FileText size={32} className="opacity-80" />
                                        </div>
                                        <p className="text-sm font-medium">Preview is not directly supported for this file type.</p>
                                        <p className="max-w-xs text-xs text-zinc-500">You can still download or open the original raw file directly.</p>
                                        <a
                                            href={resumeDocument.fileUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
                                        >
                                            Open raw resume
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Layout>
    );
}
