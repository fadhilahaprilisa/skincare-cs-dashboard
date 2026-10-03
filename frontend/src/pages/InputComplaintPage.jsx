import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import StatusBadge from "../components/ui/StatusBadge";
import { ticketsAPI, getErrorMessage } from "../lib/api";

const InputComplaintPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: "",
    whatsapp: "",
    product: "Ceramide Barrier Moisturizer",
    productBatch: "#GB-2024A",
    category: "Iritasi",
    complaint: "",
    severity: "Moderate",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const categories = ["Iritasi", "Reaksi Kulit", "Produk", "Pengiriman", "Kemasan", "Lainnya"];

  const severityOptions = [
    { label: "Perlu Perhatian", sublabel: "Moderate (SLA 2 Jam)", icon: "warning", color: "#FFC048", value: "Moderate" },
    { label: "Normal", sublabel: "Low (SLA 24 Jam)", icon: "sentiment_satisfied", color: "#2ED573", value: "Low" },
    { label: "Mendesak", sublabel: "High (SLA 30 Mnt)", icon: "emergency", color: "#FF4D4D", value: "High" },
  ];

  const pipelineSteps = [
    { num: 1, label: "Keluhan Diterima", active: true },
    { num: 2, label: "Triase NLP & Ekstraksi Reaksi", next: true },
    { num: 3, label: "Deteksi Gejala, Severity & Sentimen" },
    { num: 4, label: "Rekomendasi Respons & SOP Produk" },
    { num: 5, label: "Human CS Final Approval" },
  ];

  const outputs = [
    { icon: "label", label: "Keluhan & Gejala Terdeteksi", color: "text-brand-cyan" },
    { icon: "biotech", label: "Korelasi Formulasi", color: "text-tertiary-fixed-dim" },
    { icon: "analytics", label: "Tingkat Severity", color: "text-[#FFC048]" },
    { icon: "mood_bad", label: "Skor Sentimen Customer", color: "text-on-surface" },
    { icon: "auto_fix_high", label: "Draf Balasan SOP", color: "text-[#2ED573]" },
  ];

  const handleSubmit = async () => {
    setError(null);

    // Validasi
    if (!formData.customerName.trim()) {
      setError("Nama customer wajib diisi");
      return;
    }
    if (!formData.complaint.trim()) {
      setError("Deskripsi keluhan wajib diisi");
      return;
    }
    if (formData.complaint.trim().length < 20) {
      setError("Deskripsi keluhan minimal 20 karakter");
      return;
    }

    setIsSubmitting(true);
    try {
      await ticketsAPI.create({
        customer_name: formData.customerName,
        complaint_text: formData.complaint,
        product: formData.product,
        product_batch: formData.productBatch,
        category: formData.category,
        severity: formData.severity,
      });
      // Redirect ke My Tickets setelah sukses
      navigate("/cs/tickets");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout
      role="cs"
      topbarProps={{
        title: "Input Keluhan Customer",
        subtitle: "Catat keluhan customer untuk dianalisis AI",
        showInputButton: false,
      }}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1 text-label-sm uppercase tracking-wider text-on-surface-variant">
              <button
                onClick={() => navigate("/cs/dashboard")}
                className="cursor-pointer hover:text-brand-cyan"
              >
                Dashboard
              </button>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-brand-cyan">New Complaint Intake</span>
            </nav>
            <div className="flex items-center gap-2">
              <h1 className="text-headline-lg text-primary font-bold tracking-tight">
                Input Keluhan Customer
              </h1>
              <StatusBadge type="processing" label="Triage Intake Mode" />
            </div>
            <p className="text-body-sm text-on-surface-variant max-w-2xl">
              Catat keluhan customer untuk dibuat menjadi tiket dan dianalisis secara instan
              dengan bantuan AI Lumière Neural.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon="close"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-lg bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#FF4D4D] text-[20px] shrink-0">
              error
            </span>
            <div className="flex-1">
              <p className="text-body-md text-[#FF4D4D] font-semibold">Validasi Gagal</p>
              <p className="text-body-sm text-[#FF4D4D]/80 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* LEFT: FORM */}
          <div className="xl:col-span-7 flex flex-col gap-6 min-w-0">
            {/* Card 1: Data Customer */}
            <Card tier="base" className="overflow-hidden">
              <div className="px-6 py-4 bg-surface-container flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-cyan/15 flex items-center justify-center text-brand-cyan">
                    <span className="material-symbols-outlined text-[18px]">badge</span>
                  </div>
                  <div>
                    <h2 className="text-headline-sm text-primary font-semibold">
                      Data Customer & Kontak
                    </h2>
                    <p className="text-label-sm text-on-surface-variant">
                      Identifikasi pelanggan dan riwayat penggunaan formula
                    </p>
                  </div>
                </div>
                <StatusBadge type="processing" label="Langkah 1/2" />
              </div>

              <div className="p-6 flex flex-col gap-4">
                <Input
                  label="Nama Customer"
                  icon="person"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  placeholder="Masukkan nama customer..."
                  disabled={isSubmitting}
                  required
                />

                <Input
                  label="Nomor WhatsApp Pelanggan"
                  icon="chat"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="+62 812-XXXX-XXXX"
                  disabled={isSubmitting}
                  hint="Terhubung dengan gateway WhatsApp Business"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-on-surface font-semibold">
                      Produk Terkait
                    </label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-2.5 px-3 text-body-md text-on-surface focus:outline-none focus:border-brand-cyan transition-all appearance-none"
                    >
                      <option>Ceramide Barrier Moisturizer</option>
                      <option>Retinol 0.5% Night Elixir</option>
                      <option>AHA/BHA Clarifying Toner</option>
                      <option>Gentle Hydrating Amino Cleanser</option>
                      <option>UV Water Shield SPF 50+</option>
                    </select>
                  </div>
                  <Input
                    label="Nomor Batch"
                    value={formData.productBatch}
                    onChange={(e) =>
                      setFormData({ ...formData, productBatch: e.target.value })
                    }
                    placeholder="#GB-2024A"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Kategori Chips */}
                <div className="flex flex-col gap-2">
                  <label className="text-label-md text-on-surface font-semibold">
                    Kategori Keluhan Utama
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFormData({ ...formData, category: cat })}
                        disabled={isSubmitting}
                        className={`px-3 py-1.5 rounded-lg text-headline-sm flex items-center gap-1.5 transition-all ${
                          formData.category === cat
                            ? "bg-brand-cyan text-on-primary-container font-semibold shadow-cyan-glow"
                            : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 2: Detail Keluhan */}
            <Card tier="base" className="overflow-hidden">
              <div className="px-6 py-4 bg-surface-container flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-cyan/15 flex items-center justify-center text-brand-cyan">
                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  </div>
                  <div>
                    <h2 className="text-headline-sm text-primary font-semibold">
                      Detail Keluhan
                    </h2>
                    <p className="text-label-sm text-on-surface-variant">
                      Deskripsi objektif dari pesan pembeli
                    </p>
                  </div>
                </div>
                <StatusBadge type="processing" label="Langkah 2/2" />
              </div>

              <div className="p-6 flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-label-md text-on-surface font-semibold">
                      Deskripsi Keluhan Pelanggan
                    </label>
                    <span className="text-label-sm text-on-surface-variant">
                      {formData.complaint.length} karakter
                    </span>
                  </div>
                  <Textarea
                    value={formData.complaint}
                    onChange={(e) =>
                      setFormData({ ...formData, complaint: e.target.value })
                    }
                    rows={5}
                    disabled={isSubmitting}
                    placeholder="Contoh: Kulit saya merah saat memakai pelembab selama 5 hari..."
                  />
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-surface-container text-body-sm text-on-surface-variant mt-1">
                    <span className="material-symbols-outlined text-brand-cyan text-[16px] shrink-0 mt-0.5">
                      info
                    </span>
                    <span>
                      <strong>Panduan Agen:</strong> Gunakan informasi yang disampaikan
                      customer. Hindari menambahkan diagnosis atau asumsi medis.
                    </span>
                  </div>
                </div>

                {/* Prioritas */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-label-md text-on-surface font-semibold">
                      Prioritas Awal
                    </label>
                    <span className="text-code-sm text-[#FFC048] bg-[#FFC048]/10 px-2 py-0.5 rounded">
                      SLA: 2 Jam
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {severityOptions.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => setFormData({ ...formData, severity: item.value })}
                        disabled={isSubmitting}
                        className={`p-3 rounded-lg text-center flex flex-col items-center gap-1 transition-all ${
                          formData.severity === item.value
                            ? "bg-surface-container-high shadow-cyan-inset border border-brand-cyan/30"
                            : "bg-surface-container hover:bg-surface-container-high"
                        }`}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ color: item.color }}
                        >
                          {item.icon}
                        </span>
                        <span className="text-headline-sm text-primary font-semibold">
                          {item.label}
                        </span>
                        <span className="text-label-sm text-on-surface-variant">
                          {item.sublabel}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT: AI PREVIEW */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            <Card tier="high" className="overflow-hidden shadow-cyan-inset" glow>
              <div className="p-5 bg-surface-container flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-cyan text-on-primary-container flex items-center justify-center shadow-cyan-glow">
                    <span className="material-symbols-outlined text-[20px]">psychology</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-headline-sm text-primary font-bold">
                        AI Complaint Assistant
                      </h3>
                      <StatusBadge type="aiReady" label="v2.4 Neural" />
                    </div>
                    <p className="text-label-sm text-on-surface-variant">
                      Modul Analisis Triase & Sentimen
                    </p>
                  </div>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-brand-cyan shadow-cyan-glow animate-pulse"></span>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                  Setelah tiket diterbitkan, engine AI akan otomatis memproses teks
                  pengaduan secara non-medis untuk mendukung respons SOP cepat.
                </p>

                {/* Pipeline */}
                <div className="flex flex-col gap-2 p-4 rounded-lg bg-surface-container-lowest">
                  <span className="text-label-sm text-on-surface-variant font-semibold tracking-wider uppercase mb-1">
                    Alur Pipeline Otomatisasi
                  </span>
                  {pipelineSteps.map((step) => (
                    <div
                      key={step.num}
                      className={`flex items-center gap-3 p-2 rounded ${
                        step.active
                          ? "bg-surface-container"
                          : step.next
                          ? "bg-surface-container-low"
                          : "bg-surface-container-low opacity-60"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          step.active
                            ? "bg-brand-cyan text-on-primary-container"
                            : step.next
                            ? "bg-surface-container-high text-brand-cyan"
                            : "bg-surface-container-high text-on-surface-variant"
                        }`}
                      >
                        {step.num}
                      </span>
                      <span
                        className={`text-body-sm flex-1 ${
                          step.active
                            ? "text-primary font-semibold"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Output Tags */}
                <div className="flex flex-col gap-2">
                  <span className="text-label-md text-on-surface font-semibold">
                    Output yang Akan Dihasilkan:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {outputs.map((out, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded bg-surface-container-high ${out.color} text-label-sm flex items-center gap-1`}
                      >
                        <span className="material-symbols-outlined text-[12px]">
                          {out.icon}
                        </span>
                        {out.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-surface-container-lowest flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px] mt-0.5">
                    shield
                  </span>
                  <p className="text-label-sm text-on-surface-variant leading-relaxed">
                    <strong>Human-in-the-loop:</strong> AI memberikan analisis pendukung
                    dan draf balasan. Keputusan dan respons akhir tetap ditinjau oleh CS.
                  </p>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={isSubmitting ? "progress_activity" : "auto_awesome"}
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "AI sedang menganalisis..."
                      : "Buat Tiket & Analisis dengan AI"}
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    icon="save"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    Simpan sebagai Draft
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InputComplaintPage;