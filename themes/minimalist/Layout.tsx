import type { ReactNode } from "react";

export function MinimalistLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-white text-zinc-900 antialiased">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap');
        .theme-min { font-family: 'DM Sans', system-ui, sans-serif; }
        .theme-min-serif { font-family: 'DM Serif Display', Georgia, serif; }
      `}</style>
            <div className="theme-min">{children}</div>
        </div>
    );
}
