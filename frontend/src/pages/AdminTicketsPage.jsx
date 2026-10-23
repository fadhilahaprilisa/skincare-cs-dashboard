import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import { ticketsAPI, exportAPI, downloadBlob, getErrorMessage } from "../lib/api";

const AdminTicketsPage = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [exporting, setExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await ticketsAPI.getAll();
        setTickets(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleExport = async () => {
    setExporting(true);
    try {
      const blob = await exportAPI.downloadTicketsCSV();
      downloadBlob(blob, `lumiere_all_tickets_${Date.now()}.csv`);
    } catch (err) {
      alert(`Gagal export: ${getErrorMessage(err)}`);
    } finally {
      setExporting(false);
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const matchSearch =
      searchQuery === "" ||
      t.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toString().includes(searchQuery) ||
      t.product?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchFilter =
      activeFilter === "all" ||
      (activeFilter === "urgent" && t.severity === "High") ||
      (activeFilter === "pending" && (t.status === "PROCESSING" || t.status === "IN_REVIEW")) ||
      (activeFilter === "resolved" && t.status === "RESOLVED");

    return matchSearch && matchFilter;
  });

  if (isLoading) {
    return (
      <DashboardLayout
        role="admin"
        topbarProps={{
          title: "Tickets Management",
          subtitle: "Memuat data tiket...",
        }}
      >
        <div className="p-12 text-center">
          <span className="material-symbols-outlined text-brand-cyan text-[64px] animate-spin">
            progress_activity
          </span>
          <p className="text-body-md text-on-surface-variant mt-4">Memuat daftar tiket...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout
        role="admin"
        topbarProps={{
          title: "Tickets Management",
          subtitle: "Error",
        }}
      >
        <div className="p-6">
          <Card tier="base" className="p-12 text-center">
            <span className="material-symbols-outlined text-[#FF4D4D] text-[64px] mb-4">
              error
            </span>
            <h2 className="text-headline-lg text-primary font-bold mb-2">
              Gagal Memuat Tiket
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

  return (
    <DashboardLayout
      role="admin"
      topbarProps={{
        title: "Tickets Management",
        subtitle: "Monitoring semua tiket customer service",
        showSearch: false,
      }}
    >
      <div className="p-6 space-y-6">
        {/* Page Toolbar (Breadcrumbs + Primary Actions) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-1.5 text-xs text-slate-400">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                Dashboard
              </button>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-slate-900 font-semibold">Tickets Management</span>
            </nav>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              {tickets.length} Tiket
            </span>
          </div>

          {/* Primary Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              icon={exporting ? "progress_activity" : "file_download"}
              onClick={handleExport}
              disabled={exporting}
            >
              {exporting ? "Mengunduh..." : "Export"}
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon="add"
              onClick={() => navigate("/admin/new-complaint")}
            >
              Buat Tiket
            </Button>
          </div>
        </div>

        {/* Filter + Search Bar (Clean, Balanced & Responsive) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {[
                { key: "all", label: `Semua (${tickets.length})` },
                { key: "urgent", label: `Urgent (${tickets.filter((t) => t.severity === "High").length})` },
                { key: "pending", label: `Pending (${tickets.filter((t) => t.status === "PROCESSING" || t.status === "IN_REVIEW").length})` },
                { key: "resolved", label: `Selesai (${tickets.filter((t) => t.status === "RESOLVED").length})` },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${activeFilter === f.key
                      ? "bg-[#141414] text-white shadow-none"
                      : "bg-[#F1F1F0] text-[#141414] hover:bg-[#E5E5E3]"
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative flex items-center w-full md:w-72 shrink-0">
              <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                search
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tiket, customer, atau produk..."
                className="w-full bg-slate-100/80 border border-slate-200 pl-10 pr-9 py-2 rounded-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <Card tier="base" className="overflow-hidden">
          {filteredTickets.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-slate-400 text-[48px] mb-3">
                search_off
              </span>
              <p className="text-body-md text-slate-500">
                Tidak ada tiket yang sesuai dengan filter atau pencarian Anda.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Produk</th>
                    <th className="px-4 py-3">Severity</th>
                    <th className="px-4 py-3">Sentimen</th>
                    <th className="px-4 py-3">Assigned CS</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {filteredTickets.map((t) => {
                    const initials = t.customer_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "??";

                    return (
                      <tr
                        key={t.id}
                        onClick={() => navigate(`/cs/tickets/${t.id}`)}
                        className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3 font-mono text-slate-500 font-semibold">
                          #TK-{String(t.id).padStart(4, "0")}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                              {initials}
                            </div>
                            <div>
                              <div className="text-slate-900 font-medium">{t.customer_name || "-"}</div>
                              <div className="text-[11px] text-slate-500">{t.customer_tier || "Regular"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                          {t.product || "-"}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge
                            type={
                              t.severity === "High"
                                ? "severityHigh"
                                : t.severity === "Moderate"
                                  ? "severityModerate"
                                  : "severityLow"
                            }
                            label={t.severity || "N/A"}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge type={t.sentiment?.toLowerCase() || "neutral"} label={t.sentiment || "Neutral"} />
                        </td>
                        <td className="px-4 py-3 text-slate-600">{t.assigned_cs || "-"}</td>
                        <td className="px-4 py-3">
                          <StatusBadge
                            type={
                              t.status === "RESOLVED"
                                ? "resolved"
                                : t.status === "IN_REVIEW" || t.status === "PROCESSING"
                                  ? "processing"
                                  : "pending"
                            }
                            label={t.status}
                            pulse={t.status === "PROCESSING" || t.status === "IN_REVIEW"}
                          />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/cs/tickets/${t.id}`);
                            }}
                            className="bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950 rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer"
                          >
                            Tinjau
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminTicketsPage;