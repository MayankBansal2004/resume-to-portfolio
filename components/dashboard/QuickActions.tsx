import { FileText, Zap, Star } from "lucide-react";

const ACTIONS = [
    {
        icon: FileText,
        color: "#3b82f6",
        colorRgb: "59,130,246",
        title: "Upload Resume",
        desc: "Generate a new portfolio",
        href: "/#upload-zone",
    },
];

export function QuickActions() {
    return (
        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-5 backdrop-blur-sm">
            <h2
                className="mb-4 text-sm font-semibold text-slate-100"
                style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif" }}
            >
                Quick Actions
            </h2>

            <div className="space-y-2">
                {ACTIONS.map(({ icon: Icon, color, colorRgb, title, desc, href }) => (
                    <a
                        key={title}
                        href={href}
                        className="flex items-center gap-3 rounded-xl border border-transparent p-3 transition-all duration-150 hover:border-slate-700/60 hover:bg-slate-800/50"
                    >
                        <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                            style={{
                                background: `rgba(${colorRgb}, 0.15)`,
                                color,
                            }}
                        >
                            <Icon size={16} strokeWidth={1.75} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-200">{title}</p>
                            <p className="text-[11px] text-slate-500">{desc}</p>
                        </div>
                        <span className="ml-auto text-xs text-slate-700">→</span>
                    </a>
                ))}
            </div>
        </div>
    );
}
