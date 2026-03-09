import { Mail, Phone, Github, Linkedin, Globe } from "lucide-react";
import type { ContactProps } from "@/types/theme";

export function MinimalistContact({ contact }: ContactProps) {
    const links = [
        { icon: Mail, label: contact.email, href: `mailto:${contact.email}`, show: !!contact.email },
        { icon: Phone, label: contact.phone, href: `tel:${contact.phone}`, show: !!contact.phone },
        { icon: Linkedin, label: "LinkedIn", href: contact.linkedin, show: !!contact.linkedin },
        { icon: Github, label: "GitHub", href: contact.github, show: !!contact.github },
        { icon: Globe, label: "Website", href: contact.website, show: !!contact.website },
    ].filter(l => l.show);

    if (!links.length) return null;

    return (
        <section id="contact" className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="theme-min-serif text-2xl font-normal text-zinc-900 mb-10">Contact</h2>
            <div className="flex flex-wrap gap-4">
                {links.map((link, i) => {
                    const Icon = link.icon;
                    return (
                        <a key={i} href={link.href}
                            target={link.href?.startsWith("http") ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:border-zinc-400 hover:bg-white hover:text-zinc-900 hover:shadow-sm">
                            <Icon size={15} className="text-zinc-400" />
                            {link.label}
                        </a>
                    );
                })}
            </div>
        </section>
    );
}
