import type { ExperienceProps } from "@/types/theme";

export function MinimalistExperience({ experience }: ExperienceProps) {
    if (!experience?.length) return null;
    return (
        <section id="experience" className="mx-auto max-w-3xl px-6 py-16 border-b border-zinc-100">
            <h2 className="theme-min-serif text-2xl font-normal text-zinc-900 mb-10">Experience</h2>
            <div className="space-y-10">
                {experience.map((job, i) => (
                    <div key={i} className="grid sm:grid-cols-[180px_1fr] gap-4 sm:gap-8">
                        {/* Date column */}
                        <div className="text-sm text-zinc-400 pt-0.5">
                            {job.startDate && <span>{job.startDate}</span>}
                            {job.endDate && <span> — {job.endDate}</span>}
                        </div>
                        {/* Content column */}
                        <div>
                            <h3 className="text-base font-semibold text-zinc-900">{job.title}</h3>
                            <p className="mt-0.5 text-sm font-medium text-zinc-500">{job.company}</p>
                            {job.description?.length > 0 && (
                                <ul className="mt-4 space-y-2">
                                    {job.description.map((d, j) => (
                                        <li key={j} className="flex gap-3 text-sm leading-relaxed text-zinc-500">
                                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
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
