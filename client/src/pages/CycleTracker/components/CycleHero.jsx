import {
  CalendarDays,
  HeartPulse,
  Moon,
  Sparkles,
  Activity,
} from "lucide-react";

/* ==========================================================
   GREETING
========================================================== */

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good Morning";
  }

  if (hour < 17) {
    return "Good Afternoon";
  }

  if (hour < 21) {
    return "Good Evening";
  }

  return "Good Night";
}

/* ==========================================================
   DATE FORMATTER
========================================================== */

function formatDate(dateValue) {
  if (!dateValue) return "--";

  const date =
    typeof dateValue?.toDate === "function"
      ? dateValue.toDate()
      : new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "--";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/* ==========================================================
   CYCLE HERO
========================================================== */

function CycleHero({
  profile,
  cycleData,
}) {
  const greeting = getGreeting();

  const userName =
    profile?.name ||
    profile?.fullName ||
    profile?.displayName ||
    "there";

  const currentPhase =
    cycleData?.currentPhase || "--";

  const cycleDay =
    cycleData?.cycleDay || "--";

  const cycleLength =
    cycleData?.cycleLength || 28;

  const progress =
    cycleData?.progress || 0;

  const confidence =
    cycleData?.confidence || 60;

  const daysUntilNextPeriod =
    cycleData?.daysUntilNextPeriod ?? "--";

  return (
    <section
      className="
        relative
        mb-8
        overflow-hidden
        rounded-[28px]
        bg-gradient-to-r
        from-pink-500
        via-pink-500
        to-purple-500
        px-8
        py-8
        text-white
        shadow-[0_20px_50px_rgba(236,72,153,.18)]
      "
    >
      {/* ======================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-24
          h-64
          w-64
          rounded-full
          bg-white/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          left-1/3
          h-56
          w-56
          rounded-full
          bg-purple-300/10
          blur-3xl
        "
      />

      <div
        className="
          relative
          grid
          grid-cols-1
          gap-8
          lg:grid-cols-[1.25fr_1fr]
          lg:items-center
        "
      >
        {/* ====================================================
            LEFT CONTENT
        ==================================================== */}

        <div>
          {/* Premium Badge */}

          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white/15
              px-4
              py-2
              text-xs
              font-semibold
              backdrop-blur-md
            "
          >
            <Sparkles size={14} />

            HerCycle AI Premium Tracker
          </div>

          {/* Greeting */}

          <h1
            className="
              text-4xl
              font-black
              leading-[1.05]
              tracking-tight
              sm:text-5xl
            "
          >
            {greeting},
            <br />

            {userName}

            <span className="ml-2">
              🌸
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-5
              max-w-[600px]
              text-sm
              leading-7
              text-white/85
              sm:text-base
            "
          >
            Track every phase of your menstrual
            cycle with personalized AI-powered
            insights, accurate predictions, and
            beautiful health analytics.
          </p>
        </div>

        {/* ====================================================
            RIGHT STATISTICS
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-4
          "
        >
          {/* Current Phase */}

          <div
            className="
              rounded-[20px]
              bg-white/15
              p-5
              backdrop-blur-md
              transition
              hover:bg-white/20
            "
          >
            <div className="mb-4 flex items-center gap-2">
              <HeartPulse size={18} />

              <span className="text-xs font-medium text-white/75">
                Current Phase
              </span>
            </div>

            <p className="text-xl font-black">
              {currentPhase}
            </p>
          </div>

          {/* Cycle Day */}

          <div
            className="
              rounded-[20px]
              bg-white/15
              p-5
              backdrop-blur-md
              transition
              hover:bg-white/20
            "
          >
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays size={18} />

              <span className="text-xs font-medium text-white/75">
                Cycle Day
              </span>
            </div>

            <p className="text-xl font-black">
              Day {cycleDay}
            </p>
          </div>

          {/* Cycle Progress */}

          <div
            className="
              rounded-[20px]
              bg-white/15
              p-5
              backdrop-blur-md
              transition
              hover:bg-white/20
            "
          >
            <div className="mb-4 flex items-center gap-2">
              <Activity size={18} />

              <span className="text-xs font-medium text-white/75">
                Cycle Progress
              </span>
            </div>

            <div className="flex items-end justify-between">
              <p className="text-xl font-black">
                {progress}%
              </p>
            </div>

            <div
              className="
                mt-3
                h-1.5
                overflow-hidden
                rounded-full
                bg-white/20
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-white
                  transition-all
                  duration-700
                "
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* AI Confidence */}

          <div
            className="
              rounded-[20px]
              bg-white/15
              p-5
              backdrop-blur-md
              transition
              hover:bg-white/20
            "
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles size={18} />

              <span className="text-xs font-medium text-white/75">
                AI Confidence
              </span>
            </div>

            <p className="text-xl font-black">
              {confidence}%
            </p>

            <p className="mt-1 text-[10px] text-white/65">
              Prediction Accuracy
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================
          NEXT PERIOD INFO
      ====================================================== */}

      <div
        className="
          relative
          mt-6
          flex
          flex-wrap
          items-center
          gap-x-8
          gap-y-3
          border-t
          border-white/15
          pt-5
          text-sm
        "
      >
        <div className="flex items-center gap-2">
          <Moon size={16} />

          <span className="text-white/70">
            Next Period
          </span>

          <span className="font-bold">
            {daysUntilNextPeriod === 0
              ? "Today"
              : daysUntilNextPeriod === 1
              ? "Tomorrow"
              : `${daysUntilNextPeriod} days`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={16} />

          <span className="text-white/70">
            Expected
          </span>

          <span className="font-bold">
            {formatDate(
              cycleData?.nextPeriodDate
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Activity size={16} />

          <span className="text-white/70">
            Cycle Length
          </span>

          <span className="font-bold">
            {cycleLength} days
          </span>
        </div>
      </div>
    </section>
  );
}

export default CycleHero;