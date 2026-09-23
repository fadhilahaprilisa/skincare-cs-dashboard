// Reusable Button component dengan 4 varian
export const Button = ({ 
  variant = "primary", 
  size = "md", 
  icon, 
  children, 
  className = "", 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all rounded-lg";
  
  const variants = {
    primary: "bg-primary-container text-on-primary-container hover:brightness-110 shadow-cyan-glow",
    secondary: "bg-surface-container-high text-on-surface border border-outline-variant hover:bg-surface-bright hover:border-primary-container",
    ghost: "bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
    destructive: "bg-error-container/40 text-error border border-error/40 hover:bg-error-container/60",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-label-md",
    md: "px-4 py-2 text-headline-sm",
    lg: "px-6 py-3 text-headline-sm",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;