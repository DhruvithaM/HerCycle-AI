import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

import {
  deleteSymptomEntry,
  saveSymptomEntry,
  subscribeToSymptomHistory,
} from "../services/symptomService";


/* ==========================================================
   SYMPTOM HISTORY HOOK
========================================================== */

function useSymptoms() {

  /* ========================================================
     STATE
  ======================================================== */

  const [symptomHistory, setSymptomHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState(null);


  /* ========================================================
     AUTH + REALTIME SYMPTOM HISTORY
  ======================================================== */

  useEffect(() => {

    let unsubscribeSymptoms = null;


    /* ======================================================
       LISTEN TO AUTHENTICATION
    ====================================================== */

    const unsubscribeAuth =
      onAuthStateChanged(
        auth,

        (user) => {

          /* ================================================
             NO USER
          ================================================= */

          if (!user) {

            if (
              typeof unsubscribeSymptoms ===
              "function"
            ) {
              unsubscribeSymptoms();

              unsubscribeSymptoms = null;
            }

            setSymptomHistory([]);
            setLoading(false);

            return;
          }


          /* ================================================
             USER FOUND
          ================================================= */

          setLoading(true);
          setError(null);


          /* ================================================
             REMOVE OLD LISTENER
          ================================================= */

          if (
            typeof unsubscribeSymptoms ===
            "function"
          ) {
            unsubscribeSymptoms();
          }


          /* ================================================
             SUBSCRIBE TO SYMPTOMS
          ================================================= */

          unsubscribeSymptoms =
            subscribeToSymptomHistory(

              user.uid,

              (entries) => {

                const safeEntries =
                  Array.isArray(entries)
                    ? entries
                    : [];

                setSymptomHistory(
                  safeEntries
                );

                setLoading(false);
              },

              (historyError) => {

                console.error(
                  "Symptom history error:",
                  historyError
                );

                const errorMessage =
                  historyError?.message ||
                  "Failed to load symptom history.";

                setError(
                  errorMessage
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
        typeof unsubscribeSymptoms ===
        "function"
      ) {
        unsubscribeSymptoms();
      }

      unsubscribeAuth();
    };

  }, []);


  /* ========================================================
     SAVE NEW SYMPTOM ENTRY
  ======================================================== */

  const saveSymptoms =
    useCallback(
      async ({
        symptoms,
        notes,
        entryDate,
      }) => {

        const user =
          auth.currentUser;

        if (!user) {
          const authError =
            new Error(
              "Please sign in before saving your symptoms."
            );

          setError(
            authError.message
          );

          throw authError;
        }


        /* ==================================================
           VALIDATE SYMPTOMS
        ================================================== */

        if (
          !Array.isArray(symptoms) ||
          symptoms.length === 0
        ) {

          const validationError =
            new Error(
              "Please select at least one symptom."
            );

          setError(
            validationError.message
          );

          throw validationError;
        }


        try {

          setSaving(true);
          setError(null);


          /* ================================================
             SAVE TO FIRESTORE
          ================================================= */

          const result =
            await saveSymptomEntry(
              user.uid,
              {
                symptoms,
                notes,
                entryDate,
              }
            );


          return result;

        } catch (saveError) {

          console.error(
            "Error saving symptoms:",
            saveError
          );

          setError(
            saveError?.message ||
            "Failed to save symptoms."
          );

          throw saveError;

        } finally {

          setSaving(false);

        }

      },
      []
    );


  /* ========================================================
     DELETE SYMPTOM ENTRY
  ======================================================== */

  const removeSymptomEntry =
    useCallback(
      async (entryId) => {

        const user =
          auth.currentUser;

        if (!user) {
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

          setError(null);

          await deleteSymptomEntry(
            user.uid,
            entryId
          );

        } catch (deleteError) {

          console.error(
            "Error deleting symptom entry:",
            deleteError
          );

          setError(
            deleteError?.message ||
            "Failed to delete symptom entry."
          );

          throw deleteError;
        }

      },
      []
    );


  /* ========================================================
     RETURN
  ======================================================== */

  return {

    symptomHistory,

    loading,

    saving,

    error,

    saveSymptoms,

    removeSymptomEntry,

  };
}


export default useSymptoms;