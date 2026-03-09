"use client";
import { useState } from "react";
import type { SkillsProps } from "@/types/theme";

export function AuroraSkills({ skills }: SkillsProps) {
    if (!skills?.length) return null;
    const [hovered, setHovered] = useState<number | null>(null);
    const GRADIENTS = ["#2dd4bf,#818cf8", "#818cf8,#c084fc", "#0ea5e9,#2dd4bf", "#c084fc,#f472b6"];

    return (
        <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
            <div className="mb-14 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-teal-400">Toolkit</span>
                <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Core Skills</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill, i) => {
                    const grad = GRADIENTS[i % GRADIENTS.length];
                    const isHov = hovered === i;
                    return (
                        <button key={i}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            className="aurora-glass rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-200 cursor-default"
                            style={{
                                transform: isHov ? "translateY(-4px) scale(1.06)" : "none",
                                boxShadow: isHov ? `0 10px 30px rgba(45,212,191,0.2)` : "none",
                                color: isHov ? "white" : "",
                                background: isHov ? `linear-gradient(135deg,${grad.split(",").map(c => c + "30").join(",")})` : "",
                                borderColor: isHov ? `rgba(45,212,191,0.3)` : "",
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
