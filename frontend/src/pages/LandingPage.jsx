import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/ui/Logo";
import AccentHeading from "../components/ui/AccentHeading";
import FrostedChatInput from "../components/ui/FrostedChatInput";
import ConceptDiagram from "../components/domain/ConceptDiagram";
import FaceScanOverlay from "../components/domain/FaceScanOverlay";
import Card3DCanvas from "../components/ui/Card3D";
import testimonialFounder from "../assets/testimonial_founder.jpg";

import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  MessageSquare, 
  Database, 
  Heart,
  HelpCircle,
  ExternalLink
} from "lucide-react";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      q: "Bagaimana Lumière Skin membantu CS menangani komplain reaksi kulit?",
      a: "AI menganalisis pesan pelanggan, mengekstrak gejala (gatal, kemerahan, bruntusan), mencocokkan nomor batch dengan data formulasi produk, dan menghasilkan draf balasan empatis sesuai SOP tanpa melanggar etika medis non-diagnosis."
    },
    {
      q: "Apakah AI ini menggantikan peran agen Customer Service?",
      a: "Tidak sama sekali. Lumière Skin menganut prinsip Human-in-the-Loop (HITL). AI hanya bertindak sebagai kopilot pintar yang menyusun analisis dan rekomendasi balasan. Keputusan kirim dan penyesuaian teks 100% berada di tangan agen manusia."
    },
    {
      q: "Bagaimana cara mendeteksi lonjakan komplain pada nomor batch tertentu?",
      a: "Setiap keluhan yang masuk otomatis terhubung dengan SKU dan Batch Code produk. Jika ada 3+ keluhan pada batch yang sama dalam kurun 48 jam, sistem membunyikan alarm peringatan batch berisiko ke dashboard Brand Manager."
    },
    {
      q: "Apakah data pelanggan dan formulasi skincare kami aman?",
      a: "Data tersimpan di server terenkripsi SSL/TLS 256-bit dan mematuhi regulasi privasi data. Data komplain tidak digunakan untuk melatih model publik tanpa izin."
    },
    {
      q: "Berapa lama waktu implementasi untuk brand skincare UMKM?",
      a: "Sangat instan! Tim Anda dapat login dan mulai menggunakan dashboard dalam waktu kurang dari 15 menit tanpa instalasi software rumit."
    }
  ];

  const handleHeroQuery = (query) => {
    navigate("/login", { state: { demoQuery: query } });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#1E1B4B] selection:bg-[#EC4899]/20 selection:text-[#1E1B4B] overflow-x-hidden font-sans">
      {/* Background Subtle Grain Texture */}
      <div className="fixed inset-0 bg-grain pointer-events-none z-50 opacity-20" />

      {/* ===== 1. TOP NAVBAR: DYNAMIC ISLAND / TOP NOTCH STYLE (Req #2) ===== */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-3 sm:px-0">
        <div className="bg-white/40 backdrop-blur-xl border-x border-b border-white/60 shadow-sm rounded-b-3xl px-5 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Logo size="sm" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#EC4899] shadow-[0_0_6px_#EC4899]"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-base font-bold tracking-tight text-[#1E1B4B] group-hover:text-[#7C5CFF] transition-colors">
                Lumière Skin
              </span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-[#7C5CFF] font-semibold leading-none">
                AI Skincare Platform
              </span>
            </div>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#64748B]">
            <a href="#solusi" className="hover:text-[#1E1B4B] transition-colors">Solusi</a>
            <a href="#analisis" className="hover:text-[#1E1B4B] transition-colors">Analisis AI</a>
            <a href="#alur" className="hover:text-[#1E1B4B] transition-colors">Alur Kerja</a>
            <a href="#harga" className="hover:text-[#1E1B4B] transition-colors">Harga UMKM</a>
            <a href="#faq" className="hover:text-[#1E1B4B] transition-colors">FAQ</a>
          </nav>

          {/* Glassmorphism Buttons in Navbar (Req #2) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/login")}
              className="bg-white/30 hover:bg-white/50 text-slate-900 backdrop-blur-md border border-white/60 rounded-full px-4 sm:px-5 py-2 text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              Masuk Akun
            </button>
          </div>
        </div>
      </header>

      {/* ===== 2. HERO SECTION: 100VH VIEWPORT FIT WITH CURVED BOTTOM EDGE ===== */}
      <section className="min-h-screen flex flex-col justify-center items-center pt-24 pb-14 px-4 sm:px-6 bg-hero-mesh hero-curved-edge relative overflow-hidden border-b border-pink-100/60 shadow-[0_16px_40px_rgba(124,92,255,0.05)]">
        {/* Soft Ambient Pastel Mesh Orbs */}
        <div 
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-gradient-to-b from-[#E0F2FE]/70 via-[#FCE7F3]/60 to-transparent blur-3xl pointer-events-none rounded-full"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 w-full my-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 border border-white/90 backdrop-blur-md shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] shadow-[0_0_8px_#EC4899] animate-pulse"></span>
            <span className="text-[11px] font-semibold tracking-wider text-[#1E1B4B] uppercase">
              AI-Powered Complaint Intelligence untuk UMKM Skincare
            </span>
          </div>

          {/* Signature Headline Pairing */}
          <AccentHeading
            roman="Keluhan Pelanggan Berubah,"
            italic="Respons Anda Harus Lebih Cerdas"
            subtitle="Bantu tim CS mengidentifikasi bahan alergen, nomor batch berisiko, dan draf balasan empatis dalam hitungan detik — dengan akurasi terarah dan verifikasi Human-in-the-Loop."
            size="lg"
            className="mb-8"
          />

          {/* Frosted Chat Input Mockup */}
          <FrostedChatInput 
            onSubmit={handleHeroQuery}
            placeholder="Ketik keluhan customer, misal: 'Kulit merah dan perih setelah pakai Day Cream batch 2024-X09...'"
          />

          {/* Quick Stats Triad below chat */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto mt-8 pt-6 border-t border-violet-100/70 text-left">
            <div className="flex items-center gap-3 p-2.5 px-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#06B6D4] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1E1B4B]">45 Menit SLA</p>
                <p className="text-[11px] text-[#64748B]">Dari sebelumnya 24+ jam</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 px-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7C5CFF] shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1E1B4B]">82% Resolusi Cepat</p>
                <p className="text-[11px] text-[#64748B]">Dengan draf SOP empatis</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 px-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#EC4899] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1E1B4B]">Human-in-the-Loop</p>
                <p className="text-[11px] text-[#64748B]">100% aman dan terkontrol</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. CONCEPT SECTION: HUB-AND-SPOKE (100VH FIT) ===== */}
      <section id="solusi" className="min-h-screen flex flex-col justify-center items-center py-10 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto w-full my-auto">
          <AccentHeading
            eyebrow="REASONING INTELIGEN"
            eyebrowIcon="✦"
            roman="Satu Keluhan Pelanggan,"
            italic="Dipahami Secara Menyeluruh"
            subtitle="Bukan sekadar chatbot biasa. Lumière Skin membedah narasi keluhan menjadi data klinis dan operasional yang terstruktur secara real-time."
            size="md"
            className="mb-4"
          />

          {/* Hub-and-Spoke Component in White Glass */}
          <ConceptDiagram />
        </div>
      </section>

      {/* ===== 4. AI SKIN ANALYSIS SHOWCASE: FIT 100VH TANPA TERPOTONG (Req #3) ===== */}
      <section id="analisis" className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 bg-gradient-to-b from-[#FFF0F5]/50 via-[#FDFBF9] to-[#E0F2FE]/30 border-y border-violet-100/60 relative">
        <div className="max-w-6xl mx-auto w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Portrait with Scan Overlay (Constrained Height to fit 100vh) */}
            <div className="lg:col-span-5 flex justify-center">
              <FaceScanOverlay className="max-h-[64vh]" />
            </div>

            {/* Right Column: AI Triage Features in Compact Cards */}
            <div className="lg:col-span-7 flex flex-col gap-3.5">
              <AccentHeading
                eyebrow="KLASIFIKASI RESPON NON-MEDIS"
                eyebrowIcon="✦"
                roman="Analisis Reaksi Sensitif,"
                italic="Tanpa Melanggar Etika Klinis"
                subtitle="Model dilatih khusus dengan terminologi kosmetik Indonesia. Memandu CS memberikan penjelasan transparan, menenangkan pelanggan, dan menyarankan langkah aman."
                align="left"
                size="md"
                className="mb-1"
              />

              {/* 4 Feature Cards (Compact padding p-3.5 to fit viewport completely) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                <div className="p-3.5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white shadow-[0_4px_16px_rgba(124,92,255,0.04)] hover:border-violet-200 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#06B6D4] mb-2">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E1B4B] mb-0.5">
                    Purging vs Alergi Iritasi
                  </h4>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    AI otomatis membedakan apakah reaksi terjadi di area komedo aktif atau kontak alergen produk.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white shadow-[0_4px_16px_rgba(124,92,255,0.04)] hover:border-violet-200 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7C5CFF] mb-2">
                    <Database className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E1B4B] mb-0.5">
                    Validasi Batch & Alergen
                  </h4>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    Deteksi otomatis kandungan aktif seperti Retinol, AHA/BHA, atau Vitamin C dan hubungannya dengan keluhan.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white shadow-[0_4px_16px_rgba(124,92,255,0.04)] hover:border-pink-200 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#EC4899] mb-2">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E1B4B] mb-0.5">
                    Draf Respon Empatik CS
                  </h4>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    Menghasilkan teks balasan yang ramah, profesional, dan menenangkan tanpa memberi diagnosa resep obat.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white shadow-[0_4px_16px_rgba(124,92,255,0.04)] hover:border-emerald-200 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#059669] mb-2">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E1B4B] mb-0.5">
                    Eskalasi Dokter Konsultan
                  </h4>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    Satu klik untuk mengalihkan tiket ke dokter konsultan atau form investigasi lab jika severity High.
                  </p>
                </div>
              </div>

              {/* Action Button: Glassmorphism style (Req #2) */}
              <div className="pt-2">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white/40 hover:bg-white/60 text-slate-900 backdrop-blur-md border border-white/80 rounded-full px-5 py-2.5 text-xs font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#7C5CFF]" />
                  <span>Coba AI Analysis Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. HOW IT WORKS: 4-UP CARDS (100VH FIT) ===== */}
      <section id="alur" className="min-h-screen flex flex-col justify-center items-center py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full my-auto">
          <AccentHeading
            eyebrow="ALUR KERJA INTELIGEN"
            eyebrowIcon="✦"
            roman="Empat Langkah Sederhana,"
            italic="Dari Pesan Hingga Solusi"
            subtitle="Dirancang untuk efisiensi tim Customer Support dalam menangani puluhan hingga ratusan tiket harian."
            size="md"
            className="mb-10"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(124,92,255,0.06)] relative group hover:border-violet-200 transition-all">
              <span className="font-display text-3xl font-bold text-violet-200 group-hover:text-[#7C5CFF] transition-colors">
                01
              </span>
              <h4 className="text-sm font-bold text-[#1E1B4B] mt-2 mb-1">
                Input Multisaluran
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Keluhan dari WhatsApp, Tokopedia, Shopee, atau formulir masuk ke antrean tiket terpusat.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(124,92,255,0.06)] relative group hover:border-purple-200 transition-all">
              <span className="font-display text-3xl font-bold text-purple-200 group-hover:text-[#9061F9] transition-colors">
                02
              </span>
              <h4 className="text-sm font-bold text-[#1E1B4B] mt-2 mb-1">
                Ekstraksi AI & Cek Batch
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Mesin AI mendeteksi gejala, tingkat keparahan, SKU, dan mencocokkan nomor batch formulasi BPOM.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(124,92,255,0.06)] relative group hover:border-pink-200 transition-all">
              <span className="font-display text-3xl font-bold text-pink-200 group-hover:text-[#EC4899] transition-colors">
                03
              </span>
              <h4 className="text-sm font-bold text-[#1E1B4B] mt-2 mb-1">
                Draf Balasan Empatis
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                AI merekomendasikan SOP respon santun, solutif, serta panduan perawatan skin barrier sementara.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(124,92,255,0.06)] relative group hover:border-emerald-200 transition-all">
              <span className="font-display text-3xl font-bold text-emerald-200 group-hover:text-[#059669] transition-colors">
                04
              </span>
              <h4 className="text-sm font-bold text-[#1E1B4B] mt-2 mb-1">
                Review CS & Resolusi
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed text-[#64748B]">
                Agen CS meninjau draf, menyempurnakan bila perlu, lalu mengirimkan solusi ke pelanggan dengan satu klik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. PRICING SECTION: UMKM TIERS (100VH FIT) ===== */}
      <section id="harga" className="min-h-screen flex flex-col justify-center items-center py-10 px-4 sm:px-6 bg-gradient-to-b from-[#FFF0F5]/50 via-[#FDFBF9] to-[#FFF0F5]/40 border-t border-violet-100/60 relative">
        <div className="max-w-6xl mx-auto w-full my-auto">
          <AccentHeading
            eyebrow="STRUKTUR BIAYA UMKM"
            eyebrowIcon="✦"
            roman="Investasi Terjangkau,"
            italic="Tumbuh Bersama Skincare Anda"
            subtitle="Pilihan fleksibel tanpa komitmen jangka panjang yang memberatkan bisnis rintisan."
            size="md"
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
            {/* Tier 1: 1 Bulan Starter */}
            <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgba(124,92,255,0.05)] flex flex-col justify-between hover:border-violet-200 transition-all">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Paket Percobaan
                </span>
                <h3 className="text-xl font-bold text-[#1E1B4B] mt-0.5">Starter (1 Bulan)</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Untuk brand lokal yang baru mulai menata layanan komplain.
                </p>

                <div className="my-5">
                  <span className="text-2xl sm:text-3xl font-bold text-[#1E1B4B] font-display">
                    Rp 299.000
                  </span>
                  <span className="text-xs text-[#64748B] ml-1.5">/ bulan</span>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-[#64748B]">
                  <div className="flex items-center gap-2 text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                    <span>1 Akun CS Agent</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                    <span>250 Tiket Analisis AI / bln</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                    <span>Deteksi Batch & Kandungan Alergen</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                    <span>Ekspor Laporan Bulanan</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-white/40 hover:bg-white/60 text-slate-900 backdrop-blur-md border border-white/80 rounded-full px-5 py-2.5 text-xs font-semibold transition-all shadow-sm cursor-pointer"
                >
                  Pilih Starter
                </button>
              </div>
            </div>

            {/* Tier 2: 3 Bulan Growth (MOST POPULAR) */}
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-2xl border-2 border-[#7C5CFF]/60 shadow-[0_12px_40px_rgba(124,92,255,0.14)] flex flex-col justify-between relative transform lg:-translate-y-2">
              {/* Highlight Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#EC4899] text-white text-[10px] font-bold tracking-wider uppercase shadow-[0_2px_12px_rgba(236,72,153,0.35)]">
                Paling Diminati UMKM
              </div>

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7C5CFF]">
                  Paket Pertumbuhan (Hemat 12%)
                </span>
                <h3 className="text-xl font-bold text-[#1E1B4B] mt-0.5">Growth (3 Bulan)</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Ideal untuk brand skincare aktif di TikTok & Shopee.
                </p>

                <div className="my-5">
                  <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C5CFF] to-[#EC4899] font-display">
                    Rp 799.000
                  </span>
                  <span className="text-xs text-[#64748B] ml-1.5">/ 3 bulan</span>
                  <span className="block text-[10px] text-[#7C5CFF] font-medium mt-0.5">
                    Setara Rp 266.000 / bulan
                  </span>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-violet-100 text-xs text-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7C5CFF] shrink-0" />
                    <span><strong>3 Akun CS Agent</strong> + 1 Admin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7C5CFF] shrink-0" />
                    <span><strong>1.000 Tiket Analisis AI</strong> / bln</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7C5CFF] shrink-0" />
                    <span><strong>SLA Guard Real-time Alert</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7C5CFF] shrink-0" />
                    <span>Eskalasi Cepat ke Konsultan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7C5CFF] shrink-0" />
                    <span>Prioritas Bantuan CS WhatsApp</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-gradient-to-r from-[#7C5CFF] to-[#EC4899] text-white hover:brightness-105 rounded-full px-5 py-2.5 text-xs font-semibold transition-all shadow-[0_4px_16px_rgba(124,92,255,0.25)] cursor-pointer"
                >
                  Pilih Paket Growth
                </button>
              </div>
            </div>

            {/* Tier 3: 6 Bulan Scale */}
            <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgba(124,92,255,0.05)] flex flex-col justify-between hover:border-violet-200 transition-all">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Paket Skala Besar (Hemat 17%)
                </span>
                <h3 className="text-xl font-bold text-[#1E1B4B] mt-0.5">Scale (6 Bulan)</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Untuk brand skincare dengan distribusi nasional & banyak SKU.
                </p>

                <div className="my-5">
                  <span className="text-2xl sm:text-3xl font-bold text-[#1E1B4B] font-display">
                    Rp 1.499.000
                  </span>
                  <span className="text-xs text-[#64748B] ml-1.5">/ 6 bulan</span>
                  <span className="block text-[10px] text-[#059669] font-medium mt-0.5">
                    Setara Rp 249.000 / bulan
                  </span>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-[#64748B]">
                  <div className="flex items-center gap-2 text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                    <span><strong>Unlimited</strong> Akun CS Agent</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                    <span><strong>3.000 Tiket Analisis AI</strong> / bln</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                    <span>Custom SOP Skincare Brand</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                    <span>Dedicated Brand Manager Analytics</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-white/40 hover:bg-white/60 text-slate-900 backdrop-blur-md border border-white/80 rounded-full px-5 py-2.5 text-xs font-semibold transition-all shadow-sm cursor-pointer"
                >
                  Pilih Scale
                </button>
              </div>
            </div>
          </div>

          {/* Human in the loop guarantee */}
          <div className="max-w-4xl mx-auto mt-8 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-sm flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#7C5CFF] shrink-0 mt-0.5" />
            <p className="text-xs text-[#64748B] leading-relaxed">
              <strong className="text-[#1E1B4B]">Penafian Etika & Keselamatan Pelanggan:</strong> Lumière Skin dirancang sebagai asisten intelijen untuk staf Customer Service dan Brand Manager, bukan sebagai pengganti dokter spesialis kulit atau diagnosis medis. Seluruh respons akhir tetap berada di bawah kendali dan persetujuan agen manusia (Human-in-the-Loop).
            </p>
          </div>
        </div>
      </section>

      {/* ===== 7. TESTIMONIAL SECTION (100VH FIT) ===== */}
      <section className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto w-full my-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_16px_40px_rgba(124,92,255,0.08)] flex flex-col md:flex-row items-center gap-8">
            {/* Founder Portrait */}
            <div className="w-36 sm:w-48 shrink-0 aspect-[3/4] rounded-2xl overflow-hidden ring-4 ring-pink-50 shadow-md">
              <img
                src={testimonialFounder}
                alt="Testimoni Founder Skincare Lokal Indonesia"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Testimonial Quote */}
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-xs text-[#EC4899] font-medium w-fit">
                <Heart className="w-3.5 h-3.5 fill-[#EC4899]" />
                <span>Kisah Sukses Brand Skincare Lokal</span>
              </div>

              <blockquote className="font-display italic text-lg sm:text-xl text-[#1E1B4B] leading-relaxed">
                "Sebelumnya kalau ada komplain iritasi, CS kami bingung dan sering defensif. Dengan Lumière Skin, CS langsung paham gejala pelanggan dan bisa kirim respon empatis dalam hitungan menit. Retensi pelanggan kami malah naik 82%."
              </blockquote>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h5 className="text-sm font-bold text-[#1E1B4B]">Nadia Larasati</h5>
                  <p className="text-xs text-[#64748B]">Founder & Brand Director, Sari Botanicals</p>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-xl font-bold text-[#7C5CFF] font-display">82%</span>
                    <span className="text-[11px] text-[#64748B] block">Resolusi Selesai</span>
                  </div>
                  <div>
                    <span className="text-xl font-bold text-[#EC4899] font-display">4x</span>
                    <span className="text-[11px] text-[#64748B] block">Lebih Cepat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8. FAQ SECTION: INTERACTIVE 3D HOLOGRAPHIC CARD (Req #4) ===== */}
      <section id="faq" className="min-h-screen flex flex-col justify-center items-center py-10 px-4 sm:px-6 bg-[#FDFBF9]">
        <div className="max-w-5xl mx-auto w-full my-auto">
          <AccentHeading
            eyebrow="TANYA JAWAB UMUM"
            eyebrowIcon="✦"
            roman="Semua yang Perlu Anda Ketahui,"
            italic="Tentang Lumière Skin"
            size="md"
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Interactive 3D Holographic Face Card (Direct floating, larger size without white container) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <Card3DCanvas className="w-full max-w-sm sm:max-w-md h-[450px] sm:h-[490px]" />
            </div>

            {/* Right Column: FAQ Accordion */}
            <div className="lg:col-span-7 flex flex-col gap-2.5">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-sm overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/40"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-[#1E1B4B]">
                        {faq.q}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-[#7C5CFF] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-[#64748B] leading-relaxed border-t border-slate-100/80 pt-2.5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. FOOTER WITH CROPPED WORDMARK IN PLAYFAIR ITALIC ===== */}
      <footer className="relative pt-12 pb-6 px-6 bg-[#FDFBF9] border-t border-violet-100/60 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200/60 relative z-10 text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="font-display font-bold text-[#1E1B4B]">Lumière Skin</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#solusi" className="hover:text-[#1E1B4B]">Solusi</a>
              <a href="#analisis" className="hover:text-[#1E1B4B]">Analisis AI</a>
              <a href="#harga" className="hover:text-[#1E1B4B]">Harga</a>
              <Link to="/login" className="text-[#7C5CFF] font-semibold hover:underline">Login Portal</Link>
            </div>
          </div>

          {/* Cropped Wordmark */}
          <div className="relative py-4 select-none overflow-hidden text-center z-0">
            <span className="font-display italic font-bold text-[14vw] lg:text-[16vw] leading-none text-slate-900/[0.04] tracking-tighter block whitespace-nowrap -mb-8 sm:-mb-12">
              Lumière Skin
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#64748B]/80 pt-2 relative z-10">
            <p>© 2026 Lumière Skin. Hak Cipta Dilindungi Undang-Undang.</p>
            <p>Bright Feminine AI Skincare • Human-in-the-Loop Safe</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
