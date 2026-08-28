import {
  Clock3,
  MoreVertical,
  Pill,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";


function MedicineCard({
  medicine,
  onDelete,
  onToggleStatus,
}) {
  /* ==========================================================
     SAFETY CHECK
  ========================================================== */

  if (!medicine) {
    return null;
  }


  /* ==========================================================
     MEDICINE DATA
  ========================================================== */

  const {
    id,
    name = "Unnamed medicine",
    dosage = "",
    frequency = "daily",
    days = [],
    times = [],
    notes = "",
    active = true,
  } = medicine;


  /* ==========================================================
     FORMAT FREQUENCY
  ========================================================== */

  const getFrequencyLabel = () => {
    if (frequency === "daily") {
      return "Daily";
    }

    if (frequency === "weekly") {
      return "Weekly";
    }

    if (frequency === "as-needed") {
      return "As needed";
    }

    return frequency;
  };


  /* ==========================================================
     FORMAT DAYS
  ========================================================== */

  const getDaysLabel = () => {
    if (
      frequency !== "weekly" ||
      !Array.isArray(days) ||
      days.length === 0
    ) {
      return null;
    }

    return days.join(", ");
  };


  /* ==========================================================
     FORMAT TIMES
  ========================================================== */

  const getTimesLabel = () => {
    if (
      !Array.isArray(times) ||
      times.length === 0
    ) {
      return "No reminder time";
    }

    return times.join(" • ");
  };


  /* ==========================================================
     HANDLE STATUS
  ========================================================== */

  const handleToggle = () => {
    if (
      id &&
      typeof onToggleStatus === "function"
    ) {
      onToggleStatus(
        id,
        !active
      );
    }
  };


  /* ==========================================================
     HANDLE DELETE
  ========================================================== */

  const handleDelete = () => {
    if (
      id &&
      typeof onDelete === "function"
    ) {
      const shouldDelete =
        window.confirm(
          `Delete "${name}" from your medicine reminders?`
        );

      if (shouldDelete) {
        onDelete(id);
      }
    }
  };


  /* ==========================================================
     CARD
  ========================================================== */

  return (
    <div
      className={`
        rounded-2xl
        border
        p-5
        shadow-sm
        transition-all
        duration-300

        ${
          active
            ? "border-slate-100 bg-white hover:-translate-y-0.5 hover:shadow-md"
            : "border-slate-200 bg-slate-50 opacity-75"
        }
      `}
    >

      {/* ================================================
          TOP SECTION
      ================================================= */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex min-w-0 items-center gap-3">

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-pink-100
              to-purple-100
              text-pink-600
            "
          >
            <Pill size={22} />
          </div>


          <div className="min-w-0">

            <h3
              className="
                truncate
                text-base
                font-bold
                text-slate-800
              "
            >
              {name}
            </h3>


            {dosage && (
              <p className="mt-1 text-sm text-slate-500">
                {dosage}
              </p>
            )}

          </div>

        </div>


        <MoreVertical
          size={18}
          className="shrink-0 text-slate-400"
        />

      </div>


      {/* ================================================
          FREQUENCY
      ================================================= */}

      <div className="mt-5 flex flex-wrap items-center gap-2">

        <span
          className="
            rounded-full
            bg-pink-50
            px-3
            py-1.5
            text-xs
            font-semibold
            text-pink-600
          "
        >
          {getFrequencyLabel()}
        </span>


        {!active && (
          <span
            className="
              rounded-full
              bg-slate-200
              px-3
              py-1.5
              text-xs
              font-semibold
              text-slate-600
            "
          >
            Paused
          </span>
        )}

      </div>


      {/* ================================================
          WEEKLY DAYS
      ================================================= */}

      {getDaysLabel() && (
        <p className="mt-3 text-xs text-slate-500">
          {getDaysLabel()}
        </p>
      )}


      {/* ================================================
          TIMES
      ================================================= */}

      <div className="mt-4 flex items-start gap-2 text-sm text-slate-600">

        <Clock3
          size={16}
          className="mt-0.5 shrink-0 text-purple-500"
        />

        <span className="leading-6">
          {getTimesLabel()}
        </span>

      </div>


      {/* ================================================
          NOTES
      ================================================= */}

      {notes && (
        <div
          className="
            mt-4
            rounded-xl
            bg-slate-50
            px-4
            py-3
          "
        >
          <p className="text-xs leading-5 text-slate-500">
            {notes}
          </p>
        </div>
      )}


      {/* ================================================
          ACTIONS
      ================================================= */}

      <div
        className="
          mt-5
          flex
          items-center
          gap-3
          border-t
          border-slate-100
          pt-4
        "
      >

        <button
          type="button"
          onClick={handleToggle}
          className="
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-4
            py-2.5
            text-sm
            font-semibold
            text-slate-600
            transition
            hover:bg-pink-50
            hover:text-pink-600
          "
        >
          {active ? (
            <ToggleRight
              size={19}
              className="text-pink-500"
            />
          ) : (
            <ToggleLeft
              size={19}
            />
          )}

          {active
            ? "Active"
            : "Resume"}
        </button>


        <button
          type="button"
          onClick={handleDelete}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-red-100
            text-red-500
            transition
            hover:bg-red-50
          "
          aria-label={`Delete ${name}`}
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}


export default MedicineCard;