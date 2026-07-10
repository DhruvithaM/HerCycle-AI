/* ==========================================================
   HerCycle AI Calendar Generator
========================================================== */

function toDate(value) {
  if (!value) return null;

  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  return new Date(value);
}

function normalizeDate(value) {
  const date = toDate(value);

  if (!date) return null;

  date.setHours(0, 0, 0, 0);

  return date;
}

function addDays(date, days) {
  const result = new Date(normalizeDate(date));
  result.setDate(result.getDate() + days);
  return result;
}

function isSameDate(a, b) {
  if (!a || !b) return false;

  const first = normalizeDate(a);
  const second = normalizeDate(b);

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function isBetween(date, start, end) {
  if (!date || !start || !end) return false;

  const current = normalizeDate(date);
  const first = normalizeDate(start);
  const last = normalizeDate(end);

  return current >= first && current <= last;
}

export function generateCalendar(
  year,
  month,
  cycleData
) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const totalDays = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const calendar = [];
  const today = normalizeDate(new Date());

  // Empty cells
  for (let i = 0; i < startingDay; i++) {
    calendar.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {

    const currentDate = normalizeDate(
      new Date(year, month, day)
    );

    const cell = {

      day,

      date: currentDate,

      isToday: isSameDate(
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

    if (cycleData) {

      /* =====================================
         RECORDED PERIODS
      ===================================== */

      if (
        Array.isArray(cycleData.recordedPeriods)
      ) {

        for (const period of cycleData.recordedPeriods) {

          const start = normalizeDate(period.start);

          const end = period.end
            ? normalizeDate(period.end)
            : addDays(
                start,
                (cycleData.periodLength || 5) - 1
              );

          if (
            isBetween(
              currentDate,
              start,
              end
            )
          ) {

            cell.isPeriod = true;
            cell.phase = "Menstrual";
            cell.event = "Recorded Period";

            break;
          }
        }
      }

      /* =====================================
         PREDICTED PERIODS
      ===================================== */

      if (
        !cell.isPeriod &&
        Array.isArray(cycleData.predictedPeriods)
      ) {

        for (const period of cycleData.predictedPeriods) {

          if (
            isBetween(
              currentDate,
              period.start,
              period.end
            )
          ) {

            cell.isPredictedPeriod = true;
            cell.event = "Predicted Period";

            break;
          }
        }
      }

      /* =====================================
         FERTILE WINDOW
      ===================================== */

      if (
        !cell.isPeriod &&
        cycleData.fertileStartDate &&
        cycleData.fertileEndDate &&
        isBetween(
          currentDate,
          cycleData.fertileStartDate,
          cycleData.fertileEndDate
        )
      ) {

        cell.isFertile = true;
        cell.phase = "Fertile";
        cell.event = "Fertile Window";

      }

      /* =====================================
         OVULATION
      ===================================== */

      if (
        cycleData.ovulationDate &&
        isSameDate(
          currentDate,
          cycleData.ovulationDate
        )
      ) {

        cell.isOvulation = true;
        cell.phase = "Ovulation";
        cell.event = "Ovulation";

      }

      /* =====================================
         CYCLE DAY
      ===================================== */

      if (
        Array.isArray(cycleData.recordedPeriods) &&
        cycleData.recordedPeriods.length
      ) {

        const latest =
          cycleData.recordedPeriods[
            cycleData.recordedPeriods.length - 1
          ];

        const start = normalizeDate(
          latest.start
        );

        cell.cycleDay =
          Math.floor(
            (currentDate - start) /
            (1000 * 60 * 60 * 24)
          ) + 1;

      }

    }

    calendar.push(cell);

  }

  return calendar;
}