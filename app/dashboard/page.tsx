import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/home/Navbar";
import { getUserPortfolios } from "@/actions/portfolio";
import { PortfolioCard } from "@/components/dashboard/PortfolioCard";
import { PortfolioEmptyState } from "@/components/dashboard/PortfolioEmptyState";
import { FileText, Globe, Upload } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Dashboard — PortfolioAI",
    description: "Manage all your AI-generated portfolios",
};

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    const { user } = session;
    const portfolios = await getUserPortfolios();
    const liveCount = portfolios.filter((p) => p.isPublished).length;

    return (
        <>
            {/* Same Navbar as home */}
            <Navbar />

            <main className="mx-auto max-w-7xl px-6 pb-20">
                {/* ── Greeting Banner ── */}
                <div className="mb-10 mt-4">
                    <p className="mb-1 text-sm font-medium text-indigo-400 tracking-widest uppercase">
                        Your Dashboard
                    </p>
                    <h1
                        className="text-3xl font-bold text-slate-100 sm:text-4xl"
                        style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif" }}
                    >
                        Welcome back,{" "}
                        <span className="text-gradient">
                            {user.name?.split(" ")[0] ?? "there"}
                        </span>{" "}
                        👋
                    </h1>
                    <p className="mt-2 text-slate-500 text-sm">
                        Manage your AI-generated portfolios — publish, share and update them in seconds.
                    </p>
                </div>

                {/* ── Stats Row ── */}
                <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 max-w-2xl">
                    {/* Total */}
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-sm hover:border-white/10 transition-all duration-300 group">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                                Total
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                                <FileText size={14} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors"
                            style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif" }}>
                            {portfolios.length}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            {portfolios.length === 1 ? "portfolio" : "portfolios"} created
                        </p>
                    </div>

                    {/* Live */}
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-sm hover:border-emerald-500/20 transition-all duration-300 group">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                                Live
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                                <Globe size={14} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors"
                            style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif" }}>
                            {liveCount}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            {liveCount === 1 ? "portfolio" : "portfolios"} published
                        </p>
                    </div>

                    {/* New portfolio CTA / stat */}
                    <div className="col-span-2 sm:col-span-1 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-5 backdrop-blur-sm hover:border-indigo-400/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] transition-all duration-300 group">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
                                Quick Start
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                                <Upload size={14} />
                            </div>
                        </div>
                        <Link
                            href="/#upload-zone"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] active:scale-95"
                        >
                            + New Portfolio
                        </Link>
                        <p className="mt-2 text-xs text-slate-500">Upload a resume, get a site</p>
                    </div>
                </div>

                {/* ── Divider + section heading ── */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2
                            className="text-xl font-bold text-slate-100"
                            style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif" }}
                        >
                            Your Portfolios
                        </h2>
                        <p className="mt-0.5 text-xs text-slate-500">
                            Click a card to open, hover to see quick actions
                        </p>
                    </div>

                    {portfolios.length > 0 && (
                        <Link
                            href="/#upload-zone"
                            className="hidden sm:flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-200 active:scale-95"
                        >
                            <Upload size={14} />
                            Upload Resume
                        </Link>
                    )}
                </div>

                {/* ── Portfolio Grid ── */}
                {portfolios.length === 0 ? (
                    <PortfolioEmptyState />
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {portfolios.map((p, index) => (
                            <PortfolioCard key={p.id} portfolio={p} index={index} />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
