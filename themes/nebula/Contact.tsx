import { Mail, Phone, Github, Linkedin, Globe } from "lucide-react";
import type { ContactProps } from "@/types/theme";

const LINK_META = [
    { key: "email", icon: Mail, label: "Email", color: "#f472b6", prefix: "mailto:" },
    { key: "phone", icon: Phone, label: "Phone", color: "#34d399", prefix: "tel:" },
    { key: "linkedin", icon: Linkedin, label: "LinkedIn", color: "#60a5fa", prefix: "" },
    { key: "github", icon: Github, label: "GitHub", color: "#a78bfa", prefix: "" },
    { key: "website", icon: Globe, label: "Website", color: "#67e8f9", prefix: "" },
] as const;

export function NebulaContact({ contact }: ContactProps) {
    const links = LINK_META.map(m => ({
        ...m,
        href: m.prefix ? `${m.prefix}${contact[m.key as keyof typeof contact]}` : contact[m.key as keyof typeof contact],
        value: contact[m.key as keyof typeof contact],
    })).filter(l => l.value);

    if (!links.length) return null;

    return (
        <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
            <div
                className="relative overflow-hidden rounded-3xl border border-slate-800/60 p-10 sm:p-16 text-center"
                style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.05) 0%,rgba(139,92,246,0.04) 50%,rgba(6,182,212,0.04) 100%)" }}
            >
                {/* Decorative rings */}
                {[280, 380, 480].map((d, i) => (
                    <div key={i} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/8"
                        style={{ width: d, height: d }} />
                ))}

                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

                <div className="relative z-10">
                    <span className="theme-nebula-mono text-xs font-bold uppercase tracking-[0.3em] text-indigo-400">Contact</span>
                    <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl mb-3">
                        Let&apos;s Build Something{" "}
                        <span style={{ background: "linear-gradient(90deg,#818cf8,#67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            Amazing
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-md mx-auto mb-10 text-sm sm:text-base">
                        Open to collaboration, new roles, and exciting conversations.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        {links.map((link, i) => {
                            const Icon = link.icon;
                            return (
                                <a key={i} href={link.href}
                                    target={link.href?.startsWith("http") ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-opacity-70"
                                    style={{ "--glow": link.color } as React.CSSProperties}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 22px ${link.color}28`;
                                        (e.currentTarget as HTMLElement).style.borderColor = `${link.color}35`;
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.boxShadow = "";
                                        (e.currentTarget as HTMLElement).style.borderColor = "";
                                    }}
                                >
                                    {/* Shine sweep */}
                                    <div className="absolute inset-0 -skew-x-12 -translate-x-full bg-white/5 transition-transform duration-700 group-hover:translate-x-full" />
                                    <Icon size={16} style={{ color: link.color }} />
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
