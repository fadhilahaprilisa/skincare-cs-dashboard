import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import { tickets } from "../data/mockData";

const MyTicketsPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { key: "all", label: `Semua (${tickets.length})` },
    { key: "pending", label: `Pending (${tickets.filter(t => t.status !== "RESOLVED").length})` },
    { key: "review", label: "Sedang Ditinjau (1)" },
    { key: "resolved", label: `Selesai (${tickets.filter(t => t.status === "RESOLVED").length})` },
  ];

  const filteredTickets = tickets.filter((ticket) => {
    const matchFilter =
      activeFilter === "all" ||
      (activeFilter === "pending" && ticket.status !== "RESOLVED") ||
      (activeFilter === "review" && ticket.status === "IN_REVIEW") ||
      (activeFilter === "resolved" && ticket.status === "RESOLVED");

    const matchSearch =
      searchQuery === "" ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.product.toLowerCase().includes(searchQuery.toLowerCase());

    return matchFilter && matchSearch;
  });

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
        {/* ===== PAGE HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-headline-lg text-primary font-bold tracking-tight">
              My Tickets
            </h1>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Semua tiket yang ditugaskan ke <strong className="text-primary">Sarah Pramudita</strong> - CS Agent
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            icon="add"
            onClick={() => navigate("/cs/new-complaint")}
          >
            Input Keluhan Baru
          </Button>
        </div>

        {/* ===== FILTER & SEARCH BAR ===== */}
        <Card tier="base" className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Filter Tabs */}
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

            {/* Search */}
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

        {/* ===== TICKETS TABLE ===== */}
        <Card tier="base" className="overflow-hidden">
          <div className="p-5 bg-surface-container-high/40 flex items-center justify-between">
            <div>
              <h2 className="text-headline-sm text-primary font-semibold">
                Daftar Tiket
              </h2>
              <p className="text-body-sm text-on-surface-variant mt-0.5">
                Menampilkan {filteredTickets.length} dari {tickets.length} tiket
              </p>
            </div>
            <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                file_download
              </span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead className="bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">ID Tiket</th>
                  <th className="px-4 py-3">Pelanggan</th>
                  <th className="px-4 py-3">Produk</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Sentimen</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-on-surface-variant">
                      Tidak ada tiket yang sesuai filter.
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-surface-container-high/40 transition-colors cursor-pointer"
                      onClick={() => navigate(`/cs/tickets/${ticket.id.replace("#", "")}`)}
                    >
                      <td className="px-4 py-3 text-code-sm text-brand-cyan font-semibold">
                        {ticket.id}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-surface-container-highest text-brand-cyan text-label-sm font-bold flex items-center justify-center shrink-0">
                            {ticket.customerInitials}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-primary font-medium">{ticket.customer}</span>
                            <span className="text-label-sm text-on-surface-variant">
                              {ticket.customerTier}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <span className="text-primary truncate block">{ticket.product}</span>
                        <span className="text-label-sm text-on-surface-variant">
                          {ticket.productBatch}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-on-surface-variant">{ticket.category}</td>
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
                          label={`${ticket.sentiment} ${ticket.sentimentEmoji}`}
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
                          label={ticket.statusLabel}
                          pulse={ticket.status === "IN_REVIEW"}
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/cs/tickets/${ticket.id.replace("#", "")}`);
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 bg-surface-container-low flex items-center justify-between text-body-sm text-on-surface-variant">
            <span>Menampilkan {filteredTickets.length} dari {tickets.length} tiket</span>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <span className="px-3 py-1 rounded bg-brand-cyan text-on-primary-container text-label-sm font-bold">1</span>
              <button className="w-8 h-8 rounded bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyTicketsPage;