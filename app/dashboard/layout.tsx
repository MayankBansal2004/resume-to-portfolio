import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const session = await auth();
    if (!session?.user) redirect("/auth/signin");

    return (
        <div className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
            {/* Same background grid as home */}
            <div className="grid-bg pointer-events-none fixed inset-0 z-0" />

            {/* Ambient light orbs */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div
                    className="animate-pulse-glow absolute rounded-full blur-3xl"
                    style={{
                        width: 600, height: 600, top: "-15%", left: "-10%",
                        background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
                    }}
                />
                <div
                    className="animate-pulse-glow absolute rounded-full blur-3xl"
                    style={{
                        width: 500, height: 500, bottom: "10%", right: "-10%",
                        background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
                        animationDelay: "2s",
                    }}
                />
            </div>

            {/* Page content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
