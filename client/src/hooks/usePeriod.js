import { useEffect, useState, useCallback, useRef } from "react";

import { auth } from "../firebase/firebase";
import useProfile from "./useProfile";

import {
  startPeriod,
  endPeriod,
  getPeriodHistory,
  subscribeToPeriodHistory,
} from "../services/periodService";

function usePeriod() {
  const [latestPeriod, setLatestPeriod] = useState(null);
  const [periodHistory, setPeriodHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  const { profile } = useProfile();

  const initialized = useRef(false);

  /* ==========================================================
     Initialize First Period History
  ========================================================== */

  const initializePeriodHistory =
    useCallback(async () => {

      if (!user || !profile) return;

      if (initialized.current) return;

      initialized.current = true;

      try {

        const history =
          await getPeriodHistory(user.uid);

        if (history.length > 0) return;

        if (!profile.lastPeriodDate) return;

        await startPeriod(
          user.uid,
          new Date(profile.lastPeriodDate)
        );

      } catch (error) {

        console.error(
          "Error initializing history:",
          error
        );

      }

    }, [user, profile]);

  /* ==========================================================
     Initialize Once
  ========================================================== */

  useEffect(() => {

    initializePeriodHistory();

  }, [initializePeriodHistory]);

  /* ==========================================================
     Realtime Period Listener
  ========================================================== */

  useEffect(() => {

    if (!user) {

      setLoading(false);

      return;

    }

    setLoading(true);

    const unsubscribe =
      subscribeToPeriodHistory(

        user.uid,

        (history) => {

          setPeriodHistory(history);

          if (history.length > 0) {

            const latest =
              [...history].sort(
                (a, b) => {

                  const first =
                    typeof b.startDate?.toDate === "function"
                      ? b.startDate.toDate()
                      : new Date(b.startDate);

                  const second =
                    typeof a.startDate?.toDate === "function"
                      ? a.startDate.toDate()
                      : new Date(a.startDate);

                  return first - second;

                }
              )[0];

            setLatestPeriod(latest);

          } else {

            setLatestPeriod(null);

          }

          setLoading(false);

        }

      );

    return () => {

      unsubscribe();

    };

  }, [user]);

  /* ==========================================================
     Start New Period
  ========================================================== */

  async function startNewPeriod(
    date = new Date()
  ) {

    if (!user) return;

    try {

      await startPeriod(
        user.uid,
        date
      );

      // No manual refresh.
      // Realtime listener updates automatically.

    } catch (error) {

      console.error(
        "Error starting period:",
        error
      );

    }

  }

  /* ==========================================================
     Finish Period
  ========================================================== */

  async function finishPeriod(
    date = new Date()
  ) {

    if (!user || !latestPeriod) {
      return;
    }

    try {

      await endPeriod(
        user.uid,
        latestPeriod.id,
        date
      );

      // No manual refresh.
      // Realtime listener updates automatically.

    } catch (error) {

      console.error(
        "Error ending period:",
        error
      );

    }

  }

  return {

    latestPeriod,

    periodHistory,

    loading,

    startNewPeriod,

    finishPeriod,

  };

}

export default usePeriod;