import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* ==========================================================
   SYMPTOM COLLECTION
========================================================== */

const getSymptomsCollection = (userId) => {
  return collection(
    db,
    "users",
    userId,
    "symptoms"
  );
};


/* ==========================================================
   SAVE SYMPTOM ENTRY
========================================================== */

export const saveSymptomEntry = async (
  userId,
  symptomData
) => {
  if (!userId) {
    throw new Error(
      "Please sign in before saving symptoms."
    );
  }

  const symptoms = Array.isArray(
    symptomData?.symptoms
  )
    ? symptomData.symptoms
    : [];

  if (symptoms.length === 0) {
    throw new Error(
      "Please select at least one symptom."
    );
  }

  try {
    const symptomsCollection =
      getSymptomsCollection(userId);

    const docRef = await addDoc(
      symptomsCollection,
      {
        symptoms,

        notes:
          typeof symptomData?.notes === "string"
            ? symptomData.notes.trim()
            : "",

        entryDate:
          symptomData?.entryDate ||
          new Date()
            .toISOString()
            .split("T")[0],

        totalSymptoms:
          symptoms.length,

        createdAt:
          serverTimestamp(),
      }
    );

    return {
      success: true,
      id: docRef.id,
    };

  } catch (error) {
    console.error(
      "Error saving symptom entry:",
      error
    );

    throw new Error(
      error?.message ||
      "Unable to save your symptoms."
    );
  }
};


/* ==========================================================
   GET SYMPTOM HISTORY
========================================================== */

export const getSymptomHistory = async (
  userId,
  historyLimit = 20
) => {
  if (!userId) {
    return [];
  }

  try {
    const symptomsCollection =
      getSymptomsCollection(userId);

    const symptomsQuery = query(
      symptomsCollection,
      orderBy("createdAt", "desc"),
      limit(historyLimit)
    );

    const snapshot = await getDocs(
      symptomsQuery
    );

    return snapshot.docs.map(
      (document) => ({
        id: document.id,
        ...document.data(),
      })
    );

  } catch (error) {
    console.error(
      "Error getting symptom history:",
      error
    );

    throw new Error(
      error?.message ||
      "Unable to load symptom history."
    );
  }
};


/* ==========================================================
   REALTIME SYMPTOM HISTORY
========================================================== */

export const subscribeToSymptomHistory = (
  userId,
  callback,
  onError,
  historyLimit = 20
) => {
  if (!userId) {
    callback([]);
    return () => {};
  }

  try {
    const symptomsCollection =
      getSymptomsCollection(userId);

    const symptomsQuery = query(
      symptomsCollection,
      orderBy("createdAt", "desc"),
      limit(historyLimit)
    );

    const unsubscribe = onSnapshot(
      symptomsQuery,

      (snapshot) => {
        const entries = snapshot.docs.map(
          (document) => ({
            id: document.id,
            ...document.data(),
          })
        );

        callback(entries);
      },

      (error) => {
        console.error(
          "Error listening to symptom history:",
          error
        );

        if (onError) {
          onError(
            error?.message ||
            "Unable to load symptom history."
          );
        }
      }
    );

    return unsubscribe;

  } catch (error) {
    console.error(
      "Error creating symptom listener:",
      error
    );

    if (onError) {
      onError(
        error?.message ||
        "Unable to load symptom history."
      );
    }

    return () => {};
  }
};


/* ==========================================================
   DELETE SYMPTOM ENTRY
========================================================== */

export const deleteSymptomEntry = async (
  userId,
  entryId
) => {
  if (!userId) {
    throw new Error(
      "Please sign in before deleting symptoms."
    );
  }

  if (!entryId) {
    throw new Error(
      "Symptom entry ID is required."
    );
  }

  try {
    const symptomDocument = doc(
      db,
      "users",
      userId,
      "symptoms",
      entryId
    );

    await deleteDoc(
      symptomDocument
    );

    return {
      success: true,
    };

  } catch (error) {
    console.error(
      "Error deleting symptom entry:",
      error
    );

    throw new Error(
      error?.message ||
      "Unable to delete symptom entry."
    );
  }
};