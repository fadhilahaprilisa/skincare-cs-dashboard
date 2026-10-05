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
      }}
    >
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-headline-lg text-primary font-bold tracking-tight">
              All Tickets
            </h1>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Menampilkan {filteredTickets.length} dari {tickets.length} tiket
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={exporting ? "progress_activity" : "file_download"}
              onClick={handleExport}
              disabled={exporting}
            >
              {exporting ? "Exporting..." : "Export"}
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

        {/* Filter + Search */}
        <Card tier="base" className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              {[
                { key: "all", label: `Semua (${tickets.length})` },
                { key: "urgent", label: `Urgent (${tickets.filter((t) => t.severity === "High").length})` },
                { key: "pending", label: `Pending (${tickets.filter((t) => t.status === "PROCESSING" || t.status === "IN_REVIEW").length})` },
                { key: "resolved", label: `Selesai (${tickets.filter((t) => t.status === "RESOLVED").length})` },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`px-3 py-1.5 rounded-lg text-label-md whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === f.key
                      ? "bg-brand-cyan text-on-primary-container font-bold shadow-cyan-glow"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px] pointer-events-none">
                search
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tiket, customer, atau produk..."
                className="w-full lg:w-72 bg-surface-container-lowest border border-outline-variant pl-10 pr-3 py-2 rounded-lg text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-brand-cyan transition-all"
              />
            </div>
          </div>
        </Card>

        {/* Table */}
        <Card tier="base" className="overflow-hidden">
          {filteredTickets.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-brand-cyan text-[64px] opacity-40 mb-3">
                search_off
              </span>
              <p className="text-body-md text-on-surface-variant">
                Tidak ada tiket yang sesuai dengan filter atau pencarian Anda.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-body-sm">
                <thead className="bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider">
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
                <tbody className="divide-y divide-outline-variant/20">
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
                        className="hover:bg-surface-container-high/40 transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3 text-code-sm text-brand-cyan font-semibold">
                          #TK-{String(t.id).padStart(4, "0")}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-surface-container-highest text-brand-cyan text-label-sm font-bold flex items-center justify-center">
                              {initials}
                            </div>
                            <div>
                              <div className="text-primary font-medium">{t.customer_name || "-"}</div>
                              <div className="text-label-sm text-on-surface-variant">{t.customer_tier || "Regular"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-on-surface-variant max-w-xs truncate">
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
                        <td className="px-4 py-3 text-on-surface">{t.assigned_cs || "-"}</td>
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
                          <button className="text-brand-cyan hover:text-primary-fixed text-label-md cursor-pointer">
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