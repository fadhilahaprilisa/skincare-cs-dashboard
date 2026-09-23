export const Input = ({ 
  label, 
  icon, 
  hint, 
  error, 
  className = "", 
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-label-md text-on-surface">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
            {icon}
          </span>
        )}
        <input
          className={`w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-2.5 text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all ${
            icon ? "pl-10 pr-3" : "px-3"
          } ${error ? "border-error" : ""}`}
          {...props}
        />
      </div>
      {hint && !error && <span className="text-body-sm text-on-surface-variant">{hint}</span>}
      {error && <span className="text-body-sm text-error">{error}</span>}
    </div>
  );
};

export default Input;