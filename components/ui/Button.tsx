import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: [
    "relative overflow-hidden",
    "bg-gradient-to-br from-blue-500 to-violet-600",
    "text-white font-semibold",
    "hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5",
    "active:translate-y-0",
    "transition-all duration-300",
  ].join(" "),

  secondary: [
    "bg-transparent border border-slate-700",
    "text-slate-200 font-medium",
    "hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]",
    "transition-all duration-300",
  ].join(" "),

  ghost: [
    "bg-transparent text-slate-400 font-medium",
    "hover:text-white hover:bg-white/5",
    "transition-all duration-200",
  ].join(" "),
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-2xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  as: Tag = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 cursor-pointer select-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (Tag === "a" && href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {/* shimmer overlay for primary */}
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-br from-blue-400 to-violet-500 opacity-0 transition-opacity duration-300 hover:opacity-100" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
