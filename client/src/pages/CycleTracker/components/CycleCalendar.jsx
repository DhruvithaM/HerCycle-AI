import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Heart,
  Activity,
  Brain,
  Droplets,
  Pill,
  FileText,
} from "lucide-react";

import { generateCalendar } from "../../../../utils/calendarUtils";

/* ==========================================================
   HELPERS
========================================================== */

function normalizeDate(value) {
  if (!value) return null;

  const date =
    typeof value?.toDate === "function"
      ? value.toDate()
      : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  date.setHours(0, 0, 0, 0);

  return date;
}

function formatMonth(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

/* ==========================================================
   GET INFORMATION FOR SELECTED DATE
========================================================== */

function getDateInformation(cell) {
  if (!cell) {
    return {
      title: "Select a Date",

      subtitle:
        "Click on any calendar day to view AI-powered health insights, cycle information and daily recommendations.",

      phase: "",

      event: "",

      insight:
        "Select a date from the calendar to see personalized information.",
    };
  }

  let phase = "Normal";

  let event = "Normal";

  let insight =
    "This is a normal cycle day. Continue your healthy routine with balanced nutrition, hydration, movement and quality sleep.";

  /*
    IMPORTANT PRIORITY:

    Recorded Period
    Predicted Period
    Ovulation
    Fertile Window
    Normal
  */

  if (cell.isPeriod) {
    phase = "Menstrual";

    event = "Recorded Period";

    insight =
      "Your body is in the menstrual phase. Prioritize rest, hydration and iron-rich foods to support your wellbeing.";
  } else if (cell.isPredictedPeriod) {
    phase = "Menstrual";

    event = "Predicted Period";

    insight =
      "Your predicted period is approaching. Prepare for your cycle by prioritizing hydration, rest and balanced nutrition.";
  } else if (cell.isOvulation) {
    phase = "Ovulation";

    event = "Ovulation";

    insight =
      "You are around your predicted ovulation day. Stay hydrated, maintain balanced nutrition and listen to your body.";
  } else if (cell.isFertile) {
    phase = "Fertile";

    event = "Fertility Window";

    insight =
      "You are currently in your predicted fertile window. Maintain hydration, balanced nutrition and healthy daily routines.";
  }

  return {
    title: event,

    subtitle: phase,

    phase,

    event,

    insight,
  };
}

/* ==========================================================
   CALENDAR LEGEND ITEM
========================================================== */

function LegendItem({
  type,
  label,
}) {
  const styles = {
    recorded: "bg-pink-500",

    predicted:
      "border border-pink-500 bg-white",

    fertile:
      "bg-emerald-500",

    ovulation:
      "bg-purple-500",

    today:
      "border border-blue-500 bg-white",
  };

  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <span
        className={`h-2.5 w-2.5 rounded-full ${styles[type]}`}
      />

      <span>{label}</span>
    </div>
  );
}

/* ==========================================================
   CALENDAR DAY
========================================================== */

