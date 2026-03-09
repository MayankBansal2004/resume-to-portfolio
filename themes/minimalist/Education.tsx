import type { EducationProps } from "@/types/theme";

export function MinimalistEducation({ education }: EducationProps) {
    if (!education?.length) return null;
    return (
        <section id="education" className="mx-auto max-w-3xl px-6 py-16 border-b border-zinc-100">
            <h2 className="theme-min-serif text-2xl font-normal text-zinc-900 mb-10">Education</h2>
            <div className="space-y-8">
                {education.map((edu, i) => (
                    <div key={i} className="grid sm:grid-cols-[180px_1fr] gap-4 sm:gap-8">
                        <div className="text-sm text-zinc-400 pt-0.5">
                            {edu.startDate && <span>{edu.startDate}</span>}
                            {edu.endDate && <span> — {edu.endDate}</span>}
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-zinc-900">{edu.degree}</h3>
                            <p className="mt-0.5 text-sm text-zinc-500">{edu.institution}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
