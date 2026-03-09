"use client";
import { useState, useTransition } from "react";
import { type ThemeDescriptor } from "@/types/theme";
import { THEMES } from "@/themes";

interface ThemeSwitcherProps {
    portfolioId: string;
    currentThemeId: string;
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

export function ThemeSwitcher({ portfolioId, currentThemeId }: ThemeSwitcherProps) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(currentThemeId);
    const [isPending, startTransition] = useTransition();

    const handleSelect = (theme: ThemeDescriptor) => {
        if (theme.id === selected) return;
        setSelected(theme.id);
        setOpen(false);
        startTransition(async () => {
            await saveTheme(portfolioId, theme.id);
        });
    };

    return (
        <>
            {/* Backdrop */}
            {open && (
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            )}

            {/* Switcher */}
            <div className="fixed top-5 right-5 z-50">
                {/* Trigger button */}
                <button
                    onClick={() => setOpen(o => !o)}
                    className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-100 shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all hover:bg-zinc-800 active:scale-95"
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
                        className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
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
