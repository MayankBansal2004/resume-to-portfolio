import type { ProjectsProps } from "@/types/theme";

const BLOB_COLORS = [
    "from-teal-500/20 to-indigo-500/20",
    "from-violet-500/20 to-pink-500/20",
    "from-indigo-500/20 to-teal-500/20",
    "from-purple-500/20 to-violet-500/20",
];

export function AuroraProjects({ projects }: ProjectsProps) {
    if (!projects?.length) return null;
    return (
        <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
            <div className="mb-14 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">Portfolio</span>
                <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Featured Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((p, i) => (
                    <div key={i} className="aurora-border-gradient aurora-glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
                        {/* Floating blob inside card */}
                        <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${BLOB_COLORS[i % BLOB_COLORS.length]} blur-2xl opacity-60 group-hover:opacity-90 transition-opacity`} />

                        <div className="relative z-10">
                            <div className="mb-4 flex items-start justify-between gap-3">
                                <span className="text-2xl">{["🌊", "🔮", "⚡", "🌌", "🚀", "💎"][i % 6]}</span>
                                {p.url && (
                                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                                        className="aurora-glass rounded-lg px-3 py-1.5 text-xs font-semibold text-teal-300 transition-all hover:text-teal-200">
                                        ↗ View
                                    </a>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                            <p className="text-sm leading-relaxed text-slate-400 mb-5">{p.description}</p>
                            {p.technologies?.length ? (
                                <div className="flex flex-wrap gap-2">
                                    {p.technologies.map((t, j) => (
                                        <span key={j} className="aurora-glass rounded-full px-2.5 py-0.5 text-xs text-teal-300/80">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
