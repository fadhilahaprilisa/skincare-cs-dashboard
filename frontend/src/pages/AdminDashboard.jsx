import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/domain/StatCard";
import StatusBadge from "../components/ui/StatusBadge";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import LineChartCard from "../components/domain/LineChartCard";
import BarChartCard from "../components/domain/BarChartCard";
import { ticketsAPI, analyticsAPI, getErrorMessage } from "../lib/api";
import { Sparkles, ArrowRight, ShieldCheck, BarChart3, TrendingUp, Layers, Package, RefreshCw } from "lucide-react";

// ===== EMPTY CHART FALLBACK =====
const EmptyChart = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <BarChart3 className="w-10 h-10 text-on-surface-variant/40 mb-3" />
    <p className="text-xs text-on-surface-variant">{message}</p>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [ticketsData, analyticsData] = await Promise.all([
          ticketsAPI.getAll(),
          analyticsAPI.getOverview(),
        ]);
        setTickets(ticketsData || []);
        setAnalytics(analyticsData);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // ===== LOADING =====
  if (isLoading) {
    return (
      <DashboardLayout
        role="admin"
        topbarProps={{
          title: "Dashboard Admin",
          subtitle: "Memuat data...",
        }}
      >
        <div className="p-16 text-center">
          <span className="material-symbols-outlined text-lumiere-cyan text-[48px] animate-spin">
            progress_activity
          </span>
          <p className="text-xs text-on-surface-variant mt-3">Mengambil data analitik komplain...</p>
        </div>
      </DashboardLayout>
    );
  }

  // ===== ERROR =====
  if (error) {
    return (
      <DashboardLayout
        role="admin"
        topbarProps={{
          title: "Dashboard Admin",
          subtitle: "Error",
        }}
      >
        <div className="p-6 max-w-2xl mx-auto">
          <Card tier="base" className="p-12 text-center">
            <span className="material-symbols-outlined text-error text-[48px] mb-3">
              error
            </span>
            <h2 className="text-xl font-bold text-white mb-2">
              Gagal Memuat Dashboard
            </h2>
            <p className="text-xs text-on-surface-variant mb-6">{error}</p>
            <Button
              variant="primary"
              size="md"
              icon="refresh"
              onClick={() => window.location.reload()}
            >
              Coba Lagi
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const kpi = analytics?.kpi || {};

  return (
    <DashboardLayout
      role="admin"
      topbarProps={{
        title: "Admin Intelligence Console",
        subtitle: "Pantau tren keluhan produk, performa respon CS, dan anomali nomor batch.",
      }}
    >
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* ===== TOP BAR: TELEMETRY + QUICK ACTIONS ===== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] uppercase font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                Real-Time Telemetry
              </span>
              <span className="text-xs text-slate-500">Sinkronisasi data langsung</span>
            </div>
            <p className="text-sm font-semibold text-slate-900">
              Lumière Neural v2.4 • Complaint Intelligence & Quality Control
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              icon="analytics"
              onClick={() => navigate("/admin/analytics")}
            >
              Analitik Lengkap
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon="format_list_bulleted"
              onClick={() => navigate("/admin/tickets")}
            >
              Semua Tiket
            </Button>
          </div>
        </div>

        {/* ===== KPI METRIC CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Tiket"
            value={kpi.total_tickets ?? tickets.length}
            unit="kasus"
            trend={kpi.total_tickets_trend || "+12%"}
            trendDirection="up"
            icon="inbox"
            description="Volume total aduan terdaftar"
          />
          <StatCard
            label="Kasus Tuntas"
            value={kpi.resolved ?? tickets.filter(t => t.status === "RESOLVED").length}
            unit="tuntas"
            trend={`${kpi.resolution_rate ?? 82}% SLA`}
            trendDirection="up"
            icon="verified"
            accentBar="bg-emerald-500"
            description="Tingkat keberhasilan resolusi CS"
          />
          <StatCard
            label="Menunggu Review"
            value={kpi.pending ?? tickets.filter(t => t.status === "IN_REVIEW" || t.status === "PROCESSING").length}
            unit="antrean"
            trend="Perlu Tinjauan"
            trendDirection="down"
            icon="hourglass_top"
            accentBar="bg-amber-400"
            description="Tiket menunggu persetujuan SOP"
          />
          <StatCard
            label="Eskalasi Mendesak"
            value={kpi.urgent ?? tickets.filter(t => t.severity === "High").length}
            unit="kritis"
            trend="High Priority"
            trendDirection="down"
            icon="warning"
            variant="urgent"
            accentBar="bg-red-500"
            description="Segera butuh investigasi formula"
          />
        </div>

        {/* ===== ANALYTICS ROW: TREND + PRODUCT BREAKDOWN ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Trend Line Chart (7 COLS) */}
          <Card tier="base" className="lg:col-span-7 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                <span className="material-symbols-outlined text-[18px]">show_chart</span>
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Tren Keluhan Pelanggan</h2>
                <p className="text-xs text-slate-500">
                  Fluktuasi volume tiket harian di database
                </p>
              </div>
            </div>
            {analytics?.trend?.length > 0 ? (
              <LineChartCard data={analytics.trend} title="" height={280} />
            ) : (
              <EmptyChart message="Belum ada data trend harian." />
            )}
          </Card>

          {/* Product Complaints (5 COLS) */}
          <Card tier="base" className="lg:col-span-5 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">Keluhan per Produk (SKU)</h2>
                  <p className="text-xs text-slate-500">
                    Distribusi komplain SKU tertinggi
                  </p>
                </div>
              </div>
            </div>

            {analytics?.product_complaints?.length > 0 ? (
              <div className="space-y-4 pt-1">
                {analytics.product_complaints.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1.5 text-xs">
                      <span className="text-slate-900 font-medium truncate pr-3">
                        {idx + 1}. {item.product}
                      </span>
                      <span className="text-slate-500 font-mono whitespace-nowrap">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          idx === 0
                            ? "bg-[#141414]"
                            : idx === 1
                            ? "bg-slate-600"
                            : "bg-slate-400"
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyChart message="Belum ada data distribusi produk." />
            )}
          </Card>
        </div>

        {/* ===== RECENT TICKETS TABLE ===== */}
        <Card tier="base" className="overflow-hidden">
          <div className="p-5 bg-white border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Tiket Komplain Terkini</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono">
                  {tickets.length} Total
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitoring real-time alur masuk tiket dan penugasan CS
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              icon="arrow_forward"
              onClick={() => navigate("/admin/tickets")}
            >
              Lihat Semua
            </Button>
          </div>

          {tickets.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-slate-400 text-[48px] mb-3">
                inbox
              </span>
              <p className="text-xs text-slate-500">
                Belum ada tiket di database.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Produk & Masalah</th>
                    <th className="px-4 py-3">Severity</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Assigned CS</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {tickets.slice(0, 8).map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                      onClick={() => navigate(`/cs/tickets/${ticket.id}`)}
                    >
                      <td className="px-4 py-3 font-mono text-slate-500 font-semibold">
                        #TK-{String(ticket.id).padStart(4, "0")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold flex items-center justify-center">
                            {ticket.customer_name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase() || "??"}
                          </div>
                          <span className="text-slate-900 font-medium">
                            {ticket.customer_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <span className="text-slate-900 font-medium truncate block">
                          {ticket.product || "-"}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {ticket.category || "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          type={
                            ticket.severity === "High"
                              ? "severityHigh"
                              : ticket.severity === "Moderate"
                              ? "severityModerate"
                              : "severityLow"
                          }
                          label={ticket.severity || "N/A"}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          type={
                            ticket.status === "RESOLVED"
                              ? "resolved"
                              : ticket.status === "IN_REVIEW"
                              ? "processing"
                              : "pending"
                          }
                          label={ticket.status}
                          pulse={ticket.status === "PROCESSING"}
                        />
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {ticket.assigned_cs || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;