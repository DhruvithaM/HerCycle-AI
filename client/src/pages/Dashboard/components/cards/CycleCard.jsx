import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

import cycleGirl from "../../../../assets/illustrations/cycle-girl.png";

function CycleCard({ cycleData }) {
  const cycleDay = cycleData?.cycleDay ?? "--";

  const phase =
    cycleData?.currentPhase ?? "Not Available";

  const progress =
    cycleData?.progress ?? 0;

  // ==========================
  // Smart Status Message
  // ==========================

  let statusMessage =
    "Waiting for cycle information";

  if (cycleData) {
    switch (phase) {
      case "Menstrual":
        statusMessage =
          "Currently on your period";
        break;

      case "Follicular": {
        const today = new Date();

        const ovulation = new Date(
          cycleData.ovulationDate
        );

        const days = Math.max(
          0,
          Math.ceil(
            (ovulation - today) /
              (1000 * 60 * 60 * 24)
          )
        );

        statusMessage =
          days === 0
            ? "Ovulation starts tomorrow"
            : `${days} day${
                days > 1 ? "s" : ""
              } until Ovulation`;

        break;
      }

      case "Ovulation":
        statusMessage =
          "Peak fertility today";
        break;

      case "Luteal":
        statusMessage = `${
          cycleData.daysUntilNextPeriod
        } day${
          cycleData.daysUntilNextPeriod > 1
            ? "s"
            : ""
        } until next period`;
        break;

      default:
        statusMessage =
          "Tracking your cycle";
    }
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        relative
        h-[250px]
        overflow-hidden
        rounded-[28px]
        border
        border-pink-100
        bg-white
        p-6
        shadow-[0_12px_35px_rgba(236,72,153,.08)]
      "
    >
      {/* Background Glow */}

      <div className="absolute -top-14 -right-14 h-40 w-40 rounded-full bg-pink-100/50 blur-3xl" />

      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-purple-100/40 blur-3xl" />

      {/* Header */}

      <div className="relative flex items-center justify-between">

        <div className="flex items-center gap-2">

          <CalendarDays
            size={16}
            className="text-pink-500"
          />

          <span className="text-sm font-semibold text-slate-700">
            Current Cycle Day
          </span>

        </div>

        <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
          {phase}
        </span>

      </div>

      {/* Body */}

      <div className="relative mt-5 flex items-center justify-between">

        {/* Left */}

        <div>

          <h1 className="text-[58px] font-black leading-none text-pink-600">
            Day {cycleDay}
          </h1>

          <p className="mt-2 text-base text-slate-500">
            {statusMessage}
          </p>

          {/* Progress */}

          <div className="mt-6">

            <div className="h-2 w-52 overflow-hidden rounded-full bg-pink-100">

              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-pink-500
                  to-purple-600
                "
              />

            </div>

            <p className="mt-2 text-xs font-medium text-slate-500">
              {progress}% of current cycle completed
            </p>

          </div>

        </div>

        {/* Illustration */}

        <div className="relative flex h-[170px] w-[170px] items-center justify-center">

          <div
            className="
              absolute
              h-[155px]
              w-[155px]
              rounded-full
              bg-gradient-to-br
              from-pink-100
              to-purple-100
            "
          />

          <img
            src={cycleGirl}
            alt="Cycle Girl"
            className="
              relative
              z-10
              h-[195px]
              max-w-none
              object-contain
              drop-shadow-2xl
              -translate-y-2
              translate-x-2
            "
          />

          <span className="absolute -left-1 bottom-8 h-3 w-3 rounded-full bg-purple-300" />

          <span className="absolute right-2 top-4 h-4 w-4 rounded-full bg-pink-300" />

          <span className="absolute bottom-3 right-6 h-5 w-5 rounded-full bg-pink-200" />

        </div>

      </div>

    </motion.div>
  );
}

export default CycleCard;