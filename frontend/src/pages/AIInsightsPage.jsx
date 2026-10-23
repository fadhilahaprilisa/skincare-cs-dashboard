import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import { insightsAPI, getErrorMessage } from "../lib/api";

const AIInsightsPage = () => {
  const navigate = useNavigate();
  const [insights, setInsights] = useState([]);
  const [generatedAt, setGeneratedAt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await insightsAPI.getInsights();
        setInsights(data.insights || []);
        setGeneratedAt(data.generated_at);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchInsights();
  }, []);

  // Loading
  if (isLoading) {
    return (
      <DashboardLayout role="admin" topbarProps={{ title: "AI Insights", subtitle: "Memuat..." }}>
        <div className="p-12 text-center">
          <span className="material-symbols-outlined text-slate-400 text-[48px] animate-spin">
            progress_activity
          </span>
          <p className="text-sm text-slate-500 mt-4">Menghasilkan insight dari data real...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Error
  if (error) {
    return (
      <DashboardLayout role="admin" topbarProps={{ title: "AI Insights", subtitle: "Error" }}>
        <div className="p-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <span className="material-symbols-outlined text-red-500 text-[48px] mb-4">error</span>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Gagal Memuat Insights</h2>
            <p className="text-sm text-slate-500 mb-6">{error}</p>
            <Button variant="primary" size="md" icon="refresh" onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Empty
  if (insights.length === 0) {
    return (
      <DashboardLayout role="admin" topbarProps={{ title: "AI Insights", subtitle: "Belum ada data" }}>
        <div className="p-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <span className="material-symbols-outlined text-slate-300 text-[48px] mb-4">psychology</span>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Belum Ada Insight</h2>
            <p className="text-sm text-slate-500 mb-6">
              Tidak ada data tiket untuk dianalisis. Buat beberapa tiket dulu.
            </p>
            <Button variant="primary" size="md" icon="add" onClick={() => navigate("/cs/new-complaint")}>
              Buat Tiket Baru
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const insight = insights[0];

  return (
    <DashboardLayout
      role="admin"
      topbarProps={{
        title: "AI Insights",
        subtitle: "Temuan pola keluhan berbasis AI dari data tiket real",
      }}
    >
      <div className="p-6 space-y-6">
        {/* Top Control Bar (Clean, No Duplicate Header) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
          {generatedAt ? (
            <span className="text-xs text-slate-500 font-medium">
              Data real-time disinkronkan: {new Date(generatedAt).toLocaleString("id-ID")}
            </span>
          ) : <div />}
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon="refresh" onClick={() => window.location.reload()}>
              Refresh Insight
            </Button>
            <Button variant="primary" size="sm" icon="arrow_back" onClick={() => navigate("/admin/analytics")}>
              Kembali ke Analytics
            </Button>
          </div>
        </div>

        {/* Insight #01 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                  DATA PATTERN • HIGHEST VOLUME
                </span>
                <span className="text-slate-500 text-xs font-medium">Kategori: {insight.category}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Insight #01 — {insight.title}
              </h2>
              <p className="text-sm text-slate-600 max-w-3xl">
                {insight.description}
              </p>
            </div>

            <div className="flex items-center gap-5 bg-slate-50 border border-slate-200/80 px-5 py-3 rounded-2xl">
              <div className="flex flex-col text-right">
                <span className="text-3xl font-bold text-slate-900 leading-none">
                  {insight.ticket_count}
                </span>
                <span className="text-xs text-slate-500 mt-1">Tiket Terkait</span>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900 leading-none">
                  {insight.percentage}%
                </span>
                <span className="text-xs text-slate-500 mt-1">Dari Total</span>
              </div>
            </div>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { label: "Total Tiket", value: insight.evidence.totalTickets, sub: "100%" },
              { label: "Terkait", value: insight.evidence.relatedTickets, sub: `${insight.percentage}%` },
              { label: "Avg Severity", value: insight.evidence.avgSeverity, sub: "" },
              { label: "Top Product", value: insight.evidence.affectedProduct, sub: "" },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl flex flex-col gap-1">
                <span className="text-xs font-medium text-slate-500">{item.label}</span>
                <span className="text-lg font-bold text-slate-900 truncate">{item.value}</span>
                {item.sub && <span className="text-xs text-slate-400">{item.sub}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Products + Sentiment Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <h3 className="text-base font-bold text-slate-900 tracking-tight mb-4">
              Produk Terkait dengan Pola Keluhan
            </h3>
            <div className="flex flex-col gap-3">
              {insight.related_products.map((product, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex justify-between items-center gap-2 flex-wrap mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-semibold text-slate-900 truncate">{product.name}</span>
                      {idx === 0 && (
                        <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                          TOP
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 shrink-0">
                      {product.count} tiket ({product.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 rounded-full" style={{ width: `${product.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <h3 className="text-base font-bold text-slate-900 tracking-tight mb-4">Sentimen Tiket</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "Concerned (Cemas)", value: insight.sentiment.concerned, color: "#F59E0B" },
                { label: "Neutral (Informatif)", value: insight.sentiment.neutral, color: "#64748B" },
                { label: "Angry (Frustrasi)", value: insight.sentiment.angry, color: "#EF4444" },
                { label: "Positive (Apresiasi)", value: insight.sentiment.positive, color: "#10B981" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-xs font-medium text-slate-700">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">{item.value} tiket</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Interpretation */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-slate-700 text-[20px]">psychology</span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Sintesis AI Interpretation</h3>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {insight.ai_interpretation}
            </p>
          </div>
        </div>

        {/* Operational Considerations */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
          <h3 className="text-base font-bold text-slate-900 tracking-tight mb-4">
            Pertimbangan Operasional
          </h3>
          <div className="flex flex-col gap-3">
            {insight.considerations.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-700 text-[18px]">
                      {item.type === "CS Action" ? "support_agent" : item.type === "Product" ? "biotech" : "menu_book"}
                    </span>
                    {item.title}
                  </span>
                  <span className="bg-slate-200/80 text-slate-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2">{item.description}</p>
                <span className="text-xs font-mono text-slate-400">Target: {item.target}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIInsightsPage;