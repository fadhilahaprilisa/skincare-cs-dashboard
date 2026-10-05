import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import { ticketsAPI, exportAPI, downloadBlob, getErrorMessage } from "../lib/api";

const ResolvedTicketsPage = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await ticketsAPI.getAll({ assignedToMe: true, status: "RESOLVED" });
        setTickets(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExport = async () => {
    setExporting(true);
    try {
      const blob = await exportAPI.downloadTicketsCSV();
      downloadBlob(blob, `lumiere_resolved_${Date.now()}.csv`);
    } catch (err) {
      alert(`Gagal export: ${getErrorMessage(err)}`);
    } finally {
      setExporting(false);
    }
  };

  const getSeverityBadge = (sev) => {
    if (sev === "High") return "severityHigh";
    if (sev === "Moderate") return "severityModerate";
    return "severityLow";
  };

  return (
    <DashboardLayout
      role="cs"
      topbarProps={{
        title: "Resolved Tickets",
        subtitle: "Riwayat tiket yang sudah diselesaikan",
        showInputButton: false,
      }}
    >
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-headline-lg text-primary font-bold tracking-tight">
              Resolved Tickets
            </h1>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Total <strong className="text-[#2ED573]">{tickets.length} tiket</strong> berhasil diselesaikan
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={exporting ? "progress_activity" : "file_download"}
            onClick={handleExport}
            disabled={exporting}
          >
            {exporting ? "Exporting..." : "Export CSV"}
          </Button>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card tier="base" className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-label-md uppercase text-on-surface-variant">
                Total Resolved
              </span>
              <span className="material-symbols-outlined text-[#2ED573] text-[20px]">
                task_alt
              </span>
            </div>
            <div className="text-display-lg text-[#2ED573] font-bold">{tickets.length}</div>
          </Card>
          <Card tier="base" className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-label-md uppercase text-on-surface-variant">
                Avg Response
              </span>
              <span className="material-symbols-outlined text-brand-cyan text-[20px]">schedule</span>
            </div>
            <div className="text-display-lg text-primary font-bold">3.2 jam</div>
          </Card>
          <Card tier="base" className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-label-md uppercase text-on-surface-variant">CSAT</span>
              <span className="material-symbols-outlined text-[#FFC048] text-[20px]">star</span>
            </div>
            <div className="text-display-lg text-[#FFC048] font-bold">4.82</div>
          </Card>
        </div>

        {isLoading && (
          <div className="p-12 text-center">
            <span className="material-symbols-outlined text-brand-cyan text-[48px] animate-spin">
              progress_activity
            </span>
            <p className="text-body-sm text-on-surface-variant mt-3">Memuat tiket resolved...</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#FF4D4D] text-[20px]">error</span>
            <p className="text-body-sm text-[#FF4D4D]">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <Card tier="base" className="overflow-hidden">
            <div className="p-5 bg-surface-container-high/40">
              <h2 className="text-headline-sm text-primary font-semibold">Riwayat Resolved</h2>
            </div>

            {tickets.length === 0 ? (
              <div className="p-12 text-center">
                <span className="material-symbols-outlined text-brand-cyan text-[64px] opacity-40 mb-3">
                  check_circle
                </span>
                <p className="text-body-md text-on-surface-variant">
                  Belum ada tiket yang diselesaikan.
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
                      <th className="px-4 py-3">Kategori</th>
                      <th className="px-4 py-3">Severity</th>
                      <th className="px-4 py-3">Resolved At</th>
                      <th className="px-4 py-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {tickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-surface-container-high/40 transition-colors cursor-pointer"
                        onClick={() => navigate(`/cs/tickets/${ticket.id}`)}
                      >
                        <td className="px-4 py-3 text-code-sm text-brand-cyan font-semibold">
                          #TK-{String(ticket.id).padStart(4, "0")}
                        </td>
                        <td className="px-4 py-3 text-primary">{ticket.customer_name}</td>
                        <td className="px-4 py-3 text-on-surface-variant">
                          {ticket.product || "-"}
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
                        <td className="px-4 py-3 text-on-surface-variant text-code-sm">
                          {ticket.created_at
                            ? new Date(ticket.created_at).toLocaleString("id-ID")
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/cs/tickets/${ticket.id}`);
                            }}
                            className="text-brand-cyan hover:text-primary-fixed text-label-md inline-flex items-center gap-0.5"
                          >
                            Lihat
                            <span className="material-symbols-outlined text-[14px]">
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
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ResolvedTicketsPage;