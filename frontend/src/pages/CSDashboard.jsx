import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/domain/StatCard";
import StatusBadge from "../components/ui/StatusBadge";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { ticketsAPI, getErrorMessage } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";
import dashboardBannerPhoto from "../assets/dashboard_banner_photo.jpg";
import productSerum from "../assets/product_serum.jpg";
import productCleanser from "../assets/product_cleanser.jpg";
import { Sparkles, ArrowRight, ShieldCheck, Timer, AlertTriangle, CheckCircle2, ChevronRight, Activity } from "lucide-react";

// ===== HELPERS =====
const getInitials = (name) => {
  if (!name) return "??";
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
};

const getSeverityBadge = (severity) => {
  if (severity === "High") return "severityHigh";
  if (severity === "Moderate") return "severityModerate";
  return "severityLow";
};

const getStatusBadge = (status) => {
  if (status === "RESOLVED") return "resolved";
  if (status === "IN_REVIEW") return "processing";
  if (status === "FAILED") return "urgent";
  return "pending";
};

const getProductThumbnail = (productName = "") => {
  const p = productName.toLowerCase();
  if (p.includes("cleanser") || p.includes("wash") || p.includes("cream")) {
    return productCleanser;
  }
  return productSerum;
};

const CSDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await ticketsAPI.getAll({ assignedToMe: true });
        setTickets(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // ===== COMPUTE KPI =====
  const kpiCS = {
    myTickets: tickets.length,
    pendingReply: tickets.filter((t) => t.status === "PROCESSING" || t.status === "IN_REVIEW").length,
    resolvedToday: tickets.filter((t) => t.status === "RESOLVED").length,
    urgent: tickets.filter((t) => t.severity === "High").length,
  };

  const priorityTickets = tickets
    .filter((t) => t.severity === "High" || t.status === "PROCESSING")
    .slice(0, 3);

  const userName = user?.full_name?.split(" ")[0] || "Sarah";

  return (
    <DashboardLayout
      role="cs"
      topbarProps={{
        title: "CS Dashboard",
        subtitle: "Workspace antrean tiket dan prioritas penanganan harian",
        showInputButton: true,
      }}
    >
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* ===== EDITORIAL GREETING BANNER WITH PHOTOGRAPH (Asset #5) ===== */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-white/95 via-[#FFF0F5]/80 to-[#E0F2FE]/60 border border-violet-100 shadow-[0_12px_36px_rgba(124,92,255,0.06)] flex flex-col md:flex-row items-center justify-between min-h-[190px]">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-violet-100/40 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text Content */}
          <div className="p-6 sm:p-8 lg:p-10 relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-violet-200/60 text-[11px] font-semibold text-[#7C5CFF] tracking-wider uppercase mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lumière CS Workspace v2.4</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1E1B4B] tracking-tight">
              Good Morning, {userName}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-2 leading-relaxed">
              Anda memiliki <strong className="text-[#EC4899] font-bold">{kpiCS.urgent} tiket prioritas tinggi</strong> yang membutuhkan respons cepat sebelum batas SLA 45 menit.
            </p>

            <div className="flex items-center gap-3 mt-4 pt-2">
              <Button
                variant="primary"
                size="sm"
                icon="bolt"
                onClick={() => navigate("/cs/tickets")}
              >
                Tinjau Antrean Tiket
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon="psychology"
                onClick={() => {
                  if (tickets.length > 0) {
                    navigate(`/cs/ai-analysis/${tickets[0].id}`);
                  } else {
                    navigate("/cs/new-complaint");
                  }
                }}
              >
                Mulai AI Triase
              </Button>
            </div>
          </div>

          {/* Right Photographic Cutout with Soft Blend Edge */}
          <div className="relative w-full md:w-80 lg:w-96 h-48 md:h-full self-stretch shrink-0 overflow-hidden">
            <img
              src={dashboardBannerPhoto}
              alt="Editorial Skincare Serene Portrait Banner"
              className="w-full h-full object-cover object-center select-none"
            />
            {/* Soft left gradient fade into banner background */}
            <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white via-white/70 to-transparent pointer-events-none hidden md:block" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none md:hidden" />
          </div>
        </div>

        {/* ===== 4 KPI METRIC CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Antrean Saya"
            value={kpiCS.myTickets}
            unit="Aktif"
            icon="inbox"
            description={`Total tiket ditugaskan ke ${userName}`}
          />
          <StatCard
            label="Menunggu Balasan"
            value={kpiCS.pendingReply}
            unit="Perlu Aksi"
            icon="hourglass_top"
            accentBar="bg-amber-400"
            description="Menunggu respons dan persetujuan draf"
          />
          <StatCard
            label="Selesai Hari Ini"
            value={kpiCS.resolvedToday}
            unit="Tuntas"
            icon="check_circle"
            accentBar="bg-emerald-500"
            description="Selesai ditangani dengan draf AI"
          />
          <StatCard
            label="Mendesak / Reaktif"
            value={kpiCS.urgent}
            unit="SLA Menipis"
            icon="emergency"
            variant="urgent"
            accentBar="bg-red-500"
            description={`${kpiCS.urgent} tiket severity tinggi`}
          />
        </div>

        {/* ===== LOADING / ERROR ===== */}
        {isLoading && (
          <div className="p-16 text-center">
            <span className="material-symbols-outlined text-slate-400 text-[48px] animate-spin">
              progress_activity
            </span>
            <p className="text-body-sm text-slate-500 mt-3">Sinkronisasi tiket CS...</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
            <span className="material-symbols-outlined text-red-600 text-[20px]">error</span>
            <p className="text-body-sm text-red-600">{error}</p>
          </div>
        )}

        {/* ===== WORKSPACE CONTENT (FULL WIDTH) ===== */}
        {!isLoading && !error && (
          <div className="space-y-6">
            {/* Prioritas Hari Ini (SLA Guard) - Full Width */}
            <Card tier="base" className="p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                      Prioritas Hari Ini (SLA Guard)
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-[11px] font-bold">
                      {priorityTickets.length} Tiket
                    </span>
                  </div>

                  <button
                    onClick={() => navigate("/cs/tickets")}
                    className="text-xs text-slate-600 hover:text-slate-950 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {priorityTickets.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="material-symbols-outlined text-slate-400 text-[48px]">
                      check_circle
                    </span>
                    <p className="text-body-sm text-slate-500 mt-3">
                      Semua tiket prioritas sudah tertangani dengan baik!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {priorityTickets.map((ticket) => {
                      const thumb = getProductThumbnail(ticket.product);
                      return (
                        <article
                          key={ticket.id}
                          className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-800 hover:border-slate-300 transition-all duration-200 flex flex-col gap-3 group"
                        >
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-3">
                              {/* Product Thumbnail */}
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0 relative">
                                <img
                                  src={thumb}
                                  alt={ticket.product || "Skincare Product"}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-bold text-slate-900">
                                    {ticket.customer_name}
                                  </span>
                                  <span className="text-xs font-mono text-slate-500 font-semibold">
                                    #TK-{String(ticket.id).padStart(4, "0")}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">
                                  {ticket.product || "-"} {ticket.product_batch ? `• Batch ${ticket.product_batch}` : ""}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 flex-wrap">
                              <StatusBadge
                                type={getSeverityBadge(ticket.severity)}
                                label={ticket.severity || "N/A"}
                              />
                              <StatusBadge
                                type={getStatusBadge(ticket.status)}
                                label={ticket.status}
                                pulse={ticket.status === "PROCESSING"}
                              />
                            </div>
                          </div>

                          <blockquote className="text-xs text-slate-700 bg-white p-3 rounded-xl italic border border-slate-200/80 leading-relaxed shadow-xs">
                            "{ticket.complaint_text}"
                          </blockquote>

                          {ticket.ai_analysis && (
                            <div className="flex items-start gap-2 p-2.5 px-3 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-700">
                              <Sparkles className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                              <span className="line-clamp-2">
                                <strong className="text-slate-900">AI Triage:</strong> {ticket.ai_analysis}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 flex-wrap gap-2 text-xs">
                            <span className="text-slate-500">
                              CS Ditugaskan: <strong className="text-slate-900">{ticket.assigned_cs || userName}</strong>
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => navigate(`/cs/ai-analysis/${ticket.id}`)}
                                className="px-3 py-1.5 rounded-full bg-white text-slate-700 hover:bg-slate-100 text-xs border border-slate-200/90 transition-colors cursor-pointer font-medium"
                              >
                                Hub & Spoke
                              </button>
                              <Button
                                variant="primary"
                                size="sm"
                                icon="auto_fix_high"
                                onClick={() => navigate(`/cs/tickets/${ticket.id}`)}
                              >
                                Draf Respon AI
                              </Button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </Card>

              {/* Daftar Tiket Saya Table */}
              <Card tier="base" className="overflow-hidden">
                <div className="p-5 bg-white border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 tracking-tight">
                      Daftar Tiket Antrean Saya
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Antrean terverifikasi dan riwayat interaksi harian
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-xs text-slate-600 font-medium">
                    {tickets.length} total tiket
                  </span>
                </div>

                {tickets.length === 0 ? (
                  <div className="p-12 text-center">
                    <span className="material-symbols-outlined text-slate-400 text-[48px] mb-3">
                      inbox
                    </span>
                    <p className="text-xs text-slate-500 mb-4">
                      Belum ada tiket yang ditugaskan ke Anda.
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate("/cs/new-complaint")}
                    >
                      Buat Tiket Baru
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3">ID</th>
                          <th className="px-4 py-3">Pelanggan</th>
                          <th className="px-4 py-3">Masalah</th>
                          <th className="px-4 py-3">Tingkat</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100">
                        {tickets.slice(0, 6).map((ticket) => (
                          <tr
                            key={ticket.id}
                            className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                            onClick={() => navigate(`/cs/tickets/${ticket.id}`)}
                          >
                            <td className="px-4 py-3 font-mono text-slate-500 font-semibold">
                              #TK-{String(ticket.id).padStart(4, "0")}
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              {ticket.customer_name}
                            </td>
                            <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                              {ticket.category || "-"}
                            </td>
                            <td className="px-4 py-3">
                              <StatusBadge
                                type={getSeverityBadge(ticket.severity)}
                                label={ticket.severity || "N/A"}
                              />
                            </td>
                            <td className="px-4 py-3">
                              <StatusBadge
                                type={getStatusBadge(ticket.status)}
                                label={ticket.status}
                                pulse={ticket.status === "PROCESSING"}
                              />
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-slate-900 hover:underline font-medium">
                                Detail →
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>

              {/* AI Assistant Card with Human-in-the-Loop (Paling Bawah) */}
              <Card tier="base" className="p-6 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shadow-xs shrink-0">
                      <Sparkles className="w-5 h-5 text-slate-900" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">
                          AI Triage Copilot
                        </h3>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Lumière Neural v2.4 Active
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Analisis otomatis kategori keluhan, sentimen emosi pelanggan, dan draf respons SOP non-medis.
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    icon="psychology"
                    onClick={() => {
                      if (tickets.length > 0) {
                        navigate(`/cs/ai-analysis/${tickets[0].id}`);
                      } else {
                        navigate("/cs/new-complaint");
                      }
                    }}
                  >
                    Buka AI Complaint Hub
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="material-symbols-outlined text-slate-700 text-[18px]">
                      biotech
                    </span>
                    <span className="font-medium">Deteksi Formula & Kandungan Alergen</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="material-symbols-outlined text-slate-700 text-[18px]">
                      support_agent
                    </span>
                    <span className="font-medium">Rekomendasi Balasan SOP Empatis</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="material-symbols-outlined text-slate-700 text-[18px]">
                      sentiment_satisfied
                    </span>
                    <span className="font-medium">Penyesuaian Nada Bicara Ramah</span>
                  </div>
                </div>

                {/* Human in the loop guarantee */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    <strong className="text-slate-900 font-semibold">Human-in-the-Loop:</strong> AI hanya memberikan rekomendasi draf. Validasi akhir tetap dilakukan oleh agen CS sebelum terkirim.
                  </p>
                </div>
              </Card>
            </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CSDashboard;