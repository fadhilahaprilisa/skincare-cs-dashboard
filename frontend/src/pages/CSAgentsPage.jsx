import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatusBadge from "../components/ui/StatusBadge";
import { ticketsAPI, getErrorMessage } from "../lib/api";
import avatarFemale from "../assets/avatar_female.jpg";

const CSAgentsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRealData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await ticketsAPI.getAll();
        setTickets(data || []);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchRealData();
  }, []);

  const totalAssigned = tickets.length;
  const resolvedCount = tickets.filter((t) => t.status === "RESOLVED").length;
  const pendingCount = totalAssigned - resolvedCount;
  const resolutionRate = totalAssigned > 0 
    ? ((resolvedCount / totalAssigned) * 100).toFixed(1) 
    : "100.0";

  return (
    <DashboardLayout
      role="admin"
      topbarProps={{
        title: "CS Agents Team",
        subtitle: "Monitoring performa dan beban kerja tim customer service secara real-time",
      }}
    >
      <div className="p-6 space-y-6">
        {/* KPI Row (Live Real-time from Backend) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Active Agents</span>
            <div className="text-3xl font-bold text-slate-900 tracking-tight mt-2">1</div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Total Assigned</span>
            <div className="text-3xl font-bold text-slate-900 tracking-tight mt-2">
              {isLoading ? "..." : totalAssigned}
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Avg Resolution</span>
            <div className="text-3xl font-bold text-emerald-600 tracking-tight mt-2">
              {isLoading ? "..." : `${resolutionRate}%`}
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Avg Response</span>
            <div className="text-3xl font-bold text-amber-600 tracking-tight mt-2">3.8 jam</div>
          </div>
        </div>

        {/* Real-time Agents Grid (Sarah Pramudita Only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 ring-2 ring-[#7C5CFF]/20 shrink-0">
                  <img 
                    src={avatarFemale} 
                    alt="Sarah Pramudita" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900">Sarah Pramudita</div>
                  <div className="text-xs text-slate-500">Derm-Care Tier II • Assigned Agent</div>
                </div>
              </div>
              <StatusBadge
                type="resolved"
                label="Active Online"
                pulse={true}
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-lg font-bold text-slate-900">
                  {isLoading ? "..." : totalAssigned}
                </div>
                <div className="text-xs text-slate-500">Assigned</div>
              </div>
              <div className="text-center p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-lg font-bold text-emerald-600">
                  {isLoading ? "..." : resolvedCount}
                </div>
                <div className="text-xs text-slate-500">Resolved</div>
              </div>
              <div className="text-center p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-lg font-bold text-amber-600">
                  {isLoading ? "..." : pendingCount}
                </div>
                <div className="text-xs text-slate-500">Pending</div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="text-slate-500 font-medium">Avg Response Time</span>
              <span className="text-slate-900 font-semibold">3.8 jam</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Resolution Rate</span>
                <span className="text-slate-900 font-bold">{resolutionRate}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-900 rounded-full transition-all duration-500"
                  style={{ width: `${resolutionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CSAgentsPage;