import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";

const ReportsPage = () => {
  const reports = [
    {
      name: "Laporan Bulanan Complaints",
      desc: "Ringkasan keluhan bulanan dengan breakdown produk & severity",
      icon: "description",
      format: "PDF",
      size: "2.4 MB",
      date: "24 Okt 2024",
    },
    {
      name: "Analytics Product Report",
      desc: "Analisis mendalam per SKU dengan tren 7/14/30 hari",
      icon: "analytics",
      format: "XLSX",
      size: "1.8 MB",
      date: "23 Okt 2024",
    },
    {
      name: "CS Performance Audit",
      desc: "Laporan performa tim CS dengan SLA compliance & CSAT",
      icon: "support_agent",
      format: "PDF",
      size: "1.2 MB",
      date: "22 Okt 2024",
    },
    {
      name: "AI Insights Summary",
      desc: "Ringkasan pola keluhan & rekomendasi AI",
      icon: "psychology",
      format: "PDF",
      size: "890 KB",
      date: "21 Okt 2024",
    },
  ];

  return (
    <DashboardLayout
      role="admin"
      topbarProps={{
        title: "Reports",
        subtitle: "Laporan dan export data customer service",
      }}
    >
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-headline-lg text-primary font-bold tracking-tight">
              Reports & Analytics
            </h1>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Download laporan periodik dan export data custom
            </p>
          </div>
          <Button variant="primary" size="sm" icon="add">
            Generate Custom Report
          </Button>
        </div>

        {/* Quick Export */}
        <Card tier="base" className="p-6">
          <h3 className="text-headline-sm text-primary font-semibold mb-4">
            Quick Export
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: "Export All Tickets (CSV)", icon: "table_view" },
              { label: "Export Analytics (XLSX)", icon: "analytics" },
              { label: "Export AI Insights (PDF)", icon: "psychology" },
            ].map((item, idx) => (
              <button
                key={idx}
                className="p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <span className="text-body-sm text-on-surface font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Reports List */}
        <Card tier="base" className="overflow-hidden">
          <div className="p-5 bg-surface-container-high/40 flex items-center justify-between">
            <h3 className="text-headline-sm text-primary font-semibold">
              Available Reports
            </h3>
            <span className="text-label-sm text-on-surface-variant">
              {reports.length} laporan tersedia
            </span>
          </div>

          <div className="divide-y divide-outline-variant/20">
            {reports.map((r, idx) => (
              <div
                key={idx}
                className="p-4 flex items-center justify-between hover:bg-surface-container-high/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-brand-cyan">
                    <span className="material-symbols-outlined text-[24px]">{r.icon}</span>
                  </div>
                  <div>
                    <div className="text-headline-sm text-primary font-semibold">
                      {r.name}
                    </div>
                    <div className="text-body-sm text-on-surface-variant mt-0.5">
                      {r.desc}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-label-sm text-on-surface-variant">
                      <StatusBadge type="processing" label={r.format} />
                      <span>{r.size}</span>
                      <span>•</span>
                      <span>{r.date}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-surface-container hover:bg-brand-cyan hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;