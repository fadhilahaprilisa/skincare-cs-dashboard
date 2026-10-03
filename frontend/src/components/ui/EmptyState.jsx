export const EmptyState = ({ icon = "inbox", title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <span className="material-symbols-outlined text-brand-cyan text-[64px] mb-4 opacity-50">
      {icon}
    </span>
    <h3 className="text-headline-md text-primary font-bold mb-2">{title}</h3>
    {description && (
      <p className="text-body-md text-on-surface-variant max-w-md mb-4">{description}</p>
    )}
    {action}
  </div>
);

export default EmptyState;