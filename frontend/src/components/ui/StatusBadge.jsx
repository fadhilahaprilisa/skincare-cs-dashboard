// Status badges sesuai mockup
export const StatusBadge = ({ type, label, pulse = false, className = "" }) => {
  const variants = {
    // Status tiket
    processing: "bg-primary-container/15 text-primary-container border border-primary-container/30",
    resolved: "bg-[#2ED573]/15 text-[#2ED573] border border-[#2ED573]/30",
    pending: "bg-[#FFC048]/15 text-[#FFC048] border border-[#FFC048]/30",
    urgent: "bg-[#FF4D4D]/15 text-[#FF4D4D] border border-[#FF4D4D]/30",
    moderate: "bg-[#FFC048]/15 text-[#FFC048] border border-[#FFC048]/30",
    
    // Severity
    severityLow: "bg-surface-variant text-tertiary-fixed-dim",
    severityModerate: "bg-[#FFC048]/15 text-[#FFC048]",
    severityHigh: "bg-[#FF4D4D]/15 text-[#FF4D4D] font-bold",
    
    // Sentiment
    concerned: "bg-[#FFC048]/15 text-[#FFC048]",
    neutral: "bg-surface-container-high text-on-surface-variant",
    angry: "bg-[#FF4D4D]/15 text-[#FF4D4D]",
    positive: "bg-[#2ED573]/15 text-[#2ED573]",
    
    // Tier
    gold: "bg-[#FFC048]/20 text-[#FFC048]",
    silver: "bg-surface-container-highest text-on-surface-variant",
    platinum: "bg-primary-container/15 text-primary-fixed-dim",
    member: "bg-surface-container text-on-surface-variant",
    
    // AI Status
    aiAnalyzed: "bg-[#FFF0F5]/10 text-[#FFF0F5] border border-[#FFF0F5]/25",
    aiReady: "bg-primary-container/20 text-primary-fixed",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-label-sm uppercase tracking-wide ${variants[type] || variants.member} ${className}`}>
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
        </span>
      )}
      {label}
    </span>
  );
};

export default StatusBadge;