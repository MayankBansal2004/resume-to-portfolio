"use client";

import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    BarChart2,
    Settings,
    Zap,
} from "lucide-react";

const NAV_ITEMS = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-full w-60 flex-col border-r border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 border-b border-slate-800/40 px-5 py-5 hover:bg-slate-900/50 transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    <Zap size={16} className="fill-white text-white" />
                </div>
                <span
                    className="text-base font-bold text-slate-100"
                    style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif" }}
                >
                    Portfolio<span className="text-gradient">AI</span>
                </span>
            </a>

            {/* Nav */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                    Main
                </p>
                {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                        <a
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${active
                                ? "bg-indigo-500/15 text-indigo-300 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.2)]"
                                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                                }`}
                        >
                            <Icon
                                size={16}
                                className={active ? "text-indigo-400" : "text-slate-500"}
                            />
                            {label}
                            {active && (
                                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />
                            )}
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
}
