import Image from "next/image";
import { Bell } from "lucide-react";
import { NavbarUserMenu } from "@/components/home/NavbarUserMenu";

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
        <header className="relative z-50 flex items-center justify-between border-b border-slate-800/50 bg-slate-950/60 px-7 py-4 backdrop-blur-xl">
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
                <NavbarUserMenu
                    name={userName}
                    email=""
                    image={userImage}
                />
            </div>
        </header>
    );
}
