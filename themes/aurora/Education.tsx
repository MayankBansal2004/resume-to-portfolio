import type { EducationProps } from "@/types/theme";

export function AuroraEducation({ education }: EducationProps) {
    if (!education?.length) return null;
    return (
        <section id="education" className="mx-auto max-w-5xl px-6 py-24">
            <div className="mb-14 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">Background</span>
                <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Education</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {education.map((edu, i) => (
                    <div key={i} className="aurora-border-gradient aurora-glass group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(129,140,248,0.1)]">
                        <div className="aurora-blob mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                            style={{ background: "linear-gradient(135deg,rgba(13,148,136,0.2),rgba(124,58,237,0.2))", animationDuration: "10s" }}>
                            🎓
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
                        <p className="aurora-text-gradient text-sm font-semibold mb-4">{edu.institution}</p>
                        {(edu.startDate || edu.endDate) && (
                            <span className="aurora-glass inline-block rounded-full px-3 py-1 text-xs font-mono text-slate-400">
                                {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ""}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
