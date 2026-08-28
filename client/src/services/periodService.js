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
  writeBatch,
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

    throw error;
  }
}

/* ==========================================================
   Start / Update Period

   This function now keeps:

   users/{uid}.lastPeriodDate

   and

   users/{uid}/periodHistory/{periodId}.startDate

   synchronized.
========================================================== */

export async function startPeriod(
  uid,
  startDate
) {
  if (!uid) {
    throw new Error(
      "User ID is required."
    );
  }

  if (!startDate) {
    throw new Error(
      "Period start date is required."
    );
  }

  try {
    const selectedDate =
      startDate instanceof Date
        ? new Date(startDate)
        : new Date(startDate);

    if (
      Number.isNaN(
        selectedDate.getTime()
      )
    ) {
      throw new Error(
        "Invalid period start date."
      );
    }

    selectedDate.setHours(
      0,
      0,
      0,
      0
    );

    /* ========================================================
       USER PROFILE REFERENCE
    ======================================================== */

    const userRef = doc(
      db,
      "users",
      uid
    );

    /* ========================================================
       PERIOD HISTORY
    ======================================================== */

    const historyRef = collection(
      db,
      "users",
      uid,
      "periodHistory"
    );

    /* ========================================================
       CHECK ACTIVE PERIOD
    ======================================================== */

    const activeDoc =
      await getActivePeriod(uid);

    /* ========================================================
       BATCH WRITE
    ======================================================== */

    const batch = writeBatch(db);

    /* ========================================================
       CASE 1:
       There is already an active period.

       We update that active period instead of creating
       unnecessary duplicate records.

       This is especially important when the user is
       correcting the date from the Cycle Tracker.
    ======================================================== */

    if (activeDoc) {
      batch.update(
        activeDoc.ref,
        {
          startDate: selectedDate,
          updatedAt:
            serverTimestamp(),
        }
      );

      /* -----------------------------------------------
         Keep profile synchronized
      ------------------------------------------------ */

      batch.update(
        userRef,
        {
          lastPeriodDate:
            selectedDate,
          updatedAt:
            serverTimestamp(),
        }
      );

      await batch.commit();

      return {
        id: activeDoc.id,
        updated: true,
      };
    }

    /* ========================================================
       CASE 2:
       No active period exists.

       Create a new period.
    ======================================================== */

    const newPeriodRef =
      doc(historyRef);

    batch.set(
      newPeriodRef,
      {
        startDate:
          selectedDate,

        endDate:
          null,

        createdAt:
          serverTimestamp(),

        updatedAt:
          serverTimestamp(),
      }
    );

    /* -----------------------------------------------
       Keep profile synchronized
    ------------------------------------------------ */

    batch.update(
      userRef,
      {
        lastPeriodDate:
          selectedDate,

        updatedAt:
          serverTimestamp(),
      }
    );

    await batch.commit();

    return {
      id: newPeriodRef.id,
      created: true,
    };
  } catch (error) {
    console.error(
      "Error starting/updating period:",
      error
    );

    throw error;
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
  if (!uid) {
    throw new Error(
      "User ID is required."
    );
  }

  if (!periodId) {
    throw new Error(
      "Period ID is required."
    );
  }

  if (!endDate) {
    throw new Error(
      "Period end date is required."
    );
  }

  try {
    const selectedDate =
      endDate instanceof Date
        ? new Date(endDate)
        : new Date(endDate);

    if (
      Number.isNaN(
        selectedDate.getTime()
      )
    ) {
      throw new Error(
        "Invalid period end date."
      );
    }

    selectedDate.setHours(
      0,
      0,
      0,
      0
    );

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
        endDate:
          selectedDate,

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

    throw error;
  }
}

/* ==========================================================
   Get Latest Period
========================================================== */

export async function getLatestPeriod(
  uid
) {
  try {
    const historyRef = collection(
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

    throw error;
  }
}

/* ==========================================================
   Get Complete Period History
========================================================== */

export async function getPeriodHistory(
  uid
) {
  try {
    const historyRef = collection(
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
      (document) => ({
        id: document.id,
        ...document.data(),
      })
    );
  } catch (error) {
    console.error(
      "Error loading history:",
      error
    );

    throw error;
  }
}

/* ==========================================================
   Realtime Period History Listener
========================================================== */

export function subscribeToPeriodHistory(
  uid,
  callback
) {
  const historyRef = collection(
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
          (document) => ({
            id: document.id,
            ...document.data(),
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