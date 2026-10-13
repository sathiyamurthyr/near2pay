import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-brand-burgundy text-white hover:bg-brand-burgundyDark shadow-sm hover:shadow active:scale-[0.99] focus-visible:ring-brand-burgundy",
    secondary:
      "bg-brand-orange text-white hover:bg-brand-orangeDark shadow-sm hover:shadow active:scale-[0.99] focus-visible:ring-brand-orange",
    outline:
      "border border-brand-burgundy text-brand-burgundy bg-white hover:bg-brand-burgundyLight focus-visible:ring-brand-burgundy",
    ghost:
      "text-neutral-primary hover:bg-surface-subtle hover:text-brand-burgundy focus-visible:ring-brand-burgundy",
    light:
      "bg-brand-burgundyLight text-brand-burgundy hover:bg-brand-burgundy hover:text-white border border-brand-burgundy/20 focus-visible:ring-brand-burgundy",
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses} aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
