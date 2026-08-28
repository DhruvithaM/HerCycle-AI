import { useMemo, useState } from "react";
import {
  Apple,
  Coffee,
  Moon,
  RotateCcw,
  Save,
  Sparkles,
  Sun,
  Utensils,
} from "lucide-react";

import useProfile from "../../hooks/useProfile";
import usePeriod from "../../hooks/usePeriod";
import { predictCycle } from "../../utils/cyclePrediction";


/* ==========================================================
   DATE
========================================================== */

const getTodayDate = () => {
  return new Date()
    .toISOString()
    .split("T")[0];
};


/* ==========================================================
   COMMON FOOD CALORIE DATABASE

   These are approximate values for normal serving sizes.
========================================================== */

const FOOD_CALORIES = {
  poha: 250,
  upma: 260,
  idli: 180,
  dosa: 300,
  "masala dosa": 420,
  "plain dosa": 300,
  pulav: 350,
  pulao: 350,
  rice: 220,
  "curd rice": 300,
  biryani: 450,
  chapati: 120,
  roti: 120,
  paratha: 300,
  oats: 250,
  oatmeal: 250,
  bread: 160,
  sandwich: 300,
  "vegetable sandwich": 280,
  egg: 80,
  eggs: 160,
  omelette: 220,
  fruits: 120,
  fruit: 120,
  banana: 105,
  apple: 95,
  salad: 150,
  dal: 180,
  sambar: 140,
  rasam: 80,
  vegetables: 180,
  sabzi: 180,
  paneer: 300,
  chicken: 320,
  fish: 280,
  soup: 150,
  pasta: 400,
  noodles: 380,
  biscuits: 180,
  tea: 80,
  coffee: 100,
  juice: 150,
  nuts: 180,
  yogurt: 150,
  curd: 120,
};


/* ==========================================================
   ESTIMATE CALORIES
========================================================== */

const estimateCalories = (foodName) => {
  if (!foodName?.trim()) {
    return 0;
  }

  const normalizedFood =
    foodName
      .toLowerCase()
      .trim();

  if (FOOD_CALORIES[normalizedFood]) {
    return FOOD_CALORIES[normalizedFood];
  }

  const matchedFood =
    Object.keys(FOOD_CALORIES).find(
      (food) =>
        normalizedFood.includes(food)
    );

  if (matchedFood) {
    return FOOD_CALORIES[matchedFood];
  }

  return 250;
};


/* ==========================================================
   GET AGE
========================================================== */

const getAge = (dateOfBirth) => {
  if (!dateOfBirth) {
    return null;
  }

  const birthDate =
    new Date(dateOfBirth);

  if (
    Number.isNaN(
      birthDate.getTime()
    )
  ) {
    return null;
  }

  const today =
    new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() <
        birthDate.getDate()
    )
  ) {
    age -= 1;
  }

  return age;
};


/* ==========================================================
   GET CYCLE PHASE
========================================================== */

const getCyclePhase = (
  cycleData
) => {
  if (
    !cycleData ||
    typeof cycleData !== "object"
  ) {
    return "general";
  }

  const values =
    Object.values(cycleData)
      .join(" ")
      .toLowerCase();

  if (
    values.includes("period") ||
    values.includes("menstrual")
  ) {
    return "period";
  }

  if (
    values.includes("ovulation") ||
    values.includes("ovulatory")
  ) {
    return "ovulation";
  }

  if (
    values.includes("luteal") ||
    values.includes("pms")
  ) {
    return "luteal";
  }

  if (
    values.includes("follicular")
  ) {
    return "follicular";
  }

  return "general";
};


/* ==========================================================
   MEAL SUGGESTIONS
========================================================== */

