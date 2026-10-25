import React from "react";
import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";

export const AIAnalysisPanel = ({ analysis, ticketId }) => {
  if (!analysis) return null;

  return (
    <Card tier="base" className="overflow-hidden bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
      {/* Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-800 text-[20px]">
            neurology
          </span>
          <h3 className="text-sm text-slate-900 font-semibold">AI Analysis Summary</h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          AI-generated • Human review required
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Section 1 & 2: Symptoms + Formula */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Detected Symptoms */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              1. Sinyal Terdeteksi
            </span>
            <div className="flex flex-col gap-2">
              {analysis.symptoms.map((symptom, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100 shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-xs text-slate-800 font-medium">{symptom}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-600 font-medium">
                    {idx === 0 ? "Visual" : "Keluhan"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Formula & Ingredients */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1.5">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              2. Formula & Kandungan
            </span>
            <p className="text-xs text-slate-700">
              <span className="font-semibold text-slate-900">Formula Terkait:</span>{" "}
              {analysis.formula}
            </p>
            <div className="p-2.5 rounded-lg bg-white border border-slate-100 shadow-xs mt-1">
              <span className="text-[11px] text-amber-700 font-medium block mb-0.5">Catatan Formula:</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {analysis.formulaNote}
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Severity Bar */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              3. Tingkat Keparahan
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                analysis.severityLevel === "High"
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : analysis.severityLevel === "Moderate"
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              {analysis.severityLevel}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                analysis.severityLevel === "High"
                  ? "bg-rose-500"
                  : analysis.severityLevel === "Moderate"
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
              style={{ width: `${analysis.severityPercentage}%` }}
            ></div>
          </div>
          <span className="text-xs text-slate-500">
            {analysis.keyConcern}
          </span>
        </div>

        {/* Section 4: Sentiment */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
            4. Sentimen Pelanggan
          </span>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-500 text-[26px]">
              sentiment_worried
            </span>
            <div className="flex flex-col">
              <span className="text-sm text-slate-900 font-semibold">
                Concerned
              </span>
              <span className="text-xs text-slate-500">
                Skor: {analysis.sentimentScore || 38}/100 (Anxious)
              </span>
            </div>
          </div>
        </div>

        {/* Section 5: Recommendation (Non-Medical) */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-700 text-[18px]">gavel</span>
            <span className="text-sm text-slate-900 font-semibold">
              5. Panduan Tindakan CS (Non-Medis)
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {analysis.recommendation}
          </p>
          <span className="text-rose-600 font-medium text-[11px] flex items-center gap-1">
            ⚠ Dilarang membuat diagnosis medis definitif atau klaim klinis.
          </span>
        </div>

        {/* Footer Metadata */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              AI-Assisted Analysis Selesai (0.8 detik)
            </span>
            <span>Data Sumber: Tiket {ticketId}</span>
            <button
              onClick={() => window.location.href = `/cs/ai-analysis/${ticketId.replace("#", "")}`}
              className="text-slate-900 hover:underline font-medium cursor-pointer"
            >
              Buka Detail Lengkap →
            </button>
          </div>
          <StatusBadge type="aiAnalyzed" label="Human Review Required" />
        </div>
      </div>
    </Card>
  );
};

export default AIAnalysisPanel;