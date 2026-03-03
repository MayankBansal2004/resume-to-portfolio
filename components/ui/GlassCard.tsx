import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  style,
  hover = true,
}: GlassCardProps) {
  return (
    <div
      style={style}
      className={cn(
        "rounded-2xl border border-slate-800/80",
        "bg-slate-900/70 backdrop-blur-xl",
        hover && [
          "transition-all duration-300",
          "hover:-translate-y-1",
          "hover:border-indigo-500/30",
          "hover:shadow-[0_0_30px_rgba(99,102,241,0.12),0_20px_40px_rgba(0,0,0,0.4)]",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}
