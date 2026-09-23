export const StatCard = ({ 
  label, 
  value, 
  unit, 
  trend, 
  trendDirection = "up",
  icon, 
  iconBg = "bg-surface-container-highest",
  iconColor = "text-primary-container",
  accentBar = "bg-primary-container",
  description,
  variant = "default", // "default" | "urgent"
}) => {
  const isUrgent = variant === "urgent";

  return (
    <div className="relative flex flex-col justify-between p-5 rounded-xl bg-surface-container overflow-hidden shadow-sm">
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentBar}`}></div>

      <div className="flex items-center justify-between mb-3">
        <span className={`text-label-md uppercase tracking-wider ${isUrgent ? "text-error" : "text-on-surface-variant"}`}>
          {label}
        </span>
        <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center ${iconColor}`}>
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className={`text-display-lg font-bold ${isUrgent ? "text-error" : "text-primary"}`}>
          {value}
        </span>
        {unit && <span className="text-body-sm text-on-surface-variant">{unit}</span>}
      </div>

      {trend && (
        <div className="flex items-center gap-2 mt-2">
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-label-sm ${
            trendDirection === "up" ? "bg-[#2ED573]/15 text-[#2ED573]" : "bg-primary-container/15 text-primary-container"
          }`}>
            <span className="material-symbols-outlined text-[12px]">
              {trendDirection === "up" ? "trending_up" : "trending_down"}
            </span>
            {trend}
          </span>
        </div>
      )}

      {description && (
        <p className="text-body-sm text-on-surface-variant mt-2">{description}</p>
      )}
    </div>
  );
};

export default StatCard;