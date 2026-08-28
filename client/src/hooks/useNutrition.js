import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { auth } from "../firebase/firebase";

import {
  addMeal,
  deleteMeal,
  subscribeToMeals,
} from "../services/nutritionService";


function useNutrition() {
  const [meals, setMeals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState(null);


  /* ======================================================
     LOAD MEALS
  ====================================================== */

  useEffect(() => {
    const user =
      auth.currentUser;

    if (!user) {
      setMeals([]);
      setLoading(false);

      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe =
      subscribeToMeals(
        user.uid,

        (mealEntries) => {
          setMeals(
            Array.isArray(mealEntries)
              ? mealEntries
              : []
          );

          setLoading(false);
        },

        (nutritionError) => {
          console.error(
            nutritionError
          );

          setError(
            nutritionError?.message ||
              "Failed to load nutrition data."
          );

          setLoading(false);
        }
      );

    return () => {
      if (
        typeof unsubscribe ===
        "function"
      ) {
        unsubscribe();
      }
    };
  }, []);


  /* ======================================================
     ADD MEAL
  ====================================================== */

  const addNewMeal =
    useCallback(
      async (mealData) => {
        const user =
          auth.currentUser;

        if (!user) {
          throw new Error(
            "Please sign in first."
          );
        }

        try {
          setSaving(true);
          setError(null);

          return await addMeal(
            user.uid,
            mealData
          );
        } catch (mealError) {
          setError(
            mealError?.message ||
              "Failed to add meal."
          );

          throw mealError;
        } finally {
          setSaving(false);
        }
      },
      []
    );


  /* ======================================================
     DELETE MEAL
  ====================================================== */

  const removeMeal =
    useCallback(
      async (mealId) => {
        const user =
          auth.currentUser;

        if (!user) {
          throw new Error(
            "Please sign in first."
          );
        }

        try {
          setError(null);

          return await deleteMeal(
            user.uid,
            mealId
          );
        } catch (mealError) {
          setError(
            mealError?.message ||
              "Failed to delete meal."
          );

          throw mealError;
        }
      },
      []
    );


  return {
    meals,
    loading,
    saving,
    error,
    addMeal:
      addNewMeal,
    removeMeal,
  };
}


export default useNutrition;