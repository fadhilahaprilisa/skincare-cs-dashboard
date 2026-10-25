import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import LineChartCard from "../components/domain/LineChartCard";
import DonutChartCard from "../components/domain/DonutChartCard";
import BarChartCard from "../components/domain/BarChartCard";
import { analyticsAPI, exportAPI, downloadBlob, getErrorMessage } from "../lib/api";

const AdminAnalyticsPage = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===== NEW STATE FOR EXPORT & FILTERS =====
  const [exporting, setExporting] = useState(false);
  const [period, setPeriod] = useState("7d");
  const [productFilter, setProductFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await analyticsAPI.getOverview();
        setAnalytics(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [period]); // Reload atau sesuaikan fetch jika period berubah

  // ===== HANDLER EXPORT =====
  const handleExport = async () => {
    setExporting(true);
    try {
      const blob = await exportAPI.downloadTicketsCSV();
      downloadBlob(blob, `lumiere_analytics_${Date.now()}.csv`);
    } catch (err) {
      alert(`Gagal export: ${getErrorMessage(err)}`);
    } finally {
      setExporting(false);
    }
  };

  // ===== LOADING STATE =====
  if (isLoading) {
    return (
      <DashboardLayout
        role="admin"
        topbarProps={{ title: "Complaint Analytics", subtitle: "Memuat..." }}
      >
        <div className="p-12 text-center">
          <span className="material-symbols-outlined text-brand-cyan text-[64px] animate-spin">
            progress_activity
          </span>
          <p className="text-body-md text-on-surface-variant mt-4">Memuat analytics...</p>
        </div>
      </DashboardLayout>
    );
  }

  // ===== ERROR STATE =====
  if (error) {
    return (
      <DashboardLayout
        role="admin"
        topbarProps={{ title: "Complaint Analytics", subtitle: "Error" }}
      >
        <div className="p-6">
          <Card tier="base" className="p-12 text-center">
            <span className="material-symbols-outlined text-[#FF4D4D] text-[64px] mb-4">
              error
            </span>
            <h2 className="text-headline-lg text-primary font-bold mb-2">
              Gagal Memuat Data
            </h2>
            <p className="text-body-md text-on-surface-variant mb-6">{error}</p>
            <Button
              variant="primary"
              size="md"
              icon="refresh"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // ===== PREPARE DONUT DATA =====
  const severityDonut = analytics?.severity_distribution || [];
  const sentimentDonut = analytics?.sentiment_distribution || [];
  const kpi = analytics?.kpi || {};

  return (
    <DashboardLayout
      role="admin"
      topbarProps={{
        title: "Complaint Analytics",
        subtitle: "Analisis pola keluhan, produk, sentiment, dan performa CS dalam ekosistem Lumière.",
      }}
    >
      <div className="p-6 space-y-6">
        {/* ===== PAGE TOOLBAR (NO DUPLICATE HEADER) ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600 font-medium cursor-default">Analytics</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-900 font-semibold">Complaint Intelligence</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none bg-slate-100/80 border border-slate-200 px-4 py-2 rounded-full text-slate-900 text-xs font-medium cursor-pointer focus:outline-none focus:bg-white focus:border-slate-400 transition-all"
            >
              <option value="7d">7 Hari Terakhir</option>
              <option value="14d">14 Hari Terakhir</option>
              <option value="30d">Bulan Berjalan</option>
            </select>

            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="appearance-none bg-slate-100/80 border border-slate-200 px-4 py-2 rounded-full text-slate-900 text-xs font-medium cursor-pointer focus:outline-none focus:bg-white focus:border-slate-400 transition-all"
            >
              <option value="all">Semua Produk</option>
              {analytics?.product_complaints?.map((p) => (
                <option key={p.product} value={p.product}>{p.product}</option>
              ))}
            </select>

            <button
              onClick={handleExport}
              disabled={exporting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#141414] text-white text-xs font-medium hover:bg-[#2B2B2B] active:bg-[#0A0A0A] transition-colors cursor-pointer shadow-none disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>{exporting ? "Mengunduh..." : "Export CSV"}</span>
            </button>
          </div>
        </div>

        {/* ===== 4 KPI CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                Total Complaints
              </span>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                <span className="material-symbols-outlined text-[20px]">assignment_late</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight">
              {kpi.total_tickets ?? 0}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold border border-red-200/60">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                {kpi.total_tickets_trend || "+0%"}
              </span>
              <span className="text-xs text-slate-400">vs pekan lalu</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                Avg Resolution Time
              </span>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight">
              {kpi.avg_resolution_time?.split(" ")[0] || "0"}{" "}
              <span className="text-lg text-slate-400 font-normal">
                {kpi.avg_resolution_time?.split(" ")[1] || "jam"}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
                <span className="material-symbols-outlined text-[12px]">trending_down</span>
                -1.2 jam
              </span>
              <span className="text-xs text-slate-400">efisiensi respon</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                Resolution Rate
              </span>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight">
              {kpi.resolution_rate ?? 0}%
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-medium text-slate-700">
                {kpi.resolved ?? 0} dari {kpi.total_tickets ?? 0} tiket
              </span>
              <span className="text-xs text-slate-400">terselesaikan</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-red-600">
                Urgent Complaints
              </span>
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-600">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-red-600 tracking-tight">
              {kpi.urgent ?? 0}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold border border-red-200/60">
                {kpi.total_tickets > 0
                  ? ((kpi.urgent / kpi.total_tickets) * 100).toFixed(1)
                  : 0}
                % Total Tiket
              </span>
              <span className="text-xs text-slate-400">prioritas triase</span>
            </div>
          </div>
        </div>

        {/* ===== SECTION 2: COMPLAINT TREND LINE CHART ===== */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Tren Keluhan (Complaint Volume)
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold tracking-wider uppercase">
                  REALTIME SYNC
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Dinamika volume keluhan harian, penyelesaian tiket, dan backlog.
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full">
              <button
                onClick={() => setPeriod("7d")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  period === "7d"
                    ? "bg-[#141414] text-white shadow-none"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Harian
              </button>
              <button
                onClick={() => setPeriod("30d")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  period === "30d"
                    ? "bg-[#141414] text-white shadow-none"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Mingguan
              </button>
            </div>
          </div>

          {analytics?.trend?.length > 0 ? (
            <LineChartCard data={analytics.trend} title="" height={320} />
          ) : (
            <div className="p-12 text-center">
              <p className="text-xs text-slate-400">Belum ada data trend</p>
            </div>
          )}
        </div>

        {/* ===== SECTION 3: PRODUCTS (ELONGATED / MEMANJANG FULL WIDTH) ===== */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
          {analytics?.product_complaints?.length > 0 ? (
            <BarChartCard
              data={analytics.product_complaints}
              title="Keluhan Berdasarkan Produk"
              subtitle="Distribusi aduan per SKU skincare aktif"
              nameKey="product"
              dataKey="count"
              height={250}
              yAxisWidth={250}
            />
          ) : (
            <div className="p-12 text-center">
              <p className="text-xs text-slate-400">Belum ada data produk</p>
            </div>
          )}
        </div>

        {/* ===== SECTION 4: DONUT CHARTS (SEVERITY & SENTIMENT SIDE-BY-SIDE) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
            {severityDonut.length > 0 ? (
              <DonutChartCard
                data={severityDonut}
                title="Tingkat Keparahan (Severity)"
                subtitle="Klasifikasi triase klinis & operasional"
                centerValue={kpi.total_tickets ?? 0}
                centerLabel="Total"
              />
            ) : (
              <div className="p-12 text-center">
                <p className="text-xs text-slate-400">Belum ada data severity</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
            {sentimentDonut.length > 0 ? (
              <DonutChartCard
                data={sentimentDonut}
                title="Customer Sentiment NLP"
                subtitle="Analisis emosional percakapan tiket komplain"
                centerValue={kpi.total_tickets ?? 0}
                centerLabel="Total"
              />
            ) : (
              <div className="p-12 text-center">
                <p className="text-xs text-slate-400">Belum ada data sentimen</p>
              </div>
            )}
          </div>
        </div>

        {/* ===== SECTION 5: CATEGORY DISTRIBUTION ===== */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Kategori Keluhan
          </h3>
          <p className="text-xs text-slate-500 mb-4 mt-0.5">
            Segmentasi isu permasalahan yang dilaporkan pelanggan
          </p>
            {analytics?.category_distribution?.length > 0 ? (
              <div className="flex flex-col gap-2">
                {analytics.category_distribution.map((cat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                        <span className="material-symbols-outlined text-[16px]">
                          {idx === 0
                            ? "dermatology"
                            : idx === 1
                            ? "coronavirus"
                            : idx === 2
                            ? "science"
                            : idx === 3
                            ? "sanitizer"
                            : "local_shipping"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-800">
                          {cat.name}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900 block">
                        {cat.count}
                      </span>
                      <span className="text-xs text-slate-400">
                        {cat.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-xs text-slate-400">Belum ada data kategori</p>
              </div>
            )}
          </div>

        {/* ===== SECTION 7: CS PERFORMANCE TABLE ===== */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Performa Customer Service
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitoring beban kerja dan efisiensi penanganan tiket tim agen
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {analytics?.cs_performance?.length || 0} Agen On-Duty
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">CS Agent</th>
                  <th className="px-4 py-3">Assigned</th>
                  <th className="px-4 py-3">Resolved</th>
                  <th className="px-4 py-3">Pending</th>
                  <th className="px-4 py-3">Resolution Rate</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {analytics?.cs_performance?.length > 0 ? (
                  analytics.cs_performance.map((cs, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">
                            {cs.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <div className="text-slate-900 font-semibold">{cs.name}</div>
                            <div className="text-xs text-slate-400">
                              {cs.role}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-900 font-semibold">
                        {cs.assigned} tiket
                      </td>
                      <td className="px-4 py-3 text-emerald-600 font-medium">{cs.resolved} selesai</td>
                      <td className="px-4 py-3 text-amber-600 font-medium">{cs.pending} pending</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-900 font-semibold">
                            {cs.resolution_rate}%
                          </span>
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div
                              className="h-full bg-slate-800 rounded-full"
                              style={{ width: `${cs.resolution_rate}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          type={cs.status === "Active Online" ? "resolved" : "pending"}
                          label={cs.status}
                          pulse={cs.status === "Active Online"}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                      Belum ada data CS performance
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== BOTTOM NAVIGATION ACTION ===== */}
        <div className="flex justify-end pt-2">
          <Button
            variant="secondary"
            size="sm"
            icon="arrow_forward"
            onClick={() => navigate("/admin/ai-insights")}
          >
            Lihat AI Insights
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalyticsPage;