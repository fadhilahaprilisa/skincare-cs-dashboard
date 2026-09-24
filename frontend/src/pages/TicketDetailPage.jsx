import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import Textarea from "../components/ui/Textarea";
import Timeline from "../components/domain/Timeline";
import AIAnalysisPanel from "../components/domain/AIAnalysisPanel";
import { tickets } from "../data/mockData";
import { useState } from "react";

const TicketDetailPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [draftReply, setDraftReply] = useState("");

  // Cari tiket berdasarkan ID (cocokkan dengan format "#TK-XXXX")
  const ticket = tickets.find((t) => t.id.replace("#", "") === ticketId) || tickets[0];

  // Set draft reply sekali load
  useState(() => {
    if (ticket?.aiAnalysis?.suggestedResponse) {
      setDraftReply(ticket.aiAnalysis.suggestedResponse);
    }
  }, [ticket]);

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

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(draftReply);
    alert("Draf berhasil disalin!");
  };

  const handleSendResponse = () => {
    alert("Respons terkirim! Tiket berstatus Selesai.");
  };

  return (
    <DashboardLayout
      role="cs"
      topbarProps={{
        title: `Detail Tiket ${ticket.id}`,
        subtitle: "Review keluhan customer sebelum memberikan respons dan tindakan penanganan formula.",
        showInputButton: false,
      }}
    >
      <div className="p-6 pb-28 space-y-6">
        {/* ===== BREADCRUMB & HEADER ===== */}
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-1 text-label-md text-on-surface-variant">
            <button onClick={() => navigate("/cs/dashboard")} className="hover:text-brand-cyan transition-colors">
              Dashboard
            </button>
            <span className="material-symbols-outlined text-[14px] opacity-50">chevron_right</span>
            <button onClick={() => navigate("/cs/tickets")} className="hover:text-brand-cyan transition-colors">
              My Tickets
            </button>
            <span className="material-symbols-outlined text-[14px] opacity-50">chevron_right</span>
            <span className="text-primary-fixed-dim text-code-sm">{ticket.id}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-headline-lg text-primary tracking-tight">
                  Detail Tiket {ticket.id}
                </h1>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <StatusBadge type="pending" label={ticket.statusLabel} pulse />
                  <StatusBadge
                    type={ticket.severity === "High" ? "severityHigh" : ticket.severity === "Moderate" ? "severityModerate" : "severityLow"}
                    label={`${ticket.severity} Severity`}
                  />
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high text-primary-fixed-dim text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">timer</span>
                    SLA: {ticket.slaRemaining}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" icon="arrow_back" onClick={() => navigate(-1)}>
                Kembali
              </Button>
              <Button variant="secondary" size="sm" icon="flag">
                Tandai Prioritas
              </Button>
            </div>
          </div>
        </div>

        {/* ===== 2-COLUMN LAYOUT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ===== LEFT COLUMN (5 cols) ===== */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Customer Info Card */}
            <Card tier="base" className="overflow-hidden">
              <div className="p-4 bg-surface-container flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-cyan text-[18px]">person_pin</span>
                  <h3 className="text-headline-sm text-primary font-semibold">Informasi Customer</h3>
                </div>
                <span className="text-code-sm text-on-surface-variant">ID: CUST-84910</span>
              </div>

              <div className="p-4 flex flex-col gap-4">
                {/* Profile */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-lowest">
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-headline-md font-bold text-brand-cyan">
                    {ticket.customerInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-headline-sm text-primary font-bold truncate">
                        {ticket.customer}
                      </span>
                      <StatusBadge type="gold" label={ticket.customerTier} />
                    </div>
                    <span className="text-body-sm text-on-surface-variant">
                      Pelanggan sejak {ticket.customerSince} • {ticket.customerTransactions} Transaksi
                    </span>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 text-body-sm">
                  <div className="p-3 rounded-lg bg-surface-container">
                    <span className="text-label-sm text-on-surface-variant uppercase block mb-1">
                      WhatsApp
                    </span>
                    <div className="flex items-center gap-1.5 text-primary font-semibold">
                      <span className="material-symbols-outlined text-[#2ED573] text-[14px]">chat</span>
                      <span className="truncate">{ticket.customerWhatsapp}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container">
                    <span className="text-label-sm text-on-surface-variant uppercase block mb-1">
                      Kanal Masuk
                    </span>
                    <div className="flex items-center gap-1.5 text-primary font-semibold">
                      <span className="material-symbols-outlined text-brand-cyan text-[14px]">cell_tower</span>
                      <span className="truncate">{ticket.channel}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container">
                    <span className="text-label-sm text-on-surface-variant uppercase block mb-1">
                      Produk
                    </span>
                    <div className="flex items-center gap-1.5 text-brand-cyan font-medium truncate">
                      <span className="material-symbols-outlined text-[14px]">medication</span>
                      <span className="truncate">{ticket.product}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container">
                    <span className="text-label-sm text-on-surface-variant uppercase block mb-1">
                      Batch / BPOM
                    </span>
                    <div className="flex items-center gap-1.5 text-primary">
                      <span className="text-code-sm bg-surface-container-highest px-1.5 py-0.5 rounded text-brand-cyan font-bold">
                        {ticket.productBatch}
                      </span>
                      <span className="material-symbols-outlined text-[#2ED573] text-[14px]">verified</span>
                    </div>
                  </div>
                </div>

                {/* Riwayat Tiket */}
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Riwayat Konsultasi Sebelumnya
                  </span>
                  {[
                    { id: "#TK-0982", title: "Tanya Cara Layering Retinol", date: "22 Agu 2024" },
                    { id: "#TK-0911", title: "Pengiriman Botol Retak", date: "15 Mei 2024" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-code-sm text-brand-cyan">{item.id}</span>
                        <span className="text-body-sm text-on-surface truncate">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-body-sm text-on-surface-variant hidden sm:inline">{item.date}</span>
                        <StatusBadge type="resolved" label="Resolved" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Complaint Card */}
            <Card tier="base" className="overflow-hidden">
              <div className="p-4 bg-surface-container flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-cyan text-[18px]">record_voice_over</span>
                  <h3 className="text-headline-sm text-primary font-semibold">Keluhan Customer</h3>
                </div>
                <span className="text-label-sm text-on-surface-variant">
                  {ticket.createdAt}
                </span>
              </div>

              <div className="p-4 flex flex-col gap-4">
                <div className="relative p-4 rounded-xl bg-surface-container-lowest shadow-inner">
                  <span className="material-symbols-outlined absolute top-2 right-3 text-[32px] text-surface-container-highest opacity-40 select-none pointer-events-none">
                    format_quote
                  </span>
                  <p className="text-body-lg text-on-surface italic font-medium leading-relaxed pr-8">
                    "{ticket.complaint}"
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container text-label-sm">
                    <span className="text-on-surface-variant">Produk:</span>
                    <span className="font-semibold text-brand-cyan">{ticket.product}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container text-label-sm">
                    <span className="text-on-surface-variant">Kategori:</span>
                    <span className="font-semibold text-[#FFC048]">{ticket.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container text-label-sm">
                    <span className="text-on-surface-variant">Sentimen:</span>
                    <span className="font-semibold text-[#FFC048]">
                      {ticket.sentiment} {ticket.sentimentEmoji}
                    </span>
                  </div>
                </div>

                {/* Attachment */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Lampiran Visual
                    </span>
                    <span className="text-code-sm text-brand-cyan">1 File Terverifikasi</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container">
                    <div className="w-20 h-20 rounded-lg bg-surface-container-highest shrink-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-brand-cyan text-[28px]">image</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-label-md text-primary font-semibold truncate">
                          erythema_pipi_kanan.jpg
                        </span>
                        <span className="material-symbols-outlined text-[14px] text-brand-cyan">verified</span>
                      </div>
                      <p className="text-body-sm text-on-surface-variant mt-0.5">
                        Foto kondisi kulit (Kemerahan ringan terdeteksi)
                      </p>
                      <button className="mt-2 flex items-center gap-1 px-3 py-1 rounded bg-surface-container-highest text-brand-cyan hover:bg-brand-cyan hover:text-on-primary-container transition-all text-label-sm">
                        <span className="material-symbols-outlined text-[14px]">visibility</span>
                        Lihat Lampiran
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* ===== RIGHT COLUMN (7 cols) ===== */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* AI Analysis Panel */}
            <AIAnalysisPanel analysis={ticket.aiAnalysis} ticketId={ticket.id} />

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
                <Textarea
                  value={draftReply}
                  onChange={(e) => setDraftReply(e.target.value)}
                  rows={8}
                  className="font-body-md"
                />

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-[#2ED573]">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span className="text-body-sm text-on-surface-variant">
                      Lolos uji kepatuhan klaim non-medis BPOM
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" icon="content_copy" onClick={handleCopyDraft}>
                      Salin
                    </Button>
                    <Button variant="secondary" size="sm" icon="restart_alt">
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card tier="base" className="overflow-hidden">
              <div className="p-4 bg-surface-container flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">history</span>
                  <h3 className="text-headline-sm text-primary font-semibold">Linimasa Tiket</h3>
                </div>
                <span className="text-label-sm text-on-surface-variant">Total durasi: 18 menit</span>
              </div>
              <div className="p-5">
                <Timeline events={timelineEvents} />
              </div>
            </Card>
          </div>
        </div>

        {/* ===== BOTTOM ACTION BAR (Fixed) ===== */}
        <div className="fixed bottom-0 left-72 right-0 bg-surface-container-lowest/95 backdrop-blur-md px-6 py-3 z-40 shadow-[0_-4px_24px_rgba(0,0,0,0.5)] border-t border-outline-variant/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-brand-cyan text-[22px]">verified_user</span>
              <div className="flex flex-col">
                <span className="text-label-sm text-brand-cyan font-bold tracking-wide uppercase">
                  Human-in-the-Loop Protocol
                </span>
                <span className="text-body-sm text-on-surface-variant">
                  AI hanya menyusun rekomendasi draf. Keputusan akhir tetap di tangan agen CS.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-end">
              <Button variant="secondary" size="sm" icon="save">
                Simpan Draf
              </Button>
              <Button variant="secondary" size="sm" icon="supervisor_account">
                Eskalasi
              </Button>
              <Button variant="secondary" size="sm" icon="close">
                Tutup
              </Button>
              <Button variant="primary" size="md" icon="check" onClick={handleSendResponse}>
                Kirim Respons & Selesaikan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketDetailPage;