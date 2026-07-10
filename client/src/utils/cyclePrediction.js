/* ==========================================================
   HerCycle AI
   Smart Cycle Prediction Engine
========================================================== */

const ONE_DAY = 1000 * 60 * 60 * 24;

/* ==========================================================
   Convert Any Date To JS Date
========================================================== */

function toDate(value) {
  if (!value) return null;

  // Firestore Timestamp
  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  return new Date(value);
}

/* ==========================================================
   Normalize Date
========================================================== */

function normalizeDate(value) {
  const date = toDate(value);

  if (!date) return null;

  date.setHours(0, 0, 0, 0);

  return date;
}

/* ==========================================================
   Difference In Days
========================================================== */

function differenceInDays(start, end) {
  const first = normalizeDate(start);

  const second = normalizeDate(end);

  if (!first || !second) return 0;

  return Math.round(
    (second - first) / ONE_DAY
  );
}

/* ==========================================================
   Add Days
========================================================== */

function addDays(date, days) {
  const result = normalizeDate(date);

  result.setDate(
    result.getDate() + days
  );

  return result;
}

/* ==========================================================
   Average
========================================================== */

function average(values) {
  if (!values.length) return 0;

  return Math.round(
    values.reduce(
      (sum, value) => sum + value,
      0
    ) / values.length
  );
}

/* ==========================================================
   Average Cycle Length
========================================================== */

function getAverageCycleLength(
  history,
  fallback = 28
) {
  if (!history || history.length < 2) {
    return fallback;
  }

  const sorted = [...history].sort(
    (a, b) =>
      normalizeDate(a.startDate) -
      normalizeDate(b.startDate)
  );

  const cycles = [];

  for (let i = 1; i < sorted.length; i++) {

    cycles.push(
      differenceInDays(
        sorted[i - 1].startDate,
        sorted[i].startDate
      )
    );

  }

  return average(cycles);
}

/* ==========================================================
   Average Period Length
========================================================== */

function getAveragePeriodLength(
  history,
  fallback = 5
) {

  const lengths = history
    .filter((item) => item.endDate)
    .map((item) =>
      differenceInDays(
        item.startDate,
        item.endDate
      ) + 1
    );

  if (!lengths.length) {
    return fallback;
  }

  return average(lengths);
}
/* ==========================================================
   Predict Complete Cycle
========================================================== */

export function predictCycle(
  history = [],
  profile = {}
) {
  if (!history.length && !profile?.lastPeriodDate) {
    return null;
  }

  const today = normalizeDate(new Date());

  // ==========================================
  // Sort History
  // ==========================================

  const sorted = [...history].sort(
    (a, b) =>
      normalizeDate(a.startDate) -
      normalizeDate(b.startDate)
  );

  // ==========================================
  // Latest Period
  // ==========================================

  let lastPeriodStart;

  if (sorted.length > 0) {
    lastPeriodStart = normalizeDate(
      sorted[sorted.length - 1].startDate
    );
  } else {
    lastPeriodStart = normalizeDate(
      profile.lastPeriodDate
    );
  }

  // ==========================================
  // Profile Fallback
  // ==========================================

  const profileCycleLength =
    Number(profile?.cycleLength) || 28;

  const profilePeriodLength =
    Number(profile?.periodLength) || 5;

  // ==========================================
  // AI Learning
  // ==========================================

  const cycleLength =
    sorted.length >= 2
      ? getAverageCycleLength(
          sorted,
          profileCycleLength
        )
      : profileCycleLength;

  const periodLength =
    getAveragePeriodLength(
      sorted,
      profilePeriodLength
    );

  // ==========================================
  // Current Cycle Day
  // ==========================================

  let cycleDay =
    differenceInDays(
      lastPeriodStart,
      today
    ) + 1;

  if (cycleDay < 1) cycleDay = 1;

  if (cycleDay > cycleLength) {
    cycleDay = cycleLength;
  }

  // ==========================================
  // Ovulation
  // ==========================================

  const ovulationDay =
    cycleLength - 14;

  const fertileStartDay =
    ovulationDay - 5;

  const fertileEndDay =
    ovulationDay + 1;

  // ==========================================
  // Current Phase
  // ==========================================

  let currentPhase =
    "Follicular";

  if (cycleDay <= periodLength) {

    currentPhase =
      "Menstrual";

  }

  else if (
    cycleDay >= fertileStartDay &&
    cycleDay <= fertileEndDay
  ) {

    currentPhase =
      "Ovulation";

  }

  else if (
    cycleDay > fertileEndDay
  ) {

    currentPhase =
      "Luteal";

  }

  // ==========================================
  // Progress
  // ==========================================

  const progress = Math.round(
    (cycleDay / cycleLength) * 100
  );

  // ==========================================
  // Important Dates
  // ==========================================

  const ovulationDate =
    addDays(
      lastPeriodStart,
      ovulationDay
    );

  const fertileStartDate =
    addDays(
      ovulationDate,
      -5
    );

  const fertileEndDate =
    addDays(
      ovulationDate,
      1
    );

  const nextPeriodDate =
    addDays(
      lastPeriodStart,
      cycleLength
    );

  const daysUntilNextPeriod =
    Math.max(
      0,
      differenceInDays(
        today,
        nextPeriodDate
      )
    );
      /* ==========================================
     Previous Recorded Period
  ========================================== */

  const previousPeriod = {
    start: lastPeriodStart,
    end: addDays(
      lastPeriodStart,
      periodLength - 1
    ),
  };

  /* ==========================================
     Future Predicted Periods
  ========================================== */

  const predictedPeriods = [];

  let predictedStart = nextPeriodDate;

  for (let i = 0; i < 12; i++) {

    predictedPeriods.push({
      start: predictedStart,
      end: addDays(
        predictedStart,
        periodLength - 1
      ),
    });

    predictedStart = addDays(
      predictedStart,
      cycleLength
    );

  }

  /* ==========================================
     Delay Detection
  ========================================== */

  const delayedDays =
    differenceInDays(
      nextPeriodDate,
      today
    );

  const isDelayed =
    delayedDays > 0;

  /* ==========================================
     Irregular Cycle Detection
  ========================================== */

  let isIrregular = false;

  if (sorted.length >= 3) {

    const cycleLengths = [];

    for (let i = 1; i < sorted.length; i++) {

      cycleLengths.push(
        differenceInDays(
          sorted[i - 1].startDate,
          sorted[i].startDate
        )
      );

    }

    const max = Math.max(...cycleLengths);

    const min = Math.min(...cycleLengths);

    if (max - min >= 7) {

      isIrregular = true;

    }

  }

  /* ==========================================
     AI Confidence
  ========================================== */

  let confidence = 60;

  if (sorted.length >= 2) {
    confidence = 75;
  }

  if (sorted.length >= 5) {
    confidence = 90;
  }

  if (isIrregular) {
    confidence -= 15;
  }

  confidence = Math.max(
    50,
    Math.min(100, confidence)
  );

  /* ==========================================
     Return Prediction
  ========================================== */

  return {

    // Current Cycle

    cycleDay,

    currentPhase,

    progress,

    // Cycle Info

    cycleLength,

    periodLength,

    averageCycleLength:
      cycleLength,

    averagePeriodLength:
      periodLength,

    // Dates

    previousPeriod,

    nextPeriodDate,

    ovulationDate,

    fertileStartDate,

    fertileEndDate,

    predictedPeriods,

    // Countdown

    daysUntilNextPeriod,

    isDelayed,

    delayedDays,

    // AI

    confidence,

    isIrregular,

  };

}