import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import { aiInsights, tickets } from "../data/mockData";

const AIInsightsPage = () => {
  const navigate = useNavigate();
  const insight = aiInsights[0]; // Fokus pada insight #01
  const [activeConsideration, setActiveConsideration] = useState(0);

  const pipelineSteps = [
    { num: "01", label: "Data Source", value: "128 Tiket Terverifikasi" },
    { num: "02", label: "Pattern Detected", value: "Frekuensi Iritasi (High)" },
    { num: "03", label: "Evidence Basis", value: "35.9% Tiket (46 Kasus)" },
    { num: "04", label: "AI Interpretation", value: "NLP Klasifikasi Multi-dim" },
    { num: "05", label: "Human Decision", value: "Tinjauan Admin CS", active: true },
  ];

  const summaryInsights = [
    {
      num: "01",
      label: "Frekuensi Keluhan",
      value: "35.8%",
      description: "Keluhan terkait iritasi formula menjadi kategori dengan volume tertinggi.",
      status: "INVESTIGASI AKTIF",
      focused: true,
    },
    {
      num: "02",
      label: "Onset Penggunaan",
      value: "3-5 hari",
      description: "Produk dengan keluhan tertinggi adalah Ceramide Barrier Moisturizer, mayoritas terjadi pada hari ke 3-5 pemakaian baru.",
      status: "TERKORELASI",
    },
    {
      num: "03",
      label: "Distribusi Keparahan",
      value: "58%",
      description: "Sebagian besar tiket berada pada kategori Moderate (69.6%), diselesaikan melalui panduan jeda dan buffering pelembap.",
      status: "TERPANTAU",
    },
  ];

  const sentimentData = {
    concerned: { count: 27, percentage: 58.7 },
    neutral: { count: 11, percentage: 23.9 },
    angry: { count: 6, percentage: 13.0 },
    positive: { count: 2, percentage: 4.4 },
  };

  return (
    <DashboardLayout
      role="admin"
      topbarProps={{
        title: "AI Insights",
        subtitle: "Temuan pola keluhan berbasis AI untuk keputusan operasional",
      }}
    >
      <div className="p-6 space-y-6">
        {/* ===== PAGE HEADER ===== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1 text-label-sm text-outline">
              <span>Dashboard</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary-fixed">AI Insights Detail</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-on-surface">Insight #01</span>
            </nav>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-display-lg text-primary font-bold tracking-tight">
                AI Complaint Insights
              </h1>
              <StatusBadge type="aiReady" label="Lumière Neural v2.4" pulse />
            </div>
            <p className="text-body-md text-on-surface-variant max-w-3xl">
              Temuan pola keluhan berbasis data tiket komprehensif dan analisis AI real-time untuk mendukung keputusan operasional dermatologi & layanan pelanggan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg text-label-md text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-brand-cyan">
                calendar_month
              </span>
              <span>7 Hari Terakhir</span>
            </div>
            <Button variant="secondary" size="sm" icon="tune">
              Semua Produk
            </Button>
            <Button variant="secondary" size="sm" icon="file_download">
              Export Insight
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon="arrow_back"
              onClick={() => navigate("/admin/analytics")}
            >
              Kembali ke Analytics
            </Button>
          </div>
        </div>

        {/* ===== PIPELINE STEPPER ===== */}
        <Card tier="base" className="p-4 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[860px] gap-2">
            {pipelineSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-code-sm font-semibold shrink-0 ${
                      step.active
                        ? "bg-brand-cyan text-on-primary-container shadow-cyan-glow"
                        : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {step.num}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-label-sm uppercase tracking-wider text-outline">
                      {step.label}
                    </span>
                    <span
                      className={`text-headline-sm ${
                        step.active
                          ? "text-brand-cyan font-semibold"
                          : "text-on-surface"
                      }`}
                    >
                      {step.value}
                    </span>
                  </div>
                </div>
                {idx < pipelineSteps.length - 1 && (
                  <span className="material-symbols-outlined text-outline-variant text-[18px] shrink-0">
                    trending_flat
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* ===== SECTION 1: AI SUMMARY BANNER + 3 INSIGHT CARDS ===== */}
        <Card tier="base" className="p-6 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-headline-sm text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-cyan text-[20px]">
                    auto_awesome
                  </span>
                  AI Summary Overview
                </span>
                <StatusBadge type="aiAnalyzed" label="Human Review Recommended" />
              </div>
              <h2 className="text-headline-lg text-primary tracking-tight">
                3 pola utama terdeteksi dari 128 tiket pada periode 18-24 Okt 2024
              </h2>
              <p className="text-body-md text-on-surface-variant max-w-4xl">
                Sistem analitik AI mengidentifikasi korelasi antara keluhan pengguna, produk terkait, dan tingkat keparahan untuk membantu perumusan tindakan preventif tanpa membuat kesimpulan medis mandiri.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-surface-container p-4 rounded-xl shrink-0">
              <div className="flex flex-col">
                <span className="text-label-sm text-outline uppercase">
                  Algoritma Analisis
                </span>
                <span className="text-headline-sm text-primary">
                  Transformer NLP ID
                </span>
              </div>
              <div className="h-8 w-px bg-surface-variant"></div>
              <div className="flex flex-col">
                <span className="text-label-sm text-outline uppercase">
                  Akurasi Validasi
                </span>
                <span className="text-headline-sm text-brand-cyan">
                  99.4% F1-Score
                </span>
              </div>
            </div>
          </div>

          {/* 3 Compact Insight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 relative z-10">
            {summaryInsights.map((item, idx) => (
              <div
                key={idx}
                className={`relative bg-surface-container p-4 rounded-xl flex flex-col justify-between gap-3 ${
                  item.focused
                    ? "shadow-md"
                    : "bg-surface-container-high"
                }`}
              >
                {item.focused && (
                  <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-brand-cyan rounded-r-full"></div>
                )}
                <div className={`flex flex-col gap-2 ${item.focused ? "pl-2" : ""}`}>
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="text-label-sm text-brand-cyan uppercase">
                      {item.num} — {item.label}
                    </span>
                    <span
                      className={`text-code-sm px-2 py-0.5 rounded ${
                        item.focused
                          ? "bg-brand-cyan/10 text-brand-cyan"
                          : "bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="text-headline-md text-brand-cyan font-bold">
                    {item.value}
                  </div>
                  <p className="text-headline-sm text-primary">{item.description}</p>
                </div>
                {item.focused && (
                  <div className="flex items-center justify-between pt-2 pl-2 text-label-sm text-on-surface-variant">
                    <span>Porsi: 35.9% Tiket</span>
                    <span className="text-brand-cyan flex items-center gap-1">
                      Fokus Telaah
                      <span className="material-symbols-outlined text-[14px]">
                        south
                      </span>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* ===== SECTION 2: FEATURED INSIGHT HERO ===== */}
        <Card tier="base" className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded text-label-sm uppercase tracking-wider font-semibold">
                  DATA PATTERN • HIGHEST VOLUME
                </span>
                <span className="text-outline text-label-sm">
                  Kategori: Iritasi Kulit / Redness
                </span>
              </div>
              <h3 className="text-headline-lg text-primary tracking-tight">
                Insight #01 — Pola Keluhan Iritasi & Sensasi Terbakar
              </h3>
            </div>

            <div className="flex items-center gap-5 bg-surface-container px-5 py-3 rounded-xl">
              <div className="flex flex-col text-right">
                <span className="text-display-lg text-brand-cyan font-bold leading-none">
                  {insight.ticketCount}
                </span>
                <span className="text-label-sm text-on-surface-variant">
                  Tiket Terkait
                </span>
              </div>
              <div className="h-10 w-px bg-surface-variant"></div>
              <div className="flex flex-col">
                <span className="text-display-lg text-primary font-bold leading-none">
                  {insight.percentage}%
                </span>
                <span className="text-label-sm text-on-surface-variant">
                  Dari Total Keluhan
                </span>
              </div>
            </div>
          </div>

          {/* Proportion Bar */}
          <div className="flex flex-col gap-2 mb-5">
            <div className="flex justify-between text-label-sm text-on-surface-variant">
              <span>Proporsi Volume Keluhan Iritasi Terhadap Total Tiket</span>
              <span className="text-brand-cyan font-semibold">
                46 dari 128 Tiket (35.9%)
              </span>
            </div>
            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
              <div className="h-full bg-brand-cyan rounded-full" style={{ width: "35.9%" }}></div>
              <div className="h-full bg-surface-variant" style={{ width: "64.1%" }}></div>
            </div>
            <div className="flex justify-between text-outline text-code-sm">
              <span>0 Tiket</span>
              <span>Ambang Batas Waspada Normal: 20%</span>
              <span>128 Tiket Total</span>
            </div>
          </div>

          {/* Evidence Grid */}
          <div className="flex flex-col gap-3">
            <span className="text-label-md text-outline uppercase tracking-wider">
              Bukti Data Teramati (Observed Evidence)
            </span>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: "Total Keluhan", value: "128", sub: "100% Volume", color: "text-primary" },
                { label: "Terkait Iritasi", value: "46", sub: "Lonjakan +14%", color: "text-brand-cyan" },
                { label: "Persentase", value: "35.9%", sub: "Klaster Utama", color: "text-primary" },
                { label: "Rata-rata Severity", value: "Moderate", sub: "69.6% level 2", color: "text-[#FFC048]" },
                { label: "Produk Terdampak", value: "Ceramide", sub: "Barrier Moist.", color: "text-brand-cyan" },
              ].map((item, idx) => (
                <div key={idx} className="bg-surface-container p-3 rounded-xl flex flex-col gap-1">
                  <span className="text-label-sm text-outline">{item.label}</span>
                  <span className={`text-headline-md ${item.color} font-bold truncate`}>
                    {item.value}
                  </span>
                  <span className="text-label-sm text-outline">{item.sub}</span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-surface-container/60 flex items-center gap-2 text-outline text-body-sm">
              <span className="material-symbols-outlined text-[16px] text-brand-cyan">
                verified_user
              </span>
              <span>
                <strong>Observasi faktual non-diagnostik:</strong> Data diekstrak otomatis dari deskripsi percakapan pelanggan dan verifikasi non-medis tim Customer Care Lumière Skin.
              </span>
            </div>
          </div>
        </Card>

        {/* ===== SECTION 3 & 4: PRODUCTS + SENTIMENT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Product Comparison */}
          <Card tier="base" className="lg:col-span-7 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-headline-md text-primary font-semibold">
                  Produk Terkait dengan Pola Iritasi
                </h4>
                <p className="text-body-sm text-on-surface-variant">
                  Distribusi 46 tiket keluhan iritasi berdasarkan lini formula produk
                </p>
              </div>
              <span className="material-symbols-outlined text-outline text-[20px]">
                inventory_2
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {insight.relatedProducts.map((product, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    idx === 0 ? "bg-surface-container shadow-sm" : "bg-surface-container-high"
                  } flex flex-col gap-2`}
                >
                  <div className="flex justify-between items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-headline-sm text-primary truncate">
                        {product.name}
                      </span>
                      {idx === 0 && (
                        <span className="bg-brand-cyan/20 text-brand-cyan text-code-sm px-1.5 py-0.5 rounded shrink-0">
                          ZAT AKTIF UTAMA
                        </span>
                      )}
                    </div>
                    <span className="text-headline-sm text-brand-cyan font-semibold shrink-0">
                      {product.count} Tiket ({product.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        idx === 0 ? "bg-brand-cyan" : idx === 1 ? "bg-primary-fixed-dim" : "bg-secondary-fixed-dim"
                      }`}
                      style={{ width: `${product.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 mt-4 bg-surface-container rounded-lg text-body-sm flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-brand-cyan mt-0.5">
                insights
              </span>
              <span className="text-on-surface-variant">
                Korelasi Signifikan: <strong className="text-primary">86.9%</strong> total keluhan iritasi terkonsentrasi pada produk dengan zat aktif eksfoliasi atau retinoid.
              </span>
            </div>
          </Card>

          {/* Sentiment & Severity */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Sentiment Card */}
            <Card tier="base" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-headline-sm text-primary font-semibold">
                    Sentimen Tiket
                  </h4>
                  <span className="text-body-sm text-on-surface-variant">
                    NLP Emosional Percakapan Pelanggan
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline text-[20px]">
                  sentiment_very_dissatisfied
                </span>
              </div>

              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex mb-4">
                <div className="h-full bg-[#FFC048]" style={{ width: `${sentimentData.concerned.percentage}%` }}></div>
                <div className="h-full bg-surface-variant" style={{ width: `${sentimentData.neutral.percentage}%` }}></div>
                <div className="h-full bg-[#FF4D4D]" style={{ width: `${sentimentData.angry.percentage}%` }}></div>
                <div className="h-full bg-[#2ED573]" style={{ width: `${sentimentData.positive.percentage}%` }}></div>
              </div>

              <div className="flex flex-col gap-2 text-body-sm">
                {[
                  { color: "bg-[#FFC048]", label: "Concerned (Cemas)", count: sentimentData.concerned, textColor: "text-primary" },
                  { color: "bg-surface-variant", label: "Neutral (Informatif)", count: sentimentData.neutral, textColor: "text-on-surface" },
                  { color: "bg-[#FF4D4D]", label: "Angry (Frustrasi)", count: sentimentData.angry, textColor: "text-[#FF4D4D]" },
                  { color: "bg-[#2ED573]", label: "Positive (Apresiasi)", count: sentimentData.positive, textColor: "text-[#2ED573]" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                      <span className="text-on-surface">{item.label}</span>
                    </div>
                    <span className={`${item.textColor} font-semibold`}>
                      {item.count.count} tiket ({item.count.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Interpretation Card */}
            <Card tier="base" className="p-6" glow>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-cyan text-[22px]">
                    psychology
                  </span>
                  <h4 className="text-headline-md text-primary font-semibold">
                    Sintesis AI Interpretation
                  </h4>
                </div>
                <StatusBadge type="aiReady" label="Autonomous" />
              </div>

              <div className="p-4 rounded-lg bg-surface-container flex flex-col gap-3 text-body-md">
                <p className="text-on-surface leading-relaxed">
                  Model mengidentifikasi pola kemunculan keluhan berdasarkan analisis silang kategori tiket, spesifikasi produk, tingkat severity, dan nada emosi percakapan pada 7 hari terakhir.
                </p>
                <p className="text-on-surface-variant leading-relaxed">
                  Lonjakan keluhan iritasi terpusat secara signifikan pada <strong className="text-brand-cyan">3-5 hari</strong> pasca penggunaan awal formula produk. Pengguna umumnya melewatkan anjuran jeda dan mengaplikasikan produk pada kulit yang masih lembap.
                </p>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-surface-container-high flex flex-col gap-2">
                <span className="text-label-md text-brand-cyan uppercase tracking-wider">
                  Confidence & Evidence Coverage
                </span>
                <div className="flex flex-col gap-1.5 text-body-sm">
                  {[
                    { label: "Evidence Coverage:", value: "46 Tiket (100% Verified)" },
                    { label: "Metode Analisis:", value: "NLP + Batch Correlation" },
                    { label: "Batasan Lingkup:", value: "Decision Support Only" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1">
                      <span className="text-outline">{item.label}</span>
                      <span className="text-primary font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 flex items-center gap-2 text-outline text-label-sm border-t border-outline-variant/30">
                  <span className="material-symbols-outlined text-[14px] text-brand-cyan">
                    verified
                  </span>
                  <span>
                    Validasi akhir dan keputusan penanganan tetap dilakukan oleh manusia (Admin CS).
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ===== SECTION 5: OPERATIONAL CONSIDERATIONS ===== */}
        <Card tier="base" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-headline-md text-primary font-semibold">
                Pertimbangan Operasional
              </h4>
              <p className="text-body-sm text-on-surface-variant">
                Langkah tindak lanjut yang disarankan untuk tim layanan & formulasi
              </p>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">checklist</span>
          </div>

          <div className="flex flex-col gap-3">
            {insight.considerations.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg ${
                  activeConsideration === idx
                    ? "bg-surface-container-high border border-brand-cyan/30"
                    : "bg-surface-container hover:bg-surface-container-high"
                } transition-all cursor-pointer`}
                onClick={() => setActiveConsideration(idx)}
              >
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span className="text-headline-sm text-brand-cyan flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-cyan text-[18px]">
                      {item.type === "CS Action"
                        ? "support_agent"
                        : item.type === "Product"
                        ? "biotech"
                        : "menu_book"}
                    </span>
                    {item.title}
                  </span>
                  <span className="bg-brand-cyan/15 text-brand-cyan text-label-sm px-2 py-0.5 rounded uppercase">
                    {item.type}
                  </span>
                </div>
                <p className="text-body-sm text-on-surface-variant mb-3">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-code-sm text-outline">Target: {item.target}</span>
                  <button className="text-brand-cyan hover:text-primary-fixed text-label-md flex items-center gap-0.5">
                    Terapkan
                    <span className="material-symbols-outlined text-[14px]">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 mt-4 bg-surface-container rounded-lg text-outline text-label-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">info</span>
            <span>
              Pertimbangan di atas merupakan panduan manajemen layanan pelanggan, bukan protokol pengobatan klinis.
            </span>
          </div>
        </Card>

        {/* ===== SECTION 6: RELATED TICKETS TABLE ===== */}
        <Card tier="base" className="overflow-hidden">
          <div className="p-5 bg-surface-container-high/40 flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-headline-lg text-primary tracking-tight">
                  Related Tickets
                </h3>
                <span className="bg-brand-cyan/20 text-primary-fixed text-code-sm px-3 py-0.5 rounded-full">
                  46 Tiket Teridentifikasi
                </span>
              </div>
              <p className="text-body-sm text-on-surface-variant mt-1">
                Sampel tiket pelanggan aktual yang membentuk klaster pola iritasi
              </p>
            </div>
            <Button variant="secondary" size="sm" icon="open_in_new">
              Lihat Semua 46 Tiket
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead className="bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Ticket ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Produk</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {tickets.slice(0, 5).map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="px-4 py-3 text-code-sm text-brand-cyan font-semibold">
                      {ticket.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">{ticket.customer}</span>
                        <StatusBadge type="gold" label={ticket.customerTier} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant">{ticket.product}</td>
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
                        onClick={() => navigate(`/cs/tickets/${ticket.id.replace("#", "")}`)}
                        className="text-brand-cyan hover:text-primary-fixed text-label-md inline-flex items-center gap-0.5"
                      >
                        Tinjau
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
        </Card>

        {/* ===== BOTTOM COMPLIANCE FOOTER ===== */}
        <Card tier="base" className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-outline text-body-sm max-w-2xl">
            <span className="material-symbols-outlined text-brand-cyan text-[18px] shrink-0">
              info
            </span>
            <span>
              <strong>Catatan Kepatuhan Regulasi:</strong> AI Insights diproses berkala setiap 6 jam berdasarkan agregasi data tiket masuk. Sistem dirancang untuk mendukung operasional layanan dan perbaikan SOP, <em>bukan</em> sebagai pengganti audit dermatologis klinis.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="secondary" size="sm">
              Export PDF / CSV
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon="arrow_back"
              onClick={() => navigate("/admin/analytics")}
            >
              Kembali ke Analytics
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIInsightsPage;