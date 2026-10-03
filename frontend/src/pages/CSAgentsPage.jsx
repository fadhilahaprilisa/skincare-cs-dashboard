import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import { analyticsData } from "../data/mockData";

const CSAgentsPage = () => {
  return (
    <DashboardLayout
      role="admin"
      topbarProps={{
        title: "CS Agents",
        subtitle: "Monitoring performa dan beban kerja tim customer service",
      }}
    >
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-headline-lg text-primary font-bold tracking-tight">
              CS Agents Team
            </h1>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Total <strong className="text-brand-cyan">{analyticsData.csPerformance.length} agen</strong> aktif
            </p>
          </div>
          <Button variant="primary" size="sm" icon="person_add">
            Tambah Agen
          </Button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card tier="base" className="p-5">
            <span className="text-label-md uppercase text-on-surface-variant">Active Agents</span>
            <div className="text-display-lg text-brand-cyan font-bold mt-2">4</div>
          </Card>
          <Card tier="base" className="p-5">
            <span className="text-label-md uppercase text-on-surface-variant">Total Assigned</span>
            <div className="text-display-lg text-primary font-bold mt-2">128</div>
          </Card>
          <Card tier="base" className="p-5">
            <span className="text-label-md uppercase text-on-surface-variant">Avg Resolution</span>
            <div className="text-display-lg text-[#2ED573] font-bold mt-2">76.9%</div>
          </Card>
          <Card tier="base" className="p-5">
            <span className="text-label-md uppercase text-on-surface-variant">Avg Response</span>
            <div className="text-display-lg text-[#FFC048] font-bold mt-2">4.5h</div>
          </Card>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analyticsData.csPerformance.map((cs, idx) => (
            <Card key={idx} tier="base" className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-violet to-brand-cyan flex items-center justify-center text-white font-bold">
                    {cs.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-headline-sm text-primary font-semibold">{cs.name}</div>
                    <div className="text-label-sm text-on-surface-variant">{cs.role}</div>
                  </div>
                </div>
                <StatusBadge
                  type={cs.status === "Active Online" ? "resolved" : "pending"}
                  label={cs.status}
                  pulse={cs.status === "Active Online"}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 rounded bg-surface-container">
                  <div className="text-headline-md text-brand-cyan font-bold">{cs.assigned}</div>
                  <div className="text-label-sm text-on-surface-variant">Assigned</div>
                </div>
                <div className="text-center p-2 rounded bg-surface-container">
                  <div className="text-headline-md text-[#2ED573] font-bold">{cs.resolved}</div>
                  <div className="text-label-sm text-on-surface-variant">Resolved</div>
                </div>
                <div className="text-center p-2 rounded bg-surface-container">
                  <div className="text-headline-md text-[#FFC048] font-bold">{cs.pending}</div>
                  <div className="text-label-sm text-on-surface-variant">Pending</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3 text-body-sm">
                <span className="text-on-surface-variant">Avg Response Time</span>
                <span className="text-primary font-semibold">{cs.avgResponse}</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-on-surface-variant">Resolution Rate</span>
                  <span className="text-primary font-bold">{cs.resolutionRate}%</span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-cyan to-[#2ED573] rounded-full"
                    style={{ width: `${cs.resolutionRate}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CSAgentsPage;