// Card dengan 4 tier sesuai design system
export const Card = ({ 
  tier = "base", 
  children, 
  className = "", 
  glow = false,
  ...props 
}) => {
  const tiers = {
    base: "bg-surface-container-low border border-outline-variant/30",
    elevated: "bg-surface-container border border-outline-variant/40",
    high: "bg-surface-container-high border border-outline-variant/50",
    highest: "bg-surface-container-highest border border-primary-container/20",
  };

  return (
    <div 
      className={`rounded-xl ${tiers[tier]} ${glow ? "shadow-cyan-inset" : "shadow-sm"} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;