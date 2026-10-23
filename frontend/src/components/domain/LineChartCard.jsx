import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const LineChartCard = ({ data, title, subtitle, height = 320 }) => {
  // Custom tooltip dengan clean light styling
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
          <p className="text-xs text-slate-900 font-bold mb-1.5">{label}</p>
          {payload.map((entry, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 text-xs py-0.5">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></span>
                {entry.name}:
              </span>
              <span className="text-slate-900 font-semibold">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-3">
      {(title || subtitle) && (
        <div className="flex flex-col">
          {title && <h3 className="text-sm font-semibold text-slate-900">{title}</h3>}
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          )}
        </div>
      )}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#94A3B8"
              tick={{ fontSize: 11, fill: "#64748B" }}
              axisLine={{ stroke: "#E2E8F0" }}
            />
            <YAxis
              stroke="#94A3B8"
              tick={{ fontSize: 11, fill: "#64748B" }}
              axisLine={{ stroke: "#E2E8F0" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 11, color: "#64748B", paddingTop: 8 }}
              iconType="circle"
            />
            <Line
              type="monotone"
              dataKey="total"
              name="Total Tiket"
              stroke="#0F172A"
              strokeWidth={2.5}
              dot={{ fill: "#0F172A", r: 4 }}
              activeDot={{ r: 6, fill: "#0F172A" }}
            />
            <Line
              type="monotone"
              dataKey="resolved"
              name="Resolved"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: "#10B981", r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="pending"
              name="Pending"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ fill: "#F59E0B", r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartCard;