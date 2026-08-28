import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";


/* ==========================================================
   GET NUTRITION COLLECTION
========================================================== */

const getNutritionCollection = (userId) => {
  return collection(
    db,
    "users",
    userId,
    "nutrition"
  );
};


/* ==========================================================
   ADD MEAL
========================================================== */

export const addMeal = async (
  userId,
  mealData
) => {
  if (!userId) {
    throw new Error(
      "Please sign in before adding a meal."
    );
  }

  if (!mealData?.name?.trim()) {
    throw new Error(
      "Please enter the meal name."
    );
  }

  const calories = Number(
    mealData.calories
  );

  if (
    !Number.isFinite(calories) ||
    calories < 0
  ) {
    throw new Error(
      "Please enter valid calories."
    );
  }

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const nutritionCollection =
    getNutritionCollection(userId);

  const mealDocument =
    await addDoc(
      nutritionCollection,
      {
        name:
          mealData.name.trim(),

        category:
          mealData.category ||
          "Breakfast",

        calories,

        protein:
          Number(mealData.protein) || 0,

        carbs:
          Number(mealData.carbs) || 0,

        fat:
          Number(mealData.fat) || 0,

        notes:
          mealData.notes?.trim() || "",

        date: today,

        createdAt:
          serverTimestamp(),
      }
    );

  return {
    success: true,
    id: mealDocument.id,
  };
};


/* ==========================================================
   SUBSCRIBE TO MEALS
========================================================== */

export const subscribeToMeals = (
  userId,
  callback,
  onError
) => {
  if (!userId) {
    callback([]);

    return () => {};
  }

  const nutritionCollection =
    getNutritionCollection(userId);

  const mealsQuery =
    query(
      nutritionCollection,
      orderBy(
        "createdAt",
        "desc"
      )
    );

  return onSnapshot(
    mealsQuery,

    (snapshot) => {
      const meals =
        snapshot.docs.map(
          (document) => ({
            id: document.id,
            ...document.data(),
          })
        );

      callback(meals);
    },

    (error) => {
      console.error(
        "Nutrition loading error:",
        error
      );

      onError?.(error);
    }
  );
};


/* ==========================================================
   DELETE MEAL
========================================================== */

export const deleteMeal = async (
  userId,
  mealId
) => {
  if (!userId || !mealId) {
    throw new Error(
      "Meal information is missing."
    );
  }

  const mealDocument =
    doc(
      db,
      "users",
      userId,
      "nutrition",
      mealId
    );

  await deleteDoc(
    mealDocument
  );

  return {
    success: true,
  };
};