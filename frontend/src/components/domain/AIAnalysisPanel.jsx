import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";

export const AIAnalysisPanel = ({ analysis, ticketId }) => {
  if (!analysis) return null;

  return (
    <Card tier="base" className="overflow-hidden shadow-cyan-inset" glow>
      {/* Header */}
      <div className="p-4 bg-surface-container flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-brand-cyan text-[20px] animate-pulse">
            neurology
          </span>
          <h3 className="text-headline-sm text-primary font-semibold">AI Analysis Summary</h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 text-primary-fixed-dim text-label-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping"></span>
          AI-generated • Human review required
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Section 1 & 2: Symptoms + Formula */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Detected Symptoms */}
          <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-2">
            <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
              1. Sinyal Terdeteksi
            </span>
            <div className="flex flex-col gap-2">
              {analysis.symptoms.map((symptom, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-surface-container-lowest"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFC048]"></span>
                    <span className="text-body-sm text-on-surface font-medium">{symptom}</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-label-sm text-primary-fixed-dim">
                    {idx === 0 ? "Visual" : "Keluhan"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Formula & Ingredients */}
          <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-1.5">
            <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
              2. Formula & Kandungan
            </span>
            <p className="text-body-sm text-on-surface">
              <span className="font-semibold text-brand-cyan">Formula Terkait:</span>{" "}
              {analysis.formula}
            </p>
            <div className="p-2 rounded bg-surface-container-lowest mt-1">
              <span className="text-label-sm text-[#FFC048] block mb-0.5">Catatan Formula:</span>
              <p className="text-body-sm text-on-surface-variant leading-snug">
                {analysis.formulaNote}
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Severity Bar */}
        <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
              3. Tingkat Keparahan
            </span>
            <span
              className={`px-2 py-0.5 rounded text-label-sm font-bold ${
                analysis.severityLevel === "High"
                  ? "bg-[#FF4D4D]/15 text-[#FF4D4D]"
                  : analysis.severityLevel === "Moderate"
                  ? "bg-[#FFC048]/15 text-[#FFC048]"
                  : "bg-[#2ED573]/15 text-[#2ED573]"
              }`}
            >
              {analysis.severityLevel}
            </span>
          </div>
          <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-cyan via-[#FFC048] to-[#FF4D4D] h-full rounded-full"
              style={{ width: `${analysis.severityPercentage}%` }}
            ></div>
          </div>
          <span className="text-body-sm text-on-surface-variant">
            {analysis.keyConcern}
          </span>
        </div>

        {/* Section 4: Sentiment */}
        <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-2">
          <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
            4. Sentimen Pelanggan
          </span>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#FFC048] text-[28px]">
              sentiment_worried
            </span>
            <div className="flex flex-col">
              <span className="text-headline-sm text-primary font-semibold">
                Concerned
              </span>
              <span className="text-body-sm text-on-surface-variant">
                Skor: {analysis.sentimentScore || 38}/100 (Anxious)
              </span>
            </div>
          </div>
        </div>

        {/* Section 5: Recommendation (Non-Medical) */}
        <div className="p-4 rounded-lg bg-surface-container-highest flex flex-col gap-2 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-cyan text-[18px]">gavel</span>
            <span className="text-headline-sm text-brand-cyan font-semibold">
              5. Panduan Tindakan CS (Non-Medis)
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            {analysis.recommendation}
          </p>
          <span className="text-error font-semibold text-label-sm">
            ⚠ Dilarang membuat diagnosis medis definitif atau klaim klinis.
          </span>
        </div>

        {/* Footer Metadata */}
        <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30 flex-wrap gap-2">
          <div className="flex items-center gap-3 text-code-sm text-on-surface-variant">
            <span className="flex items-center gap-1 text-brand-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
              AI-Assisted Analysis Selesai (0.8 detik)
            </span>
            <span>Data Sumber: Tiket {ticketId}</span>
          </div>
          <StatusBadge type="aiAnalyzed" label="Human Review Required" />
        </div>
      </div>
    </Card>
  );
};

export default AIAnalysisPanel;