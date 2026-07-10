import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

import calendarImage from "../../../../assets/illustrations/calendar.png";

function NextPeriodCard({ cycleData }) {
  const daysRemaining =
    cycleData?.daysUntilNextPeriod ?? "--";

  const nextPeriodDate = cycleData?.nextPeriodDate
    ? new Date(cycleData.nextPeriodDate)
    : null;

  const formattedDate = nextPeriodDate
    ? nextPeriodDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "--";

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

      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-pink-100/40 blur-3xl" />

      {/* Header */}

      <div className="flex items-center gap-2">

        <CalendarDays
          size={16}
          className="text-pink-500"
        />

        <span className="text-sm font-semibold text-slate-700">
          Next Period
        </span>

      </div>

      {/* Content */}

      <div className="mt-5 flex items-center justify-between">

        {/* Left */}

        <div className="z-10">

          <div className="flex items-end gap-2">

            <h1 className="text-[60px] font-black leading-none text-purple-600">
              {daysRemaining}
            </h1>

            <span className="mb-2 text-[22px] font-bold text-slate-800">
              {daysRemaining === 1 ? "Day" : "Days"}
            </span>

          </div>

          <p className="mt-5 text-sm text-slate-500">
            Expected on
          </p>

          <h3 className="mt-1 text-[22px] font-bold text-slate-900">
            {formattedDate}
          </h3>

          <button
            className="
              mt-6
              text-sm
              font-semibold
              text-pink-500
              transition-all
              duration-300
              hover:translate-x-1
            "
          >
            View Calendar →
          </button>

        </div>

        {/* Calendar Illustration */}

        <div
          className="
            relative
            flex
            h-[210px]
            w-[210px]
            items-center
            justify-center
            -mr-2
          "
        >

          <img
            src={calendarImage}
            alt="Calendar"
            className="
              h-[215px]
              w-auto
              object-contain
              drop-shadow-2xl
              scale-[1.15]
              -translate-x-8
              translate-y-3
            "
          />

        </div>

      </div>

    </motion.div>
  );
}

export default NextPeriodCard;