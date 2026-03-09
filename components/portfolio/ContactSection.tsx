"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Github, Linkedin, Globe } from "lucide-react";
import type { z } from "zod";
import type { ContactSchema } from "@/types/portfolio";

type Contact = z.infer<typeof ContactSchema>;

export function ContactSection({ contact }: { contact: Contact }) {
    if (!contact) return null;
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    const links = [
        { key: "email", icon: Mail, label: "Email Me", href: `mailto:${contact.email}`, value: contact.email, color: "#f472b6" },
        { key: "phone", icon: Phone, label: "Call Me", href: `tel:${contact.phone}`, value: contact.phone, color: "#34d399" },
        { key: "linkedin", icon: Linkedin, label: "LinkedIn", href: contact.linkedin, value: contact.linkedin, color: "#60a5fa" },
        { key: "github", icon: Github, label: "GitHub", href: contact.github, value: contact.github, color: "#a78bfa" },
        { key: "website", icon: Globe, label: "Website", href: contact.website, value: contact.website, color: "#67e8f9" },
    ].filter(l => l.value && l.value.trim() !== "");

    if (links.length === 0) return null;

    return (
        <section ref={ref} className="px-6 sm:px-0">
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
            >
                {/* Big CTA block */}
                <div
                    className="relative overflow-hidden rounded-3xl border border-slate-800/80 p-10 sm:p-16 text-center"
                    style={{
                        background: "linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.05) 50%, rgba(6,182,212,0.05) 100%)",
                    }}
                >
                    {/* Animated background rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                        {[1, 1.6, 2.2].map((s, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full border border-indigo-500/10"
                                style={{
                                    width: `${s * 320}px`,
                                    height: `${s * 320}px`,
                                    animation: `spin ${8 + i * 4}s linear infinite ${i % 2 === 1 ? "reverse" : ""}`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Corner glows */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-48 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-48 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

                    <div className="relative z-10">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400">Contact</span>
                        <h3 className="mt-3 text-3xl sm:text-5xl font-black text-white mb-4">
                            Let's Build Something
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #818cf8, #67e8f9)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            > Amazing</span>
                        </h3>
                        <p className="text-slate-400 max-w-lg mx-auto mb-10">
                            Open to opportunities, collaborations, and interesting conversations. Let's connect!
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {links.map((link, idx) => {
                                const Icon = link.icon;
                                return (
                                    <motion.a
                                        key={idx}
                                        href={link.href}
                                        target={link.href?.startsWith("http") ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={inView ? { scale: 1, opacity: 1 } : {}}
                                        transition={{ duration: 0.4, delay: 0.3 + idx * 0.1, type: "spring" }}
                                        whileHover={{ scale: 1.08, y: -3 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 px-6 py-4 font-semibold text-white transition-all backdrop-blur-sm hover:border-opacity-60"
                                        style={{
                                            boxShadow: `0 0 0 0 ${link.color}`,
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${link.color}30`;
                                            (e.currentTarget as HTMLElement).style.borderColor = `${link.color}40`;
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                            (e.currentTarget as HTMLElement).style.borderColor = "";
                                        }}
                                    >
                                        {/* Hover shine */}
                                        <div className="absolute inset-0 -skew-x-12 translate-x-[-110%] bg-white/5 group-hover:translate-x-[110%] transition-transform duration-700 ease-out" />

                                        <Icon size={18} style={{ color: link.color }} />
                                        <span className="text-sm">{link.label}</span>
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
