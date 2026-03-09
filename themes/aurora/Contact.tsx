import { Mail, Phone, Github, Linkedin, Globe } from "lucide-react";
import type { ContactProps } from "@/types/theme";

const LINK_META = [
    { key: "email", icon: Mail, label: "Email", href: (v: string) => `mailto:${v}` },
    { key: "phone", icon: Phone, label: "Phone", href: (v: string) => `tel:${v}` },
    { key: "linkedin", icon: Linkedin, label: "LinkedIn", href: (v: string) => v },
    { key: "github", icon: Github, label: "GitHub", href: (v: string) => v },
    { key: "website", icon: Globe, label: "Website", href: (v: string) => v },
] as const;

export function AuroraContact({ contact }: ContactProps) {
    const links = LINK_META.map(m => ({
        ...m,
        value: contact[m.key as keyof typeof contact],
    })).filter(l => l.value);
    if (!links.length) return null;

    return (
        <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
            <div className="aurora-border-gradient aurora-glass relative overflow-hidden rounded-3xl p-12 text-center">
                {/* Aurora blobs inside section */}
                <div className="aurora-blob pointer-events-none absolute -top-16 left-1/4 h-48 w-48 bg-teal-500/15" style={{ animationDelay: "1s" }} />
                <div className="aurora-blob pointer-events-none absolute -bottom-16 right-1/4 h-48 w-48 bg-violet-500/15" style={{ animationDelay: "4s" }} />

                <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-teal-400">Contact</span>
                    <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl mb-3">
                        Let&apos;s Create Something{" "}
                        <span className="aurora-text-gradient">Beautiful</span>
                    </h2>
                    <p className="text-slate-400 max-w-md mx-auto mb-10 text-sm">
                        Open to new opportunities, collaborations, and conversations that matter.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {links.map((link, i) => {
                            const Icon = link.icon;
                            return (
                                <a key={i}
                                    href={link.href(link.value!)}
                                    target={link.value?.startsWith("http") ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="aurora-glass group flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-semibold text-slate-200 transition-all hover:-translate-y-1 hover:text-white">
                                    <Icon size={16} className="text-teal-400 group-hover:text-teal-300 transition-colors" />
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
