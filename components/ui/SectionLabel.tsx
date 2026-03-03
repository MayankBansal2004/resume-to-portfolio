import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        "border border-indigo-500/25 bg-indigo-500/10 text-indigo-300",
        "rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}
