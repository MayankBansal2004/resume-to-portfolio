import { Zap } from "lucide-react";

const FOOTER_LINKS = ["Privacy", "Terms", "Contact"];

export function Footer() {
  return (
    <footer className="relative z-10 mx-auto max-w-7xl border-t border-slate-800/60 px-6 py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
            <Zap size={14} className="fill-white text-white" />
          </div>
          <span
            className="text-sm font-semibold text-slate-400"
            style={{
              fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
            }}
          >
            Portfolio<span className="text-gradient">AI</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-slate-600">
          © 2026 PortfolioAI. Built with ❤️ and Next.js.
        </p>

        {/* Links */}
        <div className="flex gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-slate-600 transition-colors duration-200 hover:text-slate-100"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
