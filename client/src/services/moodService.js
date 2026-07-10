import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/**
 * Save or update today's mood
 */
export async function saveMood(
  uid,
  moodData
) {
  try {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const moodRef = doc(
      db,
      "users",
      uid,
      "moods",
      today
    );

    await setDoc(
      moodRef,
      {
        ...moodData,
        updatedAt: serverTimestamp(),
      },
      {
        merge: true,
      }
    );

    return true;
  } catch (error) {
    console.error(
      "Error saving mood:",
      error
    );
    return false;
  }
}

/**
 * Get today's mood
 */
export async function getTodayMood(uid) {
  try {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const moodRef = doc(
      db,
      "users",
      uid,
      "moods",
      today
    );

    const snapshot =
      await getDoc(moodRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data();
  } catch (error) {
    console.error(
      "Error fetching mood:",
      error
    );

    return null;
  }
}