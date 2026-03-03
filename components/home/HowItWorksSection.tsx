import { STEPS } from "@/lib/data/home";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 mx-auto max-w-5xl px-6 pb-24"
    >
      {/* Header */}
      <div className="mb-14 text-center">
        <SectionLabel className="mb-4">⚙️ Process</SectionLabel>
        <h2
          className="text-4xl font-bold tracking-tight text-slate-100"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          From resume to portfolio{" "}
          <span className="text-gradient">in 4 steps</span>
        </h2>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {STEPS.map((step, idx) => (
          <GlassCard
            key={step.num}
            className="p-6 text-center"
            style={{ animationDelay: `${idx * 0.15}s` } as React.CSSProperties}
          >
            {/* Step circle */}
            <div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500/35 text-xl font-bold text-indigo-300"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))",
              }}
            >
              {step.num}
            </div>

            <h3 className="mb-2 font-semibold text-slate-100">{step.title}</h3>
            <p className="text-sm leading-6 text-slate-400">{step.desc}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
