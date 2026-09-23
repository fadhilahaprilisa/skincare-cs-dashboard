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
        <label className="text-label-md text-on-surface">{label}</label>
      )}
      <textarea
        rows={rows}
        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all resize-none leading-relaxed"
        {...props}
      />
      {hint && <span className="text-body-sm text-on-surface-variant">{hint}</span>}
    </div>
  );
};

export default Textarea;