/* ==========================================================
   HerCycle AI
   Date Helper Functions
========================================================== */

const ONE_DAY = 1000 * 60 * 60 * 24;

/* ==========================================================
   Convert Firestore Timestamp / String / Date
   into JavaScript Date
========================================================== */

export function toDate(value) {
  if (!value) return null;

  // Firestore Timestamp
  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  // Already a JS Date
  if (value instanceof Date) {
    return new Date(value);
  }

  // String
  return new Date(value);
}

/* ==========================================================
   Remove Time
========================================================== */

export function normalizeDate(value) {
  const date = toDate(value);

  if (!date) return null;

  date.setHours(0, 0, 0, 0);

  return date;
}

/* ==========================================================
   Start Of Day
========================================================== */

export function startOfDay(value) {
  return normalizeDate(value);
}

/* ==========================================================
   End Of Day
========================================================== */

export function endOfDay(value) {
  const date = normalizeDate(value);

  if (!date) return null;

  date.setHours(
    23,
    59,
    59,
    999
  );

  return date;
}

/* ==========================================================
   Add Days
========================================================== */

export function addDays(
  value,
  days
) {
  const date = normalizeDate(value);

  if (!date) return null;

  date.setDate(
    date.getDate() + days
  );

  return date;
}

/* ==========================================================
   Subtract Days
========================================================== */

export function subtractDays(
  value,
  days
) {
  return addDays(
    value,
    -days
  );
}

/* ==========================================================
   Difference In Days
========================================================== */

export function differenceInDays(
  start,
  end
) {
  const first =
    normalizeDate(start);

  const second =
    normalizeDate(end);

  if (!first || !second)
    return 0;

  return Math.round(
    (second - first) /
      ONE_DAY
  );
}

/* ==========================================================
   Same Date
========================================================== */

export function isSameDate(
  first,
  second
) {
  const a =
    normalizeDate(first);

  const b =
    normalizeDate(second);

  if (!a || !b) return false;

  return (
    a.getFullYear() ===
      b.getFullYear() &&
    a.getMonth() ===
      b.getMonth() &&
    a.getDate() ===
      b.getDate()
  );
}

/* ==========================================================
   Date Between Two Dates
========================================================== */

export function isBetween(
  value,
  start,
  end
) {
  const date =
    normalizeDate(value);

  const first =
    normalizeDate(start);

  const last =
    normalizeDate(end);

  if (
    !date ||
    !first ||
    !last
  ) {
    return false;
  }

  return (
    date >= first &&
    date <= last
  );
}

/* ==========================================================
   Today
========================================================== */

export function today() {
  return normalizeDate(
    new Date()
  );
}

/* ==========================================================
   Average
========================================================== */

export function average(
  values = []
) {
  if (!values.length)
    return 0;

  const total =
    values.reduce(
      (sum, value) =>
        sum + value,
      0
    );

  return Math.round(
    total / values.length
  );
}

/* ==========================================================
   Format Date
========================================================== */

export function formatDate(
  value,
  locale = "en-IN"
) {
  const date =
    normalizeDate(value);

  if (!date) return "";

  return date.toLocaleDateString(
    locale,
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

/* ==========================================================
   Month Name
========================================================== */

export function monthName(
  month,
  year
) {
  return new Date(
    year,
    month
  ).toLocaleString(
    "default",
    {
      month: "long",
      year: "numeric",
    }
  );
}

/* ==========================================================
   Is Future
========================================================== */

export function isFuture(
  value
) {
  return (
    normalizeDate(value) >
    today()
  );
}

/* ==========================================================
   Is Past
========================================================== */

export function isPast(
  value
) {
  return (
    normalizeDate(value) <
    today()
  );
}