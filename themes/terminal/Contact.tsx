import { Mail, Phone, Github, Linkedin, Globe } from "lucide-react";
import type { ContactProps } from "@/types/theme";

const LINK_META = [
    { key: "email", icon: Mail, label: "send_email", href: (v: string) => `mailto:${v}` },
    { key: "phone", icon: Phone, label: "call", href: (v: string) => `tel:${v}` },
    { key: "linkedin", icon: Linkedin, label: "linkedin", href: (v: string) => v },
    { key: "github", icon: Github, label: "github", href: (v: string) => v },
    { key: "website", icon: Globe, label: "open_site", href: (v: string) => v },
] as const;

export function TerminalContact({ contact }: ContactProps) {
    const links = LINK_META.map(m => ({
        ...m,
        value: contact[m.key as keyof typeof contact],
    })).filter(l => l.value);
    if (!links.length) return null;

    return (
        <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
            <p className="term-muted text-sm mb-2">$ ./contact.sh --init</p>
            <h2 className="text-2xl font-black text-[#00ff41] term-glow mb-6">CONTACT.sh</h2>

            <div className="term-box p-6 mb-8">
                <p className="text-xs term-dim mb-4"># Available channels:</p>
                <div className="space-y-3">
                    {links.map((link, i) => {
                        const Icon = link.icon;
                        return (
                            <a key={i}
                                href={link.href(link.value!)}
                                target={link.value?.startsWith("http") ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm text-[#00ff41]/65 transition-colors hover:text-[#00ff41] group"
                            >
                                <span className="term-dim">▸</span>
                                <Icon size={14} />
                                <span className="term-prompt group-hover:text-[#00ff41]">{link.label}</span>
                                <span className="term-dim text-xs ml-auto">-- {link.value}</span>
                            </a>
                        );
                    })}
                </div>
            </div>

            <p className="text-xs term-dim">
                System uptime: <span className="text-[#00ff41]/60">open_to_work=true</span> ·
                Response time: <span className="text-[#00ff41]/60">fast</span>
            </p>
        </section>
    );
}
