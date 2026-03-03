import { Navbar } from "@/components/home/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { UploadZone } from "@/components/home/UploadZone";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/home/Footer";

export default function HomePage() {
  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ── Background grid ── */}
      <div className="grid-bg pointer-events-none fixed inset-0 z-0" />

      {/* ── Ambient light orbs ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="animate-pulse-glow absolute rounded-full blur-3xl"
          style={{
            width: 700,
            height: 700,
            top: "-20%",
            left: "-15%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-pulse-glow absolute rounded-full blur-3xl"
          style={{
            width: 600,
            height: 600,
            top: "30%",
            right: "-10%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="animate-pulse-glow absolute rounded-full blur-3xl"
          style={{
            width: 400,
            height: 400,
            bottom: "10%",
            left: "30%",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* ── Page Sections ── */}
      <Navbar />
      <HeroSection />
      <UploadZone />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
