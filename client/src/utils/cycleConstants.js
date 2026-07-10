/* ==========================================================
   HerCycle AI
   Cycle Constants
========================================================== */

/* ==========================================================
   Default Values
========================================================== */

export const DEFAULT_CYCLE_LENGTH = 28;

export const DEFAULT_PERIOD_LENGTH = 5;

export const MIN_CYCLE_LENGTH = 21;

export const MAX_CYCLE_LENGTH = 45;

export const MIN_PERIOD_LENGTH = 2;

export const MAX_PERIOD_LENGTH = 10;

/* ==========================================================
   Cycle Phases
========================================================== */

export const CYCLE_PHASES = {

  MENSTRUAL: "Menstrual",

  FOLLICULAR: "Follicular",

  OVULATION: "Ovulation",

  LUTEAL: "Luteal",

};

/* ==========================================================
   Ovulation Rule
========================================================== */

// Ovulation generally occurs
// 14 days before the next period.

export const OVULATION_OFFSET = 14;

/* ==========================================================
   Fertile Window
========================================================== */

export const FERTILE_WINDOW_BEFORE = 5;

export const FERTILE_WINDOW_AFTER = 1;

/* ==========================================================
   AI Confidence
========================================================== */

export const CONFIDENCE = {

  LOW: 60,

  MEDIUM: 75,

  HIGH: 90,

};

/* ==========================================================
   Delay Detection
========================================================== */

export const DELAY_THRESHOLD = 0;

/* ==========================================================
   Calendar Priority
========================================================== */

export const CALENDAR_PRIORITY = {

  RECORDED_PERIOD: 5,

  OVULATION: 4,

  FERTILE: 3,

  PREDICTED_PERIOD: 2,

  TODAY: 1,

};

/* ==========================================================
   Health Status
========================================================== */

export const HEALTH_STATUS = {

  NORMAL: "Normal",

  DELAYED: "Delayed",

  IRREGULAR: "Irregular",

};

/* ==========================================================
   Reminder Types
========================================================== */

export const REMINDERS = {

  START_PERIOD: "START_PERIOD",

  END_PERIOD: "END_PERIOD",

  OVULATION: "OVULATION",

  FERTILE: "FERTILE",

  MEDICINE: "MEDICINE",

};

/* ==========================================================
   Symptoms
========================================================== */

export const COMMON_SYMPTOMS = [

  "Cramps",

  "Back Pain",

  "Headache",

  "Fatigue",

  "Bloating",

  "Mood Swings",

  "Acne",

  "Tender Breasts",

];

/* ==========================================================
   Flow Levels
========================================================== */

export const FLOW_LEVELS = [

  "Light",

  "Medium",

  "Heavy",

];

/* ==========================================================
   Mood Options
========================================================== */

export const MOODS = [

  "Happy",

  "Calm",

  "Neutral",

  "Anxious",

  "Sad",

  "Irritated",

];