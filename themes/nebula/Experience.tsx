import type { ExperienceProps } from "@/types/theme";

export function NebulaExperience({ experience }: ExperienceProps) {
    if (!experience?.length) return null;
    return (
        <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
            <div className="mb-14 text-center">
                <span className="theme-nebula-mono text-xs font-bold uppercase tracking-[0.3em] text-indigo-400">Career</span>
                <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Work Experience</h2>
            </div>

            <div className="relative space-y-8 pl-5">
                {/* Vertical glow line */}
                <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-transparent" />

                {experience.map((job, i) => (
                    <div key={i} className="group relative">
                        {/* Dot */}
                        <div className="absolute -left-[22px] top-6 h-3 w-3 rounded-full border-2 border-indigo-400 bg-[#030711] shadow-[0_0_8px_rgba(99,102,241,0.8)] group-hover:shadow-[0_0_16px_rgba(99,102,241,1)] transition-shadow" />

                        <div className="ml-6 overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-800/50 hover:shadow-[0_4px_40px_rgba(99,102,241,0.08)]">
                            {/* Top accent on hover */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{job.title}</h3>
                                    <p className="text-sm font-semibold text-indigo-400 mt-0.5">{job.company}</p>
                                </div>
                                {(job.startDate || job.endDate) && (
                                    <span className="theme-nebula-mono shrink-0 self-start rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-400">
                                        {job.startDate} → {job.endDate || "Present"}
                                    </span>
                                )}
                            </div>
                            {job.description?.length > 0 && (
                                <ul className="space-y-2">
                                    {job.description.map((d, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm leading-relaxed text-slate-400">
                                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
                                            {d}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
