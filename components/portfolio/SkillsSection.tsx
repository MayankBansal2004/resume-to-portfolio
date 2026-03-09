"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const CATEGORY_COLORS: Record<string, string> = {
    default: "indigo",
    language: "blue",
    framework: "violet",
    tool: "cyan",
    cloud: "sky",
};

export function SkillsSection({ skills }: { skills: string[] }) {
    if (!skills || skills.length === 0) return null;
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section className="px-6 sm:px-0">
            <motion.div
                ref={ref}
                initial={{ y: 30, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
            >
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">Skills</span>
                <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">Core Expertise</h3>
                <p className="mt-3 text-slate-400">Technologies I work with</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill, idx) => {
                    const isHovered = hovered === idx;
                    const hue = (200 + idx * 23) % 360;
                    return (
                        <motion.button
                            key={idx}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={inView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.4, delay: idx * 0.04, type: "spring", stiffness: 200 }}
                            onMouseEnter={() => setHovered(idx)}
                            onMouseLeave={() => setHovered(null)}
                            whileHover={{ scale: 1.12, y: -4 }}
                            whileTap={{ scale: 0.96 }}
                            className="relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-semibold transition-all cursor-default"
                            style={{
                                border: `1px solid hsl(${hue}, 60%, ${isHovered ? 55 : 40}%, 0.4)`,
                                background: isHovered
                                    ? `linear-gradient(135deg, hsla(${hue},70%,40%,0.3), hsla(${hue + 30},80%,50%,0.2))`
                                    : `hsla(${hue},50%,30%,0.15)`,
                                color: isHovered ? `hsl(${hue}, 90%, 85%)` : `hsl(${hue}, 70%, 75%)`,
                                boxShadow: isHovered ? `0 0 20px hsla(${hue}, 70%, 50%, 0.35)` : "none",
                            }}
                        >
                            {/* Shine sweep on hover */}
                            {isHovered && (
                                <span
                                    className="absolute inset-0 -skew-x-12 opacity-10"
                                    style={{ background: `linear-gradient(90deg, transparent, hsl(${hue}, 100%, 90%), transparent)` }}
                                />
                            )}
                            {skill}
                        </motion.button>
                    );
                })}
            </div>
        </section>
    );
}
