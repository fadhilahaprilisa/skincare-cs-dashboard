import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import Textarea from "../components/ui/Textarea";
import { ticketsAPI, getErrorMessage } from "../lib/api";
import { exportAPI } from "../lib/api";
import productSerum from "../assets/product_serum.jpg";
import productCleanser from "../assets/product_cleanser.jpg";

const getProductThumbnail = (name = "") => {
  const p = (name || "").toLowerCase();
  if (p.includes("cleanser") || p.includes("wash") || p.includes("cream")) return productCleanser;
  return productSerum;
};

const TicketDetailPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draftReply, setDraftReply] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  
  // New States
  const [isEscalating, setIsEscalating] = useState(false);
  const [isPriority, setIsPriority] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [showEscalateModal, setShowEscalateModal] = useState(false);

  // Fetch ticket dari API
  useEffect(() => {
    const fetchTicket = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await ticketsAPI.getById(ticketId);
        setTicket(data);
        setDraftReply(data.ai_draft_reply || "");
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    if (ticketId) fetchTicket();
  }, [ticketId]);

  // Tandai prioritas
  const handleTogglePriority = () => {
    setIsPriority(!isPriority);
    // Optional: call API to update severity
  };

  // Eskalasi
  const handleEscalate = () => {
    setShowEscalateModal(true);
  };

  const confirmEscalate = () => {
    alert("Tiket berhasil dieskalasi ke Dokter Konsultan (Dr. Amanda, Sp.KK)");
    setShowEscalateModal(false);
  };

  // Lihat Lampiran
  const handleViewAttachment = () => {
    setShowAttachment(true);
  };

  // Simpan Draf
  const handleSaveDraft = async () => {
    try {
      // Simpan ke localStorage sebagai "draft"
      localStorage.setItem(`draft_ticket_${ticket.id}`, draftReply);
      alert("Draf tersimpan!");
    } catch (err) {
      alert("Gagal menyimpan draf");
    }
  };

  // Tutup Tiket
  const handleCloseTicket = async () => {
    if (!confirm("Yakin menutup tiket ini?")) return;
    setIsUpdating(true);
    try {
      await ticketsAPI.updateStatus(ticket.id, "RESOLVED");
      navigate("/cs/tickets");
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(draftReply);
    alert("Draf berhasil disalin!");
  };

  const handleSendResponse = async () => {
    if (!ticket) return;
    setIsUpdating(true);
    try {
      await ticketsAPI.updateStatus(ticket.id, "RESOLVED");
      alert("Tiket berhasil diselesaikan!");
      navigate("/cs/tickets");
    } catch (err) {
      alert(`Gagal: ${getErrorMessage(err)}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "??";
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  };

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout role="cs" topbarProps={{ title: "Detail Tiket" }}>
        <div className="p-12 text-center">
          <span className="material-symbols-outlined text-brand-cyan text-[64px] animate-spin">
            progress_activity
          </span>
          <p className="text-body-md text-on-surface-variant mt-4">Memuat detail tiket...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (error || !ticket) {
    return (
      <DashboardLayout role="cs" topbarProps={{ title: "Detail Tiket" }}>
        <div className="p-6">
          <Card tier="base" className="p-12 text-center">
            <span className="material-symbols-outlined text-[#FF4D4D] text-[64px] mb-4">
              error
            </span>
            <h2 className="text-headline-lg text-primary font-bold mb-2">
              Gagal Memuat Tiket
            </h2>
            <p className="text-body-md text-on-surface-variant mb-6">
              {error || "Tiket tidak ditemukan"}
            </p>
            <Button
              variant="primary"
              size="md"
              icon="arrow_back"
              onClick={() => navigate("/cs/tickets")}
            >
              Kembali ke My Tickets
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const displayId = `#TK-${String(ticket.id).padStart(4, "0")}`;

  const getSeverityBadge = (sev) => {
    if (sev === "High") return "severityHigh";
    if (sev === "Moderate") return "severityModerate";
    return "severityLow";
  };

  const getStatusBadge = (status) => {
    if (status === "RESOLVED") return "resolved";
    if (status === "IN_REVIEW") return "processing";
    if (status === "FAILED") return "urgent";
    return "pending";
  };

  return (
    <DashboardLayout
      role="cs"
      topbarProps={{
        title: `Detail Tiket ${displayId}`,
        subtitle: "Review keluhan customer dan tindakan penanganan formula.",
        showSearch: false,
        showInputButton: false,
      }}
    >
      <div className="p-6 pb-28 space-y-6">
        {/* Page Toolbar (Breadcrumbs, Status Badges & Actions) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
          <div className="flex items-center gap-3 flex-wrap">
            <nav className="flex items-center gap-1.5 text-xs text-slate-400">
              <button
                onClick={() => navigate("/cs/dashboard")}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                Dashboard
              </button>
              <span className="material-symbols-outlined text-[14px]">
                chevron_right
              </span>
              <button
                onClick={() => navigate("/cs/tickets")}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                My Tickets
              </button>
              <span className="material-symbols-outlined text-[14px]">
                chevron_right
              </span>
              <span className="text-slate-900 font-semibold">{displayId}</span>
            </nav>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-1.5">
              <StatusBadge
                type={getStatusBadge(ticket.status)}
                label={ticket.status}
                pulse={ticket.status === "PROCESSING" || ticket.status === "IN_REVIEW"}
              />
              <StatusBadge
                type={getSeverityBadge(ticket.severity)}
                label={`${ticket.severity || "N/A"} Severity`}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant={isPriority ? "primary" : "secondary"}
              size="sm"
              icon="flag"
              onClick={handleTogglePriority}
            >
              {isPriority ? "Prioritas Aktif" : "Tandai Prioritas"}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon="arrow_back"
              onClick={() => navigate(-1)}
            >
              Kembali
            </Button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Customer & Complaint */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700 text-[18px]">
                    person_pin
                  </span>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Informasi Customer
                  </h3>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-4">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-800">
                    {getInitials(ticket.customer_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-slate-900 truncate block">
                      {ticket.customer_name}
                    </span>
                    <span className="text-xs text-slate-500">
                      Assigned: {ticket.assigned_cs || "-"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src={getProductThumbnail(ticket.product)}
                        alt={ticket.product || "Skincare Product"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                        Produk
                      </span>
                      <span className="text-xs font-semibold text-slate-900 truncate block">
                        {ticket.product || "-"}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">
                      Batch Code
                    </span>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-800 font-mono font-bold w-fit border border-slate-200">
                      {ticket.product_batch || "-"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 col-span-2">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">
                      Kategori
                    </span>
                    <span className="text-xs text-amber-700 font-semibold">
                      {ticket.category || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700 text-[18px]">
                    record_voice_over
                  </span>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Keluhan Customer
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(ticket.created_at).toLocaleDateString("id-ID")}
                </span>
              </div>

              <div className="p-4 flex flex-col gap-4">
                <div className="relative p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="material-symbols-outlined absolute top-2 right-3 text-[32px] text-slate-300 opacity-60 select-none pointer-events-none">
                    format_quote
                  </span>
                  <p className="text-xs text-slate-900 italic font-medium leading-relaxed pr-8">
                    "{ticket.complaint_text}"
                  </p>
                </div>
                
                {/* Tombol Lihat Lampiran */}
                <button
                  onClick={handleViewAttachment}
                  className="mt-1 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all text-xs font-medium w-fit cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">visibility</span>
                  Lihat Lampiran
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: AI Analysis */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {ticket.ai_analysis && (
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-800 text-[20px]">
                      neurology
                    </span>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      AI Analysis Summary
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon="auto_awesome"
                      onClick={() => navigate(`/cs/ai-analysis/${ticket.id}`)}
                    >
                      Buka Analysis Lengkap
                    </Button>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      Human review required
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                      Analisis
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {ticket.ai_analysis}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {ticket.ai_draft_reply && (
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-800 text-[20px]">
                      smart_toy
                    </span>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      AI Suggested Response
                    </h3>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Bahasa Indonesia
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <Textarea
                    value={draftReply}
                    onChange={(e) => setDraftReply(e.target.value)}
                    rows={8}
                  />
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span className="text-xs text-slate-600">
                        Lolos uji kepatuhan klaim non-medis
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon="content_copy"
                        onClick={handleCopyDraft}
                      >
                        Salin
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!ticket.ai_analysis && !ticket.ai_draft_reply && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
                <span className="material-symbols-outlined text-amber-500 text-[48px] mb-3">
                  pending
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  AI Analysis Sedang Diproses
                </h3>
                <p className="text-xs text-slate-500">
                  Sistem sedang menganalisis keluhan ini. Refresh dalam beberapa detik.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  icon="refresh"
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Refresh
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-72 right-0 bg-white/95 backdrop-blur-md px-6 py-3 z-40 shadow-[0_-4px_24px_rgba(15,23,42,0.06)] border-t border-slate-200/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-700 text-[22px]">
                verified_user
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold tracking-wide uppercase">
                  Human-in-the-Loop Protocol
                </span>
                <span className="text-xs text-slate-500">
                  AI menyusun draf. Keputusan akhir tetap di tangan CS.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-end">
              <Button variant="secondary" size="sm" icon="save" onClick={handleSaveDraft}>
                Simpan Draf
              </Button>
              <Button variant="secondary" size="sm" icon="supervisor_account" onClick={handleEscalate}>
                Eskalasi
              </Button>
              <Button variant="secondary" size="sm" icon="close" onClick={handleCloseTicket}>
                Tutup
              </Button>
              <Button
                variant="primary"
                size="md"
                icon={isUpdating ? "progress_activity" : "check"}
                onClick={handleSendResponse}
                disabled={isUpdating || ticket.status === "RESOLVED"}
              >
                {isUpdating
                  ? "Memproses..."
                  : ticket.status === "RESOLVED"
                  ? "Sudah Selesai"
                  : "Kirim & Selesaikan"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Lampiran */}
      {showAttachment && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4" onClick={() => setShowAttachment(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl border border-slate-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Lampiran: erythema_pipi_kanan.jpg</h3>
              <button onClick={() => setShowAttachment(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="w-full h-64 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4">
              <div className="text-center">
                <span className="material-symbols-outlined text-slate-400 text-[64px]">image</span>
                <p className="text-xs text-slate-500 mt-2">Preview foto kondisi kulit customer</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setShowAttachment(false)}>
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Eskalasi */}
      {showEscalateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4" onClick={() => setShowEscalateModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-bold text-slate-900 mb-2">Eskalasi Tiket</h3>
            <p className="text-xs text-slate-500 mb-4">
              Tiket ini akan dieskalasi ke Dokter Konsultan Dermatologi (Dr. Amanda, Sp.KK). Yakin melanjutkan?
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setShowEscalateModal(false)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" icon="check" onClick={confirmEscalate}>
                Ya, Eskalasi
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TicketDetailPage;