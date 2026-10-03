import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import { tickets } from "../data/mockData";

const AdminTicketsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTickets = tickets.filter((t) => {
    const matchSearch =
      searchQuery === "" ||
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  });

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
            <Button variant="secondary" size="sm" icon="file_download">
              Export
            </Button>
            <Button variant="primary" size="sm" icon="add">
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
                { key: "urgent", label: "Urgent (2)" },
                { key: "pending", label: "Pending (2)" },
                { key: "resolved", label: `Selesai (${tickets.filter(t => t.status === "RESOLVED").length})` },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-1.5 rounded-lg text-label-md whitespace-nowrap transition-all ${
                    filter === f.key
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
                {filteredTickets.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => navigate(`/cs/tickets/${t.id.replace("#", "")}`)}
                    className="hover:bg-surface-container-high/40 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 text-code-sm text-brand-cyan font-semibold">
                      {t.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-surface-container-highest text-brand-cyan text-label-sm font-bold flex items-center justify-center">
                          {t.customerInitials}
                        </div>
                        <div>
                          <div className="text-primary font-medium">{t.customer}</div>
                          <div className="text-label-sm text-on-surface-variant">{t.customerTier}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant max-w-xs truncate">
                      {t.product}
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
                        label={t.severity}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge type={t.sentiment.toLowerCase()} label={t.sentiment} />
                    </td>
                    <td className="px-4 py-3 text-on-surface">{t.assignedCS}</td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        type={
                          t.status === "RESOLVED"
                            ? "resolved"
                            : t.status === "IN_REVIEW"
                            ? "processing"
                            : "pending"
                        }
                        label={t.statusLabel}
                        pulse={t.status === "IN_REVIEW"}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-brand-cyan hover:text-primary-fixed text-label-md">
                        Tinjau
                      </button>
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

export default AdminTicketsPage;