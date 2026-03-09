"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import type { HeroProps } from "@/types/theme";

function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const stars = Array.from({ length: 200 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.2,
            o: Math.random() * 0.7 + 0.3,
        }));
        stars.forEach(s => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200,210,255,${s.o})`;
            ctx.fill();
        });
    }, []);
    return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

export function NebulaHero({ name, headline, avatar, summary }: HeroProps) {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Starfield canvas */}
            <div className="absolute inset-0 bg-[#030711]">
                <StarField />
            </div>

            {/* Ambient orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="nb-pulse absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-indigo-700/20 blur-[100px]" />
                <div className="nb-pulse absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-purple-800/15 blur-[90px]" style={{ animationDelay: "2s" }} />
                <div className="nb-pulse absolute bottom-10 left-1/3 h-60 w-60 rounded-full bg-cyan-900/15 blur-[80px]" style={{ animationDelay: "4s" }} />
            </div>

            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "linear-gradient(rgba(99,102,241,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.08) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#030711] to-transparent" />

            {/* ── 2-column layout ── */}
            <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-8 py-24 md:grid-cols-2 md:gap-12">

                {/* LEFT: Text */}
                <div>
                    {/* Badge row */}
                    <div className="mb-6 flex items-center gap-4">
                        {avatar && (
                            <div className="relative shrink-0">
                                <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-[#030711]">
                                    <Image src={avatar} alt={name} width={48} height={48} className="object-cover" />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#030711] bg-emerald-400" />
                            </div>
                        )}
                        {headline && (
                            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-semibold text-indigo-300 backdrop-blur-sm">
                                {headline}
                            </span>
                        )}
                    </div>

                    {/* Name — split: first plain white, rest gradient */}
                    <h1 className="text-5xl font-black tracking-tight leading-tight sm:text-6xl lg:text-7xl">
                        {name.split(" ").map((word, i) => (
                            <span key={i} className="block">
                                {i === 0 ? (
                                    <span className="text-white">{word}</span>
                                ) : (
                                    <span style={{
                                        background: "linear-gradient(110deg,#818cf8 0%,#a78bfa 50%,#67e8f9 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}>{word}</span>
                                )}
                            </span>
                        ))}
                    </h1>

                    {/* Summary */}
                    <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
                        {summary}
                    </p>

                    {/* CTAs */}
                    <div className="mt-10 flex flex-wrap gap-4">
                        <a href="#contact"
                            className="rounded-xl bg-indigo-600 px-7 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_36px_rgba(99,102,241,0.55)] active:scale-95">
                            Get in Touch →
                        </a>
                        <a href="#experience"
                            className="rounded-xl border border-slate-700 bg-slate-800/60 px-7 py-3 text-sm font-bold text-slate-300 backdrop-blur-sm transition-all hover:border-slate-500 hover:text-white hover:bg-slate-700/60 active:scale-95">
                            View Work
                        </a>
                    </div>
                </div>

                {/* RIGHT: Decorative 3D-feel CSS orb */}
                <div className="relative hidden h-[380px] w-full items-center justify-center md:flex">
                    {/* Outer spinning ring */}
                    <div className="nb-spin absolute h-72 w-72 rounded-full border border-indigo-500/20" />
                    <div className="nb-spin-r absolute h-56 w-56 rounded-full border border-purple-500/15" />

                    {/* Glowing sphere (pure CSS) */}
                    <div className="nb-float relative h-48 w-48 rounded-full"
                        style={{
                            background: "radial-gradient(circle at 35% 35%, #4f46e5 0%, #1e1b4b 50%, #030711 100%)",
                            boxShadow: "0 0 60px 20px rgba(99,102,241,0.2), inset 0 0 40px rgba(139,92,246,0.3)",
                        }}>
                        {/* Specular highlight */}
                        <div className="absolute top-6 left-8 h-10 w-10 rounded-full bg-white/15 blur-md" />
                        {/* Inner glow */}
                        <div className="absolute inset-4 rounded-full bg-indigo-600/10 blur-xl" />
                    </div>

                    {/* Floating dots */}
                    {[
                        { top: "12%", left: "8%", color: "#818cf8", size: 8, delay: "0s" },
                        { top: "75%", left: "15%", color: "#67e8f9", size: 6, delay: "1s" },
                        { top: "20%", right: "10%", color: "#a78bfa", size: 10, delay: "2s" },
                        { top: "65%", right: "12%", color: "#f472b6", size: 5, delay: "0.5s" },
                    ].map((d, i) => (
                        <div key={i} className="nb-float absolute rounded-full"
                            style={{
                                ...d, width: d.size, height: d.size, background: d.color,
                                boxShadow: `0 0 8px ${d.color}`, animationDelay: d.delay
                            }} />
                    ))}
                </div>
            </div>

            {/* scroll hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600">Scroll</span>
                <div className="h-10 w-5 rounded-full border border-slate-700 flex items-start justify-center pt-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                        style={{ animation: "nebula-float 1.5s ease-in-out infinite" }} />
                </div>
            </div>
        </section>
    );
}
