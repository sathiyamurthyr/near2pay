import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "burgundy" | "orange" | "neutral" | "success" | "demo";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "burgundy",
  size = "md",
  className = "",
  icon,
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
  };

  const variantStyles = {
    burgundy: "bg-brand-burgundyLight text-brand-burgundy border border-brand-burgundy/20",
    orange: "bg-brand-orangeLight text-brand-orangeDark border border-brand-orange/30",
    neutral: "bg-surface-subtle text-neutral-secondary border border-surface-border",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    demo: "bg-amber-50 text-amber-800 border border-amber-300 font-semibold tracking-wide uppercase text-[10px]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
