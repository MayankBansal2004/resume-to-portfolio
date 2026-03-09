import Image from "next/image";
import { Mail, Github, Linkedin, Globe } from "lucide-react";
import type { HeroProps } from "@/types/theme";

export function MinimalistHero({ name, headline, avatar, summary }: HeroProps) {
    return (
        <header className="border-b border-zinc-100 bg-white">
            <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
                <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                        {/* Name */}
                        <h1 className="theme-min-serif text-4xl font-normal leading-tight text-zinc-900 sm:text-5xl md:text-6xl">
                            {name}
                        </h1>

                        {/* Headline */}
                        {headline && (
                            <p className="mt-3 text-base font-medium uppercase tracking-[0.15em] text-zinc-400">
                                {headline}
                            </p>
                        )}

                        {/* Divider */}
                        <div className="my-6 h-px w-12 bg-zinc-200" />

                        {/* Summary */}
                        <p className="text-base leading-8 text-zinc-500 max-w-xl">
                            {summary}
                        </p>
                    </div>

                    {/* Avatar */}
                    {avatar && (
                        <div className="shrink-0">
                            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-zinc-100 sm:h-28 sm:w-28">
                                <Image src={avatar} alt={name} width={112} height={112} className="object-cover" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
