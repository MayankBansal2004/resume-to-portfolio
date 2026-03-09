"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { z } from "zod";
import type { ExperienceSchema } from "@/types/portfolio";

type Experience = z.infer<typeof ExperienceSchema>;

function ExperienceCard({ job, index }: { job: Experience; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ x: index % 2 === 0 ? -60 : 60, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
            className="group relative"
        >
            {/* Timeline connector */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent" />

            {/* Timeline dot */}
            <div className="absolute -left-[7px] top-6 h-3.5 w-3.5 rounded-full border-2 border-indigo-400 bg-[#030711] shadow-[0_0_12px_rgba(99,102,241,0.8)] group-hover:shadow-[0_0_20px_rgba(99,102,241,1)] transition-shadow" />

            <div className="ml-8">
                <div
                    className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-indigo-500/40 hover:bg-slate-800/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]"
                    style={{
                        background: "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(17,24,39,0.6) 100%)",
                    }}
                >
                    {/* Glow strip on hover */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                            <h4 className="text-xl font-bold text-white group-hover:text-indigo-100 transition-colors">
                                {job.title}
                            </h4>
                            <div className="mt-1 flex items-center gap-2">
                                <span className="text-indigo-400 font-semibold">{job.company}</span>
                            </div>
                        </div>
                        {(job.startDate || job.endDate) && (
                            <div className="shrink-0 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-mono text-slate-400">
                                {job.startDate} → {job.endDate || "Present"}
                            </div>
                        )}
                    </div>

                    {job.description && job.description.length > 0 && (
                        <ul className="mt-4 space-y-2.5">
                            {job.description.map((desc, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                                    {desc}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export function ExperienceSection({ experience }: { experience: Experience[] }) {
    if (!experience || experience.length === 0) return null;
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section className="relative px-6 sm:px-0">
            <motion.div
                ref={ref}
                initial={{ y: 30, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
            >
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400">Career</span>
                <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">Work Experience</h3>
                <p className="mt-3 text-slate-400">A timeline of my professional journey</p>
            </motion.div>

            <div className="relative space-y-8 pl-4">
                {experience.map((job, idx) => (
                    <ExperienceCard key={idx} job={job} index={idx} />
                ))}
            </div>
        </section>
    );
}
