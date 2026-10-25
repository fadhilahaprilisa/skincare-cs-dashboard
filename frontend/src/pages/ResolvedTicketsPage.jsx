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
        <div className="flex items-center justify-end">
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
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                Total Resolved
              </span>
              <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                task_alt
              </span>
            </div>
            <div className="text-3xl font-bold text-emerald-600 tracking-tight">{tickets.length}</div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                Avg Response
              </span>
              <span className="material-symbols-outlined text-slate-700 text-[20px]">schedule</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight">3.2 jam</div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">CSAT</span>
              <span className="material-symbols-outlined text-amber-500 text-[20px]">star</span>
            </div>
            <div className="text-3xl font-bold text-amber-600 tracking-tight">4.82</div>
          </div>
        </div>

        {isLoading && (
          <div className="p-12 text-center">
            <span className="material-symbols-outlined text-slate-400 text-[48px] animate-spin">
              progress_activity
            </span>
            <p className="text-xs text-slate-500 mt-3">Memuat tiket resolved...</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
            <span className="material-symbols-outlined text-red-500 text-[20px]">error</span>
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Riwayat Resolved</h2>
            </div>

            {tickets.length === 0 ? (
              <div className="p-12 text-center">
                <span className="material-symbols-outlined text-slate-300 text-[64px] mb-3">
                  check_circle
                </span>
                <p className="text-xs text-slate-500">
                  Belum ada tiket yang diselesaikan.
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
                      <th className="px-4 py-3">Kategori</th>
                      <th className="px-4 py-3">Severity</th>
                      <th className="px-4 py-3">Resolved At</th>
                      <th className="px-4 py-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {tickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                        onClick={() => navigate(`/cs/tickets/${ticket.id}`)}
                      >
                        <td className="px-4 py-3 font-semibold text-slate-700">
                          #TK-{String(ticket.id).padStart(4, "0")}
                        </td>
                        <td className="px-4 py-3 text-slate-900 font-medium">{ticket.customer_name}</td>
                        <td className="px-4 py-3 text-slate-900 font-medium">
                          {ticket.product || "-"}
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
                        <td className="px-4 py-3 text-slate-500 text-xs">
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
                            className="inline-flex items-center gap-1 bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950 rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
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
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ResolvedTicketsPage;