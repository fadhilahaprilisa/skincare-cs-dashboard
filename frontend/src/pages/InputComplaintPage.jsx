import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import StatusBadge from "../components/ui/StatusBadge";

const InputComplaintPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: "Dilah Arisanti",
    whatsapp: "+62 812-8921-9481",
    product: "Ceramide Barrier Soothing Moisturizer (Batch #GB-2024A)",
    category: "Iritasi",
    complaint: "",
    severity: "Moderate",
  });

  const categories = ["Iritasi", "Reaksi Kulit", "Produk", "Pengiriman", "Kemasan", "Lainnya"];

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

  const handleSubmit = () => {
    if (!formData.complaint.trim()) {
      alert("Deskripsi keluhan wajib diisi!");
      return;
    }
    alert("Tiket berhasil dibuat! AI sedang menganalisis keluhan...");
    setTimeout(() => navigate("/cs/dashboard"), 1500);
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
        {/* ===== PAGE HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1 text-label-sm uppercase tracking-wider text-on-surface-variant">
              <span className="cursor-pointer hover:text-brand-cyan" onClick={() => navigate("/cs/dashboard")}>
                Dashboard
              </span>
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
              Catat keluhan customer untuk dibuat menjadi tiket dan dianalisis secara instan dengan bantuan AI Lumière Neural.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon="close" onClick={() => navigate(-1)}>
              Batal
            </Button>
            <Button variant="secondary" size="sm" icon="drafts">
              Simpan Draf
            </Button>
          </div>
        </div>

        {/* ===== 2-COLUMN WORKSPACE ===== */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* ===== LEFT: FORM (7 cols) ===== */}
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
                {/* Nama Customer */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-label-md text-on-surface font-semibold">Nama Customer</label>
                    <button className="text-brand-cyan hover:text-primary-fixed text-label-sm font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">person_add</span>
                      + Customer Baru
                    </button>
                  </div>
                  <Input
                    icon="search"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Cari atau masukkan nama customer..."
                  />
                </div>

                {/* Profile Preview */}
                <div className="p-4 rounded-lg bg-surface-container flex items-center justify-between relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-cyan"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest text-brand-cyan flex items-center justify-center text-headline-md font-bold">
                      DA
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-headline-sm text-primary font-bold">Dilah Arisanti</span>
                        <StatusBadge type="gold" label="Gold Member" />
                      </div>
                      <div className="flex items-center gap-2 text-body-sm text-on-surface-variant mt-0.5">
                        <span>9 transaksi</span>
                        <span>•</span>
                        <span className="text-[#FFC048]">3 tiket sebelumnya</span>
                        <span>•</span>
                        <span>Pelanggan sejak Feb 2023</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp + Product */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nomor WhatsApp Pelanggan"
                    icon="chat"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    hint="Terhubung dengan gateway WhatsApp Business"
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-on-surface font-semibold">
                      Produk Terkait & Batch
                    </label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-2.5 px-3 text-body-md text-on-surface focus:outline-none focus:border-brand-cyan transition-all appearance-none"
                    >
                      <option>Ceramide Barrier Soothing Moisturizer (Batch #GB-2024A)</option>
                      <option>Retinol 0.5% Night Elixir (Batch #RT-2024B)</option>
                      <option>AHA/BHA Clarifying Toner (Batch #AH-2024C)</option>
                    </select>
                    <span className="text-label-sm text-on-surface-variant">
                      Exp: Des 2026 • Formula Hypoallergenic
                    </span>
                  </div>
                </div>

                {/* Kategori Chips */}
                <div className="flex flex-col gap-2">
                  <label className="text-label-md text-on-surface font-semibold">Kategori Keluhan Utama</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`px-3 py-1.5 rounded-lg text-headline-sm flex items-center gap-1.5 transition-all ${
                          formData.category === cat
                            ? "bg-brand-cyan text-on-primary-container font-semibold shadow-cyan-glow"
                            : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        {cat === "Iritasi" && <span className="material-symbols-outlined text-[16px]">warning</span>}
                        {cat === "Reaksi Kulit" && <span className="material-symbols-outlined text-[16px]">vital_signs</span>}
                        {cat === "Produk" && <span className="material-symbols-outlined text-[16px]">inventory_2</span>}
                        {cat === "Pengiriman" && <span className="material-symbols-outlined text-[16px]">local_shipping</span>}
                        {cat === "Kemasan" && <span className="material-symbols-outlined text-[16px]">package_2</span>}
                        {cat === "Lainnya" && <span className="material-symbols-outlined text-[16px]">more_horiz</span>}
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
                      Detail Keluhan & Lampiran
                    </h2>
                    <p className="text-label-sm text-on-surface-variant">
                      Deskripsi objektif kata per kata dari pesan pembeli
                    </p>
                  </div>
                </div>
                <StatusBadge type="processing" label="Langkah 2/2" />
              </div>

              <div className="p-6 flex flex-col gap-5">
                {/* Textarea */}
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
                    onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                    rows={5}
                    placeholder="Contoh: Kulit saya merah saat memakai pelembab selama 5 hari. Saya juga merasa sedikit perih setelah pemakaian, terutama di area pipi kanan."
                  />
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-surface-container text-body-sm text-on-surface-variant mt-1">
                    <span className="material-symbols-outlined text-brand-cyan text-[16px] shrink-0 mt-0.5">info</span>
                    <span>
                      <strong>Panduan Agen:</strong> Gunakan informasi yang disampaikan customer. Hindari menambahkan diagnosis atau asumsi medis.
                    </span>
                  </div>
                </div>

                {/* Upload Attachment */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="text-label-md text-on-surface font-semibold">
                      Lampiran Bukti
                    </label>
                    <span className="text-label-sm text-brand-cyan">Maks. 3 file (PNG, JPG, PDF)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: "photo_camera", label: "Foto Kondisi Kulit" },
                      { icon: "forum", label: "Screenshot Chat WA" },
                      { icon: "qr_code_scanner", label: "Bukti Batch / Segel" },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        className="p-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all flex flex-col items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-surface"
                      >
                        <span className="material-symbols-outlined text-brand-cyan text-[22px]">{item.icon}</span>
                        <span className="text-label-sm font-medium text-center">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prioritas Awal */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-label-md text-on-surface font-semibold">
                      Prioritas Awal (CS Initial Assessment)
                    </label>
                    <span className="text-code-sm text-[#FFC048] bg-[#FFC048]/10 px-2 py-0.5 rounded">
                      SLA: 2 Jam
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Perlu Perhatian", sublabel: "Moderate (SLA 2 Jam)", icon: "warning", color: "#FFC048", active: true },
                      { label: "Normal", sublabel: "SLA 24 Jam", icon: "sentiment_satisfied", color: "#2ED573", active: false },
                      { label: "Mendesak", sublabel: "Urgent (SLA 30 Mnt)", icon: "emergency", color: "#FF4D4D", active: false },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFormData({ ...formData, severity: item.label })}
                        className={`p-3 rounded-lg text-center flex flex-col items-center gap-1 transition-all ${
                          item.active
                            ? "bg-surface-container-high shadow-cyan-inset border border-brand-cyan/30"
                            : "bg-surface-container hover:bg-surface-container-high"
                        }`}
                      >
                        <span className="material-symbols-outlined" style={{ color: item.color }}>
                          {item.icon}
                        </span>
                        <span className="text-headline-sm text-primary font-semibold">{item.label}</span>
                        <span className="text-label-sm text-on-surface-variant">{item.sublabel}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* ===== RIGHT: AI PREVIEW (5 cols) ===== */}
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
                      Modul Analisis Triase & Sentimen Skincare
                    </p>
                  </div>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-brand-cyan shadow-cyan-glow animate-pulse"></span>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                  Setelah tiket diterbitkan, engine AI akan otomatis memproses teks pengaduan secara non-medis untuk mendukung respons SOP cepat.
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
                          step.active ? "text-primary font-semibold" : "text-on-surface-variant"
                        }`}
                      >
                        {step.label}
                      </span>
                      {step.active && (
                        <span className="material-symbols-outlined text-brand-cyan text-[14px]">
                          check_circle
                        </span>
                      )}
                      {step.next && (
                        <span className="text-code-sm text-brand-cyan text-[10px]">Next</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Checklist */}
                <div className="flex flex-col gap-2">
                  <span className="text-label-md text-on-surface font-semibold">
                    Kelayakan Sebelum Analisis
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      "Data profil customer teridentifikasi",
                      "Produk & nomor batch terdaftar di inventori",
                      "Deskripsi keluhan melebihi ambang batas kata",
                      "Foto bukti visual kulit terlampir",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-body-sm">
                        <span className="material-symbols-outlined text-brand-cyan text-[16px]">
                          check_box
                        </span>
                        <span className="text-on-surface">{item}</span>
                      </div>
                    ))}
                  </div>
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
                        <span className="material-symbols-outlined text-[12px]">{out.icon}</span>
                        {out.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-3 rounded-lg bg-surface-container-lowest flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px] mt-0.5">shield</span>
                  <p className="text-label-sm text-on-surface-variant leading-relaxed">
                    <strong>Human-in-the-loop:</strong> AI memberikan analisis pendukung dan draf balasan. Keputusan dan respons akhir tetap ditinjau oleh CS.
                  </p>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    icon="auto_awesome"
                    className="w-full"
                    onClick={handleSubmit}
                  >
                    Buat Tiket & Analisis dengan AI
                  </Button>
                  <Button variant="secondary" size="md" icon="save" className="w-full">
                    Simpan sebagai Draft Tiket
                  </Button>
                </div>
              </div>
            </Card>

            {/* Mini Stat Tile */}
            <Card tier="base" className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-brand-cyan">
                  <span className="material-symbols-outlined text-[20px]">speed</span>
                </div>
                <div>
                  <span className="text-label-sm text-on-surface-variant">
                    Rata-rata Waktu Triase AI
                  </span>
                  <p className="text-headline-md text-primary font-bold">1.4 Detik / Kasus</p>
                </div>
              </div>
              <StatusBadge type="aiReady" label="AI-Assisted" />
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InputComplaintPage;