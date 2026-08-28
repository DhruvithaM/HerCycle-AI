import {
  useMemo,
  useState,
} from "react";

import {
  Clock,
  Plus,
  Search,
  X,
} from "lucide-react";


/* ==========================================================
   POPULAR MEDICINES

   These are only suggestions.
   Users can still manually enter any medicine.
========================================================== */

const popularMedicines = [
  "Dolo 650",
  "Paracetamol",
  "Crocin",
  "Calpol",
  "Ibuprofen",
  "Combiflam",
  "Cetirizine",
  "Cetrizine",
  "ORS",
  "Pantoprazole",
  "Omeprazole",

  /* Women's health suggestions */

  "Iron Folic Acid",
  "Folic Acid",
  "Calcium Tablet",
  "Vitamin D3",
  "Vitamin B12",
  "Metformin",
  "Meprate",
  "Primolut N",
  "Tranexamic Acid",
  "Meftal Spas",
  "Meftal",
  "Buscopan",
];


/* ==========================================================
   WEEK DAYS
========================================================== */

const weekDays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];


/* ==========================================================
   ADD MEDICINE FORM
========================================================== */

function AddMedicineForm({
  formData,
  setFormData,
  onSubmit,
  saving,
}) {
  const [
    medicineFocused,
    setMedicineFocused,
  ] = useState(false);


  /* ========================================================
     FILTER POPULAR MEDICINES
  ======================================================== */

  const suggestions =
    useMemo(() => {
      const search =
        formData.name
          .trim()
          .toLowerCase();

      if (!search) {
        return [];
      }

      return popularMedicines
        .filter(
          (medicine) =>
            medicine
              .toLowerCase()
              .includes(search)
        )
        .slice(0, 6);

    }, [formData.name]);


  /* ========================================================
     UPDATE FIELD
  ======================================================== */

  const updateField = (
    field,
    value
  ) => {
    setFormData(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );
  };


  /* ========================================================
     SELECT MEDICINE
  ======================================================== */

  const selectMedicine = (
    medicine
  ) => {
    updateField(
      "name",
      medicine
    );

    setMedicineFocused(false);
  };


  /* ========================================================
     ADD ANOTHER TIME
  ======================================================== */

  const addAnotherTime = () => {
    setFormData(
      (previous) => ({
        ...previous,
        times: [
          ...previous.times,
          "",
        ],
      })
    );
  };


  /* ========================================================
     UPDATE TIME
  ======================================================== */

  const updateTime = (
    index,
    value
  ) => {
    setFormData(
      (previous) => {
        const updatedTimes = [
          ...previous.times,
        ];

        updatedTimes[index] =
          value;

        return {
          ...previous,
          times:
            updatedTimes,
        };
      }
    );
  };


  /* ========================================================
     REMOVE TIME
  ======================================================== */

  const removeTime = (
    index
  ) => {
    setFormData(
      (previous) => ({
        ...previous,
        times:
          previous.times.length === 1
            ? [""]
            : previous.times.filter(
                (_, timeIndex) =>
                  timeIndex !== index
              ),
      })
    );
  };


  /* ========================================================
     TOGGLE DAY
  ======================================================== */

  const toggleDay = (
    day
  ) => {
    setFormData(
      (previous) => {
        const alreadySelected =
          previous.days.includes(day);

        return {
          ...previous,

          days:
            alreadySelected
              ? previous.days.filter(
                  (selectedDay) =>
                    selectedDay !== day
                )
              : [
                  ...previous.days,
                  day,
                ],
        };
      }
    );
  };


  return (
    <form
      onSubmit={onSubmit}
      className="
        rounded-3xl
        border
        border-pink-100
        bg-white
        p-6
        shadow-sm
      "
    >

      {/* ================================================
          HEADER
      ================================================= */}

      <div>

        <p className="text-sm font-semibold text-pink-500">
          Add Medicine
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-800">
          Create a new reminder
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select a popular medicine or enter one manually.
        </p>

      </div>


      {/* ================================================
          MEDICINE NAME
      ================================================= */}

      <div className="mt-5">

        <label className="text-sm font-semibold text-slate-700">
          Medicine name
        </label>


        <div className="relative mt-2">

          <Search
            size={17}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={formData.name}
            onFocus={() =>
              setMedicineFocused(true)
            }
            onChange={(event) => {
              updateField(
                "name",
                event.target.value
              );

              setMedicineFocused(true);
            }}
            placeholder="Search popular medicines or enter manually"
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-11
              pr-4
              text-sm
              text-slate-700
              outline-none
              transition
              focus:border-pink-400
              focus:ring-4
              focus:ring-pink-100
            "
          />

        </div>


        {/* ============================================
            POPULAR SUGGESTIONS
        ============================================= */}

        {medicineFocused &&
          formData.name.trim() &&
          suggestions.length > 0 && (

          <div
            className="
              mt-2
              overflow-hidden
              rounded-2xl
              border
              border-pink-100
              bg-white
              shadow-lg
            "
          >

            <div className="px-4 py-3">

              <p className="text-xs font-semibold text-slate-400">
                Popular medicines
              </p>

            </div>


            {suggestions.map(
              (medicine) => (

                <button
                  key={medicine}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();

                    selectMedicine(
                      medicine
                    );
                  }}
                  className="
                    block
                    w-full
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-slate-700
                    transition
                    hover:bg-pink-50
                    hover:text-pink-600
                  "
                >
                  {medicine}
                </button>

              )
            )}

          </div>

        )}


        {/* ============================================
            NOT FOUND - SMALL MESSAGE ONLY
        ============================================= */}

        {medicineFocused &&
          formData.name.trim() &&
          suggestions.length === 0 && (

          <p className="mt-2 text-xs text-slate-500">
            No popular medicine found.
            {" "}
            <span className="font-semibold text-pink-500">
              You can continue entering it manually.
            </span>
          </p>

        )}


        {!formData.name.trim() && (

          <p className="mt-2 text-xs text-slate-400">
            Search from popular suggestions or type any medicine manually.
          </p>

        )}

      </div>


      {/* ================================================
          DOSAGE
      ================================================= */}

      <div className="mt-5">

        <label className="text-sm font-semibold text-slate-700">
          Dosage
        </label>

        <input
          type="text"
          value={formData.dosage}
          onChange={(event) =>
            updateField(
              "dosage",
              event.target.value
            )
          }
          placeholder="For example: 1 tablet"
          className="
            mt-2
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
            text-sm
            outline-none
            focus:border-pink-400
            focus:ring-4
            focus:ring-pink-100
          "
        />

      </div>


      {/* ================================================
          FREQUENCY
      ================================================= */}

      <div className="mt-5">

        <label className="text-sm font-semibold text-slate-700">
          Frequency
        </label>


        <div className="mt-3 grid grid-cols-3 gap-2">

          <button
            type="button"
            onClick={() =>
              updateField(
                "frequency",
                "daily"
              )
            }
            className={`
              rounded-xl
              border
              px-3
              py-2.5
              text-xs
              font-semibold
              transition

              ${
                formData.frequency ===
                "daily"
                  ? "border-pink-500 bg-pink-50 text-pink-600"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50"
              }
            `}
          >
            Daily
          </button>


          <button
            type="button"
            onClick={() =>
              updateField(
                "frequency",
                "specific"
              )
            }
            className={`
              rounded-xl
              border
              px-3
              py-2.5
              text-xs
              font-semibold
              transition

              ${
                formData.frequency ===
                "specific"
                  ? "border-pink-500 bg-pink-50 text-pink-600"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50"
              }
            `}
          >
            Specific days
          </button>


          <button
            type="button"
            onClick={() =>
              updateField(
                "frequency",
                "as-needed"
              )
            }
            className={`
              rounded-xl
              border
              px-3
              py-2.5
              text-xs
              font-semibold
              transition

              ${
                formData.frequency ===
                "as-needed"
                  ? "border-pink-500 bg-pink-50 text-pink-600"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50"
              }
            `}
          >
            As needed
          </button>

        </div>

      </div>


      {/* ================================================
          SPECIFIC DAYS
      ================================================= */}

      {formData.frequency ===
        "specific" && (

        <div className="mt-5">

          <label className="text-sm font-semibold text-slate-700">
            Select days
          </label>


          <div className="mt-3 grid grid-cols-4 gap-2">

            {weekDays.map(
              (day) => {

                const selected =
                  formData.days.includes(
                    day
                  );

                return (

                  <button
                    key={day}
                    type="button"
                    onClick={() =>
                      toggleDay(day)
                    }
                    className={`
                      rounded-xl
                      border
                      py-2
                      text-xs
                      font-semibold

                      ${
                        selected
                          ? "border-pink-500 bg-pink-50 text-pink-600"
                          : "border-slate-200 text-slate-500"
                      }
                    `}
                  >
                    {day}
                  </button>

                );

              }
            )}

          </div>

        </div>

      )}


      {/* ================================================
          REMINDER TIMES
      ================================================= */}

      <div className="mt-5">

        <div className="flex items-center justify-between">

          <label className="text-sm font-semibold text-slate-700">
            Reminder time
          </label>

          <button
            type="button"
            onClick={addAnotherTime}
            className="
              inline-flex
              items-center
              gap-1
              text-xs
              font-semibold
              text-pink-500
            "
          >
            <Plus size={14} />

            Add another
          </button>

        </div>


        <div className="mt-2 space-y-2">

          {formData.times.map(
            (time, index) => (

              <div
                key={index}
                className="flex gap-2"
              >

                <div className="relative flex-1">

                  <Clock
                    size={16}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="time"
                    value={time}
                    onChange={(event) =>
                      updateTime(
                        index,
                        event.target.value
                      )
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                      py-3
                      pl-10
                      pr-4
                      text-sm
                      outline-none
                      focus:border-pink-400
                    "
                  />

                </div>


                {formData.times.length > 1 && (

                  <button
                    type="button"
                    onClick={() =>
                      removeTime(index)
                    }
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
                    "
                  >
                    <X size={17} />
                  </button>

                )}

              </div>

            )
          )}

        </div>

      </div>


      {/* ================================================
          DATES
      ================================================= */}

      <div className="mt-5 grid grid-cols-2 gap-3">

        <div>

          <label className="text-xs font-semibold text-slate-600">
            Start date
          </label>

          <input
            type="date"
            value={formData.startDate}
            onChange={(event) =>
              updateField(
                "startDate",
                event.target.value
              )
            }
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              py-3
              text-sm
              outline-none
              focus:border-pink-400
            "
          />

        </div>


        <div>

          <label className="text-xs font-semibold text-slate-600">
            End date
          </label>

          <input
            type="date"
            value={formData.endDate}
            onChange={(event) =>
              updateField(
                "endDate",
                event.target.value
              )
            }
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              py-3
              text-sm
              outline-none
              focus:border-pink-400
            "
          />

        </div>

      </div>


      {/* ================================================
          NOTES
      ================================================= */}

      <div className="mt-5">

        <label className="text-sm font-semibold text-slate-700">
          Notes
        </label>

        <textarea
          value={formData.notes}
          onChange={(event) =>
            updateField(
              "notes",
              event.target.value
            )
          }
          placeholder="Optional instructions or notes..."
          rows={3}
          className="
            mt-2
            w-full
            resize-none
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
            text-sm
            outline-none
            focus:border-pink-400
          "
        />

      </div>


      {/* ================================================
          SUBMIT
      ================================================= */}

      <button
        type="submit"
        disabled={saving}
        className="
          mt-5
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-gradient-to-r
          from-pink-500
          to-purple-600
          py-3.5
          text-sm
          font-bold
          text-white
          shadow-lg
          shadow-pink-200
          transition
          hover:scale-[1.01]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        <Plus size={18} />

        {saving
          ? "Saving..."
          : "Add Medicine Reminder"}
      </button>

    </form>
  );
}


export default AddMedicineForm;