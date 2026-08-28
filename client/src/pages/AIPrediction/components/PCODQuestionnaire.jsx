import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

/* ==========================================================
   PCOD / PCOS ML QUESTIONNAIRE

   IMPORTANT:
   These answers are collected specifically for the
   trained ML model.

   Profile provides:
   - Age
   - Weight
   - Height
   - BMI

   Questionnaire provides:
   - Cycle regularity
   - Cycle length
   - Weight gain
   - Hair growth
   - Skin darkening
   - Hair loss
   - Pimples
   - Fast food
   - Regular exercise
========================================================== */

function PCODQuestionnaire({ onComplete }) {
  /* ========================================================
     QUESTIONS
  ======================================================== */

  const questions = [
    {
      id: "cycle_regular",
      question:
        "Are your menstrual cycles usually regular?",
      description:
        "Choose Yes if your periods generally come at a predictable interval. Choose No if the timing varies significantly.",
      options: [
        {
          label: "Yes, my cycles are regular",
          value: "yes",
        },
        {
          label: "No, my cycles are irregular",
          value: "no",
        },
      ],
    },

    {
      id: "cycle_length",
      question:
        "What is your usual menstrual cycle length?",
      description:
        "Enter the approximate number of days from the first day of one period to the first day of your next period.",
      type: "number",
      placeholder: "For example: 28",
      min: 15,
      max: 90,
      suffix: "days",
    },

    {
      id: "weight_gain",
      question:
        "Have you experienced noticeable or unexplained weight gain?",
      description:
        "Consider weight gain that was not expected based on your usual diet or activity level.",
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },

    {
      id: "hair_growth",
      question:
        "Have you noticed excessive facial or body hair growth?",
      description:
        "For example, thicker or increased hair growth on the face, chin, chest, stomach, or back.",
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },

    {
      id: "skin_darkening",
      question:
        "Have you noticed darkened patches of skin?",
      description:
        "For example, darker skin around the neck, underarms, or other skin folds.",
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },

    {
      id: "hair_loss",
      question:
        "Have you noticed excessive hair thinning or hair loss?",
      description:
        "For example, increased hair shedding or noticeable thinning around the scalp.",
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },

    {
      id: "pimples",
      question:
        "Do you frequently experience pimples or acne?",
      description:
        "Consider recurring or persistent acne rather than an occasional single pimple.",
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },

    {
      id: "fast_food",
      question:
        "Do you frequently consume fast food?",
      description:
        "Choose Yes if fast food is a regular part of your eating habits.",
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },

    {
      id: "regular_exercise",
      question:
        "Do you exercise regularly?",
      description:
        "Choose Yes if you regularly participate in physical activity or exercise.",
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },
  ];

  /* ========================================================
     STATE
  ======================================================== */

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [inputError, setInputError] =
    useState("");

  /* ========================================================
     CURRENT QUESTION
  ======================================================== */

  const current =
    questions[currentQuestion];

  const selectedAnswer =
    answers[current.id];

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  /* ========================================================
     HANDLE SELECT ANSWER
  ======================================================== */

  const handleAnswer = (value) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [current.id]: value,
    }));

    setInputError("");
  };

  /* ========================================================
     HANDLE NUMBER INPUT
  ======================================================== */

  const handleNumberChange = (event) => {
    const value = event.target.value;

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [current.id]: value,
    }));

    setInputError("");
  };

  /* ========================================================
     VALIDATE CURRENT ANSWER
  ======================================================== */

  const validateCurrentAnswer = () => {
    /* --------------------------------------------
       Check empty answer
    -------------------------------------------- */

    if (
      selectedAnswer === undefined ||
      selectedAnswer === null ||
      selectedAnswer === ""
    ) {
      setInputError(
        "Please answer this question before continuing."
      );

      return false;
    }

    /* --------------------------------------------
       Validate cycle length
    -------------------------------------------- */

    if (current.type === "number") {
      const cycleLength =
        Number(selectedAnswer);

      if (
        Number.isNaN(cycleLength) ||
        cycleLength < current.min ||
        cycleLength > current.max
      ) {
        setInputError(
          `Please enter a value between ${current.min} and ${current.max} days.`
        );

        return false;
      }
    }

    return true;
  };

  /* ========================================================
     NEXT QUESTION
  ======================================================== */

  const handleNext = () => {
    const isValid =
      validateCurrentAnswer();

    if (!isValid) {
      return;
    }

    /* --------------------------------------------
       Last question
    -------------------------------------------- */

    if (
      currentQuestion ===
      questions.length - 1
    ) {
      onComplete({
        ...answers,

        [current.id]:
          current.type === "number"
            ? Number(selectedAnswer)
            : selectedAnswer,
      });

      return;
    }

    /* --------------------------------------------
       Next question
    -------------------------------------------- */

    setCurrentQuestion(
      (previousQuestion) =>
        previousQuestion + 1
    );

    setInputError("");
  };

  /* ========================================================
     PREVIOUS QUESTION
  ======================================================== */

  const handlePrevious = () => {
    if (currentQuestion === 0) {
      return;
    }

    setCurrentQuestion(
      (previousQuestion) =>
        previousQuestion - 1
    );

    setInputError("");
  };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <section className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm md:p-8">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-pink-500">
              AI-Powered PCOD / PCOS Assessment
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-800">
              Let's collect the information for your assessment
            </h2>
          </div>

          <span className="rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        <p className="text-sm leading-6 text-slate-500">
          Your responses, together with your profile information,
          are analyzed by our trained machine learning model.
        </p>

        {/* ==================================================
            PROGRESS BAR
        ================================================== */}

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-pink-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* ==================================================
          QUESTION CARD
      ================================================== */}

      <div className="rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 p-6 md:p-8">
        <h3 className="text-xl font-bold leading-8 text-slate-800">
          {current.question}
        </h3>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          {current.description}
        </p>

        {/* ==================================================
            NUMBER INPUT
        ================================================== */}

        {current.type === "number" ? (
          <div className="mt-8 max-w-md">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Enter your cycle length
            </label>

            <div className="relative">
              <input
                type="number"
                min={current.min}
                max={current.max}
                value={
                  selectedAnswer ?? ""
                }
                onChange={
                  handleNumberChange
                }
                placeholder={
                  current.placeholder
                }
                className="w-full rounded-2xl border border-pink-100 bg-white px-5 py-4 pr-20 text-lg font-semibold text-slate-700 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
              />

              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                {current.suffix}
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Typical menstrual cycles are often around 21–35 days,
              but enter your actual usual cycle length.
            </p>
          </div>
        ) : (
          /* ================================================
             YES / NO OPTIONS
          ================================================= */

          <div className="mt-8 grid gap-4">
            {current.options.map(
              (option) => {
                const isSelected =
                  selectedAnswer ===
                  option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      handleAnswer(
                        option.value
                      )
                    }
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-pink-500 bg-white shadow-md"
                        : "border-white bg-white/70 hover:border-pink-200 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`font-semibold ${
                        isSelected
                          ? "text-pink-600"
                          : "text-slate-700"
                      }`}
                    >
                      {option.label}
                    </span>

                    {isSelected && (
                      <CheckCircle2
                        size={21}
                        className="text-pink-500"
                      />
                    )}
                  </button>
                );
              }
            )}
          </div>
        )}

        {/* ==================================================
            VALIDATION ERROR
        ================================================== */}

        {inputError && (
          <p className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-500">
            {inputError}
          </p>
        )}
      </div>

      {/* ==================================================
          NAVIGATION
      ================================================== */}

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />

          Previous
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5"
        >
          {currentQuestion ===
          questions.length - 1
            ? "Get AI Prediction"
            : "Next"}

          <ChevronRight size={18} />
        </button>
      </div>

      {/* ==================================================
          DISCLAIMER
      ================================================== */}

      <p className="mt-6 text-center text-xs leading-5 text-slate-400">
        This AI assessment provides a preliminary risk indication
        based on a trained machine learning model. It is not a
        medical diagnosis and should not replace professional
        medical advice.
      </p>
    </section>
  );
}

export default PCODQuestionnaire;