import type { ExperienceProps } from "@/types/theme";

export function TerminalExperience({ experience }: ExperienceProps) {
    if (!experience?.length) return null;
    return (
        <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
            <p className="term-muted text-sm mb-2">$ ls -la ./experience</p>
            <h2 className="text-2xl font-black text-[#00ff41] term-glow mb-10">WORK_HISTORY.log</h2>

            <div className="space-y-6">
                {experience.map((job, i) => (
                    <div key={i} className="term-box group p-5 transition-all duration-200">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                            <div>
                                <p className="text-xs term-dim mb-1"># position [{i + 1}]</p>
                                <h3 className="text-base font-bold text-[#00ff41] term-glow">{job.title}</h3>
                                <p className="text-sm text-[#00ff41]/60 mt-0.5">@ {job.company}</p>
                            </div>
                            {(job.startDate || job.endDate) && (
                                <span className="self-start text-xs term-dim border border-[#00ff41]/15 px-2 py-1 shrink-0">
                                    {job.startDate} → {job.endDate || "present"}
                                </span>
                            )}
                        </div>
                        {job.description?.length > 0 && (
                            <ul className="mt-3 space-y-1.5">
                                {job.description.map((d, j) => (
                                    <li key={j} className="text-xs leading-relaxed text-[#00ff41]/60 flex gap-2">
                                        <span className="text-[#00ff41]/40 shrink-0">▸</span>
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