const getMealSuggestions = (
  cyclePhase,
  age
) => {
  const ageText =
    age
      ? `Personalized for your age (${age})`
      : "Personalized for your daily health";

  const generalSuggestions = {
    breakfast: {
      title: "Vegetable Poha",
      calories: 250,
      reason:
        "A light and balanced breakfast with carbohydrates and vegetables.",
    },

    lunch: {
      title:
        "Dal, rice and vegetable salad",
      calories: 550,
      reason:
        "Provides carbohydrates, protein and fibre for steady energy.",
    },

    snacks: {
      title:
        "Fruit with a handful of nuts",
      calories: 220,
      reason:
        "A nutritious snack that can help you stay full between meals.",
    },

    dinner: {
      title:
        "Chapati with vegetables and curd",
      calories: 450,
      reason:
        "A balanced and lighter option for the evening.",
    },

    ageText,
  };

  if (cyclePhase === "period") {
    return {
      ...generalSuggestions,

      breakfast: {
        title:
          "Poha with peanuts and fruit",
        calories: 300,
        reason:
          "Provides energy and includes foods that can support iron and nutrient intake during your period.",
      },

      lunch: {
        title:
          "Spinach dal with rice",
        calories: 560,
        reason:
          "A protein and iron-rich meal suitable during menstruation.",
      },

      snacks: {
        title:
          "Banana with nuts",
        calories: 220,
        reason:
          "Provides quick energy and useful minerals.",
      },

      dinner: {
        title:
          "Chapati with paneer and vegetables",
        calories: 500,
        reason:
          "Provides protein and a satisfying balanced dinner.",
      },
    };
  }

  if (cyclePhase === "ovulation") {
    return {
      ...generalSuggestions,

      breakfast: {
        title:
          "Oats with fruit",
        calories: 280,
        reason:
          "A fibre-rich breakfast that provides steady energy.",
      },

      lunch: {
        title:
          "Vegetable rice with curd",
        calories: 520,
        reason:
          "A balanced combination of carbohydrates and protein.",
      },

      snacks: {
        title:
          "Apple with nuts",
        calories: 200,
        reason:
          "A light and nutrient-rich snack.",
      },

      dinner: {
        title:
          "Grilled paneer with vegetables",
        calories: 480,
        reason:
          "Provides protein and vegetables for a balanced evening meal.",
      },
    };
  }

  if (cyclePhase === "luteal") {
    return {
      ...generalSuggestions,

      breakfast: {
        title:
          "Idli with sambar",
        calories: 320,
        reason:
          "A comforting meal with carbohydrates and protein.",
      },

      lunch: {
        title:
          "Chapati, dal and vegetables",
        calories: 540,
        reason:
          "Provides sustained energy and fibre.",
      },

      snacks: {
        title:
          "Dark chocolate and nuts",
        calories: 230,
        reason:
          "A satisfying snack for cravings in moderate portions.",
      },

      dinner: {
        title:
          "Vegetable khichdi with curd",
        calories: 450,
        reason:
          "A lighter and comforting dinner option.",
      },
    };
  }

  return generalSuggestions;
};


/* ==========================================================
   MEAL CONFIGURATION
========================================================== */

const MEAL_CONFIG = [
  {
    key: "breakfast",
    title: "Breakfast",
    subtitle:
      "Start your day with healthy energy",
    icon: Coffee,
  },

  {
    key: "lunch",
    title: "Lunch",
    subtitle:
      "Keep your energy balanced",
    icon: Sun,
  },

  {
    key: "snacks",
    title: "Snacks",
    subtitle:
      "Choose a nutritious small meal",
    icon: Apple,
  },

  {
    key: "dinner",
    title: "Dinner",
    subtitle:
      "Finish your day with a balanced meal",
    icon: Moon,
  },
];


/* ==========================================================
   DIET & NUTRITION
========================================================== */

