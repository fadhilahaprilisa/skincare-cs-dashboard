import React, { useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";

/**
 * Frosted Chat Input updated for Bright Feminine Skinly Aesthetic:
 * - Sits over a blurred pastel glow blob (mint to blush pink)
 * - Frosted white glass container (backdrop-blur-2xl, border-white/80)
 * - Violet-to-Rose gradient border
 * - Solid violet-to-rose circular send button with micro-animation
 */
export const FrostedChatInput = ({
  placeholder = "Contoh: 'Pelanggan komplain gatal & kemerahan setelah pakai Niacinamide Serum batch 2024-X09...'",
  onSubmit,
  suggestions = [
    "Deteksi alergen & bahan aktif",
    "Analisis batch produk berisiko",
    "Draf respons SOP empatis",
  ],
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    if (onSubmit) {
      onSubmit(query);
    }
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-10">
      {/* Pastel Glow Blob behind chat input */}
      <div 
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 sm:w-[480px] h-40 bg-gradient-to-r from-[#E0F2FE]/70 via-[#FCE7F3]/70 to-[#E9D5FF]/60 blur-3xl pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Frosted White Container */}
      <div className="relative p-2 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_16px_45px_rgba(124,92,255,0.08)]">
        {/* Gradient Border Inner Wrapper */}
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-center p-1.5 rounded-[22px] bg-gradient-to-r from-[#7C5CFF]/30 via-[#EC4899]/30 to-[#00F2FE]/30 p-[1.5px] transition-all duration-300 focus-within:from-[#7C5CFF] focus-within:to-[#EC4899] focus-within:shadow-[0_0_25px_rgba(236,72,153,0.2)]"
        >
          <div className="flex items-center w-full bg-white/95 backdrop-blur-xl rounded-[20px] px-4 py-2 gap-3 shadow-inner">
            <Sparkles className="w-5 h-5 text-[#7C5CFF] shrink-0 animate-pulse" />
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-transparent text-[#1E1B4B] placeholder:text-slate-400 text-sm sm:text-base focus:outline-none"
            />

            <button
              type="submit"
              disabled={!query.trim()}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7C5CFF] to-[#EC4899] text-white flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_16px_rgba(236,72,153,0.35)] disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none cursor-pointer"
              title="Kirim Keluhan ke AI"
            >
              <ArrowUp className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </form>

        {/* Suggestion Chips */}
        {suggestions && suggestions.length > 0 && (
          <div className="flex items-center justify-center flex-wrap gap-2 pt-3 px-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Coba cepat:
            </span>
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="px-3 py-1 rounded-full bg-white/80 hover:bg-white border border-slate-200/80 text-slate-700 hover:text-[#1E1B4B] text-xs transition-colors duration-150 cursor-pointer shadow-sm"
              >
                ✦ {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FrostedChatInput;
