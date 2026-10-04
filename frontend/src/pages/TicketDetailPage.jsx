import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";
import Textarea from "../components/ui/Textarea";
import { ticketsAPI, getErrorMessage } from "../lib/api";

const TicketDetailPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draftReply, setDraftReply] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

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

  const timelineEvents = [
    {
      title: "Tiket Dibuat",
      time: new Date(ticket.created_at).toLocaleString("id-ID"),
      description: `Dibuat oleh ${ticket.assigned_cs || "System"}.`,
    },
    {
      title: "AI Complaint Analysis Selesai",
      time: "Setelah dibuat",
      description: "Analisis gejala & rekomendasi selesai diproses.",
      highlight: true,
    },
    {
      title: `Status saat ini: ${ticket.status}`,
      time: "Sekarang",
      description: "Menunggu tindakan dari agen CS.",
      active: ticket.status === "PROCESSING" || ticket.status === "IN_REVIEW",
    },
  ];

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
        showInputButton: false,
      }}
    >
      <div className="p-6 pb-28 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-1 text-label-md text-on-surface-variant">
            <button
              onClick={() => navigate("/cs/dashboard")}
              className="hover:text-brand-cyan transition-colors"
            >
              Dashboard
            </button>
            <span className="material-symbols-outlined text-[14px] opacity-50">
              chevron_right
            </span>
            <button
              onClick={() => navigate("/cs/tickets")}
              className="hover:text-brand-cyan transition-colors"
            >
              My Tickets
            </button>
            <span className="material-symbols-outlined text-[14px] opacity-50">
              chevron_right
            </span>
            <span className="text-primary-fixed-dim text-code-sm">{displayId}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-headline-lg text-primary tracking-tight">
                  Detail Tiket {displayId}
                </h1>
                <div className="flex items-center gap-1.5 flex-wrap">
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
            </div>

            <div className="flex items-center gap-2">
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
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Customer & Complaint */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card tier="base" className="overflow-hidden">
              <div className="p-4 bg-surface-container flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-cyan text-[18px]">
                    person_pin
                  </span>
                  <h3 className="text-headline-sm text-primary font-semibold">
                    Informasi Customer
                  </h3>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-lowest">
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-headline-md font-bold text-brand-cyan">
                    {getInitials(ticket.customer_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-headline-sm text-primary font-bold truncate block">
                      {ticket.customer_name}
                    </span>
                    <span className="text-body-sm text-on-surface-variant">
                      Assigned: {ticket.assigned_cs || "-"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-body-sm">
                  <div className="p-3 rounded-lg bg-surface-container">
                    <span className="text-label-sm text-on-surface-variant uppercase block mb-1">
                      Produk
                    </span>
                    <span className="text-body-sm text-brand-cyan font-medium">
                      {ticket.product || "-"}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container">
                    <span className="text-label-sm text-on-surface-variant uppercase block mb-1">
                      Batch
                    </span>
                    <span className="text-code-sm bg-surface-container-highest px-1.5 py-0.5 rounded text-brand-cyan font-bold">
                      {ticket.product_batch || "-"}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container col-span-2">
                    <span className="text-label-sm text-on-surface-variant uppercase block mb-1">
                      Kategori
                    </span>
                    <span className="text-body-sm text-[#FFC048] font-semibold">
                      {ticket.category || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card tier="base" className="overflow-hidden">
              <div className="p-4 bg-surface-container flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-cyan text-[18px]">
                    record_voice_over
                  </span>
                  <h3 className="text-headline-sm text-primary font-semibold">
                    Keluhan Customer
                  </h3>
                </div>
                <span className="text-label-sm text-on-surface-variant">
                  {new Date(ticket.created_at).toLocaleDateString("id-ID")}
                </span>
              </div>

              <div className="p-4 flex flex-col gap-4">
                <div className="relative p-4 rounded-xl bg-surface-container-lowest shadow-inner">
                  <span className="material-symbols-outlined absolute top-2 right-3 text-[32px] text-surface-container-highest opacity-40 select-none pointer-events-none">
                    format_quote
                  </span>
                  <p className="text-body-lg text-on-surface italic font-medium leading-relaxed pr-8">
                    "{ticket.complaint_text}"
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT: AI Analysis */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {ticket.ai_analysis && (
              <Card tier="base" className="overflow-hidden" glow>
                <div className="p-4 bg-surface-container flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-cyan text-[20px] animate-pulse">
                      neurology
                    </span>
                    <h3 className="text-headline-sm text-primary font-semibold">
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
                    <StatusBadge type="aiAnalyzed" label="Human review required" />
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <div className="p-4 rounded-lg bg-surface-container-lowest">
                    <span className="text-label-sm text-on-surface-variant uppercase block mb-2">
                      Analisis
                    </span>
                    <p className="text-body-md text-on-surface whitespace-pre-wrap">
                      {ticket.ai_analysis}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {ticket.ai_draft_reply && (
              <Card tier="base" className="overflow-hidden">
                <div className="p-4 bg-surface-container flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-cyan text-[20px]">
                      smart_toy
                    </span>
                    <h3 className="text-headline-sm text-primary font-semibold">
                      AI Suggested Response
                    </h3>
                  </div>
                  <StatusBadge type="processing" label="Bahasa Indonesia" />
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <Textarea
                    value={draftReply}
                    onChange={(e) => setDraftReply(e.target.value)}
                    rows={8}
                  />
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-[#2ED573]">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span className="text-body-sm text-on-surface-variant">
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
              </Card>
            )}

            {!ticket.ai_analysis && !ticket.ai_draft_reply && (
              <Card tier="base" className="p-8 text-center">
                <span className="material-symbols-outlined text-[#FFC048] text-[48px] mb-3">
                  pending
                </span>
                <h3 className="text-headline-md text-primary font-bold mb-2">
                  AI Analysis Sedang Diproses
                </h3>
                <p className="text-body-sm text-on-surface-variant">
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
              </Card>
            )}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-72 right-0 bg-surface-container-lowest/95 backdrop-blur-md px-6 py-3 z-40 shadow-[0_-4px_24px_rgba(0,0,0,0.5)] border-t border-outline-variant/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-brand-cyan text-[22px]">
                verified_user
              </span>
              <div className="flex flex-col">
                <span className="text-label-sm text-brand-cyan font-bold tracking-wide uppercase">
                  Human-in-the-Loop Protocol
                </span>
                <span className="text-body-sm text-on-surface-variant">
                  AI menyusun draf. Keputusan akhir tetap di tangan CS.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-end">
              <Button variant="secondary" size="sm" icon="save">
                Simpan
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
    </DashboardLayout>
  );
};

export default TicketDetailPage;