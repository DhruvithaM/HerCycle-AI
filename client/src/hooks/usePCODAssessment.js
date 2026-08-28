import {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  auth,
} from "../firebase/firebase";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  savePCODAssessment,
  subscribeToPCODAssessmentHistory,
} from "../services/pcodAssessmentService";

/* ==========================================================
   PCOD / PCOS ASSESSMENT HISTORY HOOK
========================================================== */

function usePCODAssessment() {
  /* ========================================================
     STATE
  ======================================================== */

  const [
    assessmentHistory,
    setAssessmentHistory,
  ] = useState([]);

  const [
    latestAssessment,
    setLatestAssessment,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  /* ========================================================
     REALTIME AUTH + ASSESSMENT HISTORY
  ======================================================== */

  useEffect(() => {
    let unsubscribeAssessment = null;

    const unsubscribeAuth =
      onAuthStateChanged(
        auth,
        (user) => {
          /* -----------------------------------------------
             Clean previous assessment listener
          ------------------------------------------------ */

          if (
            typeof unsubscribeAssessment ===
            "function"
          ) {
            unsubscribeAssessment();

            unsubscribeAssessment = null;
          }

          /* -----------------------------------------------
             No logged-in user
          ------------------------------------------------ */

          if (!user) {
            setAssessmentHistory([]);
            setLatestAssessment(null);
            setError(null);
            setLoading(false);

            return;
          }

          /* -----------------------------------------------
             Logged-in user
          ------------------------------------------------ */

          setLoading(true);
          setError(null);

          unsubscribeAssessment =
            subscribeToPCODAssessmentHistory(
              user.uid,

              /* -------------------------------------------
                 SUCCESS
              -------------------------------------------- */

              (assessments) => {
                const safeAssessments =
                  Array.isArray(assessments)
                    ? assessments
                    : [];

                /*
                  Safety sorting.

                  Newest assessment should always be first.
                  This supports either:
                  - createdAt as Firestore Timestamp
                  - createdAt as normal date string
                */

                const sortedAssessments =
                  [...safeAssessments].sort(
                    (a, b) => {
                      const getDate =
                        (assessment) => {
                          const dateValue =
                            assessment?.createdAt;

                          if (
                            dateValue &&
                            typeof dateValue.toDate ===
                              "function"
                          ) {
                            return dateValue.toDate();
                          }

                          if (dateValue) {
                            return new Date(
                              dateValue
                            );
                          }

                          return new Date(0);
                        };

                      return (
                        getDate(b) -
                        getDate(a)
                      );
                    }
                  );

                setAssessmentHistory(
                  sortedAssessments
                );

                setLatestAssessment(
                  sortedAssessments.length > 0
                    ? sortedAssessments[0]
                    : null
                );

                setLoading(false);
              },

              /* -------------------------------------------
                 ERROR
              -------------------------------------------- */

              (assessmentError) => {
                console.error(
                  "PCOD assessment history error:",
                  assessmentError
                );

                setAssessmentHistory([]);
                setLatestAssessment(null);

                setError(
                  assessmentError?.message ||
                    "Failed to load assessment history."
                );

                setLoading(false);
              }
            );
        }
      );

    /* ======================================================
       CLEANUP
    ====================================================== */

    return () => {
      if (
        typeof unsubscribeAuth ===
        "function"
      ) {
        unsubscribeAuth();
      }

      if (
        typeof unsubscribeAssessment ===
        "function"
      ) {
        unsubscribeAssessment();
      }
    };
  }, []);

  /* ========================================================
     SAVE NEW ASSESSMENT
  ======================================================== */

  const saveAssessment =
    useCallback(
      async (assessmentData) => {
        const user =
          auth.currentUser;

        if (!user) {
          throw new Error(
            "Please sign in before saving your assessment."
          );
        }

        try {
          setError(null);

          const result =
            await savePCODAssessment(
              user.uid,
              assessmentData
            );

          return result;

        } catch (saveError) {
          console.error(
            "Error saving assessment:",
            saveError
          );

          setError(
            saveError?.message ||
              "Failed to save assessment."
          );

          throw saveError;
        }
      },
      []
    );

  /* ========================================================
     COMPARE LATEST WITH PREVIOUS ASSESSMENT

     This will later be used to show:

     - Risk decreased by 10%
     - Risk increased by 5%
     - No significant change
  ======================================================== */

  const getAssessmentChange =
    useCallback(() => {
      if (
        assessmentHistory.length < 2
      ) {
        return null;
      }

      const latest =
        assessmentHistory[0];

      const previous =
        assessmentHistory[1];

      /* -----------------------------------------------
         Get ML probability/score safely
      ------------------------------------------------ */

      const latestRisk =
        Number(
          latest?.probabilityPercentage ??
            latest?.probability_percentage ??
            latest?.score ??
            0
        );

      const previousRisk =
        Number(
          previous?.probabilityPercentage ??
            previous?.probability_percentage ??
            previous?.score ??
            0
        );

      /* -----------------------------------------------
         Calculate difference
      ------------------------------------------------ */

      const difference =
        Number(
          (
            latestRisk -
            previousRisk
          ).toFixed(2)
        );

      /* -----------------------------------------------
         Determine direction
      ------------------------------------------------ */

      let direction =
        "unchanged";

      if (difference < 0) {
        direction =
          "decreased";
      } else if (difference > 0) {
        direction =
          "increased";
      }

      return {
        latestRisk,

        previousRisk,

        difference,

        absoluteDifference:
          Math.abs(difference),

        direction,
      };
    }, [
      assessmentHistory,
    ]);

  /* ========================================================
     RETURN
  ======================================================== */

  return {
    assessmentHistory,

    latestAssessment,

    loading,

    error,

    saveAssessment,

    getAssessmentChange,
  };
}

export default usePCODAssessment;