"use client";

import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/data/home";

export function NavLinks() {
    const pathname = usePathname();

    return (
        <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((item) => {
                const href = item === "Dashboard" ? "/dashboard" : `#${item.toLowerCase().replace(/ /g, "-")}`;
                const isActive = item === "Dashboard" && pathname.startsWith("/dashboard");

                return (
                    <a
                        key={item}
                        href={href}
                        className={`relative text-sm transition-colors duration-200 ${isActive
                                ? "text-slate-100 font-medium"
                                : "text-slate-400 hover:text-slate-100"
                            }`}
                    >
                        {item}
                        {isActive && (
                            <span className="absolute -bottom-1 left-0 right-0 h-px rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                        )}
                    </a>
                );
            })}
        </div>
    );
}
