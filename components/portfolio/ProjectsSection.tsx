"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { z } from "zod";
import type { ProjectSchema } from "@/types/portfolio";

type Project = z.infer<typeof ProjectSchema>;

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
            className="group relative h-full"
        >
            <div
                className="relative h-full overflow-hidden rounded-2xl border border-slate-800/60 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(99,102,241,0.2)]"
                style={{
                    background: "linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(15,23,42,0.7) 100%)",
                }}
            >
                {/* Top gradient accent */}
                <div
                    className="absolute inset-x-0 top-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{
                        background: `linear-gradient(90deg, hsl(${240 + index * 30}, 70%, 60%), hsl(${280 + index * 30}, 70%, 70%))`,
                    }}
                />

                {/* Corner glows */}
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{ background: `hsl(${240 + index * 30}, 80%, 70%)`, filter: "blur(40px)" }}
                />

                <div className="relative z-10 flex h-full flex-col p-6">
                    <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700/60"
                            style={{
                                background: `linear-gradient(135deg, hsl(${240 + index * 30}, 30%, 20%), hsl(${240 + index * 30}, 20%, 15%))`,
                            }}
                        >
                            <span className="text-2xl">
                                {["🚀", "⚡", "🌟", "💡", "🔮", "🎯"][index % 6]}
                            </span>
                        </div>
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border border-slate-700/60 bg-slate-800/50 p-2 text-slate-400 transition-all hover:border-indigo-500/50 hover:text-indigo-400 hover:bg-indigo-500/10"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                    </div>

                    <h4 className="text-xl font-bold text-white group-hover:text-indigo-100 transition-colors mb-3">
                        {project.name}
                    </h4>

                    <p className="text-sm leading-relaxed text-slate-400 flex-grow mb-6">
                        {project.description}
                    </p>

                    {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                                <span key={i}
                                    className="rounded-full px-2.5 py-1 text-xs font-medium text-slate-300"
                                    style={{
                                        background: `hsla(${240 + index * 30 + i * 20}, 50%, 30%, 0.4)`,
                                        border: `1px solid hsla(${240 + index * 30 + i * 20}, 50%, 60%, 0.2)`,
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
    if (!projects || projects.length === 0) return null;
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
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400">Projects</span>
                <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">Featured Work</h3>
                <p className="mt-3 text-slate-400">Things I've built that I'm proud of</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} index={idx} />
                ))}
            </div>
        </section>
    );
}
