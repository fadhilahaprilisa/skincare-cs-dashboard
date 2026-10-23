import React from "react";
import Card from "../ui/Card";
import { CheckCircle2, TrendingUp, Sparkles, Clock } from "lucide-react";

export const ResolutionRateCard = ({
  rate = 82,
  period = "Minggu Ini",
  target = "Target SLA 80%",
  resolvedTickets = 64,
  totalTickets = 78,
  avgTime = "42 mnt",
  className = "",
}) => {
  // SVG circle calculation for circular progress ring
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (rate / 100) * circumference;

  return (
    <Card tier="base" className={`p-6 relative overflow-hidden bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-semibold tracking-wider uppercase text-slate-700 mb-1.5">
            <Sparkles className="w-3 h-3 text-slate-900" />
            <span>Resolusi & Efisiensi SLA</span>
          </div>
          <h3 className="text-base font-semibold text-slate-900">
            Tingkat Resolusi Tiket
          </h3>
          <p className="text-xs text-slate-500">
            Konsistensi penanganan tim CS {period}
          </p>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
          ON TARGET
        </span>
      </div>

      {/* Main Stat & Circular Progress Gauge */}
      <div className="flex items-center justify-between gap-4 my-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              {rate}%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">+6.4%</span> dari minggu lalu
          </p>
        </div>

        {/* Circular Progress Gauge */}
        <div className="relative w-22 h-22 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#E2E8F0"
              strokeWidth="7"
              fill="transparent"
            />
            {/* Progress Stroke */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#0F172A"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Micro Metrics Row */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">
            Tiket Tuntas
          </span>
          <span className="text-sm font-bold text-slate-900 mt-0.5 block">
            {resolvedTickets} <span className="text-xs font-normal text-slate-500">/ {totalTickets}</span>
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">
            Rata-rata SLA
          </span>
          <span className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            {avgTime}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ResolutionRateCard;
