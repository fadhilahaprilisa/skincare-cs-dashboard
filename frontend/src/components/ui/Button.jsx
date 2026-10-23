import React from "react";

// Mobbin Clean Design System Button - Clean, natural, and solid without AI gradients
export const Button = ({ 
  variant = "primary", 
  size = "md", 
  icon, 
  loading = false,
  loadingText,
  children, 
  className = "", 
  disabled = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all select-none rounded-full cursor-pointer disabled:cursor-not-allowed";
  
  const variants = {
    // Primary Button (Mobbin solid black)
    primary: `bg-[#141414] text-white hover:bg-[#2B2B2B] active:scale-[0.98] shadow-sm ${
      loading 
        ? "opacity-80 cursor-wait" 
        : "disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-75"
    }`,
    
    // Secondary Button (Mobbin off-white / light neutral)
    secondary: "bg-[#F1F1F0] text-[#141414] hover:bg-[#E5E5E3] active:scale-[0.98] border-none disabled:bg-slate-100 disabled:text-slate-400",
    
    // Tertiary / Outline Button
    outline: "bg-white text-[#141414] border border-slate-200/90 hover:bg-slate-50 active:scale-[0.98] disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200",
    tertiary: "bg-white text-[#141414] border border-slate-200/90 hover:bg-slate-50 active:scale-[0.98] disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200",
    
    // Quaternary / Ghost Button
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950 disabled:text-slate-400",
    
    // Destructive Button
    destructive: "bg-white text-red-600 border border-red-200 hover:bg-red-50 active:scale-[0.98] disabled:opacity-50",
    
    // Glassmorphism (preserved for landing page floating elements)
    glass: "bg-white/40 hover:bg-white/60 text-slate-900 backdrop-blur-md border border-white/70 shadow-sm",
  };
  
  const sizes = {
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-4 py-2 text-xs md:text-sm",
    lg: "px-5 py-2.5 text-sm md:text-base",
  };

  return (
    <button 
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant] || variants.glass} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg className="h-4 w-4 animate-spin text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {icon && (
            <span className="material-symbols-outlined text-[18px] shrink-0 leading-none">
              {icon}
            </span>
          )}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;