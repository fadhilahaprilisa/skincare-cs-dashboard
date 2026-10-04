import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";
import Textarea from "../components/ui/Textarea";
import { ticketsAPI, ticketsAPI as _t, getErrorMessage } from "../lib/api";

const AIAnalysisPage = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draftReply, setDraftReply] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      if (!ticketId) {
        setError("Ticket ID tidak valid");
        setIsLoading(false);
        return;
      }
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
    fetchTicket();
  }, [ticketId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(draftReply);
    alert("Draf berhasil disalin!");
  };

  const handleSend = async () => {
    if (!ticket) return;
    setIsUpdating(true);
    try {
      await ticketsAPI.updateStatus(ticket.id, "RESOLVED");
      alert("Respons terkirim! Tiket berstatus Selesai.");
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

  // Loading
  if (isLoading) {
    return (
      <DashboardLayout role="cs" topbarProps={{ title: "AI Complaint Analysis", subtitle: "Memuat..." }}>
        <div className="p-12 text-center">
          <span className="material-symbols-outlined text-brand-cyan text-[64px] animate-spin">
            progress_activity
          </span>
          <p className="text-body-md text-on-surface-variant mt-4">Memuat analisis AI...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Error
  if (error || !ticket) {
    return (
      <DashboardLayout role="cs" topbarProps={{ title: "AI Complaint Analysis", subtitle: "Error" }}>
        <div className="p-6">
          <Card tier="base" className="p-12 text-center">
            <span className="material-symbols-outlined text-[#FF4D4D] text-[64px] mb-4">error</span>
            <h2 className="text-headline-lg text-primary font-bold mb-2">Gagal Memuat Analisis</h2>
            <p className="text-body-md text-on-surface-variant mb-6">{error || "Tiket tidak ditemukan"}</p>
            <Button variant="primary" size="md" icon="arrow_back" onClick={() => navigate("/cs/tickets")}>
              Kembali ke My Tickets
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const displayId = `#TK-${String(ticket.id).padStart(4, "0")}`;

  // Parse AI analysis & structured data
  const hasAI = !!ticket.ai_analysis;
  const hasDraft = !!ticket.ai_draft_reply;

  // Pipeline steps
  const pipelineSteps = [
    { num: 1, title: "Customer Complaint", subtitle: "Input keluhan pelanggan" },
    { num: 2, title: "AI Analysis", subtitle: "Proses analisis", active: true },
    { num: 3, title: "Symptom & Formula", subtitle: "Deteksi gejala & bahan" },
    { num: 4, title: "Recommendation", subtitle: "Saran tindakan CS" },
    { num: 5, title: "Human CS Review", subtitle: "Validasi agen" },
    { num: 6, title: "Final Resolution", subtitle: "Pengiriman respons" },
  ];

  return (
    <DashboardLayout
      role="cs"
      topbarProps={{
        title: `AI Analysis ${displayId}`,
        subtitle: "Analisis keluhan customer dengan bantuan AI sebelum memberikan respons.",
        showInputButton: false,
      }}
    >
      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-on-surface-variant text-label-md flex-wrap">
          <button onClick={() => navigate("/cs/dashboard")} className="hover:text-brand-cyan">Dashboard</button>
          <span className="material-symbols-outlined text-[14px] opacity-50">chevron_right</span>
          <button onClick={() => navigate("/cs/tickets")} className="hover:text-brand-cyan">My Tickets</button>
          <span className="material-symbols-outlined text-[14px] opacity-50">chevron_right</span>
          <span className="text-brand-cyan font-semibold">AI Analysis</span>
          <span className="material-symbols-outlined text-[14px] opacity-50">chevron_right</span>
          <span className="text-primary">{displayId}</span>
        </div>

        {/* Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-headline-lg text-brand-cyan font-bold tracking-tight">
                AI Complaint Analysis
              </h1>
              <StatusBadge type="processing" label="AI-ASSISTED" pulse />
            </div>
            <p className="text-body-md text-on-surface-variant mt-1">
              Analisis keluhan customer dengan bantuan AI sebelum memberikan respons profesional non-medis.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon="arrow_back" onClick={() => navigate(`/cs/tickets/${ticket.id}`)}>
              Kembali ke Detail Tiket
            </Button>
          </div>
        </div>

        {/* Main 2-column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Customer & Complaint */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card tier="base" className="overflow-hidden">
              <div className="p-4 bg-surface-container-high flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-cyan text-[20px]">contact_support</span>
                  <h3 className="text-headline-sm text-primary font-semibold">Customer Complaint</h3>
                </div>
                <StatusBadge type="pending" label={ticket.status} />
              </div>

              <div className="p-4 bg-surface-container-low flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan text-headline-sm font-bold">
                      {getInitials(ticket.customer_name)}
                    </div>
                    <div>
                      <span className="text-headline-sm text-primary font-semibold block">
                        {ticket.customer_name}
                      </span>
                      <span className="text-body-sm text-on-surface-variant">
                        Assigned: {ticket.assigned_cs || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-outline-variant/30">
                  <div>
                    <span className="text-label-sm text-on-surface-variant block">Produk:</span>
                    <span className="text-body-sm text-brand-cyan font-semibold">{ticket.product || "-"}</span>
                    <span className="text-code-sm text-on-surface-variant block">Batch {ticket.product_batch || "-"}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-label-sm text-on-surface-variant block">Kategori:</span>
                    <span className="text-body-sm text-[#FFC048] font-semibold">{ticket.category || "-"}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Pesan Asli Pelanggan:
                </span>
                <div className="p-4 rounded-lg bg-surface-container-lowest shadow-inner relative">
                  <span className="material-symbols-outlined text-on-surface-variant/30 text-[32px] absolute top-2 right-3 select-none pointer-events-none">
                    format_quote
                  </span>
                  <p className="text-body-lg text-primary italic leading-relaxed pr-8">
                    "{ticket.complaint_text}"
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT: AI Analysis */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* AI Analysis Summary */}
            <Card tier="base" className="overflow-hidden" glow>
              <div className="p-4 bg-surface-container-high flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-cyan text-[22px] animate-pulse">psychology</span>
                  <h3 className="text-headline-sm text-primary font-bold">AI Analysis</h3>
                </div>
                <StatusBadge type="aiAnalyzed" label="AI-Generated • Human review required" />
              </div>

              <div className="p-5 flex flex-col gap-4">
                {hasAI ? (
                  <>
                    <div className="p-4 rounded-lg bg-surface-container-lowest">
                      <span className="text-label-sm text-on-surface-variant uppercase block mb-2">
                        Analisis AI
                      </span>
                      <p className="text-body-md text-on-surface leading-relaxed">
                        {ticket.ai_analysis}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-surface-container-highest shadow-inner">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-brand-cyan text-[18px]">gavel</span>
                        <span className="text-headline-sm text-brand-cyan font-semibold">
                          Panduan Tindakan CS (Non-Medis)
                        </span>
                      </div>
                      <p className="text-body-md text-on-surface-variant leading-relaxed">
                        Berikan tanggapan yang menenangkan, akui kecemasan customer secara tulus. Sarankan jeda pemakaian produk dan buffering pelembap. Anjurkan konsultasi dokter bila keluhan menetap &gt;48 jam.
                      </p>
                      <span className="text-error font-semibold text-label-sm block mt-2">
                        ⚠ Dilarang membuat diagnosis medis definitif.
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center">
                    <span className="material-symbols-outlined text-[#FFC048] text-[48px] mb-3">pending</span>
                    <p className="text-body-sm text-on-surface-variant">
                      AI analysis belum tersedia untuk tiket ini.
                    </p>
                  </div>
                )}

                {/* Footer Metadata */}
                <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30 flex-wrap gap-2">
                  <div className="flex items-center gap-3 text-code-sm text-on-surface-variant">
                    <span className="flex items-center gap-1 text-brand-cyan">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                      AI-Assisted Analysis
                    </span>
                    <span>Source: {displayId}</span>
                  </div>
                  <StatusBadge type="aiAnalyzed" label="Human Review Required" />
                </div>
              </div>
            </Card>

            {/* AI Suggested Response */}
            {hasDraft && (
              <Card tier="base" className="overflow-hidden">
                <div className="p-4 bg-surface-container-high flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-cyan text-[22px]">smart_toy</span>
                    <h3 className="text-headline-sm text-primary font-bold">AI Suggested Response</h3>
                  </div>
                  <StatusBadge type="processing" label="Bahasa Indonesia • Nada Empatik" />
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <div className="relative rounded-lg bg-surface-container-lowest p-4 shadow-inner">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                        Draf Pesan (Dapat Diedit)
                      </span>
                      <span className="text-code-sm text-on-surface-variant">{draftReply.length} Karakter</span>
                    </div>
                    <textarea
                      value={draftReply}
                      onChange={(e) => setDraftReply(e.target.value)}
                      rows={8}
                      className="w-full bg-transparent text-primary text-body-md focus:outline-none resize-none leading-relaxed"
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30 flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-[#2ED573]">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span className="text-body-sm text-on-surface-variant">
                        Lolos uji kepatuhan klaim non-medis
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm" icon="content_copy" onClick={handleCopy}>
                        Salin
                      </Button>
                      <Button variant="primary" size="md" icon="send" onClick={handleSend} disabled={isUpdating}>
                        {isUpdating ? "Memproses..." : "Kirim & Selesaikan"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAnalysisPage;