import { STATS } from "@/lib/data/home";

export function StatsSection() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-7 text-center transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_25px_rgba(99,102,241,0.1)]"
          >
            <p
              className="mb-1 text-3xl font-bold"
              style={{
                color: stat.color,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {stat.value}
            </p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
