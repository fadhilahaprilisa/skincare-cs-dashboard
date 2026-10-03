import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import { ticketsAPI, getErrorMessage } from "../lib/api";

const MyTicketsPage = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
        subtitle: "Antrean terverifikasi dan riwayat interaksi harian",
        showInputButton: true,
      }}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-headline-lg text-primary font-bold tracking-tight">
              My Tickets
            </h1>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Semua tiket yang ditugaskan ke{" "}
              <strong className="text-primary">Sarah Pramudita</strong> - CS Agent
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="md"
              icon="refresh"
              onClick={fetchTickets}
              disabled={isLoading}
            >
              Refresh
            </Button>
            <Button
              variant="primary"
              size="md"
              icon="add"
              onClick={() => navigate("/cs/new-complaint")}
            >
              Input Keluhan Baru
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-lg bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#FF4D4D] text-[20px] shrink-0">
              error
            </span>
            <div className="flex-1">
              <p className="text-body-md text-[#FF4D4D] font-semibold">
                Gagal Memuat Tiket
              </p>
              <p className="text-body-sm text-[#FF4D4D]/80 mt-0.5">{error}</p>
            </div>
            <button
              onClick={fetchTickets}
              className="px-3 py-1 rounded bg-[#FF4D4D] text-white text-label-sm font-semibold hover:bg-[#FF4D4D]/80"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Filter & Search */}
        <Card tier="base" className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-3 py-1.5 rounded-lg text-label-md whitespace-nowrap transition-all ${
                    activeFilter === filter.key
                      ? "bg-brand-cyan text-on-primary-container font-bold shadow-cyan-glow"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  {filter.label}
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
          <div className="p-5 bg-surface-container-high/40 flex items-center justify-between">
            <div>
              <h2 className="text-headline-sm text-primary font-semibold">Daftar Tiket</h2>
              <p className="text-body-sm text-on-surface-variant mt-0.5">
                {isLoading
                  ? "Memuat..."
                  : `Menampilkan ${filteredTickets.length} dari ${tickets.length} tiket`}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-brand-cyan text-[48px] animate-spin">
                progress_activity
              </span>
              <p className="text-body-sm text-on-surface-variant mt-3">Memuat tiket...</p>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-brand-cyan text-[64px] opacity-40 mb-4">
                inbox
              </span>
              <p className="text-headline-sm text-primary font-bold mb-1">
                Belum Ada Tiket
              </p>
              <p className="text-body-sm text-on-surface-variant">
                {tickets.length === 0
                  ? "Klik 'Input Keluhan Baru' untuk membuat tiket pertama."
                  : "Tidak ada tiket yang sesuai filter."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-body-sm">
                <thead className="bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider">
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
                <tbody className="divide-y divide-outline-variant/20">
                  {filteredTickets.map((ticket) => (
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
                          <div className="w-7 h-7 rounded-full bg-surface-container-highest text-brand-cyan text-label-sm font-bold flex items-center justify-center shrink-0">
                            {getInitials(ticket.customer_name)}
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
                          {ticket.product_batch || "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-on-surface-variant">
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
                          className="inline-flex items-center gap-1 text-brand-cyan hover:text-primary-fixed font-label-md"
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
            <div className="px-5 py-3 bg-surface-container-low flex items-center justify-between text-body-sm text-on-surface-variant">
              <span>
                Menampilkan {filteredTickets.length} dari {tickets.length} tiket
              </span>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyTicketsPage;