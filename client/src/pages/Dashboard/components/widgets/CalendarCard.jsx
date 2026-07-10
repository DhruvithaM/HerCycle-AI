import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { generateCalendar } from "../../../../utils/calendarUtils";

const weekdays = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
];

function CalendarCard({ cycleData }) {
  const today = new Date();

  const [month, setMonth] = useState(
    today.getMonth()
  );

  const [year, setYear] = useState(
    today.getFullYear()
  );

  const calendar = useMemo(() => {
    return generateCalendar(
      year,
      month,
      cycleData
    );
  }, [year, month, cycleData]);

  const previousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const monthName = new Date(
    year,
    month
  ).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        w-full
        h-full
        flex
        flex-col
        rounded-[30px]
        border
        border-pink-100
        bg-white
        p-6
        shadow-[0_15px_40px_rgba(236,72,153,.08)]
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <h2 className="text-[20px] font-bold text-slate-900">
          Cycle Calendar
        </h2>

        <div className="flex items-center gap-2">

          <button
            onClick={previousMonth}
            className="rounded-xl p-2 transition hover:bg-pink-50"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="rounded-xl bg-pink-50 px-4 py-2 text-sm font-semibold text-slate-700">
            {monthName}
          </span>

          <button
            onClick={nextMonth}
            className="rounded-xl p-2 transition hover:bg-pink-50"
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

      {/* Weekdays */}

      <div className="mt-7 grid grid-cols-7 text-center">

        {weekdays.map((day) => (
          <div
            key={day}
            className="text-[11px] font-semibold uppercase tracking-wide text-slate-400"
          >
            {day}
          </div>
        ))}

      </div>

      {/* Calendar */}

      <div className="mt-4 grid flex-1 grid-cols-7 gap-y-3">

        {calendar.map((item, index) => {

          if (!item) {
            return <div key={index}></div>;
          }

          let className =
            `
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            text-sm
            font-semibold
            transition-all
            duration-300
            hover:scale-110
          `;

          // Recorded Period

          if (item.isPeriod) {
            className +=
              " bg-pink-500 text-white shadow-lg shadow-pink-200";
          }

          // Predicted Period

          else if (item.isPredictedPeriod) {
            className +=
              " border-2 border-pink-500 bg-white text-pink-600";
          }

          // Ovulation

          else if (item.isOvulation) {
            className +=
              " bg-purple-500 text-white";
          }

          // Fertile Window

          else if (item.isFertile) {
            className +=
              " bg-green-100 text-green-700";
          }

          else {
            className +=
              " hover:bg-pink-50";
          }

          // Today Ring

          if (item.isToday) {
            className +=
              " ring-4 ring-blue-300";
          }

          return (
            <div
              key={index}
              className="flex justify-center"
            >

              <div className={className}>

                {item.day}

              </div>

            </div>
          );

        })}

      </div>

      {/* Legend */}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-pink-50 pt-5">

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-full bg-pink-500"></span>

          <span className="text-sm text-slate-500">
            Recorded Period
          </span>

        </div>

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-full border-2 border-pink-500"></span>

          <span className="text-sm text-slate-500">
            Predicted Period
          </span>

        </div>

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-full bg-green-400"></span>

          <span className="text-sm text-slate-500">
            Fertile Window
          </span>

        </div>

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-full bg-purple-500"></span>

          <span className="text-sm text-slate-500">
            Ovulation
          </span>

        </div>

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-full border-2 border-blue-500"></span>

          <span className="text-sm text-slate-500">
            Today
          </span>

        </div>

      </div>

    </motion.div>
  );
}

export default CalendarCard;