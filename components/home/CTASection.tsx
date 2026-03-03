"use client";

import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GithubIcon } from "@/components/icons/Icons";

export function CTASection() {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 pb-28 text-center">
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-slate-900/65 p-14 backdrop-blur-xl">
        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />

        <div className="relative z-10">
          <SectionLabel className="mb-5">🚀 Get Started</SectionLabel>

          <h2
            className="mb-4 text-4xl font-bold text-slate-100"
            style={{
              fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to stand out?
          </h2>

          <p className="mx-auto mb-8 max-w-md text-slate-400">
            Join thousands of professionals who landed their dream job with a
            portfolio built by PortfolioAI.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              id="cta-generate-btn"
              variant="primary"
              size="lg"
              onClick={() =>
                document
                  .getElementById("upload-zone")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              ⚡ Generate My Portfolio — Free
            </Button>

            <Button
              as="a"
              variant="secondary"
              size="lg"
              href="https://github.com/MayankBansal2004/resume-to-portfolio"
            >
              <GithubIcon size={18} />
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
