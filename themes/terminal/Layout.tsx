import type { ReactNode } from "react";

export function TerminalLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#00ff41] antialiased">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        .theme-terminal * { font-family: 'JetBrains Mono', 'Courier New', monospace !important; }
        
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes type-in {
          from { width: 0; }
          to   { width: 100%; }
        }
        
        .cursor { animation: blink 1s step-end infinite; }
        
        /* Subtle scanlines overlay */
        .scanlines::before {
          content:'';
          position:fixed;
          top:0; left:0; right:0; bottom:0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,255,65,0.015) 2px,
            rgba(0,255,65,0.015) 4px
          );
          pointer-events:none;
          z-index:9999;
        }

        /* CRT vignette */
        .crt-vignette::after {
          content:'';
          position:fixed;
          inset:0;
          background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%);
          pointer-events:none;
          z-index:9998;
        }
        
        .term-box {
          border: 1px solid rgba(0,255,65,0.25);
          background: rgba(0,255,65,0.02);
        }
        .term-box:hover {
          border-color: rgba(0,255,65,0.5);
          background: rgba(0,255,65,0.04);
          box-shadow: 0 0 20px rgba(0,255,65,0.07), inset 0 0 20px rgba(0,255,65,0.02);
        }
        .term-prompt::before { content:'$ '; color: rgba(0,255,65,0.5); }
        .term-section-title::before { content:'## '; color: rgba(0,255,65,0.4); }
        .term-glow { text-shadow: 0 0 10px rgba(0,255,65,0.6); }
        .term-dim { color: rgba(0,255,65,0.45); }
        .term-muted { color: rgba(0,255,65,0.3); }
      `}</style>
            <div className="theme-terminal scanlines crt-vignette">{children}</div>
        </div>
    );
}
