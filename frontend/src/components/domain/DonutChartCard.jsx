import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from "recharts";

export const DonutChartCard = ({
  data = [],
  title,
  subtitle,
  centerLabel = "Total",
  centerValue = 0,
  colors,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const defaultColors = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#64748B"];

  // Helper function to extract main label and sub-label
  const parseLabel = (name = "") => {
    const match = name.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) {
      return {
        main: match[1].trim(),
        sub: match[2].trim(),
      };
    }
    return {
      main: name.trim(),
      sub: null,
    };
  };

  // Helper function to assign semantic colors
  const getColor = (entry, index) => {
    if (colors && colors[index]) return colors[index];
    const lower = (entry?.name || "").toLowerCase();
    if (lower.includes("urgent") || lower.includes("high") || lower.includes("angry") || lower.includes("kritis")) {
      return "#EF4444"; // Red
    }
    if (lower.includes("moderate") || lower.includes("concerned") || lower.includes("ketidakcocokan") || lower.includes("sedang")) {
      return "#F59E0B"; // Amber
    }
    if (lower.includes("low") || lower.includes("positive") || lower.includes("rendah") || lower.includes("puas")) {
      return "#10B981"; // Emerald
    }
    if (lower.includes("neutral") || lower.includes("netral")) {
      return "#64748B"; // Slate
    }
    return defaultColors[index % defaultColors.length];
  };

  // Active shape expansion for the hovered segment
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius - 2}
          outerRadius={outerRadius + 4}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{
            filter: "drop-shadow(0 4px 8px rgba(15, 23, 42, 0.15))",
            transition: "all 0.2s ease-out",
          }}
        />
      </g>
    );
  };

  // Floating Tooltip matching Bar Chart style
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const ticketCount = item.count !== undefined ? item.count : item.value;
      const percentage = item.value;

      return (
        <div className="bg-white rounded-2xl px-4 py-3 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.12)] border border-slate-100 pointer-events-none z-30 transition-all">
          <p className="text-xs font-bold text-slate-900 leading-tight">{item.name}</p>
          <p className="text-xs text-slate-600 mt-1">
            <strong className="text-slate-900 font-bold">{ticketCount}</strong> tiket ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const activeItem = hoveredIndex !== null && data[hoveredIndex] ? data[hoveredIndex] : null;
  const parsedActive = activeItem ? parseLabel(activeItem.name) : null;
  const activeCount = activeItem ? (activeItem.count !== undefined ? activeItem.count : activeItem.value) : null;
  const activePct = activeItem ? `${activeItem.value}%` : null;
  const activeColor = activeItem ? getColor(activeItem, hoveredIndex) : null;

  return (
    <div className="flex flex-col gap-3.5 w-full">
      {(title || subtitle) && (
        <div className="flex flex-col">
          {title && <h3 className="text-sm font-semibold text-slate-900">{title}</h3>}
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          )}
        </div>
      )}

      {/* Proportional Grid: Donut Chart on left, Legend list on right */}
      <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 w-full">
        {/* Donut Chart Container */}
        <div className="sm:col-span-5 flex justify-center items-center">
          <div className="relative w-36 h-36 shrink-0 overflow-visible flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={<CustomTooltip />}
                  wrapperStyle={{ zIndex: 50, outline: "none", pointerEvents: "none" }}
                />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={62}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                  activeIndex={hoveredIndex !== null ? hoveredIndex : undefined}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {data.map((entry, index) => {
                    const isOther = hoveredIndex !== null && hoveredIndex !== index;
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={getColor(entry, index)}
                        opacity={isOther ? 0.35 : 1}
                        className="transition-all duration-200 cursor-pointer"
                      />
                    );
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Dynamic Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none transition-all duration-200">
              {hoveredIndex !== null && activeItem ? (
                <>
                  <span className="text-2xl font-black text-slate-900 leading-none tracking-tight">
                    {activeCount}
                  </span>
                  {activePct && (
                    <span className="text-[10px] font-bold text-slate-600 leading-none mt-1">
                      {activePct}
                    </span>
                  )}
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider leading-none mt-1 truncate max-w-[76px]"
                    style={{ color: activeColor }}
                  >
                    {parsedActive.main}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-2xl font-black text-slate-900 leading-none tracking-tight">
                    {centerValue}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none mt-1">
                    {centerLabel}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Legend List */}
        <div className="sm:col-span-7 flex flex-col gap-2 min-w-0 w-full">
          {data.map((entry, idx) => {
            const isHovered = hoveredIndex === idx;
            const isOther = hoveredIndex !== null && hoveredIndex !== idx;
            const parsed = parseLabel(entry.name);
            const itemColor = getColor(entry, idx);

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`w-full px-3.5 py-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  isHovered
                    ? "bg-slate-100 border-slate-300 shadow-sm"
                    : isOther
                    ? "bg-slate-50/50 border-slate-200/40 opacity-50"
                    : "bg-slate-50/80 hover:bg-slate-100 border-slate-200/60"
                }`}
              >
                {/* Sisi Kiri: Dot Warna + Label Utama + Sub-Label */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-200"
                    style={{
                      backgroundColor: itemColor,
                      transform: isHovered ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-slate-800 truncate">
                      {parsed.main}
                    </span>
                    {parsed.sub && (
                      <span className="text-[11px] text-slate-500 truncate leading-tight">
                        {parsed.sub}
                      </span>
                    )}
                  </div>
                </div>

                {/* Sisi Kanan: Persentase Tebal + Jumlah Tiket Rata Kanan */}
                <div className="text-right flex-shrink-0 whitespace-nowrap flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-900">
                    {entry.value}%
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {entry.count !== undefined ? `${entry.count} tiket` : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DonutChartCard;