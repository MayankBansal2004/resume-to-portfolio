import { TESTIMONIALS } from "@/lib/data/home";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function TestimonialsSection() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24">
      {/* Header */}
      <div className="mb-14 text-center">
        <SectionLabel className="mb-4">💬 Testimonials</SectionLabel>
        <h2
          className="text-4xl font-bold tracking-tight text-slate-100"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Loved by professionals{" "}
          <span className="text-gradient">worldwide</span>
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <GlassCard key={t.name} className="flex flex-col justify-between p-6">
            {/* Stars */}
            <div className="mb-4 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-sm text-yellow-400">
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p className="mb-5 flex-1 text-sm leading-6 text-slate-400">
              &ldquo;{t.content}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background: `rgba(${t.colorRgb},0.25)`,
                  color: t.color,
                }}
              >
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
