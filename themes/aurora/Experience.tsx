import type { ExperienceProps } from "@/types/theme";

export function AuroraExperience({ experience }: ExperienceProps) {
    if (!experience?.length) return null;
    return (
        <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
            <div className="mb-14 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-teal-400">Career Path</span>
                <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Experience</h2>
            </div>
            <div className="space-y-5">
                {experience.map((job, i) => (
                    <div key={i} className="aurora-border-gradient aurora-glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(45,212,191,0.07)]">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">{job.title}</h3>
                                <p className="aurora-text-gradient text-sm font-semibold mt-0.5">{job.company}</p>
                            </div>
                            {(job.startDate || job.endDate) && (
                                <span className="aurora-glass shrink-0 self-start rounded-full px-3 py-1 text-xs font-mono text-teal-300">
                                    {job.startDate} → {job.endDate || "Present"}
                                </span>
                            )}
                        </div>
                        {job.description?.length > 0 && (
                            <ul className="space-y-2">
                                {job.description.map((d, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm leading-relaxed text-slate-400">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400/60" />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
