import type { ReactNode } from "react";

export function AuroraLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#080c18] text-slate-100 antialiased">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        .theme-aurora { font-family: 'Outfit', system-ui, sans-serif; }
        
        @keyframes aurora-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes aurora-float {
          0%,100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50%      { transform: translateY(-30px) scale(1.05); opacity: 0.7; }
        }
        .aurora-blob {
          animation: aurora-float 8s ease-in-out infinite;
          filter: blur(80px);
          border-radius: 50%;
        }
        .aurora-glass {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .aurora-glass:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(45,212,191,0.25);
        }
        .aurora-text-gradient {
          background: linear-gradient(135deg, #2dd4bf 0%, #818cf8 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .aurora-border-gradient {
          position: relative;
        }
        .aurora-border-gradient::before {
          content:'';
          position:absolute;
          inset:0;
          border-radius:inherit;
          padding:1px;
          background: linear-gradient(135deg, rgba(45,212,191,0.4), rgba(129,140,248,0.2), rgba(192,132,252,0.3));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>
            <div className="theme-aurora">{children}</div>
        </div>
    );
}
