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
    { label: "Portfolios", href: "/dashboard/portfolios", icon: FileText },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-full w-60 flex-col border-r border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
            {/* Logo */}
            <div className="flex items-center gap-3 border-b border-slate-800/40 px-5 py-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
                    <Zap size={16} className="fill-white text-white" />
                </div>
                <span
                    className="text-base font-bold text-slate-100"
                    style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif" }}
                >
                    Portfolio<span className="text-gradient">AI</span>
                </span>
            </div>

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

            {/* Bottom hint */}
            <div className="border-t border-slate-800/40 p-4">
                <div className="rounded-xl border border-indigo-500/15 bg-indigo-500/8 p-3">
                    <p className="text-xs font-medium text-indigo-300">Free Plan</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                        Upgrade for unlimited portfolios
                    </p>
                    <a
                        href="/pricing"
                        className="mt-2 inline-block text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        Upgrade →
                    </a>
                </div>
            </div>
        </aside>
    );
}
