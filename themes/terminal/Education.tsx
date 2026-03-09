import type { EducationProps } from "@/types/theme";

export function TerminalEducation({ education }: EducationProps) {
    if (!education?.length) return null;
    return (
        <section id="education" className="mx-auto max-w-4xl px-6 py-24">
            <p className="term-muted text-sm mb-2">$ cat education.log</p>
            <h2 className="text-2xl font-black text-[#00ff41] term-glow mb-10">EDUCATION.log</h2>

            <div className="space-y-5">
                {education.map((edu, i) => (
                    <div key={i} className="term-box p-5 transition-all duration-200">
                        <p className="text-xs term-dim mb-1"># record [{i + 1}]</p>
                        <h3 className="text-base font-bold text-[#00ff41] term-glow">{edu.degree}</h3>
                        <p className="text-sm text-[#00ff41]/60 mt-0.5">@ {edu.institution}</p>
                        {(edu.startDate || edu.endDate) && (
                            <p className="text-xs term-dim mt-3">
                                {edu.startDate}{edu.endDate ? ` → ${edu.endDate}` : ""}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
