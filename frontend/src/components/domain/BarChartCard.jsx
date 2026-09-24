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

export const BarChartCard = ({ data, title, subtitle, height = 280, dataKey = "count", nameKey = "product" }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-surface-container-high border border-outline-variant rounded-lg p-3 shadow-2xl">
          <p className="text-body-sm text-primary font-semibold mb-1">{item[nameKey]}</p>
          <p className="text-label-sm text-brand-cyan">
            {item.count} tiket ({item.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const colors = ["#00f2fe", "#6ff6ff", "#d1c3c8", "#849495", "#3a494b"];

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
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1c2b3c" horizontal={false} />
            <XAxis
              type="number"
              stroke="#849495"
              tick={{ fontSize: 11, fill: "#849495" }}
              axisLine={{ stroke: "#1c2b3c" }}
            />
            <YAxis
              dataKey={nameKey}
              type="category"
              stroke="#849495"
              tick={{ fontSize: 11, fill: "#b9cacb" }}
              axisLine={{ stroke: "#1c2b3c" }}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 242, 254, 0.05)" }} />
            <Bar dataKey={dataKey} radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartCard;