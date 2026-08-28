import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* ==========================================================
   PCOD / PCOS ASSESSMENT SERVICE
========================================================== */

/* ==========================================================
   FIRESTORE COLLECTION PATH
========================================================== */

const getAssessmentCollection = (userId) => {
  return collection(
    db,
    "users",
    userId,
    "pcodAssessments"
  );
};

/* ==========================================================
   SAVE NEW ASSESSMENT
========================================================== */

export const savePCODAssessment = async (
  userId,
  assessmentData
) => {
  if (!userId) {
    throw new Error(
      "User ID is required to save the assessment."
    );
  }

  try {
    const assessmentCollection =
      getAssessmentCollection(userId);

    const docRef = await addDoc(
      assessmentCollection,
      {
        /* ----------------------------------------------
           ASSESSMENT RESULT
        ---------------------------------------------- */

        score:
          Number(assessmentData.score) || 0,

        riskLevel:
          assessmentData.riskLevel || "Low",

        message:
          assessmentData.message || "",

        probability:
          Number(assessmentData.probability) || 0,

        probabilityPercentage:
          Number(
            assessmentData.probabilityPercentage
          ) || 0,

        prediction:
          Number(assessmentData.prediction) || 0,

        predictionLabel:
          assessmentData.predictionLabel || "",

        /* ----------------------------------------------
           RISK FACTORS
        ---------------------------------------------- */

        riskFactors:
          Array.isArray(
            assessmentData.riskFactors
          )
            ? assessmentData.riskFactors
            : [],

        /* ----------------------------------------------
           USER ANSWERS
        ---------------------------------------------- */

        answers:
          assessmentData.answers || {},

        /* ----------------------------------------------
           TIMESTAMPS
        ---------------------------------------------- */

        createdAt: serverTimestamp(),
      }
    );

    return {
      success: true,
      id: docRef.id,
    };

  } catch (error) {
    console.error(
      "Error saving PCOD assessment:",
      error
    );

    throw error;
  }
};

/* ==========================================================
   GET ALL ASSESSMENT HISTORY
========================================================== */

export const getPCODAssessmentHistory =
  async (userId) => {
    if (!userId) {
      return [];
    }

    try {
      const assessmentCollection =
        getAssessmentCollection(userId);

      const assessmentQuery = query(
        assessmentCollection,
        orderBy("createdAt", "desc")
      );

      const snapshot =
        await getDocs(assessmentQuery);

      return snapshot.docs.map(
        (document) => ({
          id: document.id,
          ...document.data(),
        })
      );

    } catch (error) {
      console.error(
        "Error getting PCOD assessment history:",
        error
      );

      throw error;
    }
  };

/* ==========================================================
   GET LATEST ASSESSMENT
========================================================== */

export const getLatestPCODAssessment =
  async (userId) => {
    if (!userId) {
      return null;
    }

    try {
      const assessmentCollection =
        getAssessmentCollection(userId);

      const assessmentQuery = query(
        assessmentCollection,
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const snapshot =
        await getDocs(assessmentQuery);

      if (snapshot.empty) {
        return null;
      }

      const latestDocument =
        snapshot.docs[0];

      return {
        id: latestDocument.id,
        ...latestDocument.data(),
      };

    } catch (error) {
      console.error(
        "Error getting latest PCOD assessment:",
        error
      );

      throw error;
    }
  };

/* ==========================================================
   REALTIME ASSESSMENT HISTORY LISTENER
========================================================== */

export const subscribeToPCODAssessmentHistory =
  (
    userId,
    callback,
    onError
  ) => {
    if (!userId) {
      callback([]);

      return () => {};
    }

    const assessmentCollection =
      getAssessmentCollection(userId);

    const assessmentQuery = query(
      assessmentCollection,
      orderBy("createdAt", "desc")
    );

    return onSnapshot(
      assessmentQuery,

      (snapshot) => {
        const assessments =
          snapshot.docs.map(
            (document) => ({
              id: document.id,
              ...document.data(),
            })
          );

        callback(assessments);
      },

      (error) => {
        console.error(
          "Error listening to PCOD assessment history:",
          error
        );

        if (onError) {
          onError(error);
        }
      }
    );
  };