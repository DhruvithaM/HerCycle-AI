import {
  collection,
  doc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  addDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* ==========================================================
   Get Active Period
========================================================== */

async function getActivePeriod(uid) {
  try {
    const historyRef = collection(
      db,
      "users",
      uid,
      "periodHistory"
    );

    const q = query(
      historyRef,
      where("endDate", "==", null),
      limit(1)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0];

  } catch (error) {

    console.error(
      "Error getting active period:",
      error
    );

    return null;

  }
}

/* ==========================================================
   Start New Period
========================================================== */

export async function startPeriod(
  uid,
  startDate
) {

  try {

    const activeDoc =
      await getActivePeriod(uid);

    if (activeDoc) {

      const previousEnd =
        new Date(startDate);

      previousEnd.setDate(
        previousEnd.getDate() - 1
      );

      await updateDoc(
        activeDoc.ref,
        {
          endDate: previousEnd,
          updatedAt: serverTimestamp(),
        }
      );

    }

    const historyRef =
      collection(
        db,
        "users",
        uid,
        "periodHistory"
      );

    const docRef =
      await addDoc(
        historyRef,
        {
          startDate,

          endDate: null,

          createdAt:
            serverTimestamp(),

          updatedAt:
            serverTimestamp(),
        }
      );

    return docRef.id;

  } catch (error) {

    console.error(
      "Error starting period:",
      error
    );

    return null;

  }

}

/* ==========================================================
   End Current Period
========================================================== */

export async function endPeriod(
  uid,
  periodId,
  endDate
) {

  try {

    const periodRef = doc(
      db,
      "users",
      uid,
      "periodHistory",
      periodId
    );

    await updateDoc(
      periodRef,
      {
        endDate,
        updatedAt:
          serverTimestamp(),
      }
    );

    return true;

  } catch (error) {

    console.error(
      "Error ending period:",
      error
    );

    return false;

  }

}

/* ==========================================================
   Get Latest Period
========================================================== */

export async function getLatestPeriod(
  uid
) {

  try {

    const historyRef =
      collection(
        db,
        "users",
        uid,
        "periodHistory"
      );

    const q = query(
      historyRef,
      orderBy(
        "startDate",
        "desc"
      ),
      limit(1)
    );

    const snapshot =
      await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const document =
      snapshot.docs[0];

    return {

      id: document.id,

      ...document.data(),

    };

  } catch (error) {

    console.error(
      "Error getting latest period:",
      error
    );

    return null;

  }

}

/* ==========================================================
   Get Complete Period History
========================================================== */

export async function getPeriodHistory(
  uid
) {

  try {

    const historyRef =
      collection(
        db,
        "users",
        uid,
        "periodHistory"
      );

    const q = query(
      historyRef,
      orderBy(
        "startDate",
        "desc"
      )
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

  } catch (error) {

    console.error(
      "Error loading history:",
      error
    );

    return [];

  }

}

/* ==========================================================
   Realtime Period History Listener
========================================================== */

export function subscribeToPeriodHistory(
  uid,
  callback
) {

  const historyRef =
    collection(
      db,
      "users",
      uid,
      "periodHistory"
    );

  const q = query(
    historyRef,
    orderBy(
      "startDate",
      "desc"
    )
  );

  return onSnapshot(

    q,

    (snapshot) => {

      const history =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      callback(history);

    },

    (error) => {

      console.error(
        "Realtime Period Error:",
        error
      );

      callback([]);

    }

  );

}