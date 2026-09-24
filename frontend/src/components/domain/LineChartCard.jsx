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
  // Custom tooltip dengan styling dark
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-container-high border border-outline-variant rounded-lg p-3 shadow-2xl">
          <p className="text-label-sm text-brand-cyan font-bold mb-1.5">{label}</p>
          {payload.map((entry, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 text-body-sm">
              <span className="flex items-center gap-1.5 text-on-surface-variant">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></span>
                {entry.name}:
              </span>
              <span className="text-primary font-semibold">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <h3 className="text-headline-sm text-primary font-semibold">{title}</h3>
        {subtitle && (
          <p className="text-body-sm text-on-surface-variant">{subtitle}</p>
        )}
      </div>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1c2b3c" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#849495"
              tick={{ fontSize: 11, fill: "#849495" }}
              axisLine={{ stroke: "#1c2b3c" }}
            />
            <YAxis
              stroke="#849495"
              tick={{ fontSize: 11, fill: "#849495" }}
              axisLine={{ stroke: "#1c2b3c" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 11, color: "#b9cacb", paddingTop: 8 }}
              iconType="circle"
            />
            <Line
              type="monotone"
              dataKey="total"
              name="Total Tiket"
              stroke="#00f2fe"
              strokeWidth={3}
              dot={{ fill: "#00f2fe", r: 4 }}
              activeDot={{ r: 6, fill: "#00f2fe" }}
            />
            <Line
              type="monotone"
              dataKey="resolved"
              name="Resolved"
              stroke="#6ff6ff"
              strokeWidth={2.5}
              dot={{ fill: "#6ff6ff", r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="pending"
              name="Pending"
              stroke="#d1c3c8"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ fill: "#d1c3c8", r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartCard;