import {
  Check,
  Clock,
  Pill,
} from "lucide-react";


/* ==========================================================
   GET TODAY DATE
========================================================== */

const getTodayDate = () => {
  return new Date()
    .toISOString()
    .split("T")[0];
};


/* ==========================================================
   GET TODAY DAY NAME

   Example:
   Mon
   Tue
   Wed
========================================================== */

const getTodayDay = () => {
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return days[
    new Date().getDay()
  ];
};


/* ==========================================================
   CHECK IF MEDICINE IS WITHIN DATE RANGE
========================================================== */

const isWithinDateRange = (
  medicine,
  today
) => {
  if (
    medicine.startDate &&
    medicine.startDate > today
  ) {
    return false;
  }

  if (
    medicine.endDate &&
    medicine.endDate < today
  ) {
    return false;
  }

  return true;
};


/* ==========================================================
   CHECK IF MEDICINE IS SCHEDULED TODAY
========================================================== */

const isScheduledToday = (
  medicine
) => {
  const today = getTodayDate();

  const todayDay = getTodayDay();

  /* ----------------------------------------------
     INACTIVE MEDICINE
  ---------------------------------------------- */

  if (medicine.active === false) {
    return false;
  }


  /* ----------------------------------------------
     DATE RANGE
  ---------------------------------------------- */

  if (
    !isWithinDateRange(
      medicine,
      today
    )
  ) {
    return false;
  }


  /* ----------------------------------------------
     DAILY
  ---------------------------------------------- */

  if (
    medicine.frequency === "daily"
  ) {
    return true;
  }


  /* ----------------------------------------------
     AS NEEDED

     Show active "as needed" medicines
     so the user can manually mark them as taken.
  ---------------------------------------------- */

  if (
    medicine.frequency === "as-needed"
  ) {
    return true;
  }


  /* ----------------------------------------------
     SPECIFIC DAYS
  ---------------------------------------------- */

  if (
    medicine.frequency === "specific-days"
  ) {
    return Array.isArray(
      medicine.days
    )
      ? medicine.days.includes(
          todayDay
        )
      : false;
  }


  /* ----------------------------------------------
     DEFAULT
  ---------------------------------------------- */

  return true;
};


/* ==========================================================
   FORMAT FREQUENCY
========================================================== */

const formatFrequency = (
  frequency
) => {
  if (
    frequency === "specific-days"
  ) {
    return "Specific days";
  }

  if (
    frequency === "as-needed"
  ) {
    return "As needed";
  }

  return "Daily";
};


/* ==========================================================
   TODAY MEDICINE COMPONENT
========================================================== */

