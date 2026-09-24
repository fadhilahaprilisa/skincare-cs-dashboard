import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";
import Timeline from "../components/domain/Timeline";
import { tickets } from "../data/mockData";

const AIAnalysisPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const ticket = tickets.find((t) => t.id.replace("#", "") === ticketId) || tickets[0];
  const analysis = ticket.aiAnalysis;

  const [draftReply, setDraftReply] = useState(analysis?.suggestedResponse || "");
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", icon: "check_circle" });

  const showToast = (message, icon = "check_circle") => {
    setToast({ show: true, message, icon });
    setTimeout(() => setToast({ show: false, message: "", icon: "check_circle" }), 3000);
  };

  useEffect(() => {
    if (analysis?.suggestedResponse) {
      setDraftReply(analysis.suggestedResponse);
    }
  }, [analysis]);

  if (!analysis) {
    return (
      <DashboardLayout
        role="cs"
        topbarProps={{
          title: "AI Complaint Analysis",
          subtitle: "Analisis keluhan customer dengan bantuan AI",
        }}
      >
        <div className="p-6">
          <Card tier="base" className="p-12 text-center">
            <span className="material-symbols-outlined text-[#FFC048] text-[64px] mb-4">
              psychology_alt
            </span>
            <h2 className="text-headline-lg text-primary font-bold">
              Analisis AI Tidak Tersedia
            </h2>
            <p className="text-body-md text-on-surface-variant mt-2">
              Tiket ini tidak memiliki analisis AI (contoh: kategori Kemasan/Packaging tidak memerlukan triase AI).
            </p>
            <Button
              variant="primary"
              size="md"
              icon="arrow_back"
              className="mt-6"
              onClick={() => navigate("/cs/tickets")}
            >
              Kembali ke My Tickets
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const handleReanalyze = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      showToast("Analisis ulang selesai. Formula dan sensitivitas bahan tetap valid.", "auto_awesome");
    }, 1200);
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(draftReply).then(() => {
      showToast("Draf respons berhasil disalin ke clipboard!", "content_copy");
    });
  };

  const handleResetDraft = () => {
    setDraftReply(analysis.suggestedResponse);
    showToast("Draf dikembalikan ke rekomendasi AI awal.", "restart_alt");
  };

  const handleSendResponse = () => {
    showToast("Mengirim respons ke WhatsApp customer...", "hourglass_top");
    setTimeout(() => {
      showToast(`Respons terkirim! Tiket ${ticket.id} berstatus Selesai.`, "task_alt");
    }, 1500);
  };

  const timelineEvents = [
    {
      title: "Tiket Dibuat via WhatsApp",
      time: ticket.createdAt.split(", ")[1] || "10:14 WIB",
      description: "Pesan WhatsApp customer diterima dengan lampiran foto (Gateway #ORD-99214).",
    },
    {
      title: "AI Complaint Analysis Selesai",
      time: "10:15 WIB",
      description: "Deteksi gejala kemerahan ringan & korelasi batch formula selesai diproses (0.8 dtk).",
      highlight: true,
    },
    {
      title: "Draf Rekomendasi Respons Disusun",
      time: "10:16 WIB",
      description: "Sistem menyusun rekomendasi respons bernada empatis dengan panduan jeda pemakaian yang aman.",
      highlight: true,
    },
    {
      title: `Menunggu Persetujuan Agen CS (${ticket.assignedCS})`,
      time: "10:18 WIB (Aktif)",
      description: "Menunggu peninjauan draf, opsi edit, dan persetujuan pengiriman langsung ke customer.",
      active: true,
    },
  ];

  const considerations = [
    {
      type: "CS Action",
      title: "Customer Service Triage",
      badge: "SOP Update",
      badgeColor: "bg-brand-cyan/15 text-brand-cyan",
      description: "Perbarui draf respons cepat CS untuk keluhan iritasi: berikan panduan teknik moisturizer sandwich buffering dan anjurkan penghentian sementara zat aktif eksfoliasi selama 5 hari.",
      target: "Tim CS Shift Pagi & Malam",
      actionLabel: "Terapkan Draf SOP",
      icon: "support_agent",
    },
    {
      type: "Product",
      title: "Product & QA Monitoring",
      badge: "Batch Watchlist",
      badgeColor: "bg-[#FFC048]/15 text-[#FFC048]",
      description: `Pantau volume keluhan spesifik pada produk ${ticket.product} (Batch ${ticket.productBatch}). Koordinasikan dengan Quality Assurance lab untuk mengecek kadar stabilitas pH botol tersegel.`,
      target: "QA / Formulasi Lab R&D",
      actionLabel: "Buat Tag Batch",
      icon: "biotech",
    },
    {
      type: "Content",
      title: "Knowledge Base & FAQ",
      badge: "Content Enrichment",
      badgeColor: "bg-surface-container-high text-on-surface-variant",
      description: "Sisipkan konten visual edukatif 'Purging vs Iritasi: Kapan Harus Menjeda Pemakaian?' ke dalam portal bantuan dan sertakan kartu panduan interaktif otomatis di ruang obrolan WhatsApp & Marketplace.",
      target: "Portal Bantuan Pelanggan",
      actionLabel: "Buka Editor FAQ",
      icon: "menu_book",
    },
  ];

  const keyInsights = [
    {
      icon: "bubble_chart",
      title: "Pola Frekuensi Gejala",
      description: `Keluhan terkait ${ticket.category.toLowerCase()} menjadi salah satu kategori dengan volume tertinggi.`,
      badge: "35.9%",
    },
    {
      icon: "timer",
      title: "Onset Penggunaan",
      description: `Produk dengan keluhan tertinggi adalah ${ticket.product}, mayoritas terjadi pada hari ke 3-5 pemakaian baru.`,
      badge: "3-5 hari",
    },
    {
      icon: "tune",
      title: "Distribusi Keparahan",
      description: `Sebagian besar tiket berada pada kategori ${analysis.severityLevel} (69.6%), diselesaikan melalui panduan jeda dan buffering pelembap.`,
      badge: `${analysis.severityPercentage}%`,
    },
    {
      icon: "bolt",
      title: "Disparitas Resolusi Kemasan",
      description: "Waktu resolusi tiket kategori Kemasan & Segel lebih cepat (rata-rata 2.1 jam) dengan pengiriman botol pengganti langsung.",
      badge: "2.1 jam",
    },
  ];

  return (
    <DashboardLayout
      role="cs"
      topbarProps={{
        title: `AI Analysis ${ticket.id}`,
        subtitle: "Analisis keluhan customer dengan bantuan AI sebelum memberikan respons profesional non-medis.",
        showInputButton: false,
      }}
    >
      <div className="p-6 pb-28 space-y-6">
        {/* BREADCRUMB & HEADER */}
        <div className="flex flex-col gap-3">
          <nav className="flex items-center gap-2 text-label-md text-on-surface-variant flex-wrap">
            <button onClick={() => navigate("/cs/dashboard")} className="hover:text-brand-cyan transition-colors">
              Dashboard
            </button>
            <span className="material-symbols-outlined text-[14px] opacity-50">chevron_right</span>
            <button onClick={() => navigate("/cs/tickets")} className="hover:text-brand-cyan transition-colors">
              My Tickets
            </button>
            <span className="material-symbols-outlined text-[14px] opacity-50">chevron_right</span>
            <span className="text-primary-fixed-dim text-code-sm">{ticket.id}</span>
            <span className="material-symbols-outlined text-[14px] opacity-50">chevron_right</span>
            <span className="text-brand-cyan font-semibold">AI Analysis</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-headline-lg text-primary font-bold tracking-tight">
                  AI Complaint Analysis
                </h1>
                <StatusBadge type="processing" label={`SLA ${ticket.sla} remaining`} pulse />
              </div>
              <p className="text-body-md text-on-surface-variant max-w-3xl">
                Analisis keluhan customer dengan bantuan AI sebelum memberikan respons profesional non-medis.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="secondary"
                size="sm"
                icon="auto_awesome"
                onClick={handleReanalyze}
                disabled={isProcessing}
              >
                {isProcessing ? "Memindai..." : "Analisis Ulang"}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon="arrow_back"
                onClick={() => navigate(`/cs/tickets/${ticket.id.replace("#", "")}`)}
              >
                Kembali ke Detail
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon="send"
                onClick={handleSendResponse}
              >
                Kirim & Selesaikan
              </Button>
            </div>
          </div>
        </div>

        {/* HUMAN OVERSIGHT RIBBON */}
        <Card tier="base" className="p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-brand-cyan text-[22px]">verified_user</span>
          <div className="flex flex-col">
            <span className="text-label-md text-on-surface font-semibold">
              Validasi CS Mandatori
            </span>
            <span className="text-body-sm text-on-surface-variant">
              Keputusan respons akhir tetap berada pada kewenangan agen. AI hanya menyusun analisis pendukung.
            </span>
          </div>
        </Card>

        {/* PIPELINE STEPPER */}
        <Card tier="base" className="p-4 overflow-x-auto">
          <div className="flex items-center justify-between gap-3 min-w-[860px]">
            {[
              { num: "01", label: "Data Source", value: "128 Tiket Terverifikasi", active: false },
              { num: "02", label: "Pattern Detected", value: "Frekuensi Iritasi (High)", active: false },
              { num: "03", label: "Evidence Basis", value: "35.9% Tiket (46 Kasus)", active: true },
              { num: "04", label: "AI Interpretation", value: "NLP Klasifikasi Multi-dimensi", active: false },
              { num: "05", label: "Human Decision", value: "Tinjauan Admin CS", active: true },
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-3 flex-1">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-code-sm font-bold shrink-0 ${
                    step.active ? "bg-brand-cyan/20 text-brand-cyan" : "bg-surface-container-high text-on-surface"
                  }`}
                >
                  {step.num}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-label-sm text-outline uppercase tracking-wider">{step.label}</span>
                  <span className={`text-headline-sm truncate ${step.active ? "text-brand-cyan" : "text-on-surface"}`}>
                    {step.value}
                  </span>
                </div>
                {idx < 4 && (
                  <span className="material-symbols-outlined text-outline-variant text-[20px] shrink-0">
                    trending_flat
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* AI SUMMARY BANNER */}
        <Card tier="base" className="p-6 relative overflow-hidden" glow>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-headline-sm text-brand-cyan flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-cyan text-[20px]">auto_awesome</span>
                  AI Summary Overview
                </span>
                <StatusBadge type="aiAnalyzed" label="Human Review Recommended" />
              </div>
              <h2 className="text-headline-md text-primary">
                3 pola utama terdeteksi dari data tiket terkait
              </h2>
              <p className="text-body-sm text-on-surface-variant max-w-4xl">
                Sistem analitik AI mengidentifikasi korelasi antara keluhan pengguna, produk terkait, dan tingkat keparahan untuk membantu perumusan tindakan preventif tanpa membuat kesimpulan medis mandiri.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-surface-container p-4 rounded-xl shrink-0">
              <div className="flex flex-col">
                <span className="text-label-sm text-outline uppercase">Algoritma</span>
                <span className="text-headline-sm text-primary">Transformer NLP ID</span>
              </div>
              <div className="h-8 w-px bg-surface-variant"></div>
              <div className="flex flex-col">
                <span className="text-label-sm text-outline uppercase">Akurasi</span>
                <span className="text-headline-sm text-brand-cyan">99.4% F1-Score</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {keyInsights.slice(0, 3).map((insight, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl flex flex-col justify-between gap-3 ${
                  idx === 0 ? "bg-surface-container border-l-2 border-brand-cyan" : "bg-surface-container-high"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-label-sm uppercase ${idx === 0 ? "text-brand-cyan" : "text-outline"}`}>
                      {String(idx + 1).padStart(2, "0")} — {insight.title}
                    </span>
                    <span className="bg-surface-container-highest text-brand-cyan text-code-sm px-2 py-0.5 rounded">
                      {insight.badge}
                    </span>
                  </div>
                  <p className="text-headline-sm text-primary">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* MAIN TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Related Products */}
            <Card tier="base" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-headline-md text-primary font-semibold">
                    Produk Terkait dengan Pola Keluhan
                  </h3>
                  <p className="text-body-sm text-on-surface-variant">
                    Distribusi berdasarkan lini formula produk
                  </p>
                </div>
                <span className="material-symbols-outlined text-outline text-[20px]">inventory_2</span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="p-4 rounded-xl bg-surface-container shadow-sm">
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-headline-sm text-brand-cyan">{ticket.product}</span>
                      <StatusBadge type="processing" label="Zat Aktif Utama" />
                    </div>
                    <span className="text-headline-sm text-brand-cyan font-bold">28 Tiket (60.8%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-variant rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-brand-cyan rounded-full" style={{ width: "60.8%" }}></div>
                  </div>
                  <span className="text-body-sm text-on-surface-variant">
                    Batch Terbanyak: {ticket.productBatch} (21 tiket) • Mayoritas pemakaian hari ke 3-5
                  </span>
                </div>

                {[
                  { name: "AHA / BHA Clarifying Exfoliating Toner", count: 12, pct: 26.1, note: "Kombinasi penggunaan harian berturut-turut tanpa jeda adaptasi" },
                  { name: "Ceramide Barrier Soothing Moisturizer", count: 4, pct: 8.7, note: "Keluhan rasa perih saat skin barrier telah terlanjur terkompromi" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-surface-container-high">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-headline-sm text-on-surface">{item.name}</span>
                      <span className="text-headline-sm text-on-surface">{item.count} Tiket ({item.pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-primary-fixed-dim rounded-full" style={{ width: `${item.pct}%` }}></div>
                    </div>
                    <span className="text-body-sm text-outline">{item.note}</span>
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Gentle Hydrating Cleanser", count: 1, pct: 2.2 },
                    { name: "UV Water Shield SPF 50+", count: 1, pct: 2.2 },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-surface-container">
                      <span className="text-label-md text-on-surface truncate block">{item.name}</span>
                      <span className="text-body-sm text-outline">{item.count} Tiket ({item.pct}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-surface-container flex items-start gap-2">
                <span className="material-symbols-outlined text-brand-cyan text-[16px] mt-0.5">insights</span>
                <span className="text-body-sm text-on-surface-variant">
                  Korelasi Signifikan: <strong className="text-primary">86.9%</strong> total keluhan terkonsentrasi pada produk dengan zat aktif eksfoliasi atau retinoid yang memerlukan panduan frekuensi aplikasi terukur.
                </span>
              </div>
            </Card>

            {/* AI Analysis Summary (6-Section) */}
            <Card tier="base" className="overflow-hidden" glow>
              <div className="p-4 bg-surface-container flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-cyan text-[20px] animate-pulse">neurology</span>
                  <h3 className="text-headline-sm text-primary font-semibold">AI Analysis Summary</h3>
                </div>
                <StatusBadge type="aiAnalyzed" label="AI-generated • Human review required" />
              </div>

              <div className="p-5 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-2">
                    <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
                      1. Sinyal Terdeteksi
                    </span>
                    <div className="flex flex-col gap-2">
                      {analysis.symptoms.map((symptom, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded bg-surface-container-lowest">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FFC048]"></span>
                            <span className="text-body-sm text-on-surface font-medium">{symptom}</span>
                          </div>
                          <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-label-sm text-primary-fixed-dim">
                            {idx === 0 ? "Visual" : "Keluhan"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-1.5">
                    <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
                      2. Formula & Kandungan
                    </span>
                    <p className="text-body-sm text-on-surface">
                      <span className="font-semibold text-brand-cyan">Formula:</span> {analysis.formula}
                    </p>
                    <div className="p-2 rounded bg-surface-container-lowest mt-1">
                      <span className="text-label-sm text-[#FFC048] block mb-0.5">Catatan:</span>
                      <p className="text-body-sm text-on-surface-variant leading-snug">{analysis.formulaNote}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
                        3. Tingkat Keparahan
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-label-sm font-bold ${
                          analysis.severityLevel === "High"
                            ? "bg-[#FF4D4D]/15 text-[#FF4D4D]"
                            : analysis.severityLevel === "Moderate"
                            ? "bg-[#FFC048]/15 text-[#FFC048]"
                            : "bg-[#2ED573]/15 text-[#2ED573]"
                        }`}
                      >
                        {analysis.severityLevel}
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-brand-cyan via-[#FFC048] to-[#FF4D4D] h-full rounded-full"
                        style={{ width: `${analysis.severityPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-2">
                    <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
                      4. Sentimen Pelanggan
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#FFC048] text-[28px]">sentiment_worried</span>
                      <div className="flex flex-col">
                        <span className="text-headline-sm text-primary font-semibold">Concerned</span>
                        <span className="text-body-sm text-on-surface-variant">
                          Skor: {analysis.sentimentScore || 38}/100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-1">
                  <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
                    5. Pokok Masalah (Key Concern)
                  </span>
                  <p className="text-body-md text-on-surface mt-1">{analysis.keyConcern}</p>
                </div>

                <div className="p-4 rounded-lg bg-surface-container-highest flex flex-col gap-2 shadow-inner">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-cyan text-[18px]">gavel</span>
                    <span className="text-headline-sm text-brand-cyan font-semibold">
                      6. Panduan Tindakan CS (Non-Medis)
                    </span>
                  </div>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">{analysis.recommendation}</p>
                  <span className="text-error font-semibold text-label-sm">
                    ⚠ Dilarang membuat diagnosis medis definitif atau klaim klinis.
                  </span>
                </div>
              </div>
            </Card>

            {/* AI Suggested Response */}
            <Card tier="base" className="overflow-hidden">
              <div className="p-4 bg-surface-container flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-cyan text-[18px]">smart_toy</span>
                  <h3 className="text-headline-sm text-primary font-semibold">AI Suggested Response</h3>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge type="processing" label="Bahasa Indonesia" />
                  <StatusBadge type="neutral" label="Nada Empatis" />
                </div>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <div className="relative">
                  <textarea
                    value={draftReply}
                    onChange={(e) => setDraftReply(e.target.value)}
                    rows={8}
                    className="w-full p-4 rounded-xl bg-surface-container-lowest text-on-surface text-body-md leading-relaxed focus:outline-none focus:ring-1 focus:ring-brand-cyan shadow-inner resize-none transition-all"
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-80 pointer-events-none">
                    <span className="material-symbols-outlined text-brand-cyan text-[14px]">spellcheck</span>
                    <span className="text-label-sm text-on-surface-variant">Draf siap diedit</span>
                  </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-[#2ED573]">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span className="text-body-sm text-on-surface-variant">
                      Lolos uji kepatuhan klaim non-medis BPOM RI
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" icon="content_copy" onClick={handleCopyDraft}>
                      Salin Draft
                    </Button>
                    <Button variant="secondary" size="sm" icon="restart_alt" onClick={handleResetDraft}>
                      Reset Asli
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card tier="base" className="p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-cyan text-[22px]">psychology</span>
                  <h3 className="text-headline-md text-primary font-semibold">Sintesis AI Interpretation</h3>
                </div>
                <StatusBadge type="aiReady" label="Autonomous" />
              </div>

              <div className="p-4 rounded-xl bg-surface-container flex flex-col gap-3 mb-4">
                <p className="text-body-md text-on-surface leading-relaxed">
                  Model mengidentifikasi pola kemunculan keluhan berdasarkan analisis silang kategori tiket, spesifikasi produk, tingkat severity, dan nada emosi percakapan pada 7 hari terakhir.
                </p>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Lonjakan keluhan iritasi terpusat secara signifikan pada <strong className="text-brand-cyan">3-5 hari</strong> pasca penggunaan awal formula {ticket.product}. Pengguna umumnya melewatkan anjuran jeda 2x seminggu dan mengaplikasikan produk pada kulit yang masih lembap setelah toner AHA/BHA.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-high flex flex-col gap-3">
                <span className="text-label-md text-primary-fixed-dim uppercase tracking-wider">
                  Confidence & Evidence Coverage
                </span>
                <div className="flex flex-col gap-2 text-body-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-outline">Evidence Coverage:</span>
                    <span className="text-brand-cyan font-semibold">46 Tiket (100%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-outline">Metode Analisis:</span>
                    <span className="text-on-surface">NLP + Batch Correlation</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-outline">Batasan Lingkup:</span>
                    <span className="text-on-surface-variant">Decision Support Only</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-outline-variant/30 flex items-center gap-2 text-outline text-label-sm">
                  <span className="material-symbols-outlined text-brand-cyan text-[16px]">verified</span>
                  <span>Validasi akhir tetap dilakukan oleh manusia.</span>
                </div>
              </div>
            </Card>

            <Card tier="base" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-headline-md text-primary font-semibold">Pertimbangan Operasional</h3>
                  <p className="text-body-sm text-on-surface-variant">
                    Langkah tindak lanjut untuk tim layanan & formulasi
                  </p>
                </div>
                <span className="material-symbols-outlined text-outline text-[20px]">checklist</span>
              </div>

              <div className="flex flex-col gap-3">
                {considerations.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-headline-sm text-primary flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-brand-cyan text-[16px]">{c.icon}</span>
                        {c.title}
                      </span>
                      <span className={`${c.badgeColor} text-label-sm px-2 py-0.5 rounded uppercase`}>
                        {c.badge}
                      </span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant leading-relaxed">{c.description}</p>
                    <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                      <span className="text-code-sm text-outline">{c.target}</span>
                      <button className="text-brand-cyan hover:text-primary-fixed text-label-md flex items-center gap-1">
                        {c.actionLabel}
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 p-2 rounded-lg bg-surface-container flex items-center gap-2 text-outline text-label-sm">
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span>Pertimbangan di atas merupakan panduan manajemen layanan, bukan protokol pengobatan klinis.</span>
              </div>
            </Card>

            <Card tier="base" className="overflow-hidden">
              <div className="p-4 bg-surface-container flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">history</span>
                  <h3 className="text-headline-sm text-primary font-semibold">Linimasa Tiket</h3>
                </div>
                <span className="text-label-sm text-on-surface-variant">Total: 18 menit</span>
              </div>
              <div className="p-5">
                <Timeline events={timelineEvents} />
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toast.show && (
        <div className="fixed top-24 right-8 z-50">
          <div className="px-4 py-3 rounded-lg bg-surface-container-highest text-on-surface shadow-2xl flex items-center gap-3 border-l-4 border-brand-cyan">
            <span className="material-symbols-outlined text-brand-cyan">{toast.icon}</span>
            <span className="text-body-md">{toast.message}</span>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AIAnalysisPage;