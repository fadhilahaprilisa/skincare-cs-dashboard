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
          <span className="material-symbols-outlined text-brand-cyan text-[64px] animate-spin">
            progress_activity
          </span>
          <p className="text-body-md text-on-surface-variant mt-4">Menghasilkan insight dari data real...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Error
  if (error) {
    return (
      <DashboardLayout role="admin" topbarProps={{ title: "AI Insights", subtitle: "Error" }}>
        <div className="p-6">
          <Card tier="base" className="p-12 text-center">
            <span className="material-symbols-outlined text-[#FF4D4D] text-[64px] mb-4">error</span>
            <h2 className="text-headline-lg text-primary font-bold mb-2">Gagal Memuat Insights</h2>
            <p className="text-body-md text-on-surface-variant mb-6">{error}</p>
            <Button variant="primary" size="md" icon="refresh" onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Empty
  if (insights.length === 0) {
    return (
      <DashboardLayout role="admin" topbarProps={{ title: "AI Insights", subtitle: "Belum ada data" }}>
        <div className="p-6">
          <Card tier="base" className="p-12 text-center">
            <span className="material-symbols-outlined text-brand-cyan text-[64px] mb-4">psychology</span>
            <h2 className="text-headline-lg text-primary font-bold mb-2">Belum Ada Insight</h2>
            <p className="text-body-md text-on-surface-variant mb-6">
              Tidak ada data tiket untuk dianalisis. Buat beberapa tiket dulu.
            </p>
            <Button variant="primary" size="md" icon="add" onClick={() => navigate("/cs/new-complaint")}>
              Buat Tiket Baru
            </Button>
          </Card>
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
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-display-lg text-primary font-bold tracking-tight">
                AI Complaint Insights
              </h1>
              <StatusBadge type="aiReady" label="Lumière Neural v2.4" pulse />
            </div>
            <p className="text-body-md text-on-surface-variant max-w-3xl">
              Temuan pola keluhan berbasis data tiket real-time untuk mendukung keputusan operasional.
            </p>
            {generatedAt && (
              <span className="text-label-sm text-on-surface-variant mt-1">
                Generated: {new Date(generatedAt).toLocaleString("id-ID")}
              </span>
            )}
          </div>
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
        <Card tier="base" className="p-6 relative overflow-hidden" glow>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded text-label-sm uppercase tracking-wider font-semibold">
                  DATA PATTERN • HIGHEST VOLUME
                </span>
                <span className="text-outline text-label-sm">Kategori: {insight.category}</span>
              </div>
              <h2 className="text-headline-lg text-primary tracking-tight">
                Insight #01 — {insight.title}
              </h2>
              <p className="text-body-md text-on-surface-variant max-w-3xl">
                {insight.description}
              </p>
            </div>

            <div className="flex items-center gap-5 bg-surface-container px-5 py-3 rounded-xl">
              <div className="flex flex-col text-right">
                <span className="text-display-lg text-brand-cyan font-bold leading-none">
                  {insight.ticket_count}
                </span>
                <span className="text-label-sm text-on-surface-variant">Tiket Terkait</span>
              </div>
              <div className="h-10 w-px bg-surface-variant"></div>
              <div className="flex flex-col">
                <span className="text-display-lg text-primary font-bold leading-none">
                  {insight.percentage}%
                </span>
                <span className="text-label-sm text-on-surface-variant">Dari Total</span>
              </div>
            </div>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 relative z-10">
            {[
              { label: "Total Tiket", value: insight.evidence.totalTickets, sub: "100%" },
              { label: "Terkait", value: insight.evidence.relatedTickets, sub: `${insight.percentage}%` },
              { label: "Avg Severity", value: insight.evidence.avgSeverity, sub: "" },
              { label: "Top Product", value: insight.evidence.affectedProduct, sub: "" },
            ].map((item, idx) => (
              <div key={idx} className="bg-surface-container p-3 rounded-xl flex flex-col gap-1">
                <span className="text-label-sm text-outline">{item.label}</span>
                <span className="text-headline-md text-brand-cyan font-bold truncate">{item.value}</span>
                {item.sub && <span className="text-label-sm text-outline">{item.sub}</span>}
              </div>
            ))}
          </div>
        </Card>

        {/* Products + Sentiment Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card tier="base" className="lg:col-span-7 p-6">
            <h3 className="text-headline-md text-primary font-semibold mb-4">
              Produk Terkait dengan Pola Keluhan
            </h3>
            <div className="flex flex-col gap-3">
              {insight.related_products.map((product, idx) => (
                <div key={idx} className={`p-3 rounded-lg ${idx === 0 ? "bg-surface-container shadow-sm" : "bg-surface-container-high"}`}>
                  <div className="flex justify-between items-center gap-2 flex-wrap mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-headline-sm text-primary truncate">{product.name}</span>
                      {idx === 0 && (
                        <span className="bg-brand-cyan/20 text-brand-cyan text-code-sm px-1.5 py-0.5 rounded shrink-0">
                          TOP
                        </span>
                      )}
                    </div>
                    <span className="text-headline-sm text-brand-cyan font-semibold shrink-0">
                      {product.count} tiket ({product.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-brand-cyan rounded-full" style={{ width: `${product.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card tier="base" className="lg:col-span-5 p-6">
            <h3 className="text-headline-sm text-primary font-semibold mb-4">Sentimen Tiket</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "Concerned (Cemas)", value: insight.sentiment.concerned, color: "#FFC048" },
                { label: "Neutral (Informatif)", value: insight.sentiment.neutral, color: "#849495" },
                { label: "Angry (Frustrasi)", value: insight.sentiment.angry, color: "#FF4D4D" },
                { label: "Positive (Apresiasi)", value: insight.sentiment.positive, color: "#2ED573" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-surface-container">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-body-sm text-on-surface">{item.label}</span>
                  </div>
                  <span className="text-body-sm text-primary font-semibold">{item.value} tiket</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Interpretation */}
        <Card tier="base" className="p-6" glow>
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-brand-cyan text-[22px]">psychology</span>
            <h3 className="text-headline-md text-primary font-semibold">Sintesis AI Interpretation</h3>
          </div>
          <div className="p-4 rounded-lg bg-surface-container">
            <p className="text-body-md text-on-surface leading-relaxed whitespace-pre-wrap">
              {insight.ai_interpretation}
            </p>
          </div>
        </Card>

        {/* Operational Considerations */}
        <Card tier="base" className="p-6">
          <h3 className="text-headline-md text-primary font-semibold mb-4">
            Pertimbangan Operasional
          </h3>
          <div className="flex flex-col gap-3">
            {insight.considerations.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-surface-container">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span className="text-headline-sm text-brand-cyan flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-cyan text-[18px]">
                      {item.type === "CS Action" ? "support_agent" : item.type === "Product" ? "biotech" : "menu_book"}
                    </span>
                    {item.title}
                  </span>
                  <span className="bg-brand-cyan/15 text-brand-cyan text-label-sm px-2 py-0.5 rounded uppercase">
                    {item.type}
                  </span>
                </div>
                <p className="text-body-sm text-on-surface-variant mb-2">{item.description}</p>
                <span className="text-code-sm text-outline">Target: {item.target}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIInsightsPage;