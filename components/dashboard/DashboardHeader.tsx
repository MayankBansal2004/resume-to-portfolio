import Image from "next/image";
import { Bell } from "lucide-react";

interface DashboardHeaderProps {
    title: string;
    subtitle?: string;
    userName: string | null | undefined;
    userImage: string | null | undefined;
}

export function DashboardHeader({
    title,
    subtitle,
    userName,
    userImage,
}: DashboardHeaderProps) {
    const initials = userName
        ?.split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <header className="flex items-center justify-between border-b border-slate-800/50 bg-slate-950/60 px-7 py-4 backdrop-blur-xl">
            {/* Page title */}
            <div>
                <h1
                    className="text-lg font-semibold text-slate-100"
                    style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif" }}
                >
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
                )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
                {/* Notifications */}
                <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-colors duration-150">
                    <Bell size={15} />
                </button>

                {/* Avatar */}
                <a href="/dashboard/settings" className="group">
                    {userImage ? (
                        <Image
                            src={userImage}
                            alt={userName ?? "User"}
                            width={32}
                            height={32}
                            className="rounded-full ring-2 ring-indigo-500/30 group-hover:ring-indigo-400/60 transition-all duration-200"
                        />
                    ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white ring-2 ring-indigo-500/30">
                            {initials}
                        </div>
                    )}
                </a>
            </div>
        </header>
    );
}
