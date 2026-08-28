import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { generateCalendar } from "../../../../utils/calendarUtils";

import CalendarDay from "./CalendarDay";
import CalendarLegend from "./CalendarLegend";
import DayDetailsDrawer from "./DayDetailsDrawer";

const weekdays = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
];

function CycleCalendar({ cycleData }) {
  const today = new Date();

  const [month, setMonth] = useState(
    today.getMonth()
  );

  const [year, setYear] = useState(
    today.getFullYear()
  );

  const [selectedDay, setSelectedDay] =
    useState(null);

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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-8"
    >
      <div className="grid grid-cols-12 gap-6">

        {/* Calendar */}

        <div className="col-span-12 xl:col-span-8">

          <div
            className="
              rounded-[32px]
              border
              border-pink-100
              bg-white
              p-8
              shadow-[0_15px_40px_rgba(236,72,153,.08)]
            "
          >

            {/* Header */}

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Cycle Calendar
                </h2>

                <p className="mt-1 text-slate-500">
                  Track your complete menstrual cycle.
                </p>

              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={previousMonth}
                  className="rounded-xl p-2 hover:bg-pink-50 transition"
                >
                  <ChevronLeft size={20} />
                </button>

                <div
                  className="
                    rounded-xl
                    bg-pink-50
                    px-5
                    py-2
                    font-semibold
                    text-slate-700
                  "
                >
                  {monthName}
                </div>

                <button
                  onClick={nextMonth}
                  className="rounded-xl p-2 hover:bg-pink-50 transition"
                >
                  <ChevronRight size={20} />
                </button>

              </div>

            </div>

            {/* Weekdays */}

            <div className="mt-8 grid grid-cols-7">

              {weekdays.map((day) => (
                <div
                  key={day}
                  className="
                    text-center
                    text-xs
                    font-bold
                    tracking-widest
                    text-slate-400
                  "
                >
                  {day}
                </div>
              ))}

            </div>

            {/* Calendar Grid */}

            <div className="mt-5 grid grid-cols-7 gap-y-3">

              {calendar.map((item, index) => {

                if (!item) {
                  return (
                    <div key={index}></div>
                  );
                }

                return (
                  <CalendarDay
                    key={index}
                    item={item}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                  />
                );

              })}

            </div>

            {/* Legend */}

            <div className="mt-8">

              <CalendarLegend />

            </div>

          </div>

        </div>

        {/* Details */}

        <div className="col-span-12 xl:col-span-4">

          <DayDetailsDrawer
            selectedDay={selectedDay}
            cycleData={cycleData}
          />

        </div>

      </div>
    </motion.section>
  );
}

export default CycleCalendar;