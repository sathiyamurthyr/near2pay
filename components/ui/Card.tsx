import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  bordered?: boolean;
  padded?: "sm" | "md" | "lg" | "none";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverable = false,
  bordered = true,
  padded = "md",
}) => {
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-white rounded-2xl ${
        bordered ? "border border-surface-border" : ""
      } ${
        hoverable
          ? "transition-all duration-300 hover:shadow-cardHover hover:border-brand-burgundy/30 hover:-translate-y-0.5"
          : "shadow-card"
      } ${paddingStyles[padded]} ${className}`}
    >
      {children}
    </div>
  );
};
