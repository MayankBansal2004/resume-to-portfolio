import { NAV_LINKS } from "@/lib/data/home";
import { Button } from "@/components/ui/Button";
import { Zap } from "lucide-react";

export function Navbar() {
  return (
    <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
          <Zap size={18} className="fill-white text-white" />
        </div>
        <span
          className="text-lg font-bold tracking-tight text-slate-100"
          style={{
            fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
          }}
        >
          Portfolio<span className="text-gradient">AI</span>
        </span>
      </div>

      {/* Nav links */}
      <div className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
            className="text-sm text-slate-400 transition-colors duration-200 hover:text-slate-100"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm">
          Sign In
        </Button>
        <Button variant="primary" size="sm">
          Get Started Free
        </Button>
      </div>
    </nav>
  );
}
