import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/domain/StatCard";
import StatusBadge from "../components/ui/StatusBadge";
import Card from "../components/ui/Card";
import { kpiAdmin, tickets, analyticsData } from "../data/mockData";

const AdminDashboard = () => {
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
              <span className="text-label-sm text-on-surface-variant">Sinkronisasi batch #4092-B</span>
            </div>
            <p className="text-headline-sm text-primary">
              Lumière AI Complaint Assistant & CS Monitoring
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select className="appearance-none bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md px-3 py-2 pr-8 rounded-lg cursor-pointer focus:outline-none">
              <option>7 Hari Terakhir</option>
              <option>14 Hari Terakhir</option>
              <option>Bulan Berjalan</option>
            </select>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-headline-sm transition-all">
              <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
              Lihat Semua Tiket
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-cyan text-on-primary-container text-headline-sm shadow-cyan-glow hover:brightness-110 transition-all">
              <span className="material-symbols-outlined text-[16px]">add</span>
              Buat Tiket
            </button>
          </div>
        </div>

        {/* ===== KPI CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Tickets"
            value={kpiAdmin.totalTickets}
            unit="kasus"
            trend={kpiAdmin.totalTicketsTrend}
            trendDirection="up"
            icon="inbox"
            accentBar="bg-brand-cyan"
          />
          <StatCard
            label="Resolved Cases"
            value={kpiAdmin.resolved}
            unit="tuntas"
            trend={kpiAdmin.resolvedRate}
            trendDirection="down"
            icon="verified"
            accentBar="bg-[#2ED573]"
          />
          <StatCard
            label="Pending CS Review"
            value={kpiAdmin.pending}
            unit="antrean"
            trend="Needs attention"
            trendDirection="down"
            icon="hourglass_top"
            accentBar="bg-[#FFC048]"
          />
          <StatCard
            label="Urgent Escalation"
            value={kpiAdmin.urgent}
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
          {/* AI Strategic Intelligence */}
          <Card tier="base" className="lg:col-span-7 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-brand-cyan">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
              </div>
              <div>
                <h2 className="text-headline-sm text-primary">AI Strategic Intelligence</h2>
                <p className="text-body-sm text-on-surface-variant">
                  Analisis pola keluhan & bantuan CS (AI-generated insight)
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-surface-container border-l-2 border-brand-cyan">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-body-md text-primary font-medium">
                    Keluhan iritasi & redness meningkat 34% dalam 7 hari terakhir.
                  </span>
                  <StatusBadge type="processing" label="Monitoring" />
                </div>
                <p className="text-body-sm text-on-surface-variant">
                  Terjadi korelasi penggunaan Retinol serum bersamaan dengan exfoliant AHA tanpa jeda malam adaptasi.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-surface-container border-l-2 border-[#FF4D4D]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-body-md text-primary font-medium">
                    Retinol 0.5% menjadi produk aduan tertinggi (38 tiket).
                  </span>
                  <StatusBadge type="urgent" label="Formulasi" />
                </div>
                <p className="text-body-sm text-on-surface-variant">
                  82% pelanggan merupakan pengguna awal yang tidak melewati fase sandwich method.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-surface-container border-l-2 border-[#FFC048]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-body-md text-primary font-medium">
                    42% keluhan memiliki spektrum sentimen Concerned / Cemas.
                  </span>
                  <StatusBadge type="pending" label="Panduan" />
                </div>
                <p className="text-body-sm text-on-surface-variant">
                  Konsumen membutuhkan penegasan perbedaan antara 'Purging Alami' vs 'Reaksi Alergi Kontak'.
                </p>
              </div>
            </div>
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
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">category</span>
            </div>

            <div className="space-y-4">
              {analyticsData.productComplaints.map((item, idx) => (
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
                        idx === 0 ? "bg-brand-cyan" : idx === 1 ? "bg-primary-fixed" : "bg-surface-variant"
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ===== RECENT TICKETS TABLE ===== */}
        <Card tier="base" className="overflow-hidden">
          <div className="p-5 bg-surface-container-high/40 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-headline-sm text-primary">Tiket Terkini</h2>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-brand-cyan text-label-sm">
                  5 Antrean Aktif
                </span>
              </div>
              <p className="text-body-sm text-on-surface-variant mt-0.5">
                Monitoring real-time tiket komplain pelanggan & kepatuhan SLA
              </p>
            </div>
            <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">file_download</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead className="bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Keluhan</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Sentimen</th>
                  <th className="px-4 py-3">Assigned CS</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="px-4 py-3 text-code-sm text-brand-cyan font-semibold">{ticket.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-surface-container-highest text-brand-cyan text-label-sm font-bold flex items-center justify-center">
                          {ticket.customerInitials}
                        </div>
                        <span className="text-primary font-medium">{ticket.customer}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <span className="text-primary truncate block">{ticket.product}</span>
                      <span className="text-label-sm text-on-surface-variant">{ticket.category}</span>
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
                        label={ticket.severity}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        type={ticket.sentiment.toLowerCase()}
                        label={ticket.sentiment}
                      />
                    </td>
                    <td className="px-4 py-3 text-on-surface">{ticket.assignedCS}</td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        type={ticket.status === "RESOLVED" ? "resolved" : ticket.status === "IN_REVIEW" ? "processing" : "pending"}
                        label={ticket.statusLabel}
                        pulse={ticket.status === "IN_REVIEW"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;