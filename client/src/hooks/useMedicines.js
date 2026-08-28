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
  addMedicine,
  deleteMedicine,
  markMedicineAsTaken,
  subscribeToMedicines,
  updateMedicineStatus,
} from "../services/medicineService";


function useMedicines() {
  const [medicines, setMedicines] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState(null);


  /* ==============================================
     LISTEN TO AUTH + LOAD MEDICINES
  ============================================== */

  useEffect(() => {
    let unsubscribeMedicines = null;

    const unsubscribeAuth =
      onAuthStateChanged(
        auth,
        (user) => {
          /* ----------------------------------------
             CLEAN OLD LISTENER
          ---------------------------------------- */

          if (unsubscribeMedicines) {
            unsubscribeMedicines();
            unsubscribeMedicines = null;
          }


          /* ----------------------------------------
             USER NOT LOGGED IN
          ---------------------------------------- */

          if (!user) {
            setMedicines([]);
            setLoading(false);

            return;
          }


          /* ----------------------------------------
             USER LOGGED IN
          ---------------------------------------- */

          setLoading(true);
          setError(null);

          unsubscribeMedicines =
            subscribeToMedicines(
              user.uid,

              (medicineEntries) => {
                setMedicines(
                  Array.isArray(
                    medicineEntries
                  )
                    ? medicineEntries
                    : []
                );

                setLoading(false);
              },

              (medicineError) => {
                console.error(
                  "Medicine subscription error:",
                  medicineError
                );

                setError(
                  medicineError?.message ||
                    "Failed to load medicines."
                );

                setLoading(false);
              }
            );
        }
      );


    return () => {
      if (unsubscribeMedicines) {
        unsubscribeMedicines();
      }

      unsubscribeAuth();
    };
  }, []);


  /* ==============================================
     ADD MEDICINE
  ============================================== */

  const addNewMedicine =
    useCallback(
      async (medicineData) => {
        const user =
          auth.currentUser;

        if (!user) {
          throw new Error(
            "Please wait a moment for your account to load, then try again."
          );
        }

        try {
          setSaving(true);
          setError(null);

          const result =
            await addMedicine(
              user.uid,
              medicineData
            );

          console.log(
            "Medicine saved successfully:",
            result
          );

          return result;

        } catch (addError) {
          console.error(
            "Error adding medicine:",
            addError
          );

          setError(
            addError?.message ||
              "Failed to add medicine."
          );

          throw addError;

        } finally {
          setSaving(false);
        }
      },
      []
    );


  /* ==============================================
     MARK AS TAKEN
  ============================================== */

  const markAsTaken =
    useCallback(
      async (medicineId) => {
        const user =
          auth.currentUser;

        if (!user) {
          throw new Error(
            "Please sign in before updating a medicine."
          );
        }

        return await markMedicineAsTaken(
          user.uid,
          medicineId
        );
      },
      []
    );


  /* ==============================================
     TOGGLE STATUS
  ============================================== */

  const toggleStatus =
    useCallback(
      async (
        medicineId,
        active
      ) => {
        const user =
          auth.currentUser;

        if (!user) {
          throw new Error(
            "Please sign in before updating a medicine."
          );
        }

        return await updateMedicineStatus(
          user.uid,
          medicineId,
          active
        );
      },
      []
    );


  /* ==============================================
     DELETE
  ============================================== */

  const removeMedicine =
    useCallback(
      async (medicineId) => {
        const user =
          auth.currentUser;

        if (!user) {
          throw new Error(
            "Please sign in before deleting a medicine."
          );
        }

        return await deleteMedicine(
          user.uid,
          medicineId
        );
      },
      []
    );


  return {
    medicines,
    loading,
    saving,
    error,

    addMedicine:
      addNewMedicine,

    markAsTaken,

    toggleStatus,

    removeMedicine,
  };
}


export default useMedicines;