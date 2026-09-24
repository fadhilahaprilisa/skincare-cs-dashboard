import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import LineChartCard from "../components/domain/LineChartCard";
import DonutChartCard from "../components/domain/DonutChartCard";
import BarChartCard from "../components/domain/BarChartCard";
import { analyticsData, kpiAdmin } from "../data/mockData";

const AdminAnalyticsPage = () => {
  // Prepare data untuk donut charts
  const severityDonut = [
    { name: "Urgent (Reaksi Kritis)", value: analyticsData.severityDistribution.urgent.percentage, count: analyticsData.severityDistribution.urgent.count },
    { name: "Moderate (Ketidakcocokan)", value: analyticsData.severityDistribution.moderate.percentage, count: analyticsData.severityDistribution.moderate.count },
    { name: "Low (Kemasan/Pertanyaan)", value: analyticsData.severityDistribution.low.percentage, count: analyticsData.severityDistribution.low.count },
  ];

  const sentimentDonut = [
    { name: "Concerned (Cemas)", value: analyticsData.sentimentDistribution.concerned.percentage, count: analyticsData.sentimentDistribution.concerned.count },
    { name: "Neutral (Informatif)", value: analyticsData.sentimentDistribution.neutral.percentage, count: analyticsData.sentimentDistribution.neutral.count },
    { name: "Angry (Frustrasi)", value: analyticsData.sentimentDistribution.angry.percentage, count: analyticsData.sentimentDistribution.angry.count },
    { name: "Positive (Apresiasi)", value: analyticsData.sentimentDistribution.positive.percentage, count: analyticsData.sentimentDistribution.positive.count },
  ];

  return (
    <DashboardLayout
      role="admin"
      topbarProps={{
        title: "Complaint Analytics",
        subtitle: "Analisis pola keluhan, produk, sentiment, dan performa CS dalam ekosistem Lumière.",
      }}
    >
      <div className="p-6 space-y-6">
        {/* ===== PAGE HEADER ===== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1 text-label-sm uppercase tracking-wider text-on-surface-variant">
              <span>Dashboard</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-brand-cyan">Analytics</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary">Complaint Intelligence</span>
            </nav>
            <h1 className="text-display-lg text-primary font-bold tracking-tight">
              Complaint Analytics
            </h1>
            <p className="text-body-md text-on-surface-variant">
              Analisis pola keluhan, produk, sentiment, dan performa customer service dalam ekosistem Lumière.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg text-on-surface text-label-md">
              <span className="material-symbols-outlined text-[16px] text-brand-cyan">
                calendar_today
              </span>
              <span>7 Hari Terakhir</span>
              <span className="material-symbols-outlined text-[14px] text-outline">
                expand_more
              </span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg text-on-surface text-label-md">
              <span className="text-on-surface-variant">Produk:</span>
              <span className="font-semibold">Semua Produk</span>
              <span className="material-symbols-outlined text-[14px] text-outline">
                expand_more
              </span>
            </div>
            <Button variant="primary" size="md" icon="download">
              Export Report
            </Button>
          </div>
        </div>

        {/* ===== 4 KPI CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card tier="base" className="p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-label-md uppercase tracking-wider text-on-surface-variant">
                Total Complaints
              </span>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-brand-cyan">
                <span className="material-symbols-outlined text-[20px]">assignment_late</span>
              </div>
            </div>
            <div className="text-display-lg text-primary font-bold">128</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-[#FF4D4D]/15 text-[#FF4D4D] text-label-sm">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                +14%
              </span>
              <span className="text-body-sm text-on-surface-variant">vs pekan lalu</span>
            </div>
          </Card>

          <Card tier="base" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-label-md uppercase tracking-wider text-on-surface-variant">
                Avg Resolution Time
              </span>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-brand-cyan">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
              </div>
            </div>
            <div className="text-display-lg text-primary font-bold">
              4.5 <span className="text-headline-md text-on-surface-variant font-normal">jam</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan text-label-sm">
                <span className="material-symbols-outlined text-[12px]">trending_down</span>
                -1.2 jam
              </span>
              <span className="text-body-sm text-on-surface-variant">efisiensi respon</span>
            </div>
          </Card>

          <Card tier="base" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-label-md uppercase tracking-wider text-on-surface-variant">
                Resolution Rate
              </span>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-brand-cyan">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
            </div>
            <div className="text-display-lg text-primary font-bold">75.0%</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-body-sm text-on-surface">96 dari 128 tiket</span>
              <span className="text-body-sm text-on-surface-variant">terselesaikan</span>
            </div>
          </Card>

          <Card tier="base" className="p-5 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#FF4D4D]/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-label-md uppercase tracking-wider text-[#FF4D4D]">
                Urgent Complaints
              </span>
              <div className="w-10 h-10 rounded-lg bg-[#FF4D4D]/15 flex items-center justify-center text-[#FF4D4D]">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
            </div>
            <div className="text-display-lg text-[#FF4D4D] font-bold">11</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#FF4D4D]/15 text-[#FF4D4D] text-label-sm font-semibold">
                8.6% Total Tiket
              </span>
              <span className="text-body-sm text-on-surface-variant">prioritas triase</span>
            </div>
          </Card>
        </div>

        {/* ===== SECTION 2: COMPLAINT TREND LINE CHART ===== */}
        <Card tier="base" className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-headline-md text-primary font-semibold">
                  Tren Keluhan (Complaint Volume)
                </h2>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-code-sm">
                  REALTIME SYNC
                </span>
              </div>
              <p className="text-body-sm text-on-surface-variant mt-1">
                Dinamika volume keluhan harian, penyelesaian tiket, dan backlog menunggu penanganan.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded bg-brand-cyan text-on-primary-container text-label-sm font-semibold">
                Harian
              </button>
              <button className="px-3 py-1 rounded text-on-surface-variant hover:text-on-surface text-label-sm transition-colors">
                Mingguan
              </button>
            </div>
          </div>

          <LineChartCard
            data={analyticsData.complaintTrend}
            title=""
            height={320}
          />

          {/* Observation Banner */}
          <div className="flex items-start gap-3 p-4 mt-4 bg-surface-container rounded-lg">
            <span className="material-symbols-outlined text-brand-cyan text-[20px] shrink-0 mt-0.5">
              info
            </span>
            <div className="text-body-sm text-on-surface">
              <strong className="text-brand-cyan">Catatan Analitis Faktual:</strong> Volume keluhan meningkat signifikan pada hari Kamis (21 Okt, 26 tiket), bertepatan dengan 72 jam pasca peluncuran batch promosi Retinol 0.5% Serum. Respon tim CS berhasil memulihkan SLA kembali normal dalam 24 jam.
            </div>
          </div>
        </Card>

        {/* ===== SECTION 3 & 4: PRODUCTS + SEVERITY ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bar Chart: Product Complaints */}
          <Card tier="base" className="lg:col-span-7 p-6">
            <BarChartCard
              data={analyticsData.productComplaints}
              title="Keluhan Berdasarkan Produk"
              subtitle="Distribusi aduan per SKU skincare aktif"
              nameKey="product"
              dataKey="count"
              height={300}
            />
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-outline-variant/30">
              <span className="text-body-sm text-on-surface-variant">
                Akumulasi 5 SKU Utama: 128 Tiket
              </span>
              <button className="text-brand-cyan hover:text-primary-fixed text-label-sm font-semibold flex items-center gap-1">
                Detail Analisis Formula
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </Card>

          {/* Donut Chart: Severity */}
          <Card tier="base" className="lg:col-span-5 p-6">
            <DonutChartCard
              data={severityDonut}
              title="Tingkat Keparahan (Severity)"
              subtitle="Klasifikasi triase klinis & operasional"
              centerValue="128"
              centerLabel="Total"
            />
            <div className="p-3 mt-4 bg-surface-container rounded-lg flex items-center justify-between text-label-sm">
              <span className="text-on-surface-variant">Target SLA Urgent: &lt; 30 Menit</span>
              <span className="text-brand-cyan font-semibold">
                Tercapai 100% (Rata-rata 18m)
              </span>
            </div>
          </Card>
        </div>

        {/* ===== SECTION 5 & 6: SENTIMENT + CATEGORY ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sentiment Donut */}
          <Card tier="base" className="lg:col-span-6 p-6">
            <DonutChartCard
              data={sentimentDonut}
              title="Customer Sentiment NLP"
              subtitle="Analisis emosional percakapan tiket komplain"
              centerValue="128"
              centerLabel="Adopsi"
            />
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="p-3 rounded-lg bg-surface-container">
                <span className="text-label-sm text-on-surface-variant uppercase">
                  CSAT Index
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-headline-lg text-brand-cyan font-bold">4.82</span>
                  <span className="text-body-sm text-on-surface-variant">/ 5.00</span>
                </div>
                <div className="flex items-center gap-1 text-brand-cyan mt-1">
                  {[1, 2, 3, 4].map((i) => (
                    <span key={i} className="material-symbols-outlined text-[12px]">
                      star
                    </span>
                  ))}
                  <span className="material-symbols-outlined text-[12px]">star_half</span>
                  <span className="text-label-sm text-on-surface-variant ml-1">
                    (96 ulasan)
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-container flex flex-col justify-between">
                <span className="text-label-sm text-on-surface-variant uppercase">
                  SLA Performance
                </span>
                <span className="text-headline-sm text-[#2ED573] font-bold mt-1">
                  +6.8%
                </span>
                <span className="text-label-sm text-on-surface-variant">
                  Resolusi emosi membaik
                </span>
              </div>
            </div>
          </Card>

          {/* Category Breakdown */}
          <Card tier="base" className="lg:col-span-6 p-6">
            <h3 className="text-headline-sm text-primary font-semibold">
              Kategori Keluhan
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-4">
              Segmentasi isu permasalahan yang dilaporkan pelanggan
            </p>
            <div className="flex flex-col gap-2">
              {analyticsData.categoryDistribution.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-container"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                      <span className="material-symbols-outlined text-[16px]">
                        {idx === 0
                          ? "dermatology"
                          : idx === 1
                          ? "coronavirus"
                          : idx === 2
                          ? "science"
                          : idx === 3
                          ? "sanitizer"
                          : "local_shipping"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-body-md text-on-surface font-medium">
                        {cat.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-headline-sm text-primary font-bold block">
                      {cat.count}
                    </span>
                    <span className="text-body-sm text-on-surface-variant">
                      {cat.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ===== SECTION 7: CS PERFORMANCE TABLE ===== */}
        <Card tier="base" className="overflow-hidden">
          <div className="p-5 bg-surface-container-high/40 flex items-center justify-between">
            <div>
              <h3 className="text-headline-sm text-primary font-semibold">
                Performa Customer Service
              </h3>
              <p className="text-body-sm text-on-surface-variant mt-0.5">
                Monitoring beban kerja dan efisiensi penanganan tiket tim agen
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-label-sm text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-brand-cyan"></span>
              4 Agen On-Duty
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead className="bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">CS Agent</th>
                  <th className="px-4 py-3">Assigned</th>
                  <th className="px-4 py-3">Resolved</th>
                  <th className="px-4 py-3">Pending</th>
                  <th className="px-4 py-3">Avg Response</th>
                  <th className="px-4 py-3">Resolution Rate</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {analyticsData.csPerformance.map((cs, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-surface-container-high/40 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-surface-container-highest text-brand-cyan text-label-md font-bold flex items-center justify-center">
                          {cs.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-primary font-semibold">{cs.name}</div>
                          <div className="text-label-sm text-on-surface-variant">
                            {cs.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-primary font-semibold">
                      {cs.assigned} tiket
                    </td>
                    <td className="px-4 py-3 text-[#2ED573]">
                      {cs.resolved} selesai
                    </td>
                    <td className="px-4 py-3 text-[#FFC048]">
                      {cs.pending} pending
                    </td>
                    <td className="px-4 py-3 text-code-sm text-on-surface">
                      {cs.avgResponse}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-semibold">
                          {cs.resolutionRate}%
                        </span>
                        <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-cyan rounded-full"
                            style={{ width: `${cs.resolutionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        type={
                          cs.status === "Active Online"
                            ? "resolved"
                            : "pending"
                        }
                        label={cs.status}
                        pulse={cs.status === "Active Online"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ===== SECTION 8: AI-DETECTED PATTERNS ===== */}
        <Card tier="base" className="p-6 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-headline-md text-primary font-semibold">
                  AI-Detected Complaint Patterns
                </h3>
                <StatusBadge type="aiReady" label="Lumière Neural v2.4" pulse />
              </div>
              <p className="text-body-sm text-on-surface-variant mt-1">
                Ringkasan pola berbasis data faktual dari 128 keluhan periode berjalan.
              </p>
            </div>
            <Button variant="secondary" size="sm" icon="arrow_forward">
              Lihat AI Insights Mendalam
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 relative z-10">
            {[
              {
                icon: "bubble_chart",
                label: "Pola Frekuensi Gejala",
                text: "Keluhan terkait iritasi merupakan kategori dengan frekuensi tertinggi (46 tiket / 35.9%).",
              },
              {
                icon: "timer",
                label: "Onset Penggunaan Retinol",
                text: "Produk dengan keluhan tertinggi adalah Retinol 0.5% Serum (48 tiket), mayoritas terjadi pada hari ke 3-5 pemakaian baru.",
              },
              {
                icon: "tune",
                label: "Distribusi Keparahan",
                text: "Sebagian besar tiket berada pada kategori Moderate (60.9%), diselesaikan melalui panduan jeda dan buffering pelembap.",
              },
              {
                icon: "bolt",
                label: "Disparitas Resolusi Kemasan",
                text: "Waktu resolusi tiket kategori Kemasan & Segel lebih cepat (rata-rata 2.1 jam) dengan pengiriman botol pengganti langsung.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-surface-container flex items-start gap-3 hover:bg-surface-container-high transition-colors"
              >
                <div className="w-8 h-8 rounded bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">
                    {item.icon}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-label-sm text-brand-cyan uppercase tracking-wider mb-0.5">
                    {item.label}
                  </span>
                  <p className="text-body-md text-on-surface">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalyticsPage;