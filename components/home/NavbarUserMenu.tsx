"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { LayoutDashboard, LogOut, Settings, ChevronDown } from "lucide-react";

interface NavbarUserMenuProps {
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
}

export function NavbarUserMenu({ name, email, image }: NavbarUserMenuProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const initials = name
        ?.split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div ref={ref} className="relative z-50">
            {/* ── Trigger pill ── */}
            <button
                id="user-menu-btn"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2.5 rounded-xl border border-slate-700/60 bg-slate-800/50 px-3 py-1.5 backdrop-blur-sm transition-all duration-200 hover:border-indigo-500/40 hover:bg-slate-800 hover:shadow-[0_0_16px_rgba(99,102,241,0.15)]"
            >
                {/* Avatar */}
                {image ? (
                    <Image
                        src={image}
                        alt={name ?? "User"}
                        width={28}
                        height={28}
                        className="rounded-full ring-1 ring-indigo-500/40"
                    />
                ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white">
                        {initials}
                    </div>
                )}

                {/* Name (hidden on mobile) */}
                <span className="hidden text-sm font-medium text-slate-200 md:block">
                    {name?.split(" ")[0]}
                </span>

                {/* Chevron */}
                <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {/* ── Dropdown ── */}
            {open && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/95 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(99,102,241,0.06)] backdrop-blur-xl">
                    {/* User info */}
                    <div className="border-b border-slate-800 px-4 py-3.5">
                        <p className="text-sm font-semibold text-slate-100 truncate">{name}</p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{email}</p>
                    </div>

                    {/* Menu items */}
                    <div className="p-1.5">
                        <a
                            href="/dashboard"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition-colors duration-150 hover:bg-indigo-500/10 hover:text-slate-100"
                        >
                            <LayoutDashboard size={15} className="text-slate-400" />
                            Dashboard
                        </a>

                        {/* Divider */}
                        <div className="my-1.5 border-t border-slate-800" />

                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition-colors duration-150 hover:bg-red-500/10 hover:text-red-400"
                        >
                            <LogOut size={15} />
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
