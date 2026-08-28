/* ==========================================================
   HerCycle AI
   Calendar Generator

   Calendar priority:

   1. Recorded Period
   2. Predicted Period
   3. Ovulation
   4. Fertile Window
   5. Normal Cycle Phase

   Important:
   - Recorded data always has highest priority.
   - Predictions are automatic.
   - No Yes/No confirmation logic.
   - The latest recorded period is determined by date,
     NOT by array position.
========================================================== */


/* ==========================================================
   DATE HELPERS
========================================================== */

function toDate(value) {
  if (!value) return null;

  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}


/* ==========================================================
   NORMALIZE DATE
========================================================== */

function normalizeDate(value) {
  const date = toDate(value);

  if (!date) return null;

  date.setHours(0, 0, 0, 0);

  return date;
}


/* ==========================================================
   ADD DAYS
========================================================== */

function addDays(value, days) {
  const date = normalizeDate(value);

  if (!date) return null;

  const result = new Date(date);

  result.setDate(
    result.getDate() + Number(days || 0)
  );

  return result;
}


/* ==========================================================
   SAME DATE
========================================================== */

function isSameDate(
  firstValue,
  secondValue
) {
  const first =
    normalizeDate(firstValue);

  const second =
    normalizeDate(secondValue);

  if (!first || !second) {
    return false;
  }

  return (
    first.getFullYear() ===
      second.getFullYear() &&
    first.getMonth() ===
      second.getMonth() &&
    first.getDate() ===
      second.getDate()
  );
}


/* ==========================================================
   DATE BETWEEN RANGE
========================================================== */

function isBetween(
  value,
  startValue,
  endValue
) {
  const valueDate =
    normalizeDate(value);

  const startDate =
    normalizeDate(startValue);

  const endDate =
    normalizeDate(endValue);

  if (
    !valueDate ||
    !startDate ||
    !endDate
  ) {
    return false;
  }

  return (
    valueDate >= startDate &&
    valueDate <= endDate
  );
}


/* ==========================================================
   GET CYCLE DAY
========================================================== */

function getCycleDay(
  currentDate,
  latestPeriodStart
) {
  const current =
    normalizeDate(currentDate);

  const start =
    normalizeDate(latestPeriodStart);

  if (!current || !start) {
    return null;
  }

  const difference =
    Math.round(
      (
        current.getTime() -
        start.getTime()
      ) /
        (1000 * 60 * 60 * 24)
    );

  /*
   * If the date is before the latest recorded
   * period, it does not belong to the current cycle.
   */

  if (difference < 0) {
    return null;
  }

  return difference + 1;
}


/* ==========================================================
   FIND LATEST RECORDED PERIOD

   IMPORTANT FIX

   We no longer assume:

   recordedPeriods[last]

   is the latest period.

   Instead, we compare actual start dates.
========================================================== */

function getLatestRecordedPeriod(
  recordedPeriods
) {
  if (
    !Array.isArray(recordedPeriods) ||
    recordedPeriods.length === 0
  ) {
    return null;
  }

  const validPeriods =
    recordedPeriods.filter(
      (period) =>
        normalizeDate(period?.start)
    );

  if (validPeriods.length === 0) {
    return null;
  }

  return validPeriods.reduce(
    (latest, current) => {
      const latestDate =
        normalizeDate(
          latest.start
        );

      const currentDate =
        normalizeDate(
          current.start
        );

      if (
        !latestDate ||
        !currentDate
      ) {
        return latest;
      }

      return currentDate > latestDate
        ? current
        : latest;
    }
  );
}


/* ==========================================================
   CALCULATE NORMAL CYCLE PHASE

   This is used ONLY when the date is not:

   - recorded period
   - predicted period
   - ovulation
   - fertile window
========================================================== */

function getNormalCyclePhase(
  cycleDay,
  cycleLength,
  periodLength
) {
  if (!cycleDay) {
    return "";
  }

  const safeCycleLength =
    Number(cycleLength) || 28;

  const safePeriodLength =
    Number(periodLength) || 5;

  /*
   * Ovulation is estimated approximately
   * 14 days before the next period.
   */

  const ovulationDay =
    Math.max(
      1,
      safeCycleLength - 14
    );

  /*
   * Fertile window:
   * approximately 5 days before ovulation
   * through the day after ovulation.
   */

  const fertileStart =
    Math.max(
      1,
      ovulationDay - 5
    );

  const fertileEnd =
    Math.min(
      safeCycleLength,
      ovulationDay + 1
    );

  /* --------------------------------------------------------
     Menstrual
  -------------------------------------------------------- */

  if (
    cycleDay >= 1 &&
    cycleDay <= safePeriodLength
  ) {
    return "Menstrual";
  }

  /* --------------------------------------------------------
     Follicular
  -------------------------------------------------------- */

  if (
    cycleDay > safePeriodLength &&
    cycleDay < fertileStart
  ) {
    return "Follicular";
  }

  /* --------------------------------------------------------
     Fertile
     
     Normally fertile dates are already handled by
     isFertile above.

     This fallback is intentionally not labelled
     "Fertile" because the calendar priority should
     come from the actual fertile dates.
  -------------------------------------------------------- */

  if (
    cycleDay >= fertileStart &&
    cycleDay <= fertileEnd
  ) {
    return "Follicular";
  }

  /* --------------------------------------------------------
     Luteal
  -------------------------------------------------------- */

  if (
    cycleDay > fertileEnd &&
    cycleDay <= safeCycleLength
  ) {
    return "Luteal";
  }

  return "";
}


/* ==========================================================
   GENERATE CALENDAR
========================================================== */

