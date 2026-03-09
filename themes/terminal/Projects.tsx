import type { ProjectsProps } from "@/types/theme";

export function TerminalProjects({ projects }: ProjectsProps) {
    if (!projects?.length) return null;
    return (
        <section id="projects" className="mx-auto max-w-4xl px-6 py-24">
            <p className="term-muted text-sm mb-2">$ ls -la ./projects</p>
            <h2 className="text-2xl font-black text-[#00ff41] term-glow mb-10">PROJECTS.json</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((p, i) => (
                    <div key={i} className="term-box group p-5 transition-all duration-200">
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <span className="text-xs term-dim">./projects/{p.name.toLowerCase().replace(/\s+/g, "_")}</span>
                            {p.url && (
                                <a href={p.url} target="_blank" rel="noopener noreferrer"
                                    className="text-xs term-dim border border-[#00ff41]/20 px-2 py-0.5 hover:border-[#00ff41] hover:text-[#00ff41] transition-colors shrink-0">
                                    [open ↗]
                                </a>
                            )}
                        </div>
                        <h3 className="text-base font-bold text-[#00ff41] term-glow mb-2">{p.name}</h3>
                        <p className="text-xs leading-relaxed text-[#00ff41]/55 mb-4">{p.description}</p>
                        {p.technologies?.length ? (
                            <div className="flex flex-wrap gap-1.5">
                                {p.technologies.map((t, j) => (
                                    <span key={j} className="text-xs text-[#00ff41]/50 border border-[#00ff41]/15 px-2 py-0.5">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </section>
    );
}
