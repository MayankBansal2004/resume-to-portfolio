interface Stat {
    label: string;
    value: string;
    change?: string;
    changePositive?: boolean;
    color: string;
    emoji: string;
}

export function StatsCards({ portfolioCount = 0, activeCount = 0 }: { portfolioCount?: number, activeCount?: number }) {
    const STATS: Stat[] = [
        {
            label: "Total Portfolios",
            value: portfolioCount.toString(),
            change: portfolioCount > 0 ? "Created so far" : "Create your first",
            color: "#3b82f6",
            emoji: "📄",
        },
        {
            label: "Live Portfolios",
            value: activeCount.toString(),
            change: activeCount > 0 ? "Currently published" : "Publish to share",
            color: "#10b981",
            emoji: "🌐",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {STATS.map((stat) => (
                <div
                    key={stat.label}
                    className="group rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-indigo-500/10"
                >
                    {/* Icon + label */}
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            {stat.label}
                        </span>
                        <span className="text-lg">{stat.emoji}</span>
                    </div>

                    {/* Value */}
                    <p
                        className="text-3xl font-bold text-white transition-colors group-hover:text-indigo-400 group-hover:drop-shadow-[0_0_12px_rgba(129,140,248,0.5)]"
                        style={{
                            fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
                        }}
                    >
                        {stat.value}
                    </p>

                    {/* Change hint */}
                    {stat.change && (
                        <p className="mt-1.5 text-[11px] text-slate-400">{stat.change}</p>
                    )}
                </div>
            ))}
        </div>
    );
}
