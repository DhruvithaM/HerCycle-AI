import { predictCycle } from "./cyclePrediction";

/* ==========================================================
   Compatibility Wrapper
   ----------------------------------------------------------
   This file exists only to preserve existing imports.

   All cycle calculations are now handled by:

   src/utils/cyclePrediction.js

   Once every component has been migrated to use
   predictCycle() directly, this file can be safely removed.
========================================================== */

export function calculateCycleData({
  lastPeriodDate,
  cycleLength = 28,
  periodLength = 5,
} = {}) {
  if (!lastPeriodDate) {
    return null;
  }

  return predictCycle(
    [],
    {
      lastPeriodDate,
      cycleLength,
      periodLength,
    }
  );
}