import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import type { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const session = await auth();
    if (!session?.user) redirect("/auth/signin");

    return (
        <div className="flex h-screen overflow-hidden bg-[#030711]">
            {/* Background grid */}
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main content area */}
            <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
                {children}
            </div>
        </div>
    );
}
