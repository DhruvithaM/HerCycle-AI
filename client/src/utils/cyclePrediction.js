/* ==========================================================
   HerCycle AI
   Simple Cycle Prediction Engine

   Flow:
   Recorded period
        ↓
   Cycle length
        ↓
   Next period prediction
        ↓
   Ovulation prediction
        ↓
   Fertile window
========================================================== */

const ONE_DAY = 1000 * 60 * 60 * 24;

/* ==========================================================
   DATE HELPERS
========================================================== */

function toDate(value) {
  if (!value) return null;

  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizeDate(value) {
  const date = toDate(value);

  if (!date) return null;

  date.setHours(0, 0, 0, 0);

  return date;
}

function addDays(value, days) {
  const date = normalizeDate(value);

  if (!date) return null;

  const result = new Date(date);

  result.setDate(result.getDate() + days);

  return result;
}

function differenceInDays(start, end) {
  const first = normalizeDate(start);
  const second = normalizeDate(end);

  if (!first || !second) return 0;

  return Math.round((second - first) / ONE_DAY);
}

/* ==========================================================
   AVERAGE
========================================================== */

function average(values) {
  if (!values.length) return 0;

  return Math.round(
    values.reduce((sum, value) => sum + value, 0) /
      values.length
  );
}

/* ==========================================================
   AVERAGE CYCLE LENGTH
========================================================== */

function getAverageCycleLength(history, fallback = 28) {
  if (!history || history.length < 2) {
    return fallback;
  }

  const sorted = [...history]
    .filter((period) => period?.startDate)
    .sort(
      (a, b) =>
        normalizeDate(a.startDate) -
        normalizeDate(b.startDate)
    );

  if (sorted.length < 2) {
    return fallback;
  }

  const cycleLengths = [];

  for (let i = 1; i < sorted.length; i++) {
    const length = differenceInDays(
      sorted[i - 1].startDate,
      sorted[i].startDate
    );

    if (length > 0) {
      cycleLengths.push(length);
    }
  }

  return cycleLengths.length
    ? average(cycleLengths)
    : fallback;
}

/* ==========================================================
   AVERAGE PERIOD LENGTH
========================================================== */

function getAveragePeriodLength(history, fallback = 5) {
  if (!history?.length) {
    return fallback;
  }

  const values = history
    .filter(
      (period) =>
        period?.startDate &&
        period?.endDate
    )
    .map(
      (period) =>
        differenceInDays(
          period.startDate,
          period.endDate
        ) + 1
    )
    .filter((value) => value > 0);

  return values.length
    ? average(values)
    : fallback;
}

/* ==========================================================
   RECORDED PERIODS
========================================================== */

function buildRecordedPeriods(history, periodLength) {
  return history
    .filter((period) => period?.startDate)
    .map((period) => {
      const start = normalizeDate(
        period.startDate
      );

      const end = period.endDate
        ? normalizeDate(period.endDate)
        : addDays(
            start,
            periodLength - 1
          );

      return {
        start,
        end,
        isRecorded: true,
      };
    });
}

/* ==========================================================
   MAIN PREDICTION ENGINE
========================================================== */

export function predictCycle(
  history = [],
  profile = {}
) {
  const cleanHistory = history
    .filter((period) => period?.startDate)
    .sort(
      (a, b) =>
        normalizeDate(a.startDate) -
        normalizeDate(b.startDate)
    );

  /*
   * We need at least one period date.
   *
   * Priority:
   * 1. Latest recorded period from history
   * 2. Profile lastPeriodDate
   */

  const latestRecordedPeriod =
    cleanHistory.length
      ? cleanHistory[cleanHistory.length - 1]
      : null;

  const lastPeriodDate =
    latestRecordedPeriod?.startDate ||
    profile?.lastPeriodDate;

  if (!lastPeriodDate) {
    return null;
  }

  const today = normalizeDate(new Date());

  const lastPeriodStart =
    normalizeDate(lastPeriodDate);

  /* ========================================================
     USER SETTINGS
  ======================================================== */

  const cycleLength = Math.max(
    21,
    Math.min(
      45,
      cleanHistory.length >= 2
        ? getAverageCycleLength(
            cleanHistory,
            Number(profile?.cycleLength) || 28
          )
        : Number(profile?.cycleLength) || 28
    )
  );

  const periodLength = Math.max(
    2,
    Math.min(
      10,
      getAveragePeriodLength(
        cleanHistory,
        Number(profile?.periodLength) || 5
      )
    )
  );

  /* ========================================================
     CURRENT CYCLE DAY
  ======================================================== */

  const daysSinceLastPeriod =
    differenceInDays(
      lastPeriodStart,
      today
    );

  const rawCycleDay =
    daysSinceLastPeriod + 1;

  const isDelayed =
    rawCycleDay > cycleLength;

  const cycleDay = isDelayed
    ? rawCycleDay
    : Math.max(
        1,
        Math.min(
          rawCycleDay,
          cycleLength
        )
      );

  const delayedDays = isDelayed
    ? rawCycleDay - cycleLength
    : 0;

  /* ========================================================
     CYCLE PHASE
  ======================================================== */

  /*
   * Example with 28-day cycle:
   *
   * Days 1-5   → Menstrual
   * Days 6-13  → Follicular
   * Day 14     → Ovulation
   * Days 15-28 → Luteal
   */

  const ovulationDay =
    Math.max(10, cycleLength - 14);

  const fertileStartDay =
    Math.max(1, ovulationDay - 5);

  const fertileEndDay =
    Math.min(
      cycleLength,
      ovulationDay + 1
    );

  let currentPhase = "Follicular";

  if (cycleDay <= periodLength) {
    currentPhase = "Menstrual";
  } else if (
    cycleDay >= fertileStartDay &&
    cycleDay < ovulationDay
  ) {
    currentPhase = "Follicular";
  } else if (
    cycleDay >= ovulationDay &&
    cycleDay <= fertileEndDay
  ) {
    currentPhase = "Ovulation";
  } else if (cycleDay > fertileEndDay) {
    currentPhase = "Luteal";
  }

  /* ========================================================
     PROGRESS
  ======================================================== */

  const progress = Math.min(
    100,
    Math.round(
      (cycleDay / cycleLength) * 100
    )
  );

  /* ========================================================
     NEXT PERIOD
  ======================================================== */

  const nextPeriodDate = addDays(
    lastPeriodStart,
    cycleLength
  );

  const daysUntilNextPeriod = Math.max(
    0,
    differenceInDays(
      today,
      nextPeriodDate
    )
  );

  /* ========================================================
     OVULATION DATE
  ======================================================== */

  /*
   * Day 1 = period start.
   *
   * Therefore:
   * Day 14 = start + 13 days.
   */

  const ovulationDate = addDays(
    lastPeriodStart,
    ovulationDay - 1
  );

  /* ========================================================
     FERTILE WINDOW
  ======================================================== */

  const fertileStartDate = addDays(
    lastPeriodStart,
    fertileStartDay - 1
  );

  const fertileEndDate = addDays(
    lastPeriodStart,
    fertileEndDay - 1
  );

  /* ========================================================
     RECORDED PERIODS
  ======================================================== */

  const recordedPeriods =
    buildRecordedPeriods(
      cleanHistory.length
        ? cleanHistory
        : [
            {
              startDate:
                lastPeriodStart,
            },
          ],
      periodLength
    );

  const previousPeriod =
    recordedPeriods.length
      ? recordedPeriods[
          recordedPeriods.length - 1
        ]
      : null;

  /* ========================================================
     PREDICT FUTURE PERIODS
  ======================================================== */

  const predictedPeriods = [];

  let predictedStart =
    nextPeriodDate;

  for (let i = 0; i < 12; i++) {
    const start =
      normalizeDate(predictedStart);

    const end = addDays(
      start,
      periodLength - 1
    );

    predictedPeriods.push({
      start,
      end,
      isPredicted: true,
    });

    predictedStart = addDays(
      predictedStart,
      cycleLength
    );
  }

  /* ========================================================
     IRREGULAR CYCLE
  ======================================================== */

  let isIrregular = false;

  if (cleanHistory.length >= 3) {
    const cycleLengths = [];

    for (
      let i = 1;
      i < cleanHistory.length;
      i++
    ) {
      const length =
        differenceInDays(
          cleanHistory[i - 1].startDate,
          cleanHistory[i].startDate
        );

      if (length > 0) {
        cycleLengths.push(length);
      }
    }

    if (cycleLengths.length >= 2) {
      const max = Math.max(
        ...cycleLengths
      );

      const min = Math.min(
        ...cycleLengths
      );

      isIrregular =
        max - min >= 7;
    }
  }

  /* ========================================================
     AI CONFIDENCE
  ======================================================== */

  let confidence = 60;

  if (cleanHistory.length >= 2) {
    confidence = 75;
  }

  if (cleanHistory.length >= 5) {
    confidence = 90;
  }

  if (isIrregular) {
    confidence -= 15;
  }

  confidence = Math.max(
    50,
    Math.min(100, confidence)
  );

  /* ========================================================
     RETURN
  ======================================================== */

  return {
    /* Current cycle */

    cycleDay,

    currentPhase,

    progress,

    /* Cycle information */

    cycleLength,

    periodLength,

    averageCycleLength:
      cycleLength,

    averagePeriodLength:
      periodLength,

    /* Recorded information */

    recordedPeriods,

    previousPeriod,

    /* Predictions */

    predictedPeriods,

    nextPeriodDate,

    ovulationDate,

    fertileStartDate,

    fertileEndDate,

    /* Countdown */

    daysUntilNextPeriod,

    isDelayed,

    delayedDays,

    /* AI information */

    confidence,

    isIrregular,
  };
}