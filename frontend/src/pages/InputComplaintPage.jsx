import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import StatusBadge from "../components/ui/StatusBadge";
import { ticketsAPI, getErrorMessage } from "../lib/api";
import { tokenStorage } from "../lib/auth";
import { useToast } from "../context/ToastContext";

const InputComplaintPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  // Deteksi role aktif dari URL path atau tokenStorage
  const currentUser = tokenStorage.getUser();
  const currentRole = location.pathname.startsWith("/admin")
    ? "admin"
    : (currentUser?.role || "cs");

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

  // State untuk attachment
  const [attachments, setAttachments] = useState([]);

  const handleUploadAttachment = () => {
    const fakeFile = {
      name: `complaint_${Date.now()}.jpg`,
      size: "2.4 MB",
      type: "JPG",
    };
    setAttachments([...attachments, fakeFile]);
    toast.success("Lampiran Foto Berhasil Diunggah", {
      description: fakeFile.name,
    });
  };

  const handleRemoveAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSaveDraft = () => {
    const previousDraft = localStorage.getItem("complaint_draft");
    localStorage.setItem("complaint_draft", JSON.stringify(formData));
    
    toast.success("Draf Disimpan", {
      description: "Data keluhan disimpan ke penyimpanan lokal.",
      action: {
        label: "Undo",
        onClick: () => {
          if (previousDraft) {
            localStorage.setItem("complaint_draft", previousDraft);
            try {
              setFormData(JSON.parse(previousDraft));
            } catch (e) {
              // ignore
            }
          } else {
            localStorage.removeItem("complaint_draft");
            setFormData({
              customerName: "",
              whatsapp: "",
              product: "Ceramide Barrier Moisturizer",
              productBatch: "#GB-2024A",
              category: "Iritasi",
              complaint: "",
              severity: "Moderate",
            });
          }
          toast.info("Penyimpanan Draf Dibatalkan (Undo)");
        },
      },
    });
  };

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

    if (!formData.customerName.trim()) {
      setError("Nama customer wajib diisi");
      toast.warning("Form Belum Lengkap", {
        description: "Nama customer wajib diisi sebelum analisis.",
      });
      return;
    }
    if (!formData.complaint.trim()) {
      setError("Deskripsi keluhan wajib diisi");
      toast.warning("Form Belum Lengkap", {
        description: "Deskripsi keluhan wajib diisi.",
      });
      return;
    }
    if (formData.complaint.trim().length < 20) {
      setError("Deskripsi keluhan minimal 20 karakter");
      toast.warning("Deskripsi Terlalu Singkat", {
        description: "Deskripsi keluhan minimal 20 karakter agar AI akurat.",
      });
      return;
    }

    setIsSubmitting(true);
    const toastId = "create-ticket-process";

    // 1. Tampilkan toast loading: "Menganalisis keluhan dengan AI..."
    toast.loading("Menganalisis keluhan dengan AI...", {
      id: toastId,
      description: "Memproses triase NLP, deteksi gejala, dan draf SOP...",
    });

    try {
      const createdTicket = await ticketsAPI.create({
        customer_name: formData.customerName,
        complaint_text: formData.complaint,
        product: formData.product,
        product_batch: formData.productBatch,
        category: formData.category,
        severity: formData.severity,
      });

      const ticketCode = createdTicket?.id 
        ? `#TK-${String(createdTicket.id).padStart(4, "0")}` 
        : "Tiket Baru";

      // 2. Setelah selesai, ubah menjadi toast success dengan action button "Lihat Tiket"
      toast.success(`${ticketCode} Berhasil Dibuat`, {
        id: toastId,
        description: "Analisis AI selesai dan draf balasan SOP telah tersedia.",
        action: {
          label: "Lihat Tiket",
          onClick: () => {
            if (createdTicket?.id) {
              navigate(`/cs/tickets/${createdTicket.id}`);
            } else {
              navigate(currentRole === "admin" ? "/admin/tickets" : "/cs/tickets");
            }
          },
        },
      });

      navigate(currentRole === "admin" ? "/admin/tickets" : "/cs/tickets");
    } catch (err) {
      const errMsg = getErrorMessage(err);
      setError(errMsg);
      toast.error("Gagal Membuat Tiket", {
        id: toastId,
        description: errMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const dashboardRoute = currentRole === "admin" ? "/admin/dashboard" : "/cs/dashboard";

  return (
    <DashboardLayout
      role={currentRole}
      topbarProps={{
        title: "Input Keluhan Customer",
        subtitle: "Catat keluhan customer untuk dibuat tiket dan dianalisis secara instan dengan AI.",
        showSearch: false,
        showInputButton: false,
      }}
    >
      <div className="p-6 space-y-6">
        {/* Page Toolbar (Breadcrumbs + Mode Tag + Action Batal) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <nav className="flex items-center gap-1.5 text-xs text-slate-400">
              <button
                onClick={() => navigate(dashboardRoute)}
                className="cursor-pointer hover:text-slate-900 transition-colors"
              >
                Dashboard
              </button>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-slate-900 font-semibold">New Complaint Intake</span>
            </nav>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-200">
              Triage Intake Mode
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
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
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
            <span className="material-symbols-outlined text-red-500 text-[20px] shrink-0">
              error
            </span>
            <div className="flex-1">
              <p className="text-sm text-red-800 font-semibold">Validasi Gagal</p>
              <p className="text-xs text-red-600 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* LEFT: FORM */}
          <div className="xl:col-span-7 flex flex-col gap-6 min-w-0">
            {/* Card 1: Data Customer */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                    <span className="material-symbols-outlined text-[18px]">badge</span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 tracking-tight">
                      Data Customer & Kontak
                    </h2>
                    <p className="text-xs text-slate-500">
                      Identifikasi pelanggan dan riwayat penggunaan formula
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Langkah 1/2
                  </span>
                </div>
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
                    <label className="text-xs font-semibold text-slate-700">
                      Produk Terkait
                    </label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full bg-slate-100/80 border border-slate-200 rounded-full py-2.5 px-4 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-400 transition-all appearance-none"
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
                  <label className="text-xs font-semibold text-slate-700">
                    Kategori Keluhan Utama
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        disabled={isSubmitting}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                          formData.category === cat
                            ? "bg-[#141414] text-white shadow-none"
                            : "bg-[#F1F1F0] text-[#141414] hover:bg-[#E5E5E3]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Detail Keluhan */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 tracking-tight">
                      Detail Keluhan & Lampiran
                    </h2>
                    <p className="text-xs text-slate-500">
                      Deskripsi objektif dan bukti pendukung
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Langkah 2/2
                </span>
              </div>

              <div className="p-6 flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Deskripsi Keluhan Pelanggan
                    </label>
                    <span className="text-xs text-slate-400">
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
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 mt-1">
                    <span className="material-symbols-outlined text-slate-500 text-[16px] shrink-0 mt-0.5">
                      info
                    </span>
                    <span>
                      <strong className="text-slate-800">Panduan Agen:</strong> Gunakan informasi yang disampaikan
                      customer. Hindari menambahkan diagnosis atau asumsi medis.
                    </span>
                  </div>
                </div>

                {/* Tombol Upload Attachment */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Lampiran Bukti (Opsional)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={handleUploadAttachment}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-all flex flex-col items-center justify-center gap-1.5 text-slate-700 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-slate-700 text-[22px]">photo_camera</span>
                      <span className="text-xs font-medium text-center">Foto Kondisi Kulit</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleUploadAttachment}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-all flex flex-col items-center justify-center gap-1.5 text-slate-700 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-slate-700 text-[22px]">forum</span>
                      <span className="text-xs font-medium text-center">Screenshot Chat WA</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleUploadAttachment}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-all flex flex-col items-center justify-center gap-1.5 text-slate-700 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-slate-700 text-[22px]">qr_code_scanner</span>
                      <span className="text-xs font-medium text-center">Bukti Batch / Segel</span>
                    </button>
                  </div>

                  {/* Attachment Preview */}
                  {attachments.length > 0 && (
                    <div className="flex flex-col gap-2 mt-3">
                      {attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-slate-700 text-[18px]">image</span>
                            <span className="text-xs font-semibold text-slate-900">{file.name}</span>
                            <span className="text-xs text-slate-400">({file.size})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveAttachment(idx)}
                            className="text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Prioritas */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Prioritas Awal
                    </label>
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
                      SLA: 2 Jam
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {severityOptions.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, severity: item.value })}
                        disabled={isSubmitting}
                        className={`p-3 rounded-xl text-center flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          formData.severity === item.value
                            ? "bg-slate-100 border-2 border-slate-800"
                            : "bg-slate-50 border border-slate-200/80 hover:bg-slate-100/60"
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ color: item.color }}
                        >
                          {item.icon}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {item.sublabel}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Action Bar on Left Side */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSaveDraft}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px] text-slate-500">save</span>
                  <span>Simpan sebagai Draft</span>
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#141414] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#2B2B2B] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80 shadow-sm cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Menganalisis Keluhan dengan AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 text-cyan-400" />
                      <span>Buat Tiket & Analisis dengan AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: AI PREVIEW */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03),0_4px_12px_rgba(15,23,42,0.02)] overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">psychology</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 tracking-tight">
                        AI Complaint Assistant
                      </h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        v2.4 Neural
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Modul Analisis Triase & Sentimen
                    </p>
                  </div>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Setelah tiket diterbitkan, engine AI akan otomatis memproses teks
                  pengaduan secara non-medis untuk mendukung respons SOP cepat.
                </p>

                {/* Pipeline */}
                <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mb-1">
                    Alur Pipeline Otomatisasi
                  </span>
                  {pipelineSteps.map((step) => (
                    <div
                      key={step.num}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        step.active
                          ? "bg-white border border-slate-200 shadow-xs"
                          : step.next
                          ? "bg-slate-100/80"
                          : "bg-slate-100/40 opacity-60"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          step.active
                            ? "bg-[#141414] text-white"
                            : step.next
                            ? "bg-slate-200 text-slate-800"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        {step.num}
                      </span>
                      <span
                        className={`text-xs flex-1 ${
                          step.active
                            ? "text-slate-900 font-semibold"
                            : "text-slate-600"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Output Tags */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-700">
                    Output yang Akan Dihasilkan:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {outputs.map((out, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-medium flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[13px] text-slate-500">
                          {out.icon}
                        </span>
                        {out.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-slate-500 text-[16px] mt-0.5">
                    shield
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Human-in-the-loop:</strong> AI memberikan analisis pendukung
                    dan draf balasan. Keputusan dan respons akhir tetap ditinjau oleh CS.
                  </p>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSaveDraft}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px] text-slate-500">save</span>
                    <span>Simpan sebagai Draft</span>
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#141414] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#2B2B2B] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80 shadow-sm cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Menganalisis Keluhan dengan AI...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 text-cyan-400" />
                        <span>Buat Tiket & Analisis dengan AI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InputComplaintPage;