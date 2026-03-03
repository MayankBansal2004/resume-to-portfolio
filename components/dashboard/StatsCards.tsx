interface Stat {
    label: string;
    value: string;
    change?: string;
    changePositive?: boolean;
    color: string;
    emoji: string;
}

const STATS: Stat[] = [
    {
        label: "Portfolios",
        value: "0",
        change: "Create your first",
        color: "#3b82f6",
        emoji: "📄",
    },
    {
        label: "Total Views",
        value: "0",
        change: "Share to get views",
        color: "#8b5cf6",
        emoji: "👁",
    },
    {
        label: "Link Clicks",
        value: "0",
        change: "–",
        color: "#10b981",
        emoji: "🔗",
    },
    {
        label: "Current Plan",
        value: "Free",
        change: "Upgrade for more",
        color: "#f59e0b",
        emoji: "⚡",
    },
];

export function StatsCards() {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((stat) => (
                <div
                    key={stat.label}
                    className="group rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-[0_0_24px_rgba(0,0,0,0.4)]"
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
                        className="text-3xl font-bold"
                        style={{
                            color: stat.color,
                            fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
                        }}
                    >
                        {stat.value}
                    </p>

                    {/* Change hint */}
                    {stat.change && (
                        <p className="mt-1.5 text-[11px] text-slate-600">{stat.change}</p>
                    )}
                </div>
            ))}
        </div>
    );
}
