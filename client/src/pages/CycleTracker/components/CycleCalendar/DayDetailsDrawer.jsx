import {
  CalendarDays,
  Activity,
  Brain,
  Heart,
  ChevronRight,
  Droplets,
  Pill,
  Smile,
  NotebookPen,
} from "lucide-react";

function DayDetailsDrawer({
  selectedDay,
  cycleData,
}) {
  if (!selectedDay) {
    return (
      <div
        className="
          sticky
          top-6
          rounded-[32px]
          border
          border-pink-100
          bg-white
          p-8
          shadow-[0_20px_45px_rgba(236,72,153,.08)]
        "
      >
        <div className="flex h-full flex-col items-center justify-center py-16 text-center">

          <div className="rounded-full bg-pink-100 p-5">
            <CalendarDays
              size={42}
              className="text-pink-500"
            />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Select a Date
          </h2>

          <p className="mt-3 max-w-xs leading-7 text-slate-500">
            Click on any calendar day to view
            AI-powered health insights,
            cycle information and daily
            recommendations.
          </p>

        </div>
      </div>
    );
  }

  let status = "Normal";
  let color = "text-slate-700";

  if (selectedDay.isPeriod) {
    status = "Menstrual";
    color = "text-pink-600";
  }

  if (selectedDay.isPredictedPeriod) {
    status = "Predicted Period";
    color = "text-pink-500";
  }

  if (selectedDay.isOvulation) {
    status = "Ovulation";
    color = "text-purple-600";
  }

  if (selectedDay.isFertile) {
    status = "Fertility Window";
    color = "text-green-600";
  }

  return (
    <div
      className="
        sticky
        top-6
        space-y-6
      "
    >
      {/* Header */}

      <div
        className="
          overflow-hidden
          rounded-[32px]
          bg-gradient-to-br
          from-pink-500
          via-pink-500
          to-purple-600
          p-7
          text-white
          shadow-[0_20px_45px_rgba(236,72,153,.25)]
        "
      >
        <p className="text-pink-100 text-sm">
          Selected Date
        </p>

        <h2 className="mt-2 text-3xl font-black">
          {selectedDay.day}
        </h2>

        <p className="mt-3 text-pink-100">
          {status}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">

            <Activity size={18} />

            <p className="mt-3 text-xs text-pink-100">
              Phase
            </p>

            <h3 className="mt-1 font-bold">
              {cycleData.currentPhase}
            </h3>

          </div>

          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">

            <Heart size={18} />

            <p className="mt-3 text-xs text-pink-100">
              Health
            </p>

            <h3 className="mt-1 font-bold">
              90%
            </h3>

          </div>

        </div>

      </div>

      {/* AI Insight */}

      <div
        className="
          rounded-[30px]
          border
          border-pink-100
          bg-white
          p-6
          shadow-[0_15px_40px_rgba(236,72,153,.08)]
        "
      >
        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-pink-100 p-3">

            <Brain
              size={20}
              className="text-pink-600"
            />

          </div>

          <div>

            <h3 className="font-bold text-slate-900">
              Today's AI Insight
            </h3>

            <p className="text-sm text-slate-500">
              Personalized Recommendation
            </p>

          </div>

        </div>

        <p className="mt-5 leading-7 text-slate-600">

          {cycleData.currentPhase ===
            "Menstrual" &&
            "Focus on iron-rich foods, hydration and proper rest during your menstrual phase."}

          {cycleData.currentPhase ===
            "Follicular" &&
            "Energy levels are improving. Great time for strength training and balanced nutrition."}

          {cycleData.currentPhase ===
            "Ovulation" &&
            "Ovulation is approaching. Stay hydrated and monitor your body's natural signals."}

          {cycleData.currentPhase ===
            "Luteal" &&
            "Your body is preparing for the next cycle. Magnesium-rich foods and quality sleep may help reduce PMS symptoms."}

        </p>

        <button
          className="
            mt-6
            flex
            items-center
            gap-2
            font-semibold
            text-pink-600
          "
        >
          Learn More

          <ChevronRight size={16} />

        </button>

      </div>

      {/* Daily Tracking */}

      <div
        className="
          rounded-[30px]
          border
          border-pink-100
          bg-white
          p-6
          shadow-[0_15px_40px_rgba(236,72,153,.08)]
        "
      >
        <h3 className="text-lg font-bold text-slate-900">
          Today's Tracking
        </h3>

        <div className="mt-5 space-y-3">

          <TrackingCard
            icon={Smile}
            title="Mood"
          />

          <TrackingCard
            icon={Droplets}
            title="Water Intake"
          />

          <TrackingCard
            icon={Pill}
            title="Medicine"
          />

          <TrackingCard
            icon={NotebookPen}
            title="Notes"
          />

        </div>

        <button
          className="
            mt-6
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-pink-500
            to-purple-600
            py-4
            font-semibold
            text-white
            transition
            hover:scale-[1.02]
          "
        >
          + Record Symptoms
        </button>

      </div>

    </div>
  );
}

function TrackingCard({
  icon: Icon,
  title,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-pink-100
        p-4
        transition
        hover:bg-pink-50
      "
    >
      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-pink-100 p-3">

          <Icon
            size={18}
            className="text-pink-600"
          />

        </div>

        <span className="font-medium text-slate-700">
          {title}
        </span>

      </div>

      <ChevronRight
        size={18}
        className="text-slate-400"
      />
    </div>
  );
}

export default DayDetailsDrawer;