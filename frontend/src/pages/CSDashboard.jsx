import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/domain/StatCard";
import StatusBadge from "../components/ui/StatusBadge";
import Card from "../components/ui/Card";
import { kpiCS, tickets } from "../data/mockData";

const CSDashboard = () => {
  const navigate = useNavigate();
  const priorityTickets = tickets.slice(0, 3);

  return (
    <DashboardLayout
      role="cs"
      topbarProps={{
        title: "Good morning, Sarah 👋",
        subtitle: "Berikut ringkasan tiket yang perlu kamu tangani hari ini.",
        showInputButton: true,
      }}
    >
      <div className="p-6 space-y-6">
        {/* ===== SLA ALERT BANNER ===== */}
        <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-error-container/40 text-error">
              <span className="material-symbols-outlined text-[20px]">timer</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-label-sm text-error uppercase tracking-wider">Perhatian SLA Kritis</span>
                <span className="text-body-sm text-on-surface-variant">• 15 Menit Sisa Respon</span>
              </div>
              <p className="text-headline-sm text-primary">
                3 tiket prioritas mendekati batas toleransi balasan pertama.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/cs/tickets")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-cyan text-on-primary-container text-headline-sm shadow-cyan-glow hover:brightness-110 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">filter_list</span>
            Lihat Semua Prioritas
          </button>
        </section>

        {/* ===== 4 KPI CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Antrean Saya" value={kpiCS.myTickets} unit="Aktif" icon="inbox" description="Total tiket ditugaskan ke Sarah" />
          <StatCard label="Menunggu Balasan" value={kpiCS.pendingReply} unit="Perlu Aksi" icon="hourglass_top" description="Menunggu respons dan persetujuan draf" />
          <StatCard label="Selesai Hari Ini" value={kpiCS.resolvedToday} unit={kpiCS.resolvedTrend} icon="check_circle" description="Selesai ditangani dengan CSAT 98%" />
          <StatCard label="Mendesak / Reaktif" value={kpiCS.urgent} unit="SLA Menipis" icon="emergency" variant="urgent" description="3 tiket agent dari 11 tiket urgent tim" />
        </div>

        {/* ===== 2-COLUMN WORKSPACE ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: PRIORITY + TABLE ===== */}
          <div className="lg:col-span-8 space-y-6">
            {/* Prioritas Hari Ini */}
            <Card tier="base" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
                <h2 className="text-headline-md text-primary font-semibold">Prioritas Hari Ini</h2>
                <span className="px-2 py-0.5 rounded bg-error-container text-error text-label-sm font-bold">
                  3 Tiket Mendesak
                </span>
              </div>

              <div className="space-y-4">
                {priorityTickets.map((ticket) => (
                  <article
                    key={ticket.id}
                    className="p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors border border-outline-variant/20"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary-container text-primary flex items-center justify-center text-headline-sm font-bold">
                          {ticket.customerInitials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-headline-sm text-primary font-semibold">
                              {ticket.customer}
                            </span>
                            <StatusBadge type="gold" label={ticket.customerTier} />
                            <span className="text-code-sm text-on-surface-variant">{ticket.id}</span>
                          </div>
                          <p className="text-body-sm text-on-surface-variant mt-0.5">
                            {ticket.product} (Batch {ticket.productBatch})
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <StatusBadge
                          type={
                            ticket.severity === "High"
                              ? "urgent"
                              : ticket.severity === "Moderate"
                              ? "moderate"
                              : "severityLow"
                          }
                          label={ticket.severityLabel}
                        />
                        <StatusBadge
                          type={ticket.sentiment.toLowerCase()}
                          label={`${ticket.sentiment} ${ticket.sentimentEmoji}`}
                        />
                        <span className="px-2 py-0.5 rounded bg-surface-container-high text-error text-label-sm font-semibold">
                          {ticket.slaRemaining}
                        </span>
                      </div>
                    </div>

                    <blockquote className="text-body-md text-on-surface bg-surface-container-lowest/60 p-3 rounded mb-3 italic">
                      "{ticket.complaint}"
                    </blockquote>

                    {ticket.aiAnalysis && (
                      <div className="flex items-start gap-2 p-2 px-3 rounded bg-surface-container-highest text-primary-fixed-dim text-body-sm mb-3">
                        <span className="material-symbols-outlined text-[16px] text-brand-cyan shrink-0 mt-0.5">
                          psychology
                        </span>
                        <span>
                          <strong className="text-brand-cyan">AI Triage:</strong>{" "}
                          {ticket.aiAnalysis.keyConcern}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
                      <span className="text-body-sm text-on-surface-variant">
                        Masuk {ticket.sla} yang lalu
                      </span>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-variant text-on-surface text-label-md transition-colors">
                          Eskalasi Medis
                        </button>
                        <button
                          onClick={() => navigate(`/cs/tickets/${ticket.id.replace("#", "")}`)}
                          className="flex items-center gap-1 px-4 py-1.5 rounded bg-brand-cyan text-on-primary-container text-label-md font-bold hover:brightness-105 shadow-sm transition-all"
                        >
                          <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
                          Lihat Detail & Draf
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </Card>

            {/* Daftar Tiket Saya */}
            <Card tier="base" className="overflow-hidden">
              <div className="p-5 bg-surface-container-high/40 flex items-center justify-between">
                <div>
                  <h2 className="text-headline-md text-primary font-semibold">Daftar Tiket Saya</h2>
                  <p className="text-body-sm text-on-surface-variant">
                    Antrean terverifikasi dan riwayat interaksi harian
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-body-sm">
                  <thead className="bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Pelanggan</th>
                      <th className="px-4 py-3">Masalah</th>
                      <th className="px-4 py-3">Tingkat</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {tickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-surface-container-high/40 transition-colors">
                        <td className="px-4 py-3 text-code-sm text-brand-cyan font-semibold">{ticket.id}</td>
                        <td className="px-4 py-3 text-primary">{ticket.customer}</td>
                        <td className="px-4 py-3 text-on-surface-variant max-w-xs truncate">{ticket.category}</td>
                        <td className="px-4 py-3">
                          <StatusBadge
                            type={ticket.severity === "High" ? "severityHigh" : ticket.severity === "Moderate" ? "severityModerate" : "severityLow"}
                            label={ticket.severity}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge
                            type={ticket.status === "RESOLVED" ? "resolved" : ticket.status === "IN_REVIEW" ? "processing" : "pending"}
                            label={ticket.statusLabel}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => navigate(`/cs/tickets/${ticket.id.replace("#", "")}`)}
                            className="text-brand-cyan hover:text-primary-fixed text-label-md underline"
                          >
                            Lihat
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* RIGHT: AI ASSISTANT WIDGET ===== */}
          <div className="lg:col-span-4 space-y-6">
            <Card tier="high" className="p-6 relative overflow-hidden" glow>
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-cyan text-on-primary-container flex items-center justify-center shadow-cyan-glow">
                    <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                  </div>
                  <div>
                    <h3 className="text-headline-sm text-primary font-semibold">AI Assistant</h3>
                    <p className="text-label-sm text-primary-fixed-dim">Lumière Neural v2.4</p>
                  </div>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-brand-cyan shadow-cyan-glow"></span>
              </div>

              <p className="text-body-sm text-on-surface-variant mb-4">
                Analisis otomatis kategori keluhan, sentimen pelanggan, dan draf respons operasional CS.
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 p-2 rounded bg-surface-container-lowest/40 text-body-sm text-on-surface">
                  <span className="material-symbols-outlined text-brand-cyan text-[16px]">biotech</span>
                  Deteksi Bahan & Batch Alergen Otomatis
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-surface-container-lowest/40 text-body-sm text-on-surface">
                  <span className="material-symbols-outlined text-brand-cyan text-[16px]">support_agent</span>
                  Rekomendasi Respons SOP & Bantuan CS
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-surface-container-lowest/40 text-body-sm text-on-surface">
                  <span className="material-symbols-outlined text-brand-cyan text-[16px]">sentiment_satisfied</span>
                  Personalisasi Nada Bicara Empatik
                </div>
              </div>

              <button className="w-full py-2.5 rounded-lg bg-brand-cyan text-on-primary-container text-headline-sm font-semibold hover:brightness-105 shadow-cyan-glow transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
                Buka AI Analysis
              </button>

              <div className="mt-4 p-3 rounded-lg bg-surface-container-lowest/60 border border-outline-variant/40 flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-brand-cyan shrink-0 mt-0.5">verified_user</span>
                <p className="text-label-sm text-on-surface-variant leading-relaxed">
                  <strong className="text-brand-cyan">Human-in-the-Loop:</strong> AI menyusun analisis pendukung dan draf balasan. Keputusan akhir tetap ditinjau oleh agen CS.
                </p>
              </div>
            </Card>

            {/* Aktivitas Terkini */}
            <Card tier="base" className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-headline-sm text-primary font-semibold">Aktivitas Terkini</h3>
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">stream</span>
              </div>

              <div className="space-y-3">
                {[
                  { icon: "auto_fix_high", text: "AI menyelesaikan analisis formula batch #GB-2401 untuk #TK-1042", time: "8 menit lalu" },
                  { icon: "drafts", text: "Draf respons empati otomatis dibuat untuk #TK-1041", time: "18 menit lalu" },
                  { icon: "check_circle", text: "#TK-1035 ditandai Selesai oleh Sarah", time: "35 menit lalu" },
                  { icon: "assignment_ind", text: "Tiket baru #TK-1043 ditugaskan ke antrean Sarah", time: "1 jam lalu" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest text-brand-cyan flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-body-sm text-on-surface leading-snug">{item.text}</p>
                      <span className="text-label-sm text-on-surface-variant">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CSDashboard;