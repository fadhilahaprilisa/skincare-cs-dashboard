import React, { useState } from "react";
import { Package, Hash, AlertTriangle, Activity, HeartHandshake, Sparkles, CheckCircle2 } from "lucide-react";

/**
 * Hub-and-Spoke Diagram updated for Bright Feminine / Skinly Aesthetic:
 * "One complaint, fully understood"
 * Central node: "Complaint Understanding"
 * 5 Spoke chips in frosted white glass:
 *   1. Product
 *   2. Batch Code
 *   3. Symptom
 *   4. Severity
 *   5. Sentiment
 */
export const ConceptDiagram = ({
  complaintTitle = "Laporan Sensasi Perih & Kemerahan",
  complaintSnippet = "Kulit terasa panas dan muncul bercak merah setelah 2x pemakaian produk serum...",
  ticketData,
}) => {
  const [activeNode, setActiveNode] = useState(null);

  const spokes = [
    {
      id: "product",
      title: "Product",
      value: ticketData?.product || "Lumière Brightening Serum 30ml",
      detail: "SKU: LUM-SRM-01 • Formula: Niacinamide 5% + Centella",
      icon: Package,
      dotColor: "bg-[#06B6D4]",
      borderColor: "hover:border-[#06B6D4]/50",
    },
    {
      id: "batch",
      title: "Batch Code",
      value: ticketData?.product_batch || "BATCH-2024-X09",
      detail: "Exp: Nov 2026 • BPOM NA1823010992 • Cek Retur: Aman",
      icon: Hash,
      dotColor: "bg-[#7C5CFF]",
      borderColor: "hover:border-[#7C5CFF]/60",
    },
    {
      id: "symptom",
      title: "Symptom",
      value: ticketData?.category || "Eritema & Sensasi Perih Ringan",
      detail: "Kategori Reaksi Kulit • Reaksi Sementara / Non-Alergi Berat",
      icon: AlertTriangle,
      dotColor: "bg-[#F59E0B]",
      borderColor: "hover:border-[#F59E0B]/50",
    },
    {
      id: "severity",
      title: "Severity",
      value: ticketData?.severity || "Moderate (Skala 2/5)",
      detail: "SLA Maksimal 2 Jam • Tangani dengan Panduan SOP #B4",
      icon: Activity,
      dotColor: "bg-[#EC4899]",
      borderColor: "hover:border-[#EC4899]/50",
    },
    {
      id: "sentiment",
      title: "Sentiment",
      value: "Concerned & Cemas (Kekhawatiran)",
      detail: "Emosi Terdeteksi: Cemas • Rekomendasi Nada: Empati Tinggi",
      icon: HeartHandshake,
      dotColor: "bg-[#10B981]",
      borderColor: "hover:border-[#10B981]/50",
    },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Background radial ambient in pastel pink/lavender */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-gradient-to-tr from-[#E9D5FF]/40 to-[#FCE7F3]/40 rounded-full blur-[90px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* DESKTOP HUB AND SPOKE (Visible on lg and up) */}
      <div className="hidden lg:block relative min-h-[520px]">
        {/* SVG Bezier Connecting Curves */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0" 
          viewBox="0 0 1000 520"
          fill="none"
        >
          <defs>
            <linearGradient id="curvePastel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Center coordinate: 500, 260 */}
          {/* Spoke 1: Top Left (230, 80) */}
          <path
            d="M 500 260 C 400 220, 320 150, 230 80"
            stroke="url(#curvePastel)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
          {/* Spoke 2: Top Right (770, 80) */}
          <path
            d="M 500 260 C 600 220, 680 150, 770 80"
            stroke="url(#curvePastel)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
          {/* Spoke 3: Right (830, 260) */}
          <path
            d="M 500 260 C 620 260, 720 260, 830 260"
            stroke="url(#curvePastel)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
          {/* Spoke 4: Bottom Right (770, 440) */}
          <path
            d="M 500 260 C 600 320, 680 380, 770 440"
            stroke="url(#curvePastel)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
          {/* Spoke 5: Bottom Left (230, 440) */}
          <path
            d="M 500 260 C 400 320, 320 380, 230 440"
            stroke="url(#curvePastel)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        </svg>

        {/* Central Hub Node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative group cursor-pointer flex items-center justify-center">
            {/* Outer Ambient Glow */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-[#E9D5FF] to-[#FCE7F3] blur-2xl opacity-75 animate-pulse pointer-events-none" />

            {/* Expanding Heartbeat Ripples (Detak Jantung Ring Wave) */}
            <div className="absolute inset-0 rounded-full border-2 border-violet-400/40 animate-heartbeat-ring pointer-events-none" />
            <div className="absolute inset-0 rounded-full border-2 border-pink-400/35 animate-heartbeat-ring-delayed pointer-events-none" />

            {/* Core Circular Hub - Rhythmic Heartbeat Animation */}
            <div className="relative w-64 h-64 rounded-full bg-white/95 backdrop-blur-2xl border-2 border-violet-200/90 animate-heartbeat hover:[animation-play-state:paused] flex flex-col items-center justify-center p-5 text-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#7C5CFF]/60 shadow-[0_14px_45px_rgba(124,92,255,0.12)]">
              {/* Icon pill */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7C5CFF]/15 to-[#EC4899]/15 border border-violet-200 flex items-center justify-center text-[#7C5CFF] mb-2 shadow-sm">
                <Sparkles className="w-4 h-4 animate-pulse text-[#7C5CFF]" />
              </div>

              {/* Eyebrow */}
              <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-[#7C5CFF] leading-none mb-1">
                Lumière Neural Engine
              </span>

              {/* Title */}
              <h4 className="font-display text-base sm:text-lg font-bold text-[#1E1B4B] leading-tight max-w-[190px]">
                Complaint Understanding
              </h4>

              {/* Subtitle - comfortably inside the circle boundary */}
              <p className="text-[11px] font-medium text-[#64748B] mt-2 max-w-[170px] leading-normal">
                1 Keluhan, 5 Dimensi Intelijen
              </p>
            </div>
          </div>
        </div>

        {/* Spoke 1: Product (Top-Left) */}
        <div className="absolute top-4 left-4 w-72 z-10">
          <SpokeCard spoke={spokes[0]} active={activeNode === "product"} onHover={() => setActiveNode("product")} onLeave={() => setActiveNode(null)} />
        </div>

        {/* Spoke 2: Batch Code (Top-Right) */}
        <div className="absolute top-4 right-4 w-72 z-10">
          <SpokeCard spoke={spokes[1]} active={activeNode === "batch"} onHover={() => setActiveNode("batch")} onLeave={() => setActiveNode(null)} />
        </div>

        {/* Spoke 3: Symptom (Right Center) */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 z-10">
          <SpokeCard spoke={spokes[2]} active={activeNode === "symptom"} onHover={() => setActiveNode("symptom")} onLeave={() => setActiveNode(null)} />
        </div>

        {/* Spoke 4: Severity (Bottom-Right) */}
        <div className="absolute bottom-4 right-8 w-72 z-10">
          <SpokeCard spoke={spokes[3]} active={activeNode === "severity"} onHover={() => setActiveNode("severity")} onLeave={() => setActiveNode(null)} />
        </div>

        {/* Spoke 5: Sentiment (Bottom-Left) */}
        <div className="absolute bottom-4 left-8 w-72 z-10">
          <SpokeCard spoke={spokes[4]} active={activeNode === "sentiment"} onHover={() => setActiveNode("sentiment")} onLeave={() => setActiveNode(null)} />
        </div>
      </div>

      {/* MOBILE / TABLET VIEW (Responsive Grid) */}
      <div className="lg:hidden flex flex-col gap-4">
        {/* Central Hub mobile badge */}
        <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-violet-100 text-center shadow-[0_8px_30px_rgba(124,92,255,0.06)]">
          <div className="w-11 h-11 mx-auto rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-[#7C5CFF] mb-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#7C5CFF]">
            Lumière Neural Engine
          </span>
          <h4 className="font-display text-xl font-bold text-[#1E1B4B] mt-1">
            Complaint Understanding
          </h4>
          <p className="text-xs text-[#64748B] mt-1">
            Satu keluhan mentah langsung dipetakan ke 5 entitas terstruktur secara otomatis.
          </p>
        </div>

        {/* Grid of 5 Spoke Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {spokes.map((spoke) => (
            <SpokeCard key={spoke.id} spoke={spoke} active={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable Spoke Card Chip in Frosted White Glass
const SpokeCard = ({ spoke, active, onHover, onLeave }) => {
  const Icon = spoke.icon;

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_8px_25px_rgba(124,92,255,0.06)] transition-all duration-300 cursor-pointer ${spoke.borderColor} ${
        active ? "scale-105 border-[#7C5CFF]/60 shadow-[0_12px_32px_rgba(124,92,255,0.14)]" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center text-[#7C5CFF]">
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            {spoke.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${spoke.dotColor} shadow-[0_0_8px_currentColor]`}></span>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#7C5CFF]/70" />
        </div>
      </div>

      <p className="text-sm font-semibold text-[#1E1B4B] leading-snug">
        {spoke.value}
      </p>
      <p className="text-[11px] text-[#64748B] mt-1 leading-normal">
        {spoke.detail}
      </p>
    </div>
  );
};

export default ConceptDiagram;