function TodayMedicine({
  medicines = [],
  onMarkTaken,
}) {
  const today = getTodayDate();


  /* ========================================================
     GET MEDICINES FOR TODAY
  ======================================================== */

  const todayMedicines =
    medicines.filter(
      isScheduledToday
    );


  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-pink-100
                text-pink-600
              "
            >
              <Pill size={20} />
            </div>


            <div>

              <p
                className="
                  text-sm
                  font-semibold
                  text-pink-500
                "
              >
                Today's Schedule
              </p>


              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-800
                "
              >
                Today's Medicines
              </h2>

            </div>

          </div>


          <p
            className="
              mt-3
              text-sm
              text-slate-500
            "
          >
            Keep track of the medicines you need to take today.
          </p>

        </div>


        {/* TOTAL */}

        <div
          className="
            rounded-2xl
            bg-pink-50
            px-4
            py-2
            text-center
          "
        >

          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-wide
              text-pink-400
            "
          >
            Total
          </p>


          <p
            className="
              mt-1
              text-lg
              font-bold
              text-pink-600
            "
          >
            {todayMedicines.length}
          </p>

        </div>

      </div>


      {/* ====================================================
          EMPTY STATE
      ==================================================== */}

      {todayMedicines.length === 0 ? (

        <div
          className="
            mt-6
            flex
            min-h-[260px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-pink-200
            bg-pink-50/40
            px-6
            text-center
          "
        >

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-white
              text-pink-500
              shadow-sm
            "
          >
            <Pill size={24} />
          </div>


          <h3
            className="
              mt-4
              text-lg
              font-bold
              text-slate-800
            "
          >
            No medicines for today
          </h3>


          <p
            className="
              mt-2
              max-w-sm
              text-sm
              leading-6
              text-slate-500
            "
          >
            Add a medicine reminder and it will appear
            here based on its selected schedule.
          </p>

        </div>

      ) : (

        /* ================================================
            MEDICINE LIST
        ================================================= */

        <div
          className="
            mt-6
            space-y-3
          "
        >

          {todayMedicines.map(
            (medicine) => {

              /* ==========================================
                 CHECK TAKEN STATUS
              =========================================== */

              const isTaken =
                medicine.lastTakenDate ===
                today;


              /* ==========================================
                 GET MEDICINE TIMES

                 Your database stores:
                 times: ["08:00", "20:00"]

                 NOT:
                 time: "08:00"
              =========================================== */

              const medicineTimes =
                Array.isArray(
                  medicine.times
                )
                  ? medicine.times.filter(
                      Boolean
                    )
                  : [];


              return (

                <div
                  key={medicine.id}
                  className={`
                    flex
                    flex-col
                    gap-4
                    rounded-2xl
                    border
                    p-4
                    transition-all
                    sm:flex-row
                    sm:items-center
                    sm:justify-between

                    ${
                      isTaken
                        ? `
                          border-emerald-200
                          bg-emerald-50/50
                        `
                        : `
                          border-slate-200
                          bg-white
                          hover:border-pink-200
                        `
                    }
                  `}
                >

                  {/* ======================================
                      MEDICINE INFORMATION
                  ======================================= */}

                  <div
                    className="
                      flex
                      min-w-0
                      items-start
                      gap-3
                    "
                  >

                    {/* ICON */}

                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl

                        ${
                          isTaken
                            ? `
                              bg-emerald-500
                              text-white
                            `
                            : `
                              bg-pink-100
                              text-pink-600
                            `
                        }
                      `}
                    >

                      {isTaken ? (
                        <Check size={20} />
                      ) : (
                        <Pill size={20} />
                      )}

                    </div>


                    {/* DETAILS */}

                    <div
                      className="
                        min-w-0
                      "
                    >

                      {/* NAME */}

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >

                        <h3
                          className="
                            font-bold
                            text-slate-800
                          "
                        >
                          {medicine.name}
                        </h3>


                        {isTaken && (

                          <span
                            className="
                              rounded-full
                              bg-emerald-100
                              px-2
                              py-1
                              text-xs
                              font-semibold
                              text-emerald-700
                            "
                          >
                            Taken
                          </span>

                        )}

                      </div>


                      {/* ==================================
                          DOSAGE + FREQUENCY
                      =================================== */}

                      <div
                        className="
                          mt-2
                          flex
                          flex-wrap
                          items-center
                          gap-3
                          text-xs
                          text-slate-500
                        "
                      >

                        {medicine.dosage && (

                          <span>
                            💊 {medicine.dosage}
                          </span>

                        )}


                        <span>
                          {formatFrequency(
                            medicine.frequency
                          )}
                        </span>

                      </div>


                      {/* ==================================
                          REMINDER TIMES

                          This is the important fix.
                      =================================== */}

                      {medicineTimes.length > 0 && (

                        <div
                          className="
                            mt-3
                            flex
                            flex-wrap
                            items-center
                            gap-2
                          "
                        >

                          <Clock
                            size={15}
                            className="
                              text-pink-500
                            "
                          />


                          <span
                            className="
                              text-xs
                              font-semibold
                              text-slate-600
                            "
                          >
                            Take at:
                          </span>


                          {medicineTimes.map(
                            (
                              time,
                              index
                            ) => (

                              <span
                                key={`${medicine.id}-${time}-${index}`}
                                className="
                                  rounded-full
                                  bg-pink-50
                                  px-3
                                  py-1
                                  text-xs
                                  font-semibold
                                  text-pink-600
                                "
                              >
                                {time}
                              </span>

                            )
                          )}

                        </div>

                      )}


                      {/* ==================================
                          NO SPECIFIC TIME
                      =================================== */}

                      {medicineTimes.length === 0 &&
                        medicine.frequency ===
                          "as-needed" && (

                        <div
                          className="
                            mt-3
                            flex
                            items-center
                            gap-2
                            text-xs
                            text-slate-500
                          "
                        >

                          <Clock
                            size={14}
                          />

                          Take when needed

                        </div>

                      )}


                      {/* ==================================
                          NOTES
                      =================================== */}

                      {medicine.notes && (

                        <p
                          className="
                            mt-3
                            text-xs
                            leading-5
                            text-slate-500
                          "
                        >
                          {medicine.notes}
                        </p>

                      )}

                    </div>

                  </div>


                  {/* ======================================
                      MARK AS TAKEN BUTTON
                  ======================================= */}

                  <button
                    type="button"
                    disabled={isTaken}
                    onClick={() =>
                      onMarkTaken?.(
                        medicine.id
                      )
                    }
                    className={`
                      flex
                      shrink-0
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      transition

                      ${
                        isTaken
                          ? `
                            cursor-default
                            bg-emerald-100
                            text-emerald-700
                          `
                          : `
                            bg-gradient-to-r
                            from-pink-500
                            to-purple-600
                            text-white
                            shadow-md
                            shadow-pink-200
                            hover:opacity-90
                          `
                      }
                    `}
                  >

                    <Check size={17} />


                    {isTaken
                      ? "Taken"
                      : "Mark as Taken"}

                  </button>

                </div>

              );
            }
          )}

        </div>

      )}

    </section>
  );
}


export default TodayMedicine;