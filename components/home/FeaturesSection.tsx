import { FEATURES } from "@/lib/data/home";
import { ICON_MAP } from "@/components/icons/Icons";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative z-10 mx-auto max-w-6xl px-6 pb-24"
    >
      {/* Header */}
      <div className="mb-14 text-center">
        <SectionLabel className="mb-4">🧠 Powerful Features</SectionLabel>
        <h2
          className="mb-4 text-4xl font-bold text-slate-100"
          style={{
            fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Everything you need,{" "}
          <span className="text-gradient">nothing you don&apos;t</span>
        </h2>
        <p className="mx-auto max-w-xl text-slate-400">
          We&apos;ve packed everything a professional needs to stand out online
          — and hidden everything they don&apos;t.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => {
          const IconComponent = ICON_MAP[feature.icon];
          return (
            <GlassCard key={feature.title} className="p-6">
              {/* Lucide icon with per-feature accent colour */}
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background: `rgba(${feature.colorRgb}, 0.15)`,
                  color: feature.color,
                }}
              >
                {IconComponent && (
                  <IconComponent size={22} strokeWidth={1.75} />
                )}
              </div>

              <h3 className="mb-2 text-lg font-semibold text-slate-100">
                {feature.title}
              </h3>
              <p className="text-sm leading-6 text-slate-400">
                {feature.description}
              </p>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