function CalendarDay({
  cell,
  isSelected,
  onClick,
}) {
  if (!cell) {
    return (
      <div className="h-14 sm:h-16" />
    );
  }

  let background = "";

  let text = "text-slate-700";

  let border = "";

  let shadow = "";

  /* ========================================================
     RECORDED PERIOD
  ======================================================== */

  if (cell.isPeriod) {
    background = "bg-pink-500";

    text = "text-white";

    shadow =
      "shadow-lg shadow-pink-200";
  }

  /* ========================================================
     PREDICTED PERIOD
  ======================================================== */

  else if (cell.isPredictedPeriod) {
    background = "bg-white";

    text = "text-pink-500";

    border =
      "border border-pink-500";
  }

  /* ========================================================
     OVULATION
  ======================================================== */

  else if (cell.isOvulation) {
    background =
      "bg-purple-500";

    text =
      "text-white";

    shadow =
      "shadow-lg shadow-purple-200";
  }

  /* ========================================================
     FERTILE WINDOW
  ======================================================== */

  else if (cell.isFertile) {
    background =
      "bg-emerald-100";

    text =
      "text-emerald-700";
  }

  /* ========================================================
     SELECTED DATE
  ======================================================== */

  if (isSelected) {
    border =
      "ring-2 ring-pink-300 ring-offset-2";
  }

  /* ========================================================
     TODAY
  ======================================================== */

  if (cell.isToday) {
    border = `${border} border-2 border-blue-500`;
  }

  return (
    <button
      type="button"
      onClick={() => onClick(cell)}
      className={`
        relative
        flex
        h-14
        w-full
        items-center
        justify-center
        rounded-2xl
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        ${background}
        ${text}
        ${border}
        ${shadow}
      `}
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text-sm font-bold">
          {cell.day}
        </span>

        {(cell.isPeriod ||
          cell.isPredictedPeriod ||
          cell.isFertile ||
          cell.isOvulation) && (
          <span className="mt-0.5 text-[10px] leading-none">
            {cell.isOvulation
              ? "◯"
              : cell.isFertile
              ? "♡"
              : "♙"}
          </span>
        )}
      </div>

      {cell.isToday && (
        <span
          className="
            absolute
            -right-1
            -top-1
            h-2.5
            w-2.5
            rounded-full
            bg-blue-500
          "
        />
      )}
    </button>
  );
}

/* ==========================================================
   SELECTED DATE PANEL
========================================================== */

function SelectedDatePanel({
  selectedCell,
}) {
  const info =
    getDateInformation(selectedCell);

  if (!selectedCell) {
    return (
      <div
        className="
          flex
          min-h-[410px]
          flex-col
          items-center
          justify-center
          rounded-[28px]
          border
          border-pink-100
          bg-white
          px-8
          text-center
          shadow-[0_15px_40px_rgba(236,72,153,0.08)]
        "
      >
        <div
          className="
            mb-5
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-pink-100
          "
        >
          <CalendarDays
            size={30}
            className="text-pink-500"
          />
        </div>

        <h3 className="text-xl font-black text-slate-900">
          Select a Date
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
          Click on any calendar day to view
          AI-powered health insights, cycle
          information and daily recommendations.
        </p>
      </div>
    );
  }

  const displayPhase =
    info.phase || "Normal";

  return (
    <div className="space-y-5">

      {/* SELECTED DATE SUMMARY */}

      <div
        className="
          overflow-hidden
          rounded-[28px]
          bg-gradient-to-br
          from-pink-500
          via-fuchsia-500
          to-purple-600
          p-6
          text-white
          shadow-[0_18px_45px_rgba(236,72,153,0.20)]
        "
      >
        <p className="text-xs font-medium text-white/80">
          Selected Date
        </p>

        <h2 className="mt-2 text-3xl font-black">
          {selectedCell.day}
        </h2>

        <p className="mt-1 text-sm font-medium text-white/90">
          {info.event}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">

          {/* PHASE */}

          <div
            className="
              rounded-2xl
              bg-white/15
              p-4
              backdrop-blur-sm
            "
          >
            <Activity size={18} />

            <p className="mt-3 text-[10px] text-white/70">
              Phase
            </p>

            <p className="mt-1 text-sm font-bold">
              {displayPhase}
            </p>
          </div>

          {/* HEALTH */}

          <div
            className="
              rounded-2xl
              bg-white/15
              p-4
              backdrop-blur-sm
            "
          >
            <Heart size={18} />

            <p className="mt-3 text-[10px] text-white/70">
              Health
            </p>

            <p className="mt-1 text-sm font-bold">
              90%
            </p>
          </div>
        </div>

        {selectedCell.cycleDay && (
          <div
            className="
              mt-4
              rounded-xl
              bg-white/10
              px-4
              py-3
              text-xs
              text-white/90
            "
          >
            Cycle Day {selectedCell.cycleDay}
          </div>
        )}
      </div>

      {/* AI INSIGHT */}

      <div
        className="
          rounded-[28px]
          border
          border-pink-100
          bg-white
          p-6
          shadow-[0_15px_40px_rgba(236,72,153,0.07)]
        "
      >
        <div className="flex items-start gap-3">

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-pink-100
            "
          >
            <Brain
              size={19}
              className="text-pink-500"
            />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Today's AI Insight
            </h3>

            <p className="text-xs text-slate-400">
              Personalized Recommendation
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-600">
          {info.insight}
        </p>

        <button
          type="button"
          className="
            mt-5
            text-sm
            font-semibold
            text-pink-500
            transition
            hover:text-pink-600
          "
        >
          Learn More

          <span className="ml-2">
            ›
          </span>
        </button>
      </div>

      {/* TODAY'S TRACKING */}

      <div
        className="
          rounded-[28px]
          border
          border-pink-100
          bg-white
          p-5
          shadow-[0_15px_40px_rgba(236,72,153,0.07)]
        "
      >
        <h3 className="mb-4 font-bold text-slate-900">
          Today's Tracking
        </h3>

        <div className="space-y-3">

          <TrackingItem
            icon={Heart}
            label="Mood"
          />

          <TrackingItem
            icon={Droplets}
            label="Water Intake"
          />

          <TrackingItem
            icon={Pill}
            label="Medicine"
          />

          <TrackingItem
            icon={FileText}
            label="Notes"
          />

        </div>

        <button
          type="button"
          className="
            mt-4
            w-full
            rounded-xl
            bg-gradient-to-r
            from-pink-500
            to-purple-500
            py-3
            text-xs
            font-bold
            text-white
            transition
            hover:opacity-90
          "
        >
          + Record Symptoms
        </button>
      </div>
    </div>
  );
}