function DietNutrition() {
  const { profile } =
    useProfile();

  const {
    periodHistory,
  } = usePeriod();

  const cycleData =
    predictCycle(
      periodHistory || [],
      profile
    );

  const cyclePhase =
    getCyclePhase(
      cycleData
    );

  const age =
    getAge(
      profile?.dateOfBirth ||
      profile?.dob
    );

  const suggestions =
    useMemo(
      () =>
        getMealSuggestions(
          cyclePhase,
          age
        ),
      [
        cyclePhase,
        age,
      ]
    );


  /* ========================================================
     ACTUAL MEALS

     Empty = show suggestion
     Filled = show actual food consumed
  ======================================================== */

  const [
    meals,
    setMeals,
  ] = useState({
    breakfast: {
      food: "",
      calories: 0,
    },

    lunch: {
      food: "",
      calories: 0,
    },

    snacks: {
      food: "",
      calories: 0,
    },

    dinner: {
      food: "",
      calories: 0,
    },
  });


  /* ========================================================
     INPUT STATE
  ======================================================== */

  const [
    mealInputs,
    setMealInputs,
  ] = useState({
    breakfast: "",
    lunch: "",
    snacks: "",
    dinner: "",
  });


  /* ========================================================
     SAVE ACTUAL MEAL
  ======================================================== */

  const saveMeal = (
    mealKey
  ) => {
    const food =
      mealInputs[
        mealKey
      ]?.trim();

    if (!food) {
      window.alert(
        "Please enter what you consumed."
      );

      return;
    }

    const calories =
      estimateCalories(
        food
      );

    setMeals(
      (previousMeals) => ({
        ...previousMeals,

        [mealKey]: {
          food,
          calories,
        },
      })
    );

    setMealInputs(
      (previousInputs) => ({
        ...previousInputs,

        [mealKey]: "",
      })
    );
  };


  /* ========================================================
     RESET MEAL

     Actual food is removed.
     Suggested meal appears again.
  ======================================================== */

  const resetMeal = (
    mealKey
  ) => {
    setMeals(
      (previousMeals) => ({
        ...previousMeals,

        [mealKey]: {
          food: "",
          calories: 0,
        },
      })
    );

    setMealInputs(
      (previousInputs) => ({
        ...previousInputs,

        [mealKey]: "",
      })
    );
  };


  /* ========================================================
     TOTAL CALORIES

     Actual meals use estimated calories.
     Suggestions are included for meals
     that have not been replaced yet.
  ======================================================== */

  const totalCalories =
    MEAL_CONFIG.reduce(
      (
        total,
        meal
      ) => {
        const actualMeal =
          meals[
            meal.key
          ];

        if (
          actualMeal.food
        ) {
          return (
            total +
            actualMeal.calories
          );
        }

        return (
          total +
          (
            suggestions[
              meal.key
            ]?.calories || 0
          )
        );
      },
      0
    );


  /* ========================================================
     PAGE
  ======================================================== */

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[1600px]
        space-y-6
        pb-10
      "
    >

      {/* ====================================================
          HERO
      ===================================================== */}

      <section
        className="
          overflow-hidden
          rounded-[32px]
          bg-gradient-to-br
          from-pink-500
          via-pink-500
          to-purple-600
          p-6
          text-white
          shadow-xl
          shadow-pink-200/50
          sm:p-8
        "
      >

        <div
          className="
            flex
            flex-col
            gap-6
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/15
                px-4
                py-2
                text-sm
                font-semibold
                backdrop-blur
              "
            >
              <Sparkles
                size={16}
              />

              Personalized nutrition
            </div>

            <h1
              className="
                mt-5
                text-3xl
                font-black
                sm:text-4xl
              "
            >
              Diet & Nutrition
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-7
                text-pink-50
                sm:text-base
              "
            >
              Get meal suggestions based on your
              cycle and daily health needs. You can
              replace any suggestion with what you
              actually ate, and HerCycle AI will
              estimate the calories for you.
            </p>

          </div>


          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:min-w-[340px]
            "
          >

            <div
              className="
                rounded-2xl
                bg-white/15
                p-4
                backdrop-blur
              "
            >
              <p
                className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-pink-100
                "
              >
                Estimated today
              </p>

              <p
                className="
                  mt-2
                  text-2xl
                  font-black
                "
              >
                {totalCalories}
              </p>

              <p
                className="
                  text-xs
                  text-pink-100
                "
              >
                kcal
              </p>

            </div>


            <div
              className="
                rounded-2xl
                bg-white/15
                p-4
                backdrop-blur
              "
            >
              <p
                className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-pink-100
                "
              >
                Today
              </p>

              <p
                className="
                  mt-2
                  text-xl
                  font-black
                  capitalize
                "
              >
                {cyclePhase}
              </p>

              <p
                className="
                  text-xs
                  text-pink-100
                "
              >
                cycle phase
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ====================================================
          PERSONALIZATION INFO
      ===================================================== */}

      <section
        className="
          flex
          flex-col
          gap-4
          rounded-3xl
          border
          border-pink-100
          bg-white
          p-5
          shadow-sm
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <div
          className="
            flex
            items-start
            gap-4
          "
        >

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-pink-50
              text-pink-600
            "
          >
            <Sparkles
              size={22}
            />
          </div>

          <div>

            <h2
              className="
                font-bold
                text-slate-800
              "
            >
              Today's meal recommendations
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              {
                suggestions.ageText
              }
              {" • "}
              Your recommendations adapt to your
              current cycle information.
            </p>

          </div>

        </div>


        <div
          className="
            rounded-2xl
            bg-purple-50
            px-4
            py-3
            text-sm
            font-semibold
            capitalize
            text-purple-600
          "
        >
          Current phase: {cyclePhase}
        </div>

      </section>


      {/* ====================================================
          MEALS
      ===================================================== */}

      <section
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >

        {
          MEAL_CONFIG.map(
            (meal) => {
              const Icon =
                meal.icon;

              const actualMeal =
                meals[
                  meal.key
                ];

              const hasActualMeal =
                Boolean(
                  actualMeal.food
                );

              const suggestion =
                suggestions[
                  meal.key
                ];

              return (
                <div
                  key={
                    meal.key
                  }
                  className="
                    rounded-3xl
                    border
                    border-slate-100
                    bg-white
                    p-5
                    shadow-sm
                    transition
                    hover:shadow-md
                    sm:p-6
                  "
                >

                  {/* HEADER */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          bg-pink-50
                          text-pink-600
                        "
                      >
                        <Icon
                          size={22}
                        />
                      </div>

                      <div>

                        <h2
                          className="
                            text-lg
                            font-bold
                            text-slate-800
                          "
                        >
                          {
                            meal.title
                          }
                        </h2>

                        <p
                          className="
                            mt-1
                            text-sm
                            text-slate-500
                          "
                        >
                          {
                            meal.subtitle
                          }
                        </p>

                      </div>

                    </div>


                    {hasActualMeal && (

                      <button
                        type="button"
                        onClick={() =>
                          resetMeal(
                            meal.key
                          )
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          bg-slate-100
                          px-3
                          py-2
                          text-xs
                          font-bold
                          text-slate-600
                          transition
                          hover:bg-pink-50
                          hover:text-pink-600
                        "
                      >
                        <RotateCcw
                          size={15}
                        />

                        Reset

                      </button>

                    )}

                  </div>


                  {/* ========================================
                      ACTUAL FOOD
                  ========================================= */}

                  {hasActualMeal ? (

                    <div
                      className="
                        mt-6
                        rounded-2xl
                        border
                        border-emerald-100
                        bg-emerald-50/70
                        p-4
                      "
                    >

                      <p
                        className="
                          text-xs
                          font-bold
                          uppercase
                          tracking-wider
                          text-emerald-600
                        "
                      >
                        What you consumed
                      </p>

                      <div
                        className="
                          mt-3
                          flex
                          flex-wrap
                          items-center
                          justify-between
                          gap-3
                        "
                      >

                        <h3
                          className="
                            text-lg
                            font-bold
                            text-slate-800
                          "
                        >
                          {
                            actualMeal.food
                          }
                        </h3>

                        <div
                          className="
                            rounded-xl
                            bg-white
                            px-3
                            py-2
                            text-sm
                            font-black
                            text-emerald-600
                          "
                        >
                          ~{
                            actualMeal.calories
                          } kcal
                        </div>

                      </div>

                      <p
                        className="
                          mt-3
                          text-xs
                          leading-5
                          text-slate-500
                        "
                      >
                        Calorie value is an approximate
                        estimate based on a normal
                        serving size.
                      </p>

                    </div>

                  ) : (

                    <>
                      {/* ====================================
                          SUGGESTION
                      ===================================== */}

                      <div
                        className="
                          mt-6
                          rounded-2xl
                          border
                          border-purple-100
                          bg-gradient-to-br
                          from-purple-50
                          to-pink-50
                          p-4
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <Sparkles
                            size={16}
                            className="
                              text-purple-500
                            "
                          />

                          <p
                            className="
                              text-xs
                              font-bold
                              uppercase
                              tracking-wider
                              text-purple-600
                            "
                          >
                            Suggested for you
                          </p>

                        </div>


                        <div
                          className="
                            mt-3
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-3
                          "
                        >

                          <h3
                            className="
                              text-lg
                              font-bold
                              text-slate-800
                            "
                          >
                            {
                              suggestion.title
                            }
                          </h3>

                          <div
                            className="
                              rounded-xl
                              bg-white
                              px-3
                              py-2
                              text-sm
                              font-black
                              text-purple-600
                              shadow-sm
                            "
                          >
                            ~{
                              suggestion.calories
                            } kcal
                          </div>

                        </div>


                        <p
                          className="
                            mt-3
                            text-sm
                            leading-6
                            text-slate-600
                          "
                        >
                          {
                            suggestion.reason
                          }
                        </p>

                      </div>


                      {/* ====================================
                          ACTUAL FOOD INPUT
                      ===================================== */}

                      <div
                        className="
                          mt-5
                          border-t
                          border-slate-100
                          pt-5
                        "
                      >

                        <p
                          className="
                            text-sm
                            font-bold
                            text-slate-700
                          "
                        >
                          Ate something else?
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-slate-500
                          "
                        >
                          Simply enter what you actually
                          consumed. We will estimate the
                          calories for you.
                        </p>


                        <div
                          className="
                            mt-3
                            flex
                            flex-col
                            gap-3
                            sm:flex-row
                          "
                        >

                          <input
                            type="text"
                            value={
                              mealInputs[
                                meal.key
                              ]
                            }
                            onChange={(
                              event
                            ) =>
                              setMealInputs(
                                (
                                  previousInputs
                                ) => ({
                                  ...previousInputs,

                                  [meal.key]:
                                    event.target.value,
                                })
                              )
                            }
                            onKeyDown={(
                              event
                            ) => {
                              if (
                                event.key ===
                                "Enter"
                              ) {
                                event.preventDefault();

                                saveMeal(
                                  meal.key
                                );
                              }
                            }}
                            placeholder={`Example: Pulav, dosa, chapati...`}
                            className="
                              min-w-0
                              flex-1
                              rounded-xl
                              border
                              border-slate-200
                              bg-white
                              px-4
                              py-3
                              text-sm
                              text-slate-700
                              outline-none
                              transition
                              placeholder:text-slate-400
                              focus:border-pink-400
                              focus:ring-4
                              focus:ring-pink-100
                            "
                          />


                          <button
                            type="button"
                            onClick={() =>
                              saveMeal(
                                meal.key
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              bg-gradient-to-r
                              from-pink-500
                              to-purple-600
                              px-5
                              py-3
                              text-sm
                              font-bold
                              text-white
                              shadow-md
                              shadow-pink-200
                              transition
                              hover:opacity-90
                            "
                          >
                            <Save
                              size={16}
                            />

                            Save

                          </button>

                        </div>

                      </div>

                    </>

                  )}

                </div>
              );
            }
          )
        }

      </section>


      {/* ====================================================
          CALORIE NOTE
      ===================================================== */}

      <section
        className="
          rounded-3xl
          border
          border-pink-100
          bg-white
          p-5
          shadow-sm
        "
      >

        <div
          className="
            flex
            items-start
            gap-4
          "
        >

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-pink-50
              text-pink-600
            "
          >
            <Utensils
              size={22}
            />
          </div>

          <div>

            <h3
              className="
                font-bold
                text-slate-800
              "
            >
              How calorie estimation works
            </h3>

            <p
              className="
                mt-2
                max-w-4xl
                text-sm
                leading-6
                text-slate-500
              "
            >
              You only need to tell us what you ate.
              HerCycle AI estimates calories using
              common serving sizes and a food
              database. These values are approximate
              and are designed for daily nutrition
              awareness, not as medical or clinical
              advice.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default DietNutrition;