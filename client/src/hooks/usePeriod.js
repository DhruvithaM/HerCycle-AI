import {
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

import { auth } from "../firebase/firebase";
import useProfile from "./useProfile";

import {
  startPeriod,
  endPeriod,
  getPeriodHistory,
  subscribeToPeriodHistory,
} from "../services/periodService";

/* ==========================================================
   usePeriod
   HerCycle AI - Period Management Hook
========================================================== */

function usePeriod() {
  /* ========================================================
     STATE
  ======================================================== */

  const [latestPeriod, setLatestPeriod] =
    useState(null);

  const [periodHistory, setPeriodHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* ========================================================
     AUTHENTICATED USER
  ======================================================== */

  const user = auth.currentUser;

  /* ========================================================
     PROFILE
  ======================================================== */

  const { profile } = useProfile();

  /* ========================================================
     INITIALIZATION GUARD
  ======================================================== */

  const initialized = useRef(false);

  /* ==========================================================
     INITIALIZE FIRST PERIOD HISTORY

     If Firestore has no period history but the user's
     profile contains lastPeriodDate, create the first
     period record automatically.
  ========================================================== */

  const initializePeriodHistory =
    useCallback(async () => {
      if (!user || !profile) {
        return;
      }

      if (initialized.current) {
        return;
      }

      initialized.current = true;

      try {
        const history =
          await getPeriodHistory(
            user.uid
          );

        /* -----------------------------------------------
           History already exists
        ------------------------------------------------ */

        if (history.length > 0) {
          return;
        }

        /* -----------------------------------------------
           No profile period date
        ------------------------------------------------ */

        if (!profile.lastPeriodDate) {
          return;
        }

        /* -----------------------------------------------
           Create initial period
        ------------------------------------------------ */

        await startPeriod(
          user.uid,
          new Date(
            profile.lastPeriodDate
          )
        );
      } catch (error) {
        console.error(
          "Error initializing period history:",
          error
        );

        /*
          We intentionally do not throw this error.

          Initialization happens automatically when the
          hook loads. A failure here should not crash the
          entire Cycle Tracker page.
        */
      }
    }, [user, profile]);

  /* ==========================================================
     INITIALIZE ONCE
  ========================================================== */

  useEffect(() => {
    initializePeriodHistory();
  }, [initializePeriodHistory]);

  /* ==========================================================
     REALTIME PERIOD HISTORY LISTENER
  ========================================================== */

  useEffect(() => {
    if (!user) {
      setPeriodHistory([]);
      setLatestPeriod(null);
      setLoading(false);

      return;
    }

    setLoading(true);

    const unsubscribe =
      subscribeToPeriodHistory(
        user.uid,
        (history) => {
          /* ---------------------------------------------
             Safety check
          --------------------------------------------- */

          const safeHistory =
            Array.isArray(history)
              ? history
              : [];

          /* ---------------------------------------------
             Update history
          --------------------------------------------- */

          setPeriodHistory(
            safeHistory
          );

          /* ---------------------------------------------
             Find latest period
          --------------------------------------------- */

          if (
            safeHistory.length > 0
          ) {
            const sortedHistory =
              [...safeHistory].sort(
                (a, b) => {
                  const first =
                    typeof b.startDate
                      ?.toDate ===
                    "function"
                      ? b.startDate.toDate()
                      : new Date(
                          b.startDate
                        );

                  const second =
                    typeof a.startDate
                      ?.toDate ===
                    "function"
                      ? a.startDate.toDate()
                      : new Date(
                          a.startDate
                        );

                  return (
                    first - second
                  );
                }
              );

            setLatestPeriod(
              sortedHistory[0]
            );
          } else {
            setLatestPeriod(
              null
            );
          }

          setLoading(false);
        }
      );

    /* ---------------------------------------------
       Cleanup listener
    --------------------------------------------- */

    return () => {
      if (
        typeof unsubscribe ===
        "function"
      ) {
        unsubscribe();
      }
    };
  }, [user]);

  /* ==========================================================
     START NEW PERIOD

     Called by RecordPeriodModal.
  ========================================================== */

  const startNewPeriod =
    useCallback(
      async (
        date = new Date()
      ) => {
        if (!user) {
          throw new Error(
            "User is not authenticated."
          );
        }

        try {
          /* -------------------------------------------
             Normalize date
          ------------------------------------------- */

          const periodStartDate =
            date instanceof Date
              ? new Date(date)
              : new Date(date);

          periodStartDate.setHours(
            0,
            0,
            0,
            0
          );

          /* -------------------------------------------
             Save to Firestore
          ------------------------------------------- */

          await startPeriod(
            user.uid,
            periodStartDate
          );

          /*
            DO NOT manually refresh history.

            subscribeToPeriodHistory() will automatically
            receive the updated Firestore data.
          */

          return true;
        } catch (error) {
          console.error(
            "Error starting period:",
            error
          );

          /*
            IMPORTANT:
            Re-throw the error so RecordPeriodModal
            knows that Firebase failed.
          */

          throw error;
        }
      },
      [user]
    );

  /* ==========================================================
     FINISH CURRENT PERIOD

     Called by RecordPeriodModal.
  ========================================================== */

  const finishPeriod =
    useCallback(
      async (
        date = new Date()
      ) => {
        if (!user) {
          throw new Error(
            "User is not authenticated."
          );
        }

        if (!latestPeriod) {
          throw new Error(
            "No active period found."
          );
        }

        if (!latestPeriod.id) {
          throw new Error(
            "The active period does not have a valid ID."
          );
        }

        try {
          /* -------------------------------------------
             Normalize date
          ------------------------------------------- */

          const periodEndDate =
            date instanceof Date
              ? new Date(date)
              : new Date(date);

          periodEndDate.setHours(
            0,
            0,
            0,
            0
          );

          /* -------------------------------------------
             Save end date to Firestore
          ------------------------------------------- */

          await endPeriod(
            user.uid,
            latestPeriod.id,
            periodEndDate
          );

          /*
            Realtime listener automatically updates
            latestPeriod and periodHistory.
          */

          return true;
        } catch (error) {
          console.error(
            "Error ending period:",
            error
          );

          /*
            Re-throw so the modal can display
            the actual failure.
          */

          throw error;
        }
      },
      [user, latestPeriod]
    );

  /* ==========================================================
     RETURN
  ========================================================== */

  return {
    latestPeriod,

    periodHistory,

    loading,

    startNewPeriod,

    finishPeriod,
  };
}

export default usePeriod;