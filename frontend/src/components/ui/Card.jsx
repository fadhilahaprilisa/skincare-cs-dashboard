import React from "react";

// Pure White Card with Hairline Borders & Soft Subtle Shadow
export const Card = ({ 
  tier = "base", 
  children, 
  className = "", 
  glow = false,
  hover = false,
  ...props 
}) => {
  // Clean Pure White card tiers with subtle shadows
  const tiers = {
    base: "bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]",
    elevated: "bg-white border border-slate-200/80 shadow-[0_2px_6px_rgba(15,23,42,0.04),0_8px_20px_rgba(15,23,42,0.03)]",
    high: "bg-white border border-slate-200/90 shadow-[0_4px_12px_rgba(15,23,42,0.05),0_12px_28px_rgba(15,23,42,0.04)]",
    highest: "bg-white border border-slate-300 shadow-[0_8px_24px_rgba(15,23,42,0.06),0_16px_36px_rgba(15,23,42,0.05)]",
    frosted: "bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]",
  };

  const glowStyles = glow 
    ? "border-slate-300 shadow-[0_4px_16px_rgba(15,23,42,0.06)]" 
    : "";

  const hoverStyles = hover 
    ? "transition-all duration-300 hover:translate-y-[-2px] hover:border-[#7C5CFF]/40 hover:shadow-[0_14px_40px_rgba(124,92,255,0.12)]" 
    : "";

  return (
    <div 
      className={`rounded-2xl ${tiers[tier] || tiers.base} ${glowStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;