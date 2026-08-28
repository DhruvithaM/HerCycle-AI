import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function CycleTrendChart({ cycleData }) {
  if (!cycleData) return null;

  const data = [
    { month: "Jan", cycle: 28 },
    { month: "Feb", cycle: 29 },
    { month: "Mar", cycle: 27 },
    { month: "Apr", cycle: 28 },
    { month: "May", cycle: 28 },
    { month: "Jun", cycle: cycleData.cycleLength },
  ];

  return (
    <div
      className="
      rounded-[32px]
      border
      border-pink-100
      bg-white
      p-8
      shadow-[0_20px_50px_rgba(236,72,153,.08)]
    "
    >
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Cycle Trend
          </h2>

          <p className="mt-1 text-slate-500">
            Monthly cycle length analysis
          </p>
        </div>

        <div className="rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
          Last 6 Months
        </div>
      </div>

      {/* Chart */}

      <div className="h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="cycleGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#EC4899"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#EC4899"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#FCE7F3"
              strokeDasharray="5 5"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#64748B",
                fontSize: 13,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[24, 32]}
              tick={{
                fill: "#64748B",
                fontSize: 13,
              }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "none",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,.08)",
              }}
            />

            <Area
              type="monotone"
              dataKey="cycle"
              stroke="#EC4899"
              strokeWidth={4}
              fill="url(#cycleGradient)"
              dot={{
                r: 6,
                fill: "#EC4899",
                stroke: "#fff",
                strokeWidth: 3,
              }}
              activeDot={{
                r: 8,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CycleTrendChart;