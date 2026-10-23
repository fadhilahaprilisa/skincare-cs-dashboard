import React from "react";

export const Textarea = ({ 
  label, 
  hint, 
  className = "", 
  rows = 4,
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-slate-700">{label}</label>
      )}
      <textarea
        rows={rows}
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition-all duration-200 resize-none leading-relaxed"
        {...props}
      />
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </div>
  );
};

export default Textarea;