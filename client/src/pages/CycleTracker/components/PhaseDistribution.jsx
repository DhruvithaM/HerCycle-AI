import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#EC4899",
  "#86EFAC",
  "#8B5CF6",
  "#F59E0B",
];

function PhaseDistribution({ cycleData }) {
  if (!cycleData) return null;

  const cycleLength = cycleData.cycleLength || 28;

  const periodLength = cycleData.periodLength || 5;

  const ovulationLength = 2;

  const fertileLength = 6;

  const lutealLength =
    cycleLength -
    periodLength -
    fertileLength -
    ovulationLength;

  const data = [
    {
      name: "Menstrual",
      value: periodLength,
    },
    {
      name: "Follicular",
      value: fertileLength,
    },
    {
      name: "Ovulation",
      value: ovulationLength,
    },
    {
      name: "Luteal",
      value: lutealLength,
    },
  ];

  return (
    <div
      className="
      rounded-[30px]
      border
      border-pink-100
      bg-white
      p-6
      shadow-[0_20px_45px_rgba(236,72,153,.08)]
    "
    >
      <h2 className="text-2xl font-bold text-slate-900">
        Phase Distribution
      </h2>

      <p className="mt-1 text-slate-500">
        Distribution of your cycle phases
      </p>

      <div className="mt-6 h-[330px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              innerRadius={70}
              outerRadius={105}
              paddingAngle={3}
              dataKey="value"
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default PhaseDistribution;