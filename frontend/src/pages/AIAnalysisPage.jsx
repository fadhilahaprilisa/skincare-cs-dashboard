import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";
import Textarea from "../components/ui/Textarea";
import ConceptDiagram from "../components/domain/ConceptDiagram";
import { ticketsAPI, getErrorMessage } from "../lib/api";
import { 
  Sparkles, 
  Send, 
  Copy, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Bot, 
  User, 
  Clock, 
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";

const AIAnalysisPage = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [allTickets, setAllTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draftReply, setDraftReply] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("chat"); // "chat" | "diagram"

  useEffect(() => {
    const fetchTicketData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const ticketList = await ticketsAPI.getAll();
        setAllTickets(ticketList || []);

        let targetTicket = null;
        if (ticketId) {
          targetTicket = await ticketsAPI.getById(ticketId);
        } else if (ticketList && ticketList.length > 0) {
          targetTicket = ticketList[0];
        }

        if (targetTicket) {
          setTicket(targetTicket);
          setDraftReply(targetTicket.ai_draft_reply || "");
        } else {
          setError("Belum ada tiket keluhan yang dapat dianalisis.");
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicketData();
  }, [ticketId]);

  const handleSelectTicket = (id) => {
    navigate(`/cs/ai-analysis/${id}`);
  };

  const handleCopy = () => {
    if (!draftReply) return;
    navigator.clipboard.writeText(draftReply);
    alert("Draf respon AI berhasil disalin ke clipboard!");
  };

  const handleSend = async () => {
    if (!ticket) return;
    setIsUpdating(true);
    try {
      await ticketsAPI.updateStatus(ticket.id, "RESOLVED");
      alert("Respons terkirim ke customer! Tiket berhasil diselesaikan.");
      navigate("/cs/tickets");
    } catch (err) {
      alert(`Gagal mengirim respon: ${getErrorMessage(err)}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "??";
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  };

  // Loading View
  if (isLoading) {
    return (
      <DashboardLayout role="cs" topbarProps={{ title: "AI Complaint Analysis", subtitle: "Memuat..." }}>
        <div className="p-16 text-center">
          <span className="material-symbols-outlined text-slate-400 text-[48px] animate-spin">
            progress_activity
          </span>
          <p className="text-xs text-slate-500 mt-3">Menganalisis keluhan dengan Lumière Neural AI...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Error View
  if (error || !ticket) {
    return (
      <DashboardLayout role="cs" topbarProps={{ title: "AI Complaint Analysis", subtitle: "Error" }}>
        <div className="p-6 max-w-2xl mx-auto">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
            <span className="material-symbols-outlined text-red-500 text-[48px] mb-3">error</span>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Tiket Tidak Ditemukan</h2>
            <p className="text-xs text-slate-500 mb-6">{error || "Silakan pilih tiket dari antrean."}</p>
            <Button variant="primary" size="md" icon="arrow_back" onClick={() => navigate("/cs/tickets")}>
              Kembali ke Daftar Tiket
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const displayId = `#TK-${String(ticket.id).padStart(4, "0")}`;

  return (
    <DashboardLayout
      role="cs"
      topbarProps={{
        title: `AI Complaint Analysis ${displayId}`,
        subtitle: "Panel konsultasi dan triase keluhan pelanggan berbasis kecerdasan buatan.",
        showInputButton: false,
      }}
    >
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Top Header & Ticket Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              icon="arrow_back"
              onClick={() => navigate(`/cs/tickets/${ticket.id}`)}
            >
              Detail Tiket
            </Button>

            {/* Quick Ticket Switcher Dropdown */}
            {allTickets.length > 1 && (
              <div className="relative inline-flex items-center">
                <select
                  value={ticket.id}
                  onChange={(e) => handleSelectTicket(e.target.value)}
                  className="bg-slate-100/80 border border-slate-200 rounded-full px-3.5 py-1.5 text-xs text-slate-900 appearance-none pr-8 cursor-pointer focus:outline-none focus:bg-white focus:border-slate-400 transition-all font-medium"
                >
                  {allTickets.map((t) => (
                    <option key={t.id} value={t.id} className="bg-white text-slate-900">
                      #TK-{String(t.id).padStart(4, "0")} — {t.customer_name} ({t.product || "Skincare"})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 pointer-events-none" />
              </div>
            )}
          </div>

          {/* View Mode Tabs (Frosted Chat Panel vs Hub & Spoke Diagram) */}
          <div className="flex items-center p-1 bg-slate-100 rounded-full border border-slate-200/80 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === "chat"
                  ? "bg-[#141414] text-white shadow-none"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Frosted Chat Panel</span>
            </button>
            <button
              onClick={() => setActiveTab("diagram")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === "diagram"
                  ? "bg-[#141414] text-white shadow-none"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hub-and-Spoke Diagram</span>
            </button>
          </div>
        </div>

        {/* TAB 1: HUB AND SPOKE CONCEPT DIAGRAM */}
        {activeTab === "diagram" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
              <div className="text-center max-w-2xl mx-auto mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                  AI Multi-Dimensional Extraction
                </span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                  Hub-and-Spoke: Satu Keluhan, 5 Entitas
                </h3>
                <p className="text-xs text-slate-500 mt-1.5">
                  Visualisasi bagaimana AI mengekstrak data esensial dari tiket #{ticket.id} ({ticket.customer_name}) secara real-time.
                </p>
              </div>

              <ConceptDiagram ticketData={ticket} />
            </div>
          </div>
        )}

        {/* TAB 2: FROSTED CHAT PANEL */}
        {activeTab === "chat" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT: FROSTED CHAT THREAD (7 COLS) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>Lumière Neural Consultation</span>
                        <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200/60">
                          LIVE
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Konteks: {ticket.product || "Produk Skincare"} • Batch {ticket.product_batch || "N/A"}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Triage AI v2.4
                  </span>
                </div>

                {/* Message Bubble 1: Pelanggan (Customer Complaint) */}
                <div className="flex items-start gap-3.5 mb-6">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold shrink-0">
                    {getInitials(ticket.customer_name)}
                  </div>
                  <div className="flex flex-col max-w-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900">
                        {ticket.customer_name} (Pelanggan)
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Tiket #{ticket.id}
                      </span>
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-xs bg-slate-50 border border-slate-200/80 text-xs text-slate-800 leading-relaxed">
                      <p className="italic">"{ticket.complaint_text}"</p>
                    </div>
                  </div>
                </div>

                {/* Message Bubble 2: AI Neural Reasoning & Triage */}
                <div className="flex items-start gap-3.5 mb-6">
                  <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col flex-1 max-w-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900">
                        Lumière Neural Engine (AI Analisis)
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Confidence: 96%
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl rounded-tl-xs bg-slate-50 border border-slate-200/80 text-xs text-slate-800 space-y-3">
                      <p className="leading-relaxed">
                        {ticket.ai_analysis || "Mendeteksi kemungkinan reaksi iritasi ringan terhadap bahan aktif produk. Tidak ditemukan indikasi reaksi anafilaksis berbahaya."}
                      </p>

                      {/* Extracted Key Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200 text-[11px]">
                        <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 border border-slate-200 font-medium">
                          SKU: {ticket.product || "Serum"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 border border-slate-200 font-medium">
                          Batch: {ticket.product_batch || "2024-X09"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 border border-slate-200 font-medium">
                          Gejala: {ticket.category || "Reaksi Sensitif"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SOP Clinical Disclaimer */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">
                      Panduan SOP Respons CS:
                    </span>
                    <p className="text-[11px] mt-0.5 leading-relaxed text-slate-600">
                      1. Validasi rasa tidak nyaman pelanggan dengan empati.<br />
                      2. Sarankan stop pemakaian sementara dan kompres air dingin.<br />
                      3. Tawarkan opsi retur/tukar produk bila keluhan berlanjut.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: EDITABLE DRAFT & ACTIONS (5 COLS) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-slate-800" />
                    <h3 className="text-sm font-bold text-slate-900">Draf Respons AI (Dapat Diedit)</h3>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {draftReply.length} chars
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={draftReply}
                      onChange={(e) => setDraftReply(e.target.value)}
                      rows={10}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition-all leading-relaxed resize-none"
                      placeholder="Draf balasan CS..."
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon="content_copy"
                      onClick={handleCopy}
                      className="flex-1"
                    >
                      Salin Teks
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon="send"
                      onClick={handleSend}
                      disabled={isUpdating}
                      className="flex-1"
                    >
                      {isUpdating ? "Memproses..." : "Kirim & Selesaikan"}
                    </Button>
                  </div>

                  {/* Human-in-the-Loop note */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2 text-[11px] text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Draf telah disesuaikan dengan nada empati ramah dan bebas klaim resep obat dokter.
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Summary Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)]">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-3">
                  Informasi Tiket Terkait
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Pelanggan:</span>
                    <strong className="text-slate-900">{ticket.customer_name}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Severity:</span>
                    <strong className="text-amber-600 font-semibold">{ticket.severity || "Moderate"}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Status Saat Ini:</span>
                    <strong className="text-slate-900">{ticket.status}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">CS Ditugaskan:</span>
                    <strong className="text-slate-900">{ticket.assigned_cs || "-"}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AIAnalysisPage;