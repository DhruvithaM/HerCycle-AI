import StatisticsCards from "./StatisticsCards";
import CycleTrendChart from "./CycleTrendChart";
import PhaseDistribution from "./PhaseDistribution";

function CycleStatistics({ cycleData }) {
  if (!cycleData) return null;

  return (
    <section className="mt-12">
      {/* ===========================
          Section Heading
      ============================ */}

      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900">
          Statistics & Analytics
        </h2>

        <p className="mt-2 text-slate-500">
          AI-generated insights based on your menstrual cycle history.
        </p>
      </div>

      {/* ===========================
          Statistics Cards
      ============================ */}

      <StatisticsCards cycleData={cycleData} />

      {/* ===========================
          Cycle Trend Chart
      ============================ */}

      <div className="mt-8">
        <CycleTrendChart cycleData={cycleData} />
      </div>

      {/* ===========================
          Analytics Cards
      ============================ */}

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-2">
        <PhaseDistribution cycleData={cycleData} />

        {/* Health Score Chart
            Will be built in the next step */}
        <div
          className="
            flex
            min-h-[420px]
            items-center
            justify-center
            rounded-[30px]
            border
            border-pink-100
            bg-white
            shadow-[0_20px_45px_rgba(236,72,153,.08)]
          "
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800">
              Health Score
            </h3>

            <p className="mt-2 text-slate-500">
              Coming in the next step...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CycleStatistics;