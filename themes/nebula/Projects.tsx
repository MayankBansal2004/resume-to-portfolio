import type { ProjectsProps } from "@/types/theme";

const ACCENTS = [
    { from: "#6366f1", to: "#8b5cf6" },
    { from: "#0891b2", to: "#06b6d4" },
    { from: "#7c3aed", to: "#c084fc" },
    { from: "#0d9488", to: "#34d399" },
];

export function NebulaProjects({ projects }: ProjectsProps) {
    if (!projects?.length) return null;
    return (
        <section id="projects" className="mx-auto max-w-4xl px-6 py-24">
            <div className="mb-14 text-center">
                <span className="theme-nebula-mono text-xs font-bold uppercase tracking-[0.3em] text-purple-400">Work</span>
                <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Featured Projects</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((p, i) => {
                    const accent = ACCENTS[i % ACCENTS.length];
                    return (
                        <div key={i} className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
                            {/* Top gradient strip — unique per card */}
                            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg,${accent.from},${accent.to})` }} />

                            <div className="flex flex-col flex-grow p-6">
                                <div className="mb-4 flex items-start justify-between gap-3">
                                    {/* Icon */}
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/60 text-xl"
                                        style={{ background: `linear-gradient(135deg,${accent.from}22,${accent.to}11)` }}>
                                        {["🚀", "⚡", "🌐", "🔮", "💡", "🎯"][i % 6]}
                                    </div>
                                    {p.url && (
                                        <a href={p.url} target="_blank" rel="noopener noreferrer"
                                            className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-1.5 text-slate-500 transition-all hover:border-slate-500 hover:text-slate-300">
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
                                    {p.name}
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-400 flex-grow mb-5">{p.description}</p>

                                {p.technologies?.length ? (
                                    <div className="flex flex-wrap gap-1.5">
                                        {p.technologies.map((t, j) => (
                                            <span key={j} className="rounded-full border border-slate-700/50 px-2.5 py-0.5 text-xs text-slate-400">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
