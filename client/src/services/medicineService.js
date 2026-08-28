import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";


/* ==========================================================
   MEDICINE COLLECTION
========================================================== */

const getMedicinesCollection = (userId) => {
  return collection(
    db,
    "users",
    userId,
    "medicines"
  );
};


/* ==========================================================
   ADD MEDICINE
========================================================== */

export const addMedicine = async (
  userId,
  medicineData
) => {
  if (!userId) {
    throw new Error(
      "User ID is required to add a medicine."
    );
  }

  if (!medicineData?.name?.trim()) {
    throw new Error(
      "Please enter the medicine name."
    );
  }

  const times = Array.isArray(medicineData.times)
    ? medicineData.times.filter(
        (time) => typeof time === "string" && time.trim()
      )
    : [];

  try {
    const medicinesCollection =
      getMedicinesCollection(userId);

    const medicineDocument =
      await addDoc(
        medicinesCollection,
        {
          name: medicineData.name.trim(),

          dosage:
            medicineData.dosage?.trim() || "",

          frequency:
            medicineData.frequency || "daily",

          days:
            Array.isArray(medicineData.days)
              ? medicineData.days
              : [],

          times,

          startDate:
            medicineData.startDate || "",

          endDate:
            medicineData.endDate || "",

          notes:
            medicineData.notes?.trim() || "",

          active: true,

          lastTakenDate: "",

          createdAt:
            serverTimestamp(),

          updatedAt:
            serverTimestamp(),
        }
      );

    return {
      success: true,
      id: medicineDocument.id,
    };
  } catch (error) {
    console.error(
      "Error adding medicine:",
      error
    );

    throw error;
  }
};


/* ==========================================================
   SUBSCRIBE TO MEDICINES
========================================================== */

export const subscribeToMedicines = (
  userId,
  callback,
  onError
) => {
  if (!userId) {
    callback([]);

    return () => {};
  }

  const medicinesCollection =
    getMedicinesCollection(userId);

  const medicinesQuery =
    query(
      medicinesCollection,
      orderBy(
        "createdAt",
        "desc"
      )
    );

  return onSnapshot(
    medicinesQuery,

    (snapshot) => {
      const medicines =
        snapshot.docs.map(
          (document) => ({
            id: document.id,
            ...document.data(),
          })
        );

      callback(medicines);
    },

    (error) => {
      console.error(
        "Error loading medicines:",
        error
      );

      onError?.(error);
    }
  );
};


/* ==========================================================
   MARK MEDICINE AS TAKEN
========================================================== */

export const markMedicineAsTaken = async (
  userId,
  medicineId
) => {
  if (!userId || !medicineId) {
    throw new Error(
      "User ID and medicine ID are required."
    );
  }

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const medicineDocument =
    doc(
      db,
      "users",
      userId,
      "medicines",
      medicineId
    );

  await updateDoc(
    medicineDocument,
    {
      lastTakenDate: today,
      updatedAt:
        serverTimestamp(),
    }
  );

  return {
    success: true,
  };
};


/* ==========================================================
   UPDATE MEDICINE STATUS
========================================================== */

export const updateMedicineStatus = async (
  userId,
  medicineId,
  active
) => {
  if (!userId || !medicineId) {
    throw new Error(
      "User ID and medicine ID are required."
    );
  }

  const medicineDocument =
    doc(
      db,
      "users",
      userId,
      "medicines",
      medicineId
    );

  await updateDoc(
    medicineDocument,
    {
      active: Boolean(active),

      updatedAt:
        serverTimestamp(),
    }
  );

  return {
    success: true,
  };
};


/* ==========================================================
   DELETE MEDICINE
========================================================== */

export const deleteMedicine = async (
  userId,
  medicineId
) => {
  if (!userId || !medicineId) {
    throw new Error(
      "User ID and medicine ID are required."
    );
  }

  const medicineDocument =
    doc(
      db,
      "users",
      userId,
      "medicines",
      medicineId
    );

  await deleteDoc(
    medicineDocument
  );

  return {
    success: true,
  };
};