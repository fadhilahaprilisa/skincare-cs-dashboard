import React from "react";

// Status badges refined for Lumiere Skin (@design.md)
export const StatusBadge = ({ type, label, pulse = false, className = "" }) => {
  const variants = {
    // Status tiket
    processing: "bg-lumiere-cyan/10 text-lumiere-cyan border border-lumiere-cyan/30 shadow-[0_0_10px_rgba(0,242,254,0.15)]",
    resolved: "bg-[#2ED573]/10 text-[#2ED573] border border-[#2ED573]/30",
    pending: "bg-[#FFC048]/10 text-[#FFC048] border border-[#FFC048]/30",
    urgent: "bg-[#FF4D4D]/15 text-[#FF4D4D] border border-[#FF4D4D]/40 shadow-[0_0_12px_rgba(255,77,77,0.2)]",
    moderate: "bg-[#FFC048]/10 text-[#FFC048] border border-[#FFC048]/30",
    
    // Severity
    severityLow: "bg-white/5 text-on-surface-variant border border-white/10",
    severityModerate: "bg-[#FFC048]/10 text-[#FFC048] border border-[#FFC048]/25",
    severityHigh: "bg-[#FF4D4D]/15 text-[#FF4D4D] font-bold border border-[#FF4D4D]/35",
    
    // Sentiment
    concerned: "bg-[#FFC048]/10 text-[#FFC048] border border-[#FFC048]/20",
    neutral: "bg-white/5 text-on-surface-variant border border-white/10",
    angry: "bg-[#FF4D4D]/15 text-[#FF4D4D] border border-[#FF4D4D]/30",
    positive: "bg-[#2ED573]/10 text-[#2ED573] border border-[#2ED573]/25",
    
    // Tier
    gold: "bg-[#FFC048]/15 text-[#FFC048] border border-[#FFC048]/30",
    silver: "bg-white/10 text-on-surface-variant border border-white/15",
    platinum: "bg-lumiere-cyan/15 text-lumiere-cyan border border-lumiere-cyan/30",
    member: "bg-surface-container text-on-surface-variant border border-white/5",
    
    // AI Status
    aiAnalyzed: "bg-[#7C5CFF]/15 text-[#C9B8FF] border border-[#7C5CFF]/30",
    aiReady: "bg-lumiere-cyan/15 text-lumiere-cyan border border-lumiere-cyan/30",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase backdrop-blur-sm ${variants[type] || variants.member} ${className}`}>
      {pulse ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
        </span>
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      )}
      <span>{label}</span>
    </span>
  );
};

export default StatusBadge;