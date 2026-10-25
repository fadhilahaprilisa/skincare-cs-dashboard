import React from "react";

export const StatCard = ({ 
  label, 
  value, 
  unit, 
  trend, 
  trendDirection = "up",
  icon, 
  iconBg = "bg-slate-100", 
  iconColor = "text-slate-800",
  accentBar = "bg-slate-900",
  description,
  variant = "default", // "default" | "urgent"
}) => {
  const isUrgent = variant === "urgent";

  return (
    <div className={`relative flex flex-col justify-between p-5 rounded-2xl bg-white border ${
      isUrgent ? "border-rose-200 shadow-[0_1px_3px_rgba(244,63,94,0.05),0_4px_12px_rgba(244,63,94,0.04)]" : "border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]"
    } overflow-hidden transition-all duration-200 hover:-translate-y-0.5`}>
      {/* Top accent bar */}
      {accentBar && (
        <div className={`absolute top-0 left-0 right-0 h-[2px] ${accentBar}`} />
      )}

      <div className="flex items-center justify-between mb-3">
        <span className={`text-[11px] font-semibold uppercase tracking-wider ${isUrgent ? "text-rose-600" : "text-slate-500"}`}>
          {label}
        </span>
        <div className={`w-9 h-9 rounded-xl ${iconBg} border border-slate-200/80 flex items-center justify-center ${iconColor}`}>
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className={`text-3xl sm:text-4xl font-bold tracking-tight ${isUrgent ? "text-rose-600" : "text-slate-900"}`}>
          {value}
        </span>
        {unit && <span className="text-xs text-slate-500 font-medium">{unit}</span>}
      </div>

      {trend && (
        <div className="flex items-center gap-2 mt-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
            trendDirection === "up" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-700 border border-slate-200"
          }`}>
            <span className="material-symbols-outlined text-[13px]">
              {trendDirection === "up" ? "trending_up" : "trending_down"}
            </span>
            {trend}
          </span>
        </div>
      )}

      {description && (
        <p className="text-xs text-slate-500 mt-2 line-clamp-1">{description}</p>
      )}
    </div>
  );
};

export default StatCard;