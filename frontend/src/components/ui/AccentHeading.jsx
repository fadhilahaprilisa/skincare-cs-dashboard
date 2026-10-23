import React from "react";

/**
 * Reusable AccentHeading component for Bright Feminine Skinly Aesthetic:
 * Two-family pairing: Playfair Display serif display text + Inter eyebrow
 * Roman line in Deep Indigo (#1E1B4B) + Italic line in Violet-to-Rose Pink gradient
 */
export const AccentHeading = ({
  eyebrow,
  eyebrowIcon,
  roman,
  italic,
  subtitle,
  align = "center",
  size = "lg",
  className = "",
}) => {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  
  const sizeClasses = {
    sm: {
      roman: "text-2xl sm:text-3xl",
      italic: "text-2xl sm:text-3xl",
      subtitle: "text-xs sm:text-sm max-w-md",
    },
    md: {
      roman: "text-2xl sm:text-4xl",
      italic: "text-2xl sm:text-4xl",
      subtitle: "text-sm sm:text-base max-w-xl",
    },
    lg: {
      roman: "text-3xl sm:text-5xl lg:text-[54px]",
      italic: "text-3xl sm:text-5xl lg:text-[54px]",
      subtitle: "text-sm sm:text-base max-w-2xl",
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.lg;

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {/* Eyebrow Pill */}
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-white/80 border border-violet-100/80 backdrop-blur-md shadow-[0_2px_10px_rgba(124,92,255,0.06)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF] shadow-[0_0_8px_#7C5CFF]"></span>
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-violet-950">
            {eyebrow}
          </span>
          {eyebrowIcon && (
            <span className="text-[11px] text-[#EC4899]">{eyebrowIcon}</span>
          )}
        </div>
      )}

      {/* Signature Headline: Playfair Serif Roman + Italic Violet */}
      <h2 className="font-display font-medium text-[#1E1B4B] tracking-tight leading-[1.14]">
        <span className={`block font-normal ${currentSize.roman}`}>
          {roman}
        </span>
        {italic && (
          <span className={`block font-italic italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C5CFF] via-[#9061F9] to-[#EC4899] ${currentSize.italic} mt-1`}>
            {italic}
          </span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-[#64748B] font-normal leading-relaxed mt-3.5 ${currentSize.subtitle}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default AccentHeading;
