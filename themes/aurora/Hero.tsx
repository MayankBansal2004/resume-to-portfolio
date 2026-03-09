"use client";
import Image from "next/image";
import type { HeroProps } from "@/types/theme";

export function AuroraHero({ name, headline, avatar, summary }: HeroProps) {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* ── Animated aurora blobs ── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="aurora-blob absolute -top-20 left-1/4 h-[500px] w-[500px] bg-teal-500/20" style={{ animationDelay: "0s" }} />
                <div className="aurora-blob absolute top-1/3 right-0 h-[400px] w-[400px] bg-violet-600/20" style={{ animationDelay: "3s" }} />
                <div className="aurora-blob absolute bottom-0 left-1/2 h-[350px] w-[350px] bg-indigo-500/15" style={{ animationDelay: "6s" }} />
                {/* Grid overlay on top of blobs */}
                <div className="absolute inset-0"
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
                {/* Bottom to dark fade */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#080c18] to-transparent" />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-8 py-24 md:grid-cols-2">
                {/* LEFT: text */}
                <div>
                    {/* Avatar + badge */}
                    <div className="mb-8 flex items-center gap-4">
                        {avatar && (
                            <div className="aurora-border-gradient shrink-0 rounded-full p-[1px]">
                                <div className="h-14 w-14 overflow-hidden rounded-full">
                                    <Image src={avatar} alt={name} width={56} height={56} className="object-cover" />
                                </div>
                            </div>
                        )}
                        {headline && (
                            <div className="aurora-glass rounded-full px-4 py-1.5 text-sm font-semibold text-teal-300">
                                ✦ {headline}
                            </div>
                        )}
                    </div>

                    {/* Name */}
                    <h1 className="text-5xl font-black tracking-tight leading-tight sm:text-6xl lg:text-7xl">
                        {name.split(" ").map((word, i) => (
                            <span key={i} className="block">
                                {i === 0 ? (
                                    <span className="text-white">{word}</span>
                                ) : (
                                    <span className="aurora-text-gradient">{word}</span>
                                )}
                            </span>
                        ))}
                    </h1>

                    <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">{summary}</p>

                    {/* CTAs */}
                    <div className="mt-10 flex flex-wrap gap-4">
                        <a href="#contact"
                            className="rounded-xl px-7 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 active:scale-95"
                            style={{ background: "linear-gradient(135deg, #0d9488, #7c3aed)", boxShadow: "0 0 30px rgba(13,148,136,0.3)" }}>
                            Let's Connect →
                        </a>
                        <a href="#projects"
                            className="aurora-glass rounded-xl px-7 py-3 text-sm font-bold text-slate-200 transition-all hover:-translate-y-0.5 hover:text-white active:scale-95">
                            View Projects
                        </a>
                    </div>
                </div>

                {/* RIGHT: floating glass card */}
                <div className="hidden md:flex justify-center">
                    <div className="relative">
                        {/* Glow */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/20 to-violet-500/20 blur-2xl scale-105" />
                        {/* Main card */}
                        <div className="aurora-border-gradient aurora-glass relative rounded-3xl p-8 w-72">
                            {/* Mini stats inside card */}
                            <p className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-6">At a Glance</p>
                            {[
                                { label: "Experience", value: "Building great things" },
                                { label: "Focus", value: "Full-Stack & AI" },
                                { label: "Status", value: "Open to Work ✓" },
                            ].map((item, i) => (
                                <div key={i} className="mb-5 last:mb-0">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                                    <p className="text-sm font-semibold text-slate-200">{item.value}</p>
                                    {i < 2 && <div className="mt-3 h-px bg-white/5" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
