"use client";
import { useState, useTransition, useEffect } from "react";
import { type ThemeDescriptor } from "@/types/theme";
import { THEMES } from "@/themes";
import { Check, Share2, Link as LinkIcon } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { generatePublicLink, removePublicLink } from "@/actions/portfolio";

interface ThemeSwitcherProps {
    portfolioId: string;
    publicId: string | null;
    currentThemeId: string;
    isOwner?: boolean;
}

async function saveTheme(portfolioId: string, themeId: string) {
    await fetch(`/api/portfolio/${portfolioId}/theme`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themeId }),
    });
    // Reload to apply the newly saved theme (server-rendered)
    window.location.reload();
}

export function ThemeSwitcher({ portfolioId, publicId, currentThemeId, isOwner = false }: ThemeSwitcherProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // For guests, we might have a theme in the URL
    const urlTheme = searchParams?.get("theme");
    const initialTheme = (!isOwner && urlTheme) ? urlTheme : currentThemeId;

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(initialTheme);
    const [isPending, startTransition] = useTransition();
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (!isOwner && urlTheme) {
            setSelected(urlTheme);
        }
    }, [urlTheme, isOwner]);

    const handleSelect = (theme: ThemeDescriptor) => {
        if (theme.id === selected) return;

        setSelected(theme.id);
        setOpen(false);

        if (isOwner) {
            startTransition(async () => {
                await saveTheme(portfolioId, theme.id);
            });
        } else {
            // For guests, update the URL query parameter to preview the theme
            // The Next.js page should read the searchParam and pass it down
            const params = new URLSearchParams(searchParams?.toString() ?? "");
            params.set("theme", theme.id);
            router.push(`${pathname}?${params.toString()}`);
        }
    };

    const handleCopyLink = () => {
        const urlToCopy = publicId
            ? `${window.location.origin}/p/${publicId}`
            : window.location.href; // Fallback

        navigator.clipboard.writeText(urlToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            await generatePublicLink(portfolioId);
            // After generating, the page should revalidate and they can copy it.
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <>
            {/* Backdrop */}
            {open && (
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            )}

            {/* Switcher & Actions */}
            <div className="fixed top-5 right-5 z-50 flex items-center gap-3">
                {/* Share Button */}
                {isOwner && (
                    !publicId ? (
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="flex items-center justify-center gap-2 h-10 px-4 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 font-medium shadow-[0_4px_24px_rgba(139,92,246,0.2)] transition-all hover:bg-violet-500/20 active:scale-95 backdrop-blur-md disabled:opacity-50"
                            title="Generate public link"
                        >
                            <LinkIcon size={16} />
                            <span className="hidden sm:inline text-sm">
                                {isGenerating ? "Generating..." : "Generate Public Link"}
                            </span>
                        </button>
                    ) : (
                        <button
                            onClick={handleCopyLink}
                            className="flex items-center justify-center gap-2 h-10 w-10 sm:h-10 sm:w-auto sm:px-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium shadow-[0_4px_24px_rgba(16,185,129,0.2)] transition-all hover:bg-emerald-500/20 active:scale-95 backdrop-blur-md"
                            title="Copy public link"
                        >
                            {copied ? <Check size={16} /> : <Share2 size={16} />}
                            <span className="hidden sm:inline text-sm">{copied ? "Copied!" : "Share Link"}</span>
                        </button>
                    )
                )}

                {/* Theme trigger button */}
                <button
                    onClick={() => setOpen(o => !o)}
                    className="flex h-10 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 backdrop-blur-md px-4 py-2 text-sm font-medium text-zinc-100 shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all hover:bg-zinc-800 active:scale-95"
                    aria-label="Switch theme"
                >
                    <span className="text-base">{THEMES.find(t => t.id === selected)?.badge ?? "◻"}</span>
                    <span className="hidden sm:inline">
                        {THEMES.find(t => t.id === selected)?.name ?? "Theme"}
                    </span>
                    <svg
                        className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown panel */}
                {open && (
                    <div
                        className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                        style={{
                            background: "rgba(15, 23, 42, 0.85)",
                            backdropFilter: "blur(24px)",
                        }}
                    >
                        <div className="border-b border-white/10 px-4 py-3">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Choose Theme</p>
                        </div>

                        {THEMES.map(theme => {
                            const isActive = theme.id === selected;
                            return (
                                <button
                                    key={theme.id}
                                    onClick={() => handleSelect(theme)}
                                    disabled={isPending}
                                    className={`w-full flex items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-white/8 ${isActive ? "bg-white/5" : ""}`}
                                >
                                    {/* Swatch */}
                                    <div className={`h-8 w-8 shrink-0 rounded-lg ${theme.swatchClass}`} />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold text-white">{theme.name}</p>
                                            {isActive && (
                                                <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                                                    Active
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-400 truncate mt-0.5">{theme.description}</p>
                                    </div>

                                    {/* Check */}
                                    {isActive && (
                                        <svg className="h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                            );
                        })}

                        {isPending && (
                            <div className="border-t border-white/10 px-4 py-2 text-center text-xs text-slate-400">
                                Saving theme…
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
