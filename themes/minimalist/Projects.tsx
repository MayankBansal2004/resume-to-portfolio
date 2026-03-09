import type { ProjectsProps } from "@/types/theme";

export function MinimalistProjects({ projects }: ProjectsProps) {
    if (!projects?.length) return null;
    return (
        <section id="projects" className="mx-auto max-w-3xl px-6 py-16 border-b border-zinc-100">
            <h2 className="theme-min-serif text-2xl font-normal text-zinc-900 mb-10">Projects</h2>
            <div className="space-y-8">
                {projects.map((p, i) => (
                    <div key={i} className="group">
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="text-base font-semibold text-zinc-900">
                                {p.url ? (
                                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                                        className="hover:text-zinc-600 transition-colors underline underline-offset-4 decoration-zinc-200 hover:decoration-zinc-400">
                                        {p.name}
                                    </a>
                                ) : p.name}
                            </h3>
                            {p.url && (
                                <a href={p.url} target="_blank" rel="noopener noreferrer"
                                    className="shrink-0 text-xs font-medium text-zinc-400 hover:text-zinc-600 transition-colors mt-0.5">
                                    ↗ visit
                                </a>
                            )}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-500">{p.description}</p>
                        {p.technologies?.length && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {p.technologies.map((t, j) => (
                                    <span key={j} className="rounded border border-zinc-200 px-2 py-0.5 text-xs text-zinc-500">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
