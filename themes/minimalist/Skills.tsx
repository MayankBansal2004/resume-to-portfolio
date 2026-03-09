import type { SkillsProps } from "@/types/theme";

export function MinimalistSkills({ skills }: SkillsProps) {
    if (!skills?.length) return null;
    return (
        <section id="skills" className="mx-auto max-w-3xl px-6 py-16 border-b border-zinc-100">
            <h2 className="theme-min-serif text-2xl font-normal text-zinc-900 mb-10">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                    <span key={i}
                        className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-sm text-zinc-600 hover:border-zinc-400 hover:text-zinc-800 transition-colors cursor-default">
                        {skill}
                    </span>
                ))}
            </div>
        </section>
    );
}
