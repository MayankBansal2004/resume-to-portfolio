import { Upload, Sparkles, Globe } from "lucide-react";

const STEPS = [
    {
        icon: Upload,
        color: "#3b82f6",
        colorRgb: "59,130,246",
        title: "Upload your resume",
        desc: "PDF, DOC or DOCX — we handle the rest",
    },
    {
        icon: Sparkles,
        color: "#8b5cf6",
        colorRgb: "139,92,246",
        title: "AI generates your site",
        desc: "Content, layout and design crafted instantly",
    },
    {
        icon: Globe,
        color: "#10b981",
        colorRgb: "16,185,129",
        title: "Share your portfolio",
        desc: "Publish with one click and get a live link",
    },
];

export function PortfolioEmptyState() {
    return (
        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/50 p-8 backdrop-blur-sm">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2
                        className="text-base font-semibold text-slate-100"
                        style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif" }}
                    >
                        My Portfolios
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-500">
                        Your published portfolios will appear here
                    </p>
                </div>

                <a
                    href="/#upload-zone"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                >
                    <span>+</span> New Portfolio
                </a>
            </div>

            {/* Empty illustration */}
            <div className="mb-8 flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800/40 text-4xl">
                    📄
                </div>
                <p className="text-sm font-medium text-slate-300">No portfolios yet</p>
                <p className="mt-1 max-w-xs text-xs text-slate-600">
                    Upload your resume and we&apos;ll generate a stunning portfolio in
                    under 30 seconds.
                </p>
            </div>

            {/* How it works mini steps */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {STEPS.map((step, i) => {
                    const Icon = step.icon;
                    return (
                        <div
                            key={step.title}
                            className="flex items-start gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4"
                        >
                            <div
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                                style={{
                                    background: `rgba(${step.colorRgb}, 0.15)`,
                                    color: step.color,
                                }}
                            >
                                <Icon size={16} strokeWidth={1.75} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="text-[10px] font-bold"
                                        style={{ color: step.color }}
                                    >
                                        Step {i + 1}
                                    </span>
                                </div>
                                <p className="text-xs font-medium text-slate-200">{step.title}</p>
                                <p className="text-[11px] text-slate-500">{step.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
