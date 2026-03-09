"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { PortfolioCanvas } from "./PortfolioCanvas";

interface PortfolioHeroProps {
    name: string;
    headline: string | null;
    avatar: string | null;
    summary: string;
}

export function PortfolioHero({ name, headline, avatar, summary }: PortfolioHeroProps) {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Subtle ambient background — not a canvas, just CSS blobs */}
            <div className="pointer-events-none absolute inset-0">
                {/* Dark background */}
                <div className="absolute inset-0 bg-[#030711]" />
                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
                {/* Bottom fade to black */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030711] to-transparent" />
            </div>

            {/* ── Main content: 2-column layout ── */}
            <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-8 py-20 md:grid-cols-2 md:gap-16 md:py-0">

                {/* LEFT: Text Content (always readable, always in front) */}
                <div className="flex flex-col">
                    {/* Avatar + name row */}
                    <motion.div
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-6 flex items-center gap-4"
                    >
                        {avatar && (
                            <div className="relative shrink-0">
                                <div className="h-14 w-14 overflow-hidden rounded-full ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-[#030711]">
                                    <Image src={avatar} alt={name} width={56} height={56} className="object-cover" />
                                </div>
                                {/* Online dot */}
                                <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-[#030711] bg-emerald-400" />
                            </div>
                        )}
                        {headline && (
                            <div className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-semibold text-indigo-300">
                                {headline}
                            </div>
                        )}
                    </motion.div>

                    {/* Name — largest element, clear and readable */}
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
                    >
                        {name.split(" ").map((word, i) => (
                            <span key={i} className="block">
                                {i === 0 ? (
                                    <span className="text-white">{word}</span>
                                ) : (
                                    <span
                                        style={{
                                            background: "linear-gradient(90deg, #818cf8 0%, #67e8f9 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        {word}
                                    </span>
                                )}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Summary — comfortable size, good contrast */}
                    <motion.p
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="mt-6 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg"
                    >
                        {summary}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-10 flex flex-wrap gap-4"
                    >
                        <a
                            href="#contact"
                            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] active:scale-95"
                        >
                            Get in Touch →
                        </a>
                        <a
                            href="#experience"
                            className="rounded-xl border border-slate-700 bg-slate-800/60 px-6 py-3 text-sm font-bold text-slate-300 transition-all hover:border-slate-500 hover:text-white hover:bg-slate-700/60 active:scale-95"
                        >
                            View Work
                        </a>
                    </motion.div>

                    {/* Scroll hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0 }}
                        className="mt-16 hidden items-center gap-2 md:flex"
                    >
                        <div className="h-px w-8 bg-slate-700" />
                        <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Scroll to explore</span>
                    </motion.div>
                </div>

                {/* RIGHT: 3D Canvas — decorative, contained, doesn't obscure text */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="relative hidden h-[420px] w-full md:block"
                >
                    {/* Glow behind the canvas */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-64 w-64 rounded-full bg-indigo-600/20 blur-[80px]" />
                    </div>
                    <PortfolioCanvas />
                </motion.div>
            </div>
        </section>
    );
}
