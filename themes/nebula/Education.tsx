import type { EducationProps } from "@/types/theme";

export function NebulaEducation({ education }: EducationProps) {
    if (!education?.length) return null;
    return (
        <section id="education" className="mx-auto max-w-4xl px-6 py-24">
            <div className="mb-14 text-center">
                <span className="theme-nebula-mono text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">Education</span>
                <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Academic Background</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {education.map((edu, i) => (
                    <div key={i}
                        className="group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/25 hover:shadow-[0_12px_40px_rgba(16,185,129,0.07)]">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-xl">
                            🎓
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
                        <p className="text-sm font-semibold text-emerald-400 mb-4">{edu.institution}</p>
                        {(edu.startDate || edu.endDate) && (
                            <span className="theme-nebula-mono inline-block rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-400">
                                {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ""}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
