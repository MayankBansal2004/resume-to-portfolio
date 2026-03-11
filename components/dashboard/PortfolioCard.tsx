"use client";

import { useState } from "react";
import { Globe, Trash2, ExternalLink, Copy, Check, Info } from "lucide-react";
import { togglePublishPortfolio, deletePortfolio } from "@/actions/portfolio";
import { Portfolio } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function PortfolioCard({ portfolio, index = 0 }: { portfolio: Portfolio, index?: number }) {
    const [isPublishing, setIsPublishing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [published, setPublished] = useState(portfolio.isPublished);
    const [copied, setCopied] = useState(false);

    const handleToggle = async () => {
        setIsPublishing(true);
        try {
            await togglePublishPortfolio(portfolio.id, !published);
            setPublished(!published);
        } catch (error) {
            console.error(error);
        } finally {
            setIsPublishing(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this portfolio? This cannot be undone.")) return;
        setIsDeleting(true);
        try {
            await deletePortfolio(portfolio.id);
        } catch (error) {
            console.error(error);
            setIsDeleting(false);
        }
    };

    const handleCopy = () => {
        const urlToCopy = portfolio.publicId
            ? `${window.location.origin}/p/${portfolio.publicId}`
            : `${window.location.origin}/portfolio/${portfolio.slug}/${portfolio.id}`;

        navigator.clipboard.writeText(urlToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const portfolioUrl = `/portfolio/${portfolio.slug}/${portfolio.id}`;

    // Theme-based colors for the mini-preview
    const themeColors: Record<string, string> = {
        modern: "from-blue-500 to-cyan-400 bg-slate-900 border-slate-700",
        minimal: "from-zinc-200 to-zinc-400 bg-white border-zinc-200",
        creative: "from-fuchsia-500 to-pink-500 bg-indigo-950 border-indigo-800",
        professional: "from-slate-700 to-slate-900 bg-slate-100 border-slate-300"
    };

    const previewClasses = themeColors[portfolio.theme] || themeColors.modern;

    if (isDeleting) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-indigo-500/10"
        >
            {/* Header / Premium Mock Browser Preview */}
            <div className={`relative h-36 w-full overflow-hidden border-b border-white/10 bg-gradient-to-br ${previewClasses} p-4`}>
                {/* Mock Browser Dots */}
                <div className="flex gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 shadow-[0_0_8px_rgba(248,113,113,0.5)]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                </div>

                {/* Mock UI Elements matching theme */}
                <div className="flex flex-col gap-2 opacity-80">
                    <div className="flex justify-between items-center group-hover:px-2 transition-all duration-500">
                        <div className="w-1/2 h-4 rounded bg-white/20 backdrop-blur-sm"></div>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm"></div>
                    </div>
                    <div className="w-3/4 h-3 rounded bg-white/10 mt-2 ml-auto mr-auto transition-all duration-500 group-hover:w-full"></div>
                    <div className="w-1/2 h-3 rounded bg-white/10 ml-auto mr-auto"></div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3 z-10 flex gap-2">
                    <AnimatePresence>
                        {published ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 backdrop-blur-md"
                            >
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></div>
                                Live
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-1.5 rounded-full border border-slate-500/30 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-400 backdrop-blur-md"
                            >
                                <Info size={12} />
                                Draft
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* View Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <Link href={portfolioUrl} className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm text-white backdrop-blur-md hover:bg-white/20 flex items-center gap-2">
                        <ExternalLink size={16} /> Open Editor
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-5 justify-between">
                <div className="mb-6">
                    <h3 className="mb-1 truncate text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-indigo-300">
                        {portfolio.title}
                    </h3>
                    <p className="truncate text-sm text-slate-400">
                        {portfolio.headline || "No headline generated"}
                    </p>
                    <div className="mt-3 flex gap-2 items-center">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-slate-300 uppercase tracking-wider">
                            {portfolio.theme}
                        </span>
                        {portfolio.publicId && published && (
                            <span className="text-xs text-indigo-400/80 flex items-center gap-1">
                                <Globe size={10} /> Public
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleToggle}
                        disabled={isPublishing}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl border p-2 text-sm font-medium transition-all duration-200 active:scale-95 ${published
                                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                : "border-slate-700/50 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white"
                            }`}
                    >
                        {isPublishing ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        ) : (
                            <Globe size={16} />
                        )}
                        {published ? "Unpublish" : "Publish"}
                    </button>

                    <button
                        onClick={handleCopy}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white active:scale-95"
                        title={portfolio.publicId ? "Copy Public Link" : "Copy Private Link"}
                    >
                        {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                    </button>

                    <button
                        onClick={handleDelete}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/5 text-red-400/70 transition-all hover:bg-red-500/20 hover:text-red-400 active:scale-95 ml-auto"
                        title="Delete Portfolio"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
