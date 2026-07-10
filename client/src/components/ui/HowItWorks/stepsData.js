import {
  ClipboardPen,
  BrainCircuit,
  BadgeCheck,
  Salad,
  Activity,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: ClipboardPen,
    title: "Enter Symptoms",
    description:
      "Provide your symptoms, menstrual history, lifestyle habits, and health details through a simple questionnaire.",
    color: "from-pink-500 to-rose-500",
  },

  {
    id: 2,
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "Our machine learning model securely analyzes your health information using intelligent prediction algorithms.",
    color: "from-purple-500 to-fuchsia-500",
  },

  {
    id: 3,
    icon: BadgeCheck,
    title: "Prediction Result",
    description:
      "Receive your PCOD risk assessment instantly along with a confidence score and personalized insights.",
    color: "from-cyan-500 to-blue-500",
  },

  {
    id: 4,
    icon: Salad,
    title: "Diet & Lifestyle",
    description:
      "Get customized meal plans, exercise routines, hydration reminders, and healthy lifestyle recommendations.",
    color: "from-green-500 to-emerald-500",
  },

  {
    id: 5,
    icon: Activity,
    title: "Track Progress",
    description:
      "Monitor your health journey through dashboards, cycle tracking, reports, and AI-powered insights.",
    color: "from-orange-500 to-pink-500",
  },
];

export default steps;