export function generateCalendar(
  year,
  month,
  cycleData
) {
  const firstDay =
    new Date(
      year,
      month,
      1
    );

  const lastDay =
    new Date(
      year,
      month + 1,
      0
    );

  const totalDays =
    lastDay.getDate();

  const startingDay =
    firstDay.getDay();

  const calendar = [];

  const today =
    normalizeDate(new Date());


  /* ========================================================
     EMPTY CELLS
  ======================================================== */

  for (
    let index = 0;
    index < startingDay;
    index++
  ) {
    calendar.push(null);
  }


  /* ========================================================
     NO CYCLE DATA
  ======================================================== */

  if (!cycleData) {
    for (
      let day = 1;
      day <= totalDays;
      day++
    ) {
      const currentDate =
        normalizeDate(
          new Date(
            year,
            month,
            day
          )
        );

      calendar.push({
        day,

        date: currentDate,

        isToday:
          isSameDate(
            currentDate,
            today
          ),

        isPeriod: false,

        isPredictedPeriod: false,

        isFertile: false,

        isOvulation: false,

        phase: "",

        event: "",

        cycleDay: null,
      });
    }

    return calendar;
  }


  /* ========================================================
     FIND LATEST RECORDED PERIOD
  ======================================================== */

  const latestRecordedPeriod =
    getLatestRecordedPeriod(
      cycleData.recordedPeriods
    );

  const latestPeriodStart =
    latestRecordedPeriod?.start ||
    null;


  /* ========================================================
     SAFE SETTINGS
  ======================================================== */

  const cycleLength =
    Number(
      cycleData.cycleLength
    ) || 28;

  const periodLength =
    Number(
      cycleData.periodLength
    ) || 5;


  /* ========================================================
     MONTH DAYS
  ======================================================== */

  for (
    let day = 1;
    day <= totalDays;
    day++
  ) {
    const currentDate =
      normalizeDate(
        new Date(
          year,
          month,
          day
        )
      );


    /* ======================================================
       BASE CELL
    ====================================================== */

    const cell = {
      day,

      date: currentDate,

      isToday:
        isSameDate(
          currentDate,
          today
        ),

      isPeriod: false,

      isPredictedPeriod: false,

      isFertile: false,

      isOvulation: false,

      phase: "",

      event: "",

      cycleDay: null,
    };


    /* ======================================================
       CYCLE DAY
    ====================================================== */

    if (latestPeriodStart) {
      cell.cycleDay =
        getCycleDay(
          currentDate,
          latestPeriodStart
        );
    }


    /* ======================================================
       1. RECORDED PERIOD
       
       Highest priority.
    ====================================================== */

    let isRecordedPeriod =
      false;

    if (
      Array.isArray(
        cycleData.recordedPeriods
      )
    ) {
      for (
        const period of
          cycleData.recordedPeriods
      ) {
        const start =
          normalizeDate(
            period?.start
          );

        if (!start) {
          continue;
        }

        const end =
          period?.end
            ? normalizeDate(
                period.end
              )
            : addDays(
                start,
                periodLength - 1
              );

        if (
          isBetween(
            currentDate,
            start,
            end
          )
        ) {
          isRecordedPeriod = true;

          break;
        }
      }
    }


    if (isRecordedPeriod) {
      cell.isPeriod = true;

      cell.phase =
        "Menstrual";

      cell.event =
        "Recorded Period";

      calendar.push(cell);

      continue;
    }


    /* ======================================================
       2. PREDICTED PERIOD
    ====================================================== */

    let isPredictedPeriod =
      false;

    if (
      Array.isArray(
        cycleData.predictedPeriods
      )
    ) {
      for (
        const period of
          cycleData.predictedPeriods
      ) {
        if (
          isBetween(
            currentDate,
            period?.start,
            period?.end
          )
        ) {
          isPredictedPeriod = true;

          break;
        }
      }
    }


    if (isPredictedPeriod) {
      cell.isPredictedPeriod = true;

      cell.phase =
        "Predicted Period";

      cell.event =
        "Predicted Period";

      calendar.push(cell);

      continue;
    }


    /* ======================================================
       3. OVULATION
    ====================================================== */

    if (
      cycleData.ovulationDate &&
      isSameDate(
        currentDate,
        cycleData.ovulationDate
      )
    ) {
      cell.isOvulation = true;

      cell.phase =
        "Ovulation";

      cell.event =
        "Predicted Ovulation";

      calendar.push(cell);

      continue;
    }


    /* ======================================================
       4. FERTILE WINDOW
    ====================================================== */

    if (
      cycleData.fertileStartDate &&
      cycleData.fertileEndDate &&
      isBetween(
        currentDate,
        cycleData.fertileStartDate,
        cycleData.fertileEndDate
      )
    ) {
      cell.isFertile = true;

      cell.phase =
        "Fertile";

      cell.event =
        "Fertile Window";

      calendar.push(cell);

      continue;
    }


    /* ======================================================
       5. NORMAL CYCLE PHASE
       
       IMPORTANT:
       This is only reached when the date is NOT:

       - period
       - predicted period
       - ovulation
       - fertile

       Therefore the normal phase cannot override
       any special calendar event.
    ====================================================== */

    if (cell.cycleDay) {
      cell.phase =
        getNormalCyclePhase(
          cell.cycleDay,
          cycleLength,
          periodLength
        );
    }


    /* ======================================================
       NORMAL DAY EVENT

       Keep event empty so the UI doesn't incorrectly
       treat a normal phase as a period/fertility event.
    ====================================================== */

    cell.event = "";

    calendar.push(cell);
  }


  /* ==========================================================
     RETURN
  ========================================================== */

  return calendar;
}