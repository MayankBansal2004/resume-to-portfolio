import type { SkillsProps } from "@/types/theme";

export function TerminalSkills({ skills }: SkillsProps) {
    if (!skills?.length) return null;
    return (
        <section id="skills" className="mx-auto max-w-4xl px-6 py-24">
            <p className="term-muted text-sm mb-2">$ cat skills.txt | sort</p>
            <h2 className="text-2xl font-black text-[#00ff41] term-glow mb-10">SKILLS.txt</h2>

            <div className="term-box p-6">
                <div className="flex flex-wrap gap-y-2">
                    {skills.map((skill, i) => (
                        <span key={i}
                            className="inline-block text-sm text-[#00ff41]/70 hover:text-[#00ff41] hover:term-glow transition-colors cursor-default"
                        >
                            {skill}{i < skills.length - 1 ? <span className="term-muted mx-2">·</span> : null}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
