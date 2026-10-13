import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  showTagline = true,
  size = "md",
}) => {
  const iconSize = size === "sm" ? 34 : size === "lg" ? 52 : 42;

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-burgundy rounded-lg ${className}`}
      aria-label="Near4Pay by Sathus Technology - Home"
    >
      <div
        className="relative flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src="/brand/logo.svg"
          alt="Near4Pay emblem"
          width={iconSize}
          height={iconSize}
          priority
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="font-display font-extrabold text-2xl tracking-tight text-brand-burgundy leading-none">
            Near<span className="text-brand-orange">4</span>Pay
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-secondary mt-0.5 leading-none">
            Sathus Technology
          </span>
        )}
      </div>
    </Link>
  );
};
