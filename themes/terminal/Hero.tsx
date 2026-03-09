"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { HeroProps } from "@/types/theme";

function TypeWriter({ text, speed = 40 }: { text: string; speed?: number }) {
    const [displayed, setDisplayed] = useState("");
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);
    return (
        <>
            {displayed}
            <span className="cursor">█</span>
        </>
    );
}

export function TerminalHero({ name, headline, avatar, summary }: HeroProps) {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 py-24">
            <div className="mx-auto w-full max-w-4xl">
                {/* ── Terminal window chrome ── */}
                <div className="mb-8 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/70" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <div className="h-3 w-3 rounded-full bg-green-500/70" />
                    <span className="ml-3 text-xs term-dim">portfolio@localhost ~ </span>
                </div>

                {/* ── Boot sequence ── */}
                <div className="space-y-1 term-dim text-sm mb-10">
                    <p>Initializing portfolio.sh...</p>
                    <p>Loading user data... <span className="text-[#00ff41]">[OK]</span></p>
                    <p>Mounting sections... <span className="text-[#00ff41]">[OK]</span></p>
                    <p>System ready.</p>
                </div>

                {/* ── Main identity block ── */}
                <div className="border border-[#00ff41]/30 p-6 sm:p-10 mb-8" style={{ boxShadow: "0 0 40px rgba(0,255,65,0.05)" }}>
                    {/* Avatar */}
                    {avatar && (
                        <div className="mb-8 flex items-center gap-5">
                            <div className="relative h-16 w-16 overflow-hidden border border-[#00ff41]/40"
                                style={{ filter: "drop-shadow(0 0 6px rgba(0,255,65,0.4))" }}>
                                <Image src={avatar} alt={name} width={64} height={64} className="object-cover grayscale contrast-125" />
                            </div>
                            <div>
                                <p className="term-dim text-xs"># user profile loaded</p>
                                {headline && <p className="text-[#00ff41]/80 text-sm mt-1">{headline}</p>}
                            </div>
                        </div>
                    )}

                    {/* Name — large, glowing */}
                    <div className="mb-6">
                        <p className="term-dim text-xs mb-2">$ whoami</p>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#00ff41] term-glow leading-none">
                            {name}
                        </h1>
                    </div>

                    {/* Summary */}
                    <div>
                        <p className="term-dim text-xs mb-2">$ cat about.txt</p>
                        <p className="text-sm leading-relaxed text-[#00ff41]/70 max-w-2xl">
                            <TypeWriter text={summary} speed={18} />
                        </p>
                    </div>
                </div>

                {/* ── Commands ── */}
                <div className="flex flex-wrap gap-4">
                    {[
                        { cmd: "explore_work", href: "#experience" },
                        { cmd: "view_projects", href: "#projects" },
                        { cmd: "contact_me", href: "#contact" },
                    ].map((c, i) => (
                        <a key={i} href={c.href}
                            className="border border-[#00ff41]/30 px-5 py-2.5 text-sm text-[#00ff41]/80 transition-all hover:border-[#00ff41] hover:text-[#00ff41] hover:bg-[#00ff41]/05 hover:shadow-[0_0_16px_rgba(0,255,65,0.2)] active:scale-95"
                        >
                            ./{c.cmd}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
