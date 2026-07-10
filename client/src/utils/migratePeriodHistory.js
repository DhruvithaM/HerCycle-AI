import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import { startPeriod } from "../services/periodService";

/* ==========================================================
   Migrate Old Users To Period History
========================================================== */

export async function migratePeriodHistory(
  uid,
  profile
) {
  try {

    if (!uid || !profile) {
      return;
    }

    const historyRef = collection(
      db,
      "users",
      uid,
      "periodHistory"
    );

    const historySnapshot =
      await getDocs(historyRef);

    // Already migrated

    if (!historySnapshot.empty) {
      return;
    }

    if (!profile.lastPeriodDate) {
      return;
    }

    const startDate =
      new Date(profile.lastPeriodDate);

    await startPeriod(
      uid,
      startDate
    );

    console.log(
      "✅ Period history migrated successfully."
    );

  } catch (error) {

    console.error(
      "Migration failed:",
      error
    );

  }
}