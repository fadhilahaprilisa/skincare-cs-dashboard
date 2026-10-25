export const SeverityBar = ({ level, percentage }) => {
  const colors = {
    Low: "bg-[#2ED573]",
    Moderate: "bg-gradient-to-r from-brand-cyan via-[#FFC048] to-[#FF4D4D]",
    High: "bg-gradient-to-r from-[#FFC048] to-[#FF4D4D]",
  };

  const badgeStyles = {
    Low: "bg-[#2ED573]/15 text-[#2ED573]",
    Moderate: "bg-[#FFC048]/15 text-[#FFC048]",
    High: "bg-[#FF4D4D]/15 text-[#FF4D4D]",
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
          Tingkat Keparahan
        </span>
        <span className={`px-2 py-0.5 rounded text-label-sm font-bold ${badgeStyles[level]}`}>
          {level}
        </span>
      </div>
      <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full ${colors[level] || colors.Moderate}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SeverityBar;