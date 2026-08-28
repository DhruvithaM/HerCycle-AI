/* ==========================================================
   SYMPTOM DATA
========================================================== */

export const symptomCategories = [
  {
    id: "menstrual",
    title: "Menstrual & Cycle",
    description:
      "Track changes related to your menstrual cycle.",
    icon: "CalendarDays",

    symptoms: [
      {
        id: "irregular_periods",
        name: "Irregular periods",
        description:
          "Periods that come earlier or later than expected.",
      },
      {
        id: "missed_period",
        name: "Missed period",
        description:
          "A period that did not occur when expected.",
      },
      {
        id: "heavy_bleeding",
        name: "Heavy bleeding",
        description:
          "Bleeding that feels heavier than usual.",
      },
      {
        id: "spotting",
        name: "Spotting",
        description:
          "Light bleeding between periods.",
      },
      {
        id: "painful_periods",
        name: "Painful periods",
        description:
          "Menstrual cramps or pain that affects daily activities.",
      },
    ],
  },

  {
    id: "pain",
    title: "Pain & Discomfort",
    description:
      "Record pain or physical discomfort you are experiencing.",
    icon: "HeartPulse",

    symptoms: [
      {
        id: "lower_abdominal_pain",
        name: "Lower abdominal pain",
        description:
          "Pain or discomfort in the lower stomach area.",
      },
      {
        id: "pelvic_pain",
        name: "Pelvic pain",
        description:
          "Pain or pressure in the pelvic area.",
      },
      {
        id: "back_pain",
        name: "Lower back pain",
        description:
          "Pain or discomfort in the lower back.",
      },
      {
        id: "headache",
        name: "Headache",
        description:
          "Pain or pressure in the head.",
      },
      {
        id: "breast_tenderness",
        name: "Breast tenderness",
        description:
          "Tenderness or discomfort in the breasts.",
      },
    ],
  },

  {
    id: "skin_hair",
    title: "Skin & Hair",
    description:
      "Track visible changes related to skin and hair.",
    icon: "Sparkles",

    symptoms: [
      {
        id: "acne",
        name: "Acne or breakouts",
        description:
          "New or increased acne or skin breakouts.",
      },
      {
        id: "hair_fall",
        name: "Hair fall",
        description:
          "More hair shedding than usual.",
      },
      {
        id: "facial_hair",
        name: "Increased facial hair",
        description:
          "Increased hair growth on the face.",
      },
      {
        id: "oily_skin",
        name: "Oily skin",
        description:
          "Skin producing more oil than usual.",
      },
      {
        id: "dark_patches",
        name: "Dark skin patches",
        description:
          "Darkened areas of skin, especially around the neck or underarms.",
      },
    ],
  },

  {
    id: "mood_energy",
    title: "Mood & Energy",
    description:
      "Track emotional changes and your daily energy level.",
    icon: "Brain",

    symptoms: [
      {
        id: "mood_swings",
        name: "Mood swings",
        description:
          "Noticeable changes in mood or emotions.",
      },
      {
        id: "anxiety",
        name: "Feeling anxious",
        description:
          "Feeling worried, nervous, or restless.",
      },
      {
        id: "irritability",
        name: "Irritability",
        description:
          "Feeling more easily annoyed or frustrated.",
      },
      {
        id: "fatigue",
        name: "Fatigue or tiredness",
        description:
          "Feeling unusually tired or low in energy.",
      },
      {
        id: "sleep_changes",
        name: "Sleep changes",
        description:
          "Difficulty sleeping or changes in normal sleep patterns.",
      },
    ],
  },

  {
    id: "digestive",
    title: "Digestive Health",
    description:
      "Track digestive symptoms and discomfort.",
    icon: "Activity",

    symptoms: [
      {
        id: "bloating",
        name: "Bloating",
        description:
          "Feeling of fullness or swelling in the abdomen.",
      },
      {
        id: "nausea",
        name: "Nausea",
        description:
          "Feeling sick or like you may vomit.",
      },
      {
        id: "constipation",
        name: "Constipation",
        description:
          "Difficulty passing stools or less frequent bowel movements.",
      },
      {
        id: "appetite_changes",
        name: "Appetite changes",
        description:
          "Eating more or less than usual.",
      },
    ],
  },
];

/* ==========================================================
   SEVERITY OPTIONS
========================================================== */

export const severityOptions = [
  {
    value: 1,
    label: "Mild",
    description:
      "Noticeable but does not significantly affect your day.",
  },

  {
    value: 2,
    label: "Moderate",
    description:
      "Causes discomfort and affects some daily activities.",
  },

  {
    value: 3,
    label: "Severe",
    description:
      "Significantly affects your daily activities.",
  },
];

/* ==========================================================
   HELPER FUNCTION
========================================================== */

export const getSymptomById = (symptomId) => {
  for (const category of symptomCategories) {
    const symptom = category.symptoms.find(
      (item) => item.id === symptomId
    );

    if (symptom) {
      return {
        ...symptom,
        categoryId: category.id,
        categoryTitle: category.title,
      };
    }
  }

  return null;
};