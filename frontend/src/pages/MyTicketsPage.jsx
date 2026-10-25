import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import { ticketsAPI, exportAPI, downloadBlob, getErrorMessage } from "../lib/api";

const MyTicketsPage = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [exporting, setExporting] = useState(false);

  // ===== FETCH TICKETS =====
  const fetchTickets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ticketsAPI.getAll({ assignedToMe: true });
      setTickets(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // ===== EXPORT HANDLER =====
  const handleExport = async () => {
    setExporting(true);
    try {
      const blob = await exportAPI.downloadTicketsCSV();
      downloadBlob(blob, `lumiere_tickets_${Date.now()}.csv`);
    } catch (err) {
      alert(`Gagal export: ${getErrorMessage(err)}`);
    } finally {
      setExporting(false);
    }
  };

  // ===== FILTER LOGIC =====
  const filters = [
    { key: "all", label: `Semua (${tickets.length})` },
    {
      key: "pending",
      label: `Pending (${tickets.filter((t) => t.status !== "RESOLVED").length})`,
    },
    {
      key: "review",
      label: `Review (${tickets.filter((t) => t.status === "IN_REVIEW").length})`,
    },
    {
      key: "resolved",
      label: `Selesai (${tickets.filter((t) => t.status === "RESOLVED").length})`,
    },
  ];

  const filteredTickets = tickets.filter((ticket) => {
    const matchFilter =
      activeFilter === "all" ||
      (activeFilter === "pending" && ticket.status !== "RESOLVED") ||
      (activeFilter === "review" && ticket.status === "IN_REVIEW") ||
      (activeFilter === "resolved" && ticket.status === "RESOLVED");

    const matchSearch =
      searchQuery === "" ||
      ticket.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toString().includes(searchQuery) ||
      ticket.product?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchFilter && matchSearch;
  });

  // ===== HELPERS =====
  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getSeverityBadge = (severity) => {
    if (severity === "High") return "severityHigh";
    if (severity === "Moderate") return "severityModerate";
    return "severityLow";
  };

  const getStatusBadge = (status) => {
    if (status === "RESOLVED") return "resolved";
    if (status === "IN_REVIEW") return "processing";
    if (status === "FAILED") return "urgent";
    return "pending";
  };

  return (
    <DashboardLayout
      role="cs"
      topbarProps={{
        title: "My Tickets",
        subtitle: "Semua tiket yang ditugaskan ke Sarah Pramudita - CS Agent",
        showInputButton: true,
      }}
    >
      <div className="p-6 space-y-6">

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
            <span className="material-symbols-outlined text-red-500 text-[20px] shrink-0">
              error
            </span>
            <div className="flex-1">
              <p className="text-sm text-red-800 font-semibold">
                Gagal Memuat Tiket
              </p>
              <p className="text-xs text-red-600 mt-0.5">{error}</p>
            </div>
            <button
              onClick={fetchTickets}
              className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Filter & Search */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`rounded-full px-4 py-2 text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeFilter === filter.key
                      ? "bg-[#141414] text-white shadow-none"
                      : "bg-[#F1F1F0] text-[#141414] hover:bg-[#E5E5E3]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                  search
                </span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari tiket, customer, atau produk..."
                  className="w-full lg:w-72 bg-slate-100/80 border border-slate-200 pl-10 pr-3.5 py-2 rounded-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition-all"
                />
              </div>

              <Button
                variant="secondary"
                size="sm"
                icon="refresh"
                onClick={fetchTickets}
                disabled={isLoading}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Daftar Tiket</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isLoading
                  ? "Memuat..."
                  : `Menampilkan ${filteredTickets.length} dari ${tickets.length} tiket`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                disabled={exporting}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50"
                title="Export CSV"
              >
                <span className={`material-symbols-outlined text-[18px] ${exporting ? 'animate-spin' : ''}`}>
                  {exporting ? "progress_activity" : "file_download"}
                </span>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-slate-400 text-[48px] animate-spin">
                progress_activity
              </span>
              <p className="text-xs text-slate-500 mt-3">Memuat tiket...</p>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-slate-300 text-[64px] mb-4">
                inbox
              </span>
              <p className="text-base font-bold text-slate-900 mb-1">
                Belum Ada Tiket
              </p>
              <p className="text-xs text-slate-500">
                {tickets.length === 0
                  ? "Klik 'Input Keluhan Baru' untuk membuat tiket pertama."
                  : "Tidak ada tiket yang sesuai filter."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Pelanggan</th>
                    <th className="px-4 py-3">Produk</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3">Severity</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                      onClick={() => navigate(`/cs/tickets/${ticket.id}`)}
                    >
                      <td className="px-4 py-3 font-semibold text-slate-700">
                        #TK-{String(ticket.id).padStart(4, "0")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 border border-slate-200">
                            {getInitials(ticket.customer_name)}
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
                        <span className="text-xs text-slate-400">
                          {ticket.product_batch || "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {ticket.category || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          type={getSeverityBadge(ticket.severity)}
                          label={ticket.severity || "N/A"}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          type={getStatusBadge(ticket.status)}
                          label={ticket.status}
                          pulse={ticket.status === "PROCESSING"}
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/cs/tickets/${ticket.id}`);
                          }}
                          className="inline-flex items-center gap-1 bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950 rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
                        >
                          Lihat
                          <span className="material-symbols-outlined text-[16px]">
                            arrow_forward
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && filteredTickets.length > 0 && (
            <div className="px-5 py-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Menampilkan {filteredTickets.length} dari {tickets.length} tiket
              </span>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyTicketsPage;