import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export const BarChartCard = ({ 
  data = [], 
  title, 
  subtitle, 
  height = 250, 
  dataKey = "count", 
  nameKey = "product",
  yAxisWidth = 240,
}) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white rounded-2xl px-4 py-3 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.12)] border border-slate-100 pointer-events-none z-30 transition-all">
          <p className="text-xs font-bold text-slate-900 mb-0.5 leading-snug">{item[nameKey]}</p>
          <p className="text-xs text-slate-600 mt-1">
            <strong className="text-slate-900 font-bold">{item.count}</strong> tiket ({item.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const colors = ["#0F172A", "#1E293B", "#334155", "#475569", "#64748B", "#94A3B8"];

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
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 28, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
            <XAxis
              type="number"
              stroke="#94A3B8"
              tick={{ fontSize: 11, fill: "#64748B" }}
              axisLine={{ stroke: "#E2E8F0" }}
              allowDecimals={false}
            />
            <YAxis
              dataKey={nameKey}
              type="category"
              stroke="#94A3B8"
              tick={{ fontSize: 12, fill: "#1E293B", fontWeight: 500 }}
              axisLine={{ stroke: "#E2E8F0" }}
              tickLine={false}
              width={yAxisWidth}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ fill: "rgba(15, 23, 42, 0.03)" }} 
              wrapperStyle={{ outline: "none", zIndex: 40 }}
            />
            <Bar dataKey={dataKey} radius={[0, 8, 8, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]} 
                  className="transition-all duration-200 hover:opacity-85 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartCard;