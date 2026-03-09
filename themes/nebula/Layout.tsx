import type { ReactNode } from "react";

export function NebulaLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#030711] text-slate-100 antialiased">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .theme-nebula { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .theme-nebula-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes nebula-float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
        @keyframes nebula-spin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes nebula-pulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.9;transform:scale(1.04)} }
        .nb-float { animation: nebula-float 6s ease-in-out infinite; }
        .nb-spin  { animation: nebula-spin  10s linear infinite; }
        .nb-spin-r{ animation: nebula-spin  14s linear infinite reverse; }
        .nb-pulse { animation: nebula-pulse 4s ease-in-out infinite; }
      `}</style>
            <div className="theme-nebula">{children}</div>
        </div>
    );
}
