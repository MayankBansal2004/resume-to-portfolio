"use client";
import { useState } from "react";
import type { SkillsProps } from "@/types/theme";

export function NebulaSkills({ skills }: SkillsProps) {
    if (!skills?.length) return null;
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section id="skills" className="mx-auto max-w-4xl px-6 py-24">
            <div className="mb-14 text-center">
                <span className="theme-nebula-mono text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">Expertise</span>
                <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Core Skills</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill, i) => {
                    const hue = (200 + i * 25) % 360;
                    const isHov = hovered === i;
                    return (
                        <button key={i}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-default"
                            style={{
                                border: `1px solid hsl(${hue},50%,${isHov ? 50 : 35}%,0.4)`,
                                background: isHov ? `linear-gradient(135deg,hsla(${hue},70%,40%,0.25),hsla(${hue + 30},70%,50%,0.15))` : `hsla(${hue},40%,30%,0.12)`,
                                color: isHov ? `hsl(${hue},90%,85%)` : `hsl(${hue},60%,70%)`,
                                boxShadow: isHov ? `0 0 18px hsla(${hue},70%,55%,0.3)` : "none",
                                transform: isHov ? "translateY(-3px) scale(1.05)" : "none",
                            }}
                        >
                            {skill}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
