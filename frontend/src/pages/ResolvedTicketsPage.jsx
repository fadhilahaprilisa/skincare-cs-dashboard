import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import { tickets } from "../data/mockData";

const ResolvedTicketsPage = () => {
  const navigate = useNavigate();
  const resolvedTickets = tickets.filter((t) => t.status === "RESOLVED");

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
              Total <strong className="text-[#2ED573]">{resolvedTickets.length} tiket</strong> berhasil diselesaikan
            </p>
          </div>
          <Button variant="secondary" size="sm" icon="file_download">
            Export CSV
          </Button>
        </div>

        {/* KPI Row */}
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
            <div className="text-display-lg text-[#2ED573] font-bold">
              {resolvedTickets.length}
            </div>
          </Card>
          <Card tier="base" className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-label-md uppercase text-on-surface-variant">
                Avg Response
              </span>
              <span className="material-symbols-outlined text-brand-cyan text-[20px]">
                schedule
              </span>
            </div>
            <div className="text-display-lg text-primary font-bold">3.2 jam</div>
          </Card>
          <Card tier="base" className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-label-md uppercase text-on-surface-variant">
                CSAT Score
              </span>
              <span className="material-symbols-outlined text-[#FFC048] text-[20px]">
                star
              </span>
            </div>
            <div className="text-display-lg text-[#FFC048] font-bold">4.82</div>
          </Card>
        </div>

        <Card tier="base" className="overflow-hidden">
          <div className="p-5 bg-surface-container-high/40">
            <h2 className="text-headline-sm text-primary font-semibold">
              Riwayat Resolved
            </h2>
          </div>

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
                {resolvedTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="px-4 py-3 text-code-sm text-brand-cyan font-semibold">
                      {ticket.id}
                    </td>
                    <td className="px-4 py-3 text-primary">{ticket.customer}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{ticket.product}</td>
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
                    <td className="px-4 py-3 text-on-surface-variant text-code-sm">
                      {ticket.createdAt}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => navigate(`/cs/tickets/${ticket.id.replace("#", "")}`)}
                        className="text-brand-cyan hover:text-primary-fixed text-label-md inline-flex items-center gap-0.5"
                      >
                        Lihat
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
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

export default ResolvedTicketsPage;