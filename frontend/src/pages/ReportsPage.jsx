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

  // ===== HANDLER DOWNLOAD & GENERATE =====
  const handleDownload = (reportName) => {
    alert(`Download ${reportName} dimulai...`);
    // Simulasi download
    const blob = new Blob(
      [`Report: ${reportName}\nGenerated at: ${new Date().toISOString()}`],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${reportName.replace(/\s+/g, "_").toLowerCase()}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout
      role="admin"
      topbarProps={{
        title: "Reports & Analytics",
        subtitle: "Laporan periodik dan export data customer service",
      }}
    >
      <div className="p-6 space-y-6">
        {/* Quick Export */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
          <h3 className="text-base font-bold text-slate-900 tracking-tight mb-4">
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
                onClick={() => handleDownload(item.label)}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors flex items-center gap-3 text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <span className="text-xs font-semibold text-slate-800">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Available Reports
            </h3>
            <span className="text-xs text-slate-500">
              {reports.length} laporan tersedia
            </span>
          </div>

          <div className="divide-y divide-slate-100 bg-white">
            {reports.map((r, idx) => (
              <div
                key={idx}
                className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                    <span className="material-symbols-outlined text-[24px]">{r.icon}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      {r.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {r.desc}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px] uppercase">
                        {r.format}
                      </span>
                      <span>{r.size}</span>
                      <span>•</span>
                      <span>{r.date}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(r.name)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="Download"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;