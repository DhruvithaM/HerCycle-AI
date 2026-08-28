import {
  useState,
  useCallback,
} from "react";

import {
  TrendingDown,
  TrendingUp,
  Minus,
  CalendarDays,
} from "lucide-react";

import useProfile from "../../hooks/useProfile";
import usePeriod from "../../hooks/usePeriod";
import usePCODAssessment from "../../hooks/usePCODAssessment";

import PredictionHero from "./components/PredictionHero";
import PCODQuestionnaire from "./components/PCODQuestionnaire";
import RiskResult from "./components/RiskResult";
import RecommendationCard from "./components/RecommendationCard";

/* ==========================================================
   AI PREDICTION PAGE
========================================================== */

function AIPrediction() {
  /* ========================================================
     PROFILE
  ======================================================== */

  const {
    profile,
    loading: profileLoading,
  } = useProfile();

  /* ========================================================
     PERIOD HISTORY
  ======================================================== */

  const {
    periodHistory,
    loading: periodLoading,
  } = usePeriod();

  /* ========================================================
     PCOD ASSESSMENT HISTORY
  ======================================================== */

  const {
    latestAssessment,
    assessmentHistory,
    loading: assessmentHistoryLoading,
    saveAssessment,
    getAssessmentChange,
  } = usePCODAssessment();

  /* ========================================================
     STATES
  ======================================================== */

  const [result, setResult] =
    useState(null);

  const [predictionLoading, setPredictionLoading] =
    useState(false);

  const [predictionError, setPredictionError] =
    useState("");

  const [showQuestionnaire, setShowQuestionnaire] =
    useState(false);

  /* ========================================================
     CURRENT RESULT
  ======================================================== */

  const displayedResult =
    result || latestAssessment;

  /* ========================================================
     YES / NO TO BINARY
  ======================================================== */

  const convertToBinary = (value) => {
    if (
      value === true ||
      value === 1 ||
      value === "1"
    ) {
      return 1;
    }

    if (typeof value === "string") {
      const normalized =
        value.toLowerCase().trim();

      if (
        normalized === "yes" ||
        normalized === "y" ||
        normalized === "true"
      ) {
        return 1;
      }
    }

    return 0;
  };

  /* ========================================================
     FORMAT DATE
  ======================================================== */

  const formatAssessmentDate = (dateValue) => {
    if (!dateValue) {
      return "Date unavailable";
    }

    try {
      const date =
        typeof dateValue?.toDate === "function"
          ? dateValue.toDate()
          : new Date(dateValue);

      if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
      }

      return date.toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return "Date unavailable";
    }
  };

  /* ========================================================
     GET SCORE
  ======================================================== */

  const getScore = (assessment) => {
    return Number(
      assessment?.probabilityPercentage ??
        assessment?.probability_percentage ??
        assessment?.score ??
        0
    );
  };

  /* ========================================================
     ASSESSMENT CHANGE
  ======================================================== */

  const assessmentChange =
    getAssessmentChange();

  /* ========================================================
     QUESTIONNAIRE COMPLETE
  ======================================================== */

  const handleAssessmentComplete =
    useCallback(
      async (answers) => {
        try {
          setPredictionLoading(true);
          setPredictionError("");

          /* PROFILE VALUES */

          const age = Number(
            profile?.age ??
              profile?.ageYears ??
              0
          );

          const weight = Number(
            profile?.weight ??
              profile?.weightKg ??
              0
          );

          const height = Number(
            profile?.height ??
              profile?.heightCm ??
              0
          );

          /* BMI */

          let bmi = Number(
            profile?.bmi ?? 0
          );

          if (
            !bmi &&
            weight > 0 &&
            height > 0
          ) {
            const heightInMeters =
              height / 100;

            bmi =
              weight /
              (
                heightInMeters *
                heightInMeters
              );
          }

          /* CYCLE LENGTH */

          const cycleLength = Number(
            answers?.cycleLength ??
              profile?.cycleLength ??
              28
          );

          /* CYCLE REGULARITY */

          const cycleAnswer =
            answers?.cycleRegular ??
            answers?.irregularPeriods ??
            answers?.cycle;

          let cycleRegular = 1;

          if (
            cycleAnswer === "no" ||
            cycleAnswer === "irregular" ||
            cycleAnswer === "I"
          ) {
            cycleRegular = 0;
          }

          if (
            answers?.irregularPeriods === "yes"
          ) {
            cycleRegular = 0;
          }

          /* DATA FOR ML MODEL */

          const predictionData = {
            age,
            weight,
            height,
            bmi,

            cycle_regular:
              cycleRegular,

            cycle_length:
              cycleLength,

            weight_gain:
              convertToBinary(
                answers?.weightGain
              ),

            hair_growth:
              convertToBinary(
                answers?.excessHair ??
                  answers?.hairGrowth
              ),

            skin_darkening:
              convertToBinary(
                answers?.darkSkinPatches ??
                  answers?.skinDarkening
              ),

            hair_loss:
              convertToBinary(
                answers?.hairLoss
              ),

            pimples:
              answers?.acne === "moderate" ||
              answers?.acne === "severe" ||
              answers?.pimples === "yes"
                ? 1
                : 0,

            fast_food:
              convertToBinary(
                answers?.fastFood
              ),

            regular_exercise:
              convertToBinary(
                answers?.regularExercise
              ),
          };

          /* REQUIRED PROFILE DATA */

          if (
            !predictionData.age ||
            !predictionData.weight ||
            !predictionData.height
          ) {
            throw new Error(
              "Please complete your profile with your age, weight, and height before taking the AI assessment."
            );
          }

          /* CALL FASTAPI BACKEND */

          const response =
            await fetch(
              "http://127.0.0.1:8001/predict",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify(
                  predictionData
                ),
              }
            );

          let data;

          try {
            data =
              await response.json();
          } catch {
            throw new Error(
              "The AI backend returned an invalid response."
            );
          }

          /* BACKEND ERROR */

          if (!response.ok) {
            throw new Error(
              data?.detail ||
                data?.message ||
                "Failed to get prediction from the AI model."
            );
          }

          if (data?.success === false) {
            throw new Error(
              data?.message ||
                "The AI model could not complete the prediction."
            );
          }

          /* COMPLETE RESULT */

          const probabilityPercentage =
            Number(
              data?.probability_percentage ??
                data?.probabilityPercentage ??
                data?.score ??
                0
            );

          const completeAssessment = {
            ...data,

            answers,

            score:
              probabilityPercentage,

            probability:
              Number(
                data?.probability ?? 0
              ),

            probabilityPercentage,

            riskLevel:
              data?.risk_level ??
              data?.riskLevel ??
              "Low",

            prediction:
              Number(
                data?.prediction ?? 0
              ),

            predictionLabel:
              data?.prediction_label ??
              data?.predictionLabel ??
              "",

            message:
              data?.message ||
              "This is a preliminary AI-based risk assessment and not a medical diagnosis.",

            riskFactors:
              Array.isArray(
                data?.riskFactors
              )
                ? data.riskFactors
                : [],

            disclaimer:
              "This assessment is a preliminary AI-based screening result and is not a medical diagnosis. Please consult a qualified healthcare professional for proper evaluation.",
          };

          /* SAVE TO FIREBASE */

          await saveAssessment(
            completeAssessment
          );

          /* SHOW RESULT */

          setResult(
            completeAssessment
          );

          setShowQuestionnaire(
            false
          );

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

        } catch (error) {
          console.error(
            "ML prediction error:",
            error
          );

          setPredictionError(
            error?.message ||
              "Unable to get AI prediction."
          );

        } finally {
          setPredictionLoading(
            false
          );
        }
      },
      [
        profile,
        saveAssessment,
      ]
    );

  /* ========================================================
     LOADING SCREEN

     NO SIDEBAR OR TOPBAR HERE.
     DashboardLayout ALREADY PROVIDES THEM.
  ======================================================== */

  if (
    profileLoading ||
    periodLoading ||
    assessmentHistoryLoading
  ) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="text-center">

          <div
            className="
              mx-auto
              h-12
              w-12
              animate-spin
              rounded-full
              border-4
              border-pink-200
              border-t-pink-500
            "
          />

          <p className="mt-5 text-slate-500">
            Preparing your AI health assessment...
          </p>

        </div>

      </div>
    );
  }

  /* ========================================================
     PAGE CONTENT ONLY

     DashboardLayout provides:
     ✓ Sidebar
     ✓ Topbar
  ======================================================== */

  return (
    <div className="w-full">

      {/* HERO */}

      <PredictionHero
        profile={profile}
        hasResult={
          Boolean(displayedResult)
        }
      />

      {/* ERROR */}

      {predictionError && (
        <div
          className="
            mt-6
            rounded-2xl
            border
            border-red-200
            bg-red-50
            px-5
            py-4
            text-sm
            text-red-600
          "
        >
          <p className="font-bold">
            Prediction Error
          </p>

          <p className="mt-1">
            {predictionError}
          </p>

          <button
            type="button"
            onClick={() =>
              setPredictionError("")
            }
            className="
              mt-3
              font-bold
              underline
            "
          >
            Dismiss
          </button>
        </div>
      )}

      {/* LOADING PREDICTION */}

      {predictionLoading && (
        <div
          className="
            mt-8
            rounded-3xl
            border
            border-pink-100
            bg-white
            p-10
            text-center
            shadow-sm
          "
        >
          <div
            className="
              mx-auto
              h-12
              w-12
              animate-spin
              rounded-full
              border-4
              border-pink-200
              border-t-pink-500
            "
          />

          <h3
            className="
              mt-5
              text-xl
              font-bold
              text-slate-800
            "
          >
            Analyzing your assessment
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            Our trained machine learning model is
            analyzing your health and cycle-related
            features.
          </p>
        </div>
      )}

      {/* CONTENT */}

      {!predictionLoading && (

        <div className="mt-8">

          {/* QUESTIONNAIRE */}

          {showQuestionnaire ||
          !displayedResult ? (

            <PCODQuestionnaire
              onComplete={
                handleAssessmentComplete
              }
            />

          ) : (

            <div className="space-y-8">

              {/* CURRENT RESULT */}

              <RiskResult
                result={displayedResult}
              />

              {/* RECOMMENDATIONS */}

              <RecommendationCard
                result={displayedResult}
              />

              {/* RISK PROGRESS */}

              {assessmentChange && (

                <section
                  className="
                    rounded-3xl
                    border
                    border-pink-100
                    bg-white
                    p-6
                    shadow-sm
                    md:p-8
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      justify-between
                      gap-4
                      md:flex-row
                      md:items-center
                    "
                  >
                    <div>

                      <p className="text-sm font-semibold text-pink-500">
                        Risk Progress
                      </p>

                      <h3 className="mt-1 text-xl font-bold text-slate-800">
                        How Your Estimated Risk Changed
                      </h3>

                    </div>

                    <div
                      className={`
                        flex
                        items-center
                        gap-2
                        rounded-full
                        px-4
                        py-2
                        text-sm
                        font-bold
                        ${
                          assessmentChange.direction ===
                          "decreased"
                            ? "bg-emerald-50 text-emerald-600"
                            : assessmentChange.direction ===
                              "increased"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {assessmentChange.direction ===
                      "decreased" ? (
                        <TrendingDown size={18} />
                      ) : assessmentChange.direction ===
                        "increased" ? (
                        <TrendingUp size={18} />
                      ) : (
                        <Minus size={18} />
                      )}

                      {assessmentChange.direction ===
                      "decreased"
                        ? "Risk Improved"
                        : assessmentChange.direction ===
                          "increased"
                          ? "Risk Increased"
                          : "No Change"}

                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">

                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Previous Risk
                      </p>

                      <p className="mt-2 text-2xl font-bold text-slate-800">
                        {assessmentChange.previousRisk.toFixed(2)}
                        <span className="ml-1 text-sm font-medium text-slate-400">
                          /100
                        </span>
                      </p>
                    </div>

                    <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-pink-500">
                        Current Risk
                      </p>

                      <p className="mt-2 text-2xl font-bold text-pink-600">
                        {assessmentChange.latestRisk.toFixed(2)}
                        <span className="ml-1 text-sm font-medium text-pink-400">
                          /100
                        </span>
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                        Change
                      </p>

                      <p className="mt-2 text-2xl font-bold text-emerald-700">
                        {assessmentChange.difference > 0
                          ? "+"
                          : ""}
                        {assessmentChange.difference.toFixed(2)}

                        <span className="ml-2 text-sm font-medium">
                          points
                        </span>
                      </p>
                    </div>

                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-500">
                    Your estimated risk score is compared with
                    your previous assessment. This is a
                    preliminary comparison and is not a medical
                    diagnosis.
                  </p>
                </section>
              )}

              {/* ASSESSMENT HISTORY */}

              {assessmentHistory.length > 0 && (

                <section
                  className="
                    rounded-3xl
                    border
                    border-pink-100
                    bg-white
                    p-6
                    shadow-sm
                    md:p-8
                  "
                >
                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        Your Assessment History
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Track your previous AI-based assessment
                        results over time.
                      </p>
                    </div>

                    <span className="rounded-full bg-pink-50 px-4 py-2 text-sm font-bold text-pink-600">
                      {assessmentHistory.length} Assessment
                      {assessmentHistory.length !== 1
                        ? "s"
                        : ""}
                    </span>

                  </div>

                  <div className="mt-6 space-y-3">

                    {assessmentHistory
                      .slice(0, 5)
                      .map(
                        (
                          assessment,
                          index
                        ) => {

                          const score =
                            getScore(
                              assessment
                            );

                          const riskLevel =
                            assessment?.riskLevel ||
                            "Low";

                          return (
                            <div
                              key={
                                assessment.id ||
                                index
                              }
                              className="
                                flex
                                flex-col
                                justify-between
                                gap-4
                                rounded-2xl
                                border
                                border-slate-100
                                bg-slate-50
                                px-5
                                py-4
                                sm:flex-row
                                sm:items-center
                              "
                            >
                              <div className="flex items-center gap-4">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
                                  <CalendarDays size={20} />
                                </div>

                                <div>

                                  <p className="font-bold text-slate-700">
                                    {index === 0
                                      ? "Latest Assessment"
                                      : `Previous Assessment ${index}`}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-400">
                                    {formatAssessmentDate(
                                      assessment.createdAt
                                    )}
                                  </p>

                                </div>
                              </div>

                              <div className="flex items-center gap-3">

                                <span
                                  className={`
                                    rounded-full
                                    px-3
                                    py-1
                                    text-xs
                                    font-bold
                                    ${
                                      riskLevel === "High"
                                        ? "bg-pink-50 text-pink-600"
                                        : riskLevel ===
                                          "Moderate"
                                          ? "bg-orange-50 text-orange-600"
                                          : "bg-emerald-50 text-emerald-600"
                                    }
                                  `}
                                >
                                  {riskLevel} Risk
                                </span>

                                <span className="text-lg font-bold text-slate-700">
                                  {score.toFixed(2)}
                                  <span className="ml-1 text-sm font-medium text-slate-400">
                                    /100
                                  </span>
                                </span>

                              </div>
                            </div>
                          );
                        }
                      )}

                  </div>

                  <p className="mt-5 text-xs leading-5 text-slate-400">
                    Assessment results are preliminary AI-based
                    estimates and are not a medical diagnosis.
                  </p>
                </section>
              )}

              {/* TAKE NEW ASSESSMENT */}

              <div className="flex justify-center pb-10">

                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setPredictionError("");
                    setShowQuestionnaire(true);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="
                    rounded-2xl
                    border
                    border-pink-200
                    bg-white
                    px-6
                    py-3
                    text-sm
                    font-bold
                    text-pink-600
                    shadow-sm
                    transition
                    hover:-translate-y-0.5
                    hover:border-pink-400
                    hover:shadow-md
                  "
                >
                  Take New Assessment
                </button>

              </div>

            </div>
          )}

        </div>
      )}

      {/* PERIOD HISTORY NOTE */}

      {periodHistory &&
        periodHistory.length > 0 && (
          <p
            className="
              pb-8
              pt-2
              text-center
              text-xs
              text-slate-400
            "
          >
            Your cycle history is securely available to support
            future personalized assessment improvements.
          </p>
        )}

    </div>
  );
}

export default AIPrediction;