import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/domain/StatCard";
import StatusBadge from "../components/ui/StatusBadge";
import Card from "../components/ui/Card";
import LineChartCard from "../components/domain/LineChartCard";
import BarChartCard from "../components/domain/BarChartCard";
import { ticketsAPI, analyticsAPI, getErrorMessage } from "../lib/api";

// ===== EMPTY CHART FALLBACK =====
const EmptyChart = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-3">
      bar_chart
    </span>
    <p className="text-body-sm text-on-surface-variant">{message}</p>
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
        setTickets(ticketsData);
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
        <div className="p-12 text-center">
          <span className="material-symbols-outlined text-brand-cyan text-[64px] animate-spin">
            progress_activity
          </span>
          <p className="text-body-md text-on-surface-variant mt-4">Memuat dashboard...</p>
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
        <div className="p-6">
          <Card tier="base" className="p-12 text-center">
            <span className="material-symbols-outlined text-[#FF4D4D] text-[64px] mb-4">
              error
            </span>
            <h2 className="text-headline-lg text-primary font-bold mb-2">
              Gagal Memuat Dashboard
            </h2>
            <p className="text-body-md text-on-surface-variant mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-brand-cyan text-on-primary-container font-semibold hover:brightness-105"
            >
              Refresh
            </button>
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
        title: "Dashboard Admin",
        subtitle: "Pantau aktivitas customer service dan insight keluhan skincare.",
      }}
    >
      <div className="p-6 space-y-6">
        {/* ===== TOP BAR: TELEMETRY + QUICK ACTIONS ===== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-brand-cyan text-label-sm uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping"></span>
                Real-Time Telemetry
              </span>
              <span className="text-label-sm text-on-surface-variant">Sinkronisasi live</span>
            </div>
            <p className="text-headline-sm text-primary">
              Lumière AI Complaint Assistant & CS Monitoring
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select className="appearance-none bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md px-3 py-2 rounded-lg cursor-pointer focus:outline-none">
              <option>7 Hari Terakhir</option>
              <option>14 Hari Terakhir</option>
              <option>Bulan Berjalan</option>
            </select>
            <button
              onClick={() => navigate("/admin/tickets")}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-headline-sm transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
              Lihat Semua Tiket
            </button>
            <button
              onClick={() => navigate("/cs/new-complaint")}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-cyan text-on-primary-container text-headline-sm shadow-cyan-glow hover:brightness-110 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Buat Tiket
            </button>
          </div>
        </div>

        {/* ===== KPI CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Tickets"
            value={kpi.total_tickets ?? 0}
            unit="kasus"
            trend={kpi.total_tickets_trend || "+0%"}
            trendDirection="up"
            icon="inbox"
            accentBar="bg-brand-cyan"
          />
          <StatCard
            label="Resolved Cases"
            value={kpi.resolved ?? 0}
            unit="tuntas"
            trend={`${kpi.resolution_rate ?? 0}% rate`}
            trendDirection="down"
            icon="verified"
            accentBar="bg-[#2ED573]"
          />
          <StatCard
            label="Pending CS Review"
            value={kpi.pending ?? 0}
            unit="antrean"
            trend="Needs attention"
            trendDirection="down"
            icon="hourglass_top"
            accentBar="bg-[#FFC048]"
          />
          <StatCard
            label="Urgent Escalation"
            value={kpi.urgent ?? 0}
            unit="mendesak"
            trend="Immediate triage"
            trendDirection="down"
            icon="warning"
            variant="urgent"
            accentBar="bg-[#FF4D4D]"
          />
        </div>

        {/* ===== ANALYTICS ROW: Trend + Product ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Trend Line Chart */}
          <Card tier="base" className="lg:col-span-7 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-brand-cyan">
                <span className="material-symbols-outlined text-[18px]">show_chart</span>
              </div>
              <div>
                <h2 className="text-headline-sm text-primary">Tren Keluhan 7 Hari</h2>
                <p className="text-body-sm text-on-surface-variant">
                  Volume tiket harian di database
                </p>
              </div>
            </div>
            {analytics?.trend?.length > 0 ? (
              <LineChartCard data={analytics.trend} title="" height={280} />
            ) : (
              <EmptyChart message="Belum ada data trend" />
            )}
          </Card>

          {/* Product Complaints */}
          <Card tier="base" className="lg:col-span-5 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-headline-sm text-primary">Keluhan per Produk</h2>
                <p className="text-body-sm text-on-surface-variant">
                  Distribusi kategori produk aduan tertinggi
                </p>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                category
              </span>
            </div>

            {analytics?.product_complaints?.length > 0 ? (
              <div className="space-y-4">
                {analytics.product_complaints.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-body-sm text-primary font-medium truncate pr-3">
                        {idx + 1}. {item.product}
                      </span>
                      <span className="text-code-sm text-on-surface-variant whitespace-nowrap">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          idx === 0
                            ? "bg-brand-cyan"
                            : idx === 1
                            ? "bg-primary-fixed"
                            : "bg-surface-variant"
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyChart message="Belum ada data produk" />
            )}
          </Card>
        </div>

        {/* ===== RECENT TICKETS TABLE ===== */}
        <Card tier="base" className="overflow-hidden">
          <div className="p-5 bg-surface-container-high/40 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-headline-sm text-primary">Tiket Terkini</h2>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-brand-cyan text-label-sm">
                  {tickets.length} Total
                </span>
              </div>
              <p className="text-body-sm text-on-surface-variant mt-0.5">
                Monitoring real-time tiket komplain pelanggan
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/tickets")}
              className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-brand-cyan text-label-md transition-colors"
            >
              Lihat Semua
            </button>
          </div>

          {tickets.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-brand-cyan text-[64px] opacity-40 mb-3">
                inbox
              </span>
              <p className="text-body-md text-on-surface-variant">
                Belum ada tiket di database.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-body-sm">
                <thead className="bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Keluhan</th>
                    <th className="px-4 py-3">Severity</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Assigned CS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {tickets.slice(0, 10).map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-surface-container-high/40 transition-colors cursor-pointer"
                      onClick={() => navigate(`/cs/tickets/${ticket.id}`)}
                    >
                      <td className="px-4 py-3 text-code-sm text-brand-cyan font-semibold">
                        #TK-{String(ticket.id).padStart(4, "0")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-surface-container-highest text-brand-cyan text-label-sm font-bold flex items-center justify-center">
                            {ticket.customer_name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase() || "??"}
                          </div>
                          <span className="text-primary font-medium">
                            {ticket.customer_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <span className="text-primary truncate block">
                          {ticket.product || "-"}
                        </span>
                        <span className="text-label-sm text-on-surface-variant">
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
                      <td className="px-4 py-3 text-on-surface">
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