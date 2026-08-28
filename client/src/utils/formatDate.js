/**
 * ==========================================
 * HerCycle AI
 * Date Formatting Utilities
 * ==========================================
 */

export function formatShortDate(date) {
  if (!date) return "--";

  const value = new Date(date);

  return value.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

export function formatLongDate(date) {
  if (!date) return "--";

  const value = new Date(date);

  return value.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatMonthYear(date) {
  if (!date) return "--";

  const value = new Date(date);

  return value.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}