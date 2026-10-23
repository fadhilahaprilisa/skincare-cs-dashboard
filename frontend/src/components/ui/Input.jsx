import React from "react";

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
        <label className="text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
            {icon}
          </span>
        )}
        <input
          className={`w-full bg-slate-100/80 border border-slate-200 rounded-full py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition-all duration-200 ${
            icon ? "pl-11 pr-4" : "px-4"
          } ${error ? "border-red-400 focus:border-red-500" : ""}`}
          {...props}
        />
      </div>
      {hint && !error && <span className="text-xs text-slate-400">{hint}</span>}
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};

export default Input;