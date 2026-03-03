"use client";

import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

const TRUST_ITEMS = [
  "No credit card required",
  "Free forever plan",
  "Deploys in 30 seconds",
];

export function HeroSection() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-24 text-center">
      {/* Badge */}
      <div className="mb-6">
        <SectionLabel>
          <span className="text-yellow-400">✦</span>
          AI-Powered Portfolio Generation
        </SectionLabel>
      </div>

      {/* Headline */}
      <h1
        className="mb-6 leading-tight font-extrabold text-slate-100"
        style={{
          fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
          fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        Turn Your Résumé Into a{" "}
        <span className="shimmer-text">Stunning Portfolio</span>
        <br />
        in Seconds
      </h1>

      {/* Tagline */}
      <p className="mx-auto mb-10 max-w-2xl text-lg leading-7 text-slate-400">
        Upload your resume and let our AI craft a beautiful, custom portfolio
        website — with the right words, the right design, and a live link you
        can share anywhere.
      </p>

      {/* CTA Row */}
      <div className="mb-14 flex flex-wrap items-center justify-center gap-4">
        <Button
          id="hero-generate-btn"
          variant="primary"
          size="lg"
          onClick={() =>
            document
              .getElementById("upload-zone")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          ⚡ Generate My Portfolio
        </Button>
        <Button id="hero-demo-btn" variant="secondary" size="lg">
          ▶ Watch Demo
        </Button>
      </div>

      {/* Trust strip */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">
        {TRUST_ITEMS.map((item, i) => (
          <span key={item} className="flex items-center gap-1.5">
            {i > 0 && <span className="mx-1 text-slate-700">·</span>}
            <span className="text-emerald-400">✓</span> {item}
          </span>
        ))}
      </div>
    </section>
  );
}
