import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import LineChartCard from "../components/domain/LineChartCard";
import DonutChartCard from "../components/domain/DonutChartCard";
import BarChartCard from "../components/domain/BarChartCard";
import { analyticsAPI, getErrorMessage } from "../lib/api";

const AdminAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

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
        {/* ===== PAGE HEADER ===== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1 text-label-sm uppercase tracking-wider text-on-surface-variant">
              <span>Dashboard</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-brand-cyan">Analytics</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary">Complaint Intelligence</span>
            </nav>
            <h1 className="text-display-lg text-primary font-bold tracking-tight">
              Complaint Analytics
            </h1>
            <p className="text-body-md text-on-surface-variant">
              Analisis pola keluhan, produk, sentiment, dan performa customer service dalam ekosistem Lumière.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg text-on-surface text-label-md">
              <span className="material-symbols-outlined text-[16px] text-brand-cyan">
                calendar_today
              </span>
              <span>7 Hari Terakhir</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg text-on-surface text-label-md">
              <span className="text-on-surface-variant">Produk:</span>
              <span className="font-semibold">Semua Produk</span>
            </div>
            <Button variant="primary" size="md" icon="download">
              Export Report
            </Button>
          </div>
        </div>

        {/* ===== 4 KPI CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card tier="base" className="p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-label-md uppercase tracking-wider text-on-surface-variant">
                Total Complaints
              </span>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-brand-cyan">
                <span className="material-symbols-outlined text-[20px]">assignment_late</span>
              </div>
            </div>
            <div className="text-display-lg text-primary font-bold">
              {kpi.total_tickets ?? 0}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-[#FF4D4D]/15 text-[#FF4D4D] text-label-sm">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                {kpi.total_tickets_trend || "+0%"}
              </span>
              <span className="text-body-sm text-on-surface-variant">vs pekan lalu</span>
            </div>
          </Card>

          <Card tier="base" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-label-md uppercase tracking-wider text-on-surface-variant">
                Avg Resolution Time
              </span>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-brand-cyan">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
              </div>
            </div>
            <div className="text-display-lg text-primary font-bold">
              {kpi.avg_resolution_time?.split(" ")[0] || "0"}{" "}
              <span className="text-headline-md text-on-surface-variant font-normal">
                {kpi.avg_resolution_time?.split(" ")[1] || "jam"}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan text-label-sm">
                <span className="material-symbols-outlined text-[12px]">trending_down</span>
                -1.2 jam
              </span>
              <span className="text-body-sm text-on-surface-variant">efisiensi respon</span>
            </div>
          </Card>

          <Card tier="base" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-label-md uppercase tracking-wider text-on-surface-variant">
                Resolution Rate
              </span>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-brand-cyan">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
            </div>
            <div className="text-display-lg text-primary font-bold">
              {kpi.resolution_rate ?? 0}%
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-body-sm text-on-surface">
                {kpi.resolved ?? 0} dari {kpi.total_tickets ?? 0} tiket
              </span>
              <span className="text-body-sm text-on-surface-variant">terselesaikan</span>
            </div>
          </Card>

          <Card tier="base" className="p-5 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#FF4D4D]/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-label-md uppercase tracking-wider text-[#FF4D4D]">
                Urgent Complaints
              </span>
              <div className="w-10 h-10 rounded-lg bg-[#FF4D4D]/15 flex items-center justify-center text-[#FF4D4D]">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
            </div>
            <div className="text-display-lg text-[#FF4D4D] font-bold">
              {kpi.urgent ?? 0}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#FF4D4D]/15 text-[#FF4D4D] text-label-sm font-semibold">
                {kpi.total_tickets > 0
                  ? ((kpi.urgent / kpi.total_tickets) * 100).toFixed(1)
                  : 0}
                % Total Tiket
              </span>
              <span className="text-body-sm text-on-surface-variant">prioritas triase</span>
            </div>
          </Card>
        </div>

        {/* ===== SECTION 2: COMPLAINT TREND LINE CHART ===== */}
        <Card tier="base" className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-headline-md text-primary font-semibold">
                  Tren Keluhan (Complaint Volume)
                </h2>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-code-sm">
                  REALTIME SYNC
                </span>
              </div>
              <p className="text-body-sm text-on-surface-variant mt-1">
                Dinamika volume keluhan harian, penyelesaian tiket, dan backlog.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded bg-brand-cyan text-on-primary-container text-label-sm font-semibold">
                Harian
              </button>
              <button className="px-3 py-1 rounded text-on-surface-variant hover:text-on-surface text-label-sm transition-colors">
                Mingguan
              </button>
            </div>
          </div>

          {analytics?.trend?.length > 0 ? (
            <LineChartCard data={analytics.trend} title="" height={320} />
          ) : (
            <div className="p-12 text-center">
              <p className="text-body-sm text-on-surface-variant">Belum ada data trend</p>
            </div>
          )}
        </Card>

        {/* ===== SECTION 3 & 4: PRODUCTS + SEVERITY ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card tier="base" className="lg:col-span-7 p-6">
            {analytics?.product_complaints?.length > 0 ? (
              <BarChartCard
                data={analytics.product_complaints}
                title="Keluhan Berdasarkan Produk"
                subtitle="Distribusi aduan per SKU skincare aktif"
                nameKey="product"
                dataKey="count"
                height={300}
              />
            ) : (
              <div className="p-12 text-center">
                <p className="text-body-sm text-on-surface-variant">Belum ada data produk</p>
              </div>
            )}
          </Card>

          <Card tier="base" className="lg:col-span-5 p-6">
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
                <p className="text-body-sm text-on-surface-variant">Belum ada data severity</p>
              </div>
            )}
          </Card>
        </div>

        {/* ===== SECTION 5 & 6: SENTIMENT + CATEGORY ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card tier="base" className="lg:col-span-6 p-6">
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
                <p className="text-body-sm text-on-surface-variant">Belum ada data sentimen</p>
              </div>
            )}
          </Card>

          <Card tier="base" className="lg:col-span-6 p-6">
            <h3 className="text-headline-sm text-primary font-semibold">
              Kategori Keluhan
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-4">
              Segmentasi isu permasalahan yang dilaporkan pelanggan
            </p>
            {analytics?.category_distribution?.length > 0 ? (
              <div className="flex flex-col gap-2">
                {analytics.category_distribution.map((cat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-surface-container"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
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
                        <span className="text-body-md text-on-surface font-medium">
                          {cat.name}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-headline-sm text-primary font-bold block">
                        {cat.count}
                      </span>
                      <span className="text-body-sm text-on-surface-variant">
                        {cat.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-body-sm text-on-surface-variant">Belum ada data kategori</p>
              </div>
            )}
          </Card>
        </div>

        {/* ===== SECTION 7: CS PERFORMANCE TABLE ===== */}
        <Card tier="base" className="overflow-hidden">
          <div className="p-5 bg-surface-container-high/40 flex items-center justify-between">
            <div>
              <h3 className="text-headline-sm text-primary font-semibold">
                Performa Customer Service
              </h3>
              <p className="text-body-sm text-on-surface-variant mt-0.5">
                Monitoring beban kerja dan efisiensi penanganan tiket tim agen
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-label-sm text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-brand-cyan"></span>
              {analytics?.cs_performance?.length || 0} Agen On-Duty
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead className="bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">CS Agent</th>
                  <th className="px-4 py-3">Assigned</th>
                  <th className="px-4 py-3">Resolved</th>
                  <th className="px-4 py-3">Pending</th>
                  <th className="px-4 py-3">Resolution Rate</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {analytics?.cs_performance?.length > 0 ? (
                  analytics.cs_performance.map((cs, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-surface-container-high/40 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-surface-container-highest text-brand-cyan text-label-md font-bold flex items-center justify-center">
                            {cs.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <div className="text-primary font-semibold">{cs.name}</div>
                            <div className="text-label-sm text-on-surface-variant">
                              {cs.role}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-primary font-semibold">
                        {cs.assigned} tiket
                      </td>
                      <td className="px-4 py-3 text-[#2ED573]">{cs.resolved} selesai</td>
                      <td className="px-4 py-3 text-[#FFC048]">{cs.pending} pending</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-semibold">
                            {cs.resolution_rate}%
                          </span>
                          <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-cyan rounded-full"
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
                    <td colSpan="6" className="px-4 py-8 text-center text-on-surface-variant">
                      Belum ada data CS performance
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalyticsPage;