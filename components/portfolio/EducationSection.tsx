"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { z } from "zod";
import type { EducationSchema } from "@/types/portfolio";

type Education = z.infer<typeof EducationSchema>;

export function EducationSection({ education }: { education: Education[] }) {
    if (!education || education.length === 0) return null;
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section className="px-6 sm:px-0">
            <motion.div
                ref={ref}
                initial={{ y: 30, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
            >
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">Education</span>
                <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">Academic Background</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {education.map((edu, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ y: 40, opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: idx * 0.15 }}
                        className="group relative overflow-hidden rounded-2xl border border-slate-800/60 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_20px_60px_rgba(16,185,129,0.1)]"
                        style={{ background: "linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(6,18,38,0.8) 100%)" }}
                    >
                        {/* Top accent */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Background icon */}
                        <div className="absolute -right-6 -bottom-6 text-[100px] opacity-5 select-none">🎓</div>

                        <div className="relative z-10 p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <span className="text-2xl">🎓</span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-100 transition-colors">
                                {edu.degree}
                            </h4>
                            <p className="text-emerald-400 font-semibold mb-4">{edu.institution}</p>
                            {(edu.startDate || edu.endDate) && (
                                <div className="inline-block rounded-full bg-slate-800/60 border border-slate-700/50 px-3 py-1 text-xs font-mono text-slate-400">
                                    {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ""}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
