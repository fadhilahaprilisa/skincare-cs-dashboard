import React from "react";
import faceScanPortrait from "../../assets/face_scan_portrait.jpg";
import { Scan, ShieldCheck } from "lucide-react";

/**
 * FaceScanOverlay Component updated for Bright Feminine Skinly Aesthetic:
 * - High-res Indonesian beauty portrait
 * - SVG face-mesh grid overlay, corner brackets, and cyan scanning line
 * - Frosted white glass callouts and badges
 * - Viewport-optimized height to fit 100vh screens perfectly without cutting off
 */
export const FaceScanOverlay = ({ className = "" }) => {
  return (
    <div className={`relative w-full max-w-sm sm:max-w-md mx-auto rounded-3xl overflow-hidden border border-white/90 shadow-[0_16px_45px_rgba(124,92,255,0.12)] group bg-white/40 backdrop-blur-sm ${className}`}>
      {/* Base Photograph with max-height constraint for 100vh fit */}
      <img
        src={faceScanPortrait}
        alt="AI Skin Analysis Face Scan Portrait with Dermatological Grid Overlay"
        className="w-full h-auto max-h-[58vh] sm:max-h-[64vh] object-cover aspect-[3/4] block select-none mx-auto"
      />

      {/* SVG Face-Mesh & Tactical Bracket Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 400 533"
        fill="none"
      >
        {/* 4 Corner Framing Brackets in Primary Cyan */}
        {/* Top-Left */}
        <path d="M 24 48 L 24 24 L 48 24" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" />
        {/* Top-Right */}
        <path d="M 376 48 L 376 24 L 352 24" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" />
        {/* Bottom-Left */}
        <path d="M 24 485 L 24 509 L 48 509" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" />
        {/* Bottom-Right */}
        <path d="M 376 485 L 376 509 L 352 509" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" />

        {/* Central Face Mesh Nodes & Dashed Facial Grid */}
        <ellipse cx="200" cy="240" rx="90" ry="120" stroke="#00F2FE" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.45" />
        <ellipse cx="200" cy="240" rx="55" ry="75" stroke="#7C5CFF" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />

        {/* Target Reticles / Suture Points */}
        {/* Cheek Target Point (Zone A - Erythema) */}
        <circle cx="155" cy="265" r="5" stroke="#00F2FE" strokeWidth="1.5" fill="#00F2FE" fillOpacity="0.3" className="animate-ping" />
        <circle cx="155" cy="265" r="3" fill="#00F2FE" />
        <line x1="155" y1="265" x2="80" y2="330" stroke="#00F2FE" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.8" />

        {/* Forehead Target Point (Barrier Intact) */}
        <circle cx="200" cy="160" r="4" stroke="#7C5CFF" strokeWidth="1.5" fill="#7C5CFF" fillOpacity="0.3" />
        <line x1="200" y1="160" x2="280" y2="120" stroke="#7C5CFF" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.8" />
      </svg>

      {/* Animated Vertical Scan Laser Line */}
      <div 
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent shadow-[0_0_15px_#00F2FE] z-10 pointer-events-none"
        style={{
          animation: 'scanline 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />
      <style>{`
        @keyframes scanline {
          0% { top: 10%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>

      {/* Top HUD Pill */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-violet-100 text-xs text-[#1E1B4B] shadow-sm">
          <Scan className="w-3.5 h-3.5 text-[#00F2FE] animate-pulse" />
          <span className="font-semibold tracking-wider text-[10px] uppercase">
            Neural Skin Scan v2.4
          </span>
        </div>
        <div className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#059669] text-[10px] font-bold tracking-widest uppercase">
          LIVE TRIAGE
        </div>
      </div>

      {/* Floating Insight Callout 1 (Zone A - Cheek) */}
      <div className="absolute bottom-16 left-3 z-20 max-w-[190px] p-2 rounded-xl bg-white/90 backdrop-blur-md border border-cyan-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] shadow-[0_0_6px_#00F2FE]"></span>
          <span className="text-[9px] uppercase font-bold text-cyan-700 tracking-wider">
            Zona Pipi Kanan
          </span>
        </div>
        <p className="text-[11px] font-semibold text-[#1E1B4B] leading-tight">
          Eritema Ringan Terdeteksi
        </p>
        <span className="text-[9px] text-[#64748B] block mt-0.5">
          Confidence: 94.2% • Non-Alergi Berat
        </span>
      </div>

      {/* Floating Insight Callout 2 (Top Right) */}
      <div className="absolute top-16 right-3 z-20 p-2 px-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-violet-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-right">
        <span className="text-[9px] uppercase font-bold text-violet-700 tracking-wider block">
          Skin Barrier Index
        </span>
        <span className="text-xs font-bold text-[#1E1B4B] font-mono">
          72 / 100
        </span>
        <span className="text-[8px] text-[#059669] font-semibold block">
          Protektif Normal
        </span>
      </div>

      {/* Bottom Soft Fade */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/90 via-white/40 to-transparent z-15 pointer-events-none" />

      {/* Bottom Clinical Disclaimer Chip */}
      <div className="absolute bottom-2.5 inset-x-2.5 z-20 flex items-center justify-between text-[11px] text-slate-800 bg-white/90 backdrop-blur-md p-1.5 px-3 rounded-xl border border-white shadow-sm">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#7C5CFF] shrink-0" />
          <span className="text-[10px] text-slate-700 font-medium">
            Evaluasi CS • Bukan Diagnosis Medis
          </span>
        </div>
        <span className="text-[9px] text-[#7C5CFF] font-bold uppercase tracking-wider">
          BPOM Ready
        </span>
      </div>
    </div>
  );
};

export default FaceScanOverlay;
