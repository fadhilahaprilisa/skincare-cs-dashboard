import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export const DonutChartCard = ({ data, title, subtitle, centerLabel, centerValue }) => {
  const COLORS = ["#FF4D4D", "#FFC048", "#6ff6ff", "#2ED573", "#849495"];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <h3 className="text-headline-sm text-primary font-semibold">{title}</h3>
        {subtitle && (
          <p className="text-body-sm text-on-surface-variant">{subtitle}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-5">
        {/* Donut Chart */}
        <div className="relative w-40 h-40 shrink-0">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-headline-md text-primary font-bold leading-none">
              {centerValue}
            </span>
            <span className="text-label-sm text-on-surface-variant uppercase mt-0.5">
              {centerLabel}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 flex-1 w-full">
          {data.map((entry, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded bg-surface-container text-body-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                ></span>
                <span className="text-on-surface">{entry.name}</span>
              </div>
              <span className="text-primary font-semibold">
                {entry.value}%{" "}
                <span className="text-on-surface-variant font-normal">
                  ({entry.count})
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChartCard;