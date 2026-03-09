"use client";

import { useState } from "react";
import { Globe, Trash2, ExternalLink, Copy } from "lucide-react";
import { togglePublishPortfolio, deletePortfolio } from "@/actions/portfolio";
import { Portfolio } from "@prisma/client";

export function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
    const [isPublishing, setIsPublishing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [published, setPublished] = useState(portfolio.isPublished);

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
        const url = `${window.location.origin}/portfolio/${portfolio.slug}/${portfolio.id}`;
        navigator.clipboard.writeText(url);
        alert("Link copied!");
    };

    const portfolioUrl = `/portfolio/${portfolio.slug}/${portfolio.id}`;

    if (isDeleting) return null;

    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/50 transition-all hover:bg-slate-900/60">
            {/* Header / Preview gradient */}
            <div className="h-24 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 relative">
                {published && (
                    <div className="absolute top-3 right-3 bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                        Live
                    </div>
                )}
                {!published && (
                    <div className="absolute top-3 right-3 bg-slate-800/80 text-slate-400 text-xs px-2.5 py-1 rounded-full border border-slate-700/50">
                        Draft
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-white mb-1 truncate">{portfolio.title}</h3>
                <p className="text-sm text-slate-400 mb-6 truncate">{portfolio.headline || "No headline"}</p>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleToggle}
                        disabled={isPublishing}
                        className="flex-1 rounded-lg border border-slate-700/50 bg-slate-800/50 p-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                        <Globe size={16} className={published ? "text-emerald-400" : "text-slate-500"} />
                        {published ? "Unpublish" : "Publish"}
                    </button>
                    <a
                        href={portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 p-2 text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                        title="View Live"
                    >
                        <ExternalLink size={18} />
                    </a>
                    <button
                        onClick={handleCopy}
                        className="rounded-lg p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Copy Link"
                    >
                        <Copy size={18} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="rounded-lg p-2 text-red-500/70 hover:text-red-400 hover:bg-red-500/10 transition-colors ml-auto"
                        title="Delete Portfolio"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