/* ==========================================================
   TRACKING ITEM
========================================================== */

function TrackingItem({
  icon: Icon,
  label,
}) {
  return (
    <button
      type="button"
      className="
        flex
        w-full
        items-center
        justify-between
        rounded-xl
        border
        border-pink-100
        bg-white
        px-4
        py-3
        text-left
        transition
        hover:bg-pink-50
      "
    >
      <span className="flex items-center gap-3">

        <span
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-pink-100
          "
        >
          <Icon
            size={16}
            className="text-pink-500"
          />
        </span>

        <span className="text-sm font-medium text-slate-600">
          {label}
        </span>

      </span>

      <ChevronRight
        size={16}
        className="text-slate-400"
      />
    </button>
  );
}

/* ==========================================================
   MAIN COMPONENT
========================================================== */

function CycleCalendar({
  cycleData,
}) {
  /* ========================================================
     TODAY
  ======================================================== */

  const today = useMemo(
    () => normalizeDate(new Date()),
    []
  );

  /* ========================================================
     CURRENT MONTH
  ======================================================== */

  const [currentMonth, setCurrentMonth] =
    useState(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

  /* ========================================================
     SELECTED DATE
  ======================================================== */

  const [selectedCell, setSelectedCell] =
    useState(null);

  /* ========================================================
     GENERATE CALENDAR
  ======================================================== */

  const calendar = useMemo(() => {
    return generateCalendar(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      cycleData
    );
  }, [
    currentMonth,
    cycleData,
  ]);

  /* ========================================================
     KEEP SELECTED CELL SYNCHRONIZED

     This is the important fix.

     When cycleData changes, generateCalendar creates new
     calendar cells. We update selectedCell using the newest
     matching cell so the right panel never shows old phase data.
  ======================================================== */

  useEffect(() => {
    if (!selectedCell) return;

    const updatedCell = calendar.find(
      (cell) =>
        cell &&
        cell.date &&
        selectedCell.date &&
        cell.date.getTime() ===
          selectedCell.date.getTime()
    );

    if (!updatedCell) return;

    /*
      Only update when the actual calendar cell data changed.
      This prevents unnecessary repeated state updates.
    */

    const hasChanged =
      updatedCell.isPeriod !== selectedCell.isPeriod ||
      updatedCell.isPredictedPeriod !==
        selectedCell.isPredictedPeriod ||
      updatedCell.isFertile !==
        selectedCell.isFertile ||
      updatedCell.isOvulation !==
        selectedCell.isOvulation ||
      updatedCell.isToday !==
        selectedCell.isToday ||
      updatedCell.cycleDay !==
        selectedCell.cycleDay;

    if (hasChanged) {
      setSelectedCell(updatedCell);
    }
  }, [
    calendar,
    selectedCell,
  ]);

  /* ========================================================
     PREVIOUS MONTH
  ======================================================== */

  const previousMonth = () => {
    setCurrentMonth(
      (previous) =>
        new Date(
          previous.getFullYear(),
          previous.getMonth() - 1,
          1
        )
    );

    setSelectedCell(null);
  };

  /* ========================================================
     NEXT MONTH
  ======================================================== */

  const nextMonth = () => {
    setCurrentMonth(
      (previous) =>
        new Date(
          previous.getFullYear(),
          previous.getMonth() + 1,
          1
        )
    );

    setSelectedCell(null);
  };

  /* ========================================================
     SELECT DATE
  ======================================================== */

  const handleDateSelect = (cell) => {
    if (!cell) return;

    setSelectedCell(cell);
  };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <section className="mt-8">

      <div
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-[minmax(0,2fr)_minmax(350px,1fr)]
        "
      >

        {/* CALENDAR */}

        <div
          className="
            rounded-[28px]
            border
            border-pink-100
            bg-white
            p-7
            shadow-[0_18px_50px_rgba(236,72,153,0.08)]
          "
        >

          {/* HEADER */}

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-black text-slate-900">
                Cycle Calendar
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Track your complete menstrual cycle.
              </p>

            </div>

            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={previousMonth}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-slate-700
                  transition
                  hover:bg-pink-50
                "
              >
                <ChevronLeft size={18} />
              </button>

              <div
                className="
                  rounded-xl
                  bg-pink-50
                  px-5
                  py-2
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                {formatMonth(currentMonth)}
              </div>

              <button
                type="button"
                onClick={nextMonth}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-slate-700
                  transition
                  hover:bg-pink-50
                "
              >
                <ChevronRight size={18} />
              </button>

            </div>
          </div>

          {/* WEEKDAYS */}

          <div className="mt-7 grid grid-cols-7 gap-3">

            {[
              "SUN",
              "MON",
              "TUE",
              "WED",
              "THU",
              "FRI",
              "SAT",
            ].map((day) => (
              <div
                key={day}
                className="
                  text-center
                  text-[10px]
                  font-bold
                  tracking-wide
                  text-slate-400
                "
              >
                {day}
              </div>
            ))}

          </div>

          {/* CALENDAR DAYS */}

          <div className="mt-4 grid grid-cols-7 gap-3">

            {calendar.map(
              (cell, index) => (
                <CalendarDay
                  key={
                    cell
                      ? `${cell.date.toISOString()}-${index}`
                      : `empty-${index}`
                  }
                  cell={cell}
                  isSelected={
                    selectedCell
                      ? cell &&
                        selectedCell.date &&
                        cell.date &&
                        cell.date.getTime() ===
                          selectedCell.date.getTime()
                      : false
                  }
                  onClick={
                    handleDateSelect
                  }
                />
              )
            )}

          </div>

          {/* LEGEND */}

          <div
            className="
              mt-7
              border-t
              border-pink-100
              pt-5
            "
          >

            <p
              className="
                mb-4
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-slate-500
              "
            >
              Calendar Legend
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-3">

              <LegendItem
                type="recorded"
                label="Recorded Period"
              />

              <LegendItem
                type="predicted"
                label="Predicted Period"
              />

              <LegendItem
                type="fertile"
                label="Fertility Window"
              />

              <LegendItem
                type="ovulation"
                label="Ovulation"
              />

              <LegendItem
                type="today"
                label="Today"
              />

            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}

        <SelectedDatePanel
          selectedCell={selectedCell}
        />

      </div>
    </section>
  );
}

export default CycleCalendar;