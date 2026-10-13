import React from "react";
import { Badge } from "./Badge";

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "burgundy" | "orange";
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = "burgundy",
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col mb-12 sm:mb-16 ${alignment} ${className}`}>
      {badge && (
        <Badge variant={badgeVariant} className="mb-3.5">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-neutral-primary tracking-tight font-display max-w-3xl leading-[1.2]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-neutral-secondary max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
