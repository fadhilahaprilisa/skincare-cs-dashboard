import React from "react";
import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";
import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";

export const AIInsightCard = ({ insight }) => {
  if (!insight) return null;

  return (
    <Card tier="base" className="p-6 relative overflow-hidden group bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]" hover>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 shadow-xs">
            <Sparkles className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <h3 className="text-base text-slate-900 font-semibold leading-tight">
              {insight.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {insight.category}
            </p>
          </div>
        </div>
        <StatusBadge type="aiReady" label="AI Insight" pulse />
      </div>

      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
        {insight.description}
      </p>

      {/* Metrics Triad */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">
            Tiket Terkait
          </span>
          <p className="text-lg text-slate-900 font-bold mt-0.5">
            {insight.ticketCount}
          </p>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">
            Proporsi
          </span>
          <p className="text-lg text-slate-900 font-bold mt-0.5">
            {insight.percentage}%
          </p>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">
            Tren
          </span>
          <p className="text-lg text-amber-600 font-bold mt-0.5 flex items-center gap-1">
            <TrendingUp className="w-4 h-4 shrink-0" />
            {insight.trend}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 text-xs">
        <span className="text-slate-500">
          Produk terkait: <strong className="text-slate-900 font-medium">{insight.relatedProduct}</strong>
        </span>
        <button className="text-slate-900 hover:text-black font-medium text-xs flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer">
          Detail Analisis <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};

export default AIInsightCard;