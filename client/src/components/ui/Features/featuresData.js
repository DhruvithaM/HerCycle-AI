import {
  BrainCircuit,
  CalendarDays,
  Activity,
  Salad,
  BellRing,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: BrainCircuit,
    title: "AI Prediction",
    description:
      "Predict PCOD risk using advanced AI models with high accuracy for early detection.",
    color: "from-pink-500 to-rose-500",
  },

  {
    id: 2,
    icon: CalendarDays,
    title: "Cycle Tracker",
    description:
      "Track menstrual cycles, ovulation windows, and receive smart predictions effortlessly.",
    color: "from-purple-500 to-fuchsia-500",
  },

  {
    id: 3,
    icon: Activity,
    title: "Health Analytics",
    description:
      "Monitor symptoms, hormones, BMI, and wellness through interactive dashboards.",
    color: "from-cyan-500 to-blue-500",
  },

  {
    id: 4,
    icon: Salad,
    title: "Diet Planner",
    description:
      "Receive personalized meal plans and lifestyle recommendations powered by AI.",
    color: "from-green-500 to-emerald-500",
  },

  {
    id: 5,
    icon: BellRing,
    title: "Medicine Reminder",
    description:
      "Never miss medications, appointments, or important cycle notifications.",
    color: "from-orange-500 to-amber-500",
  },

  {
    id: 6,
    icon: ShieldCheck,
    title: "Privacy & Security",
    description:
      "Your healthcare data is encrypted, secure, and accessible only by you.",
    color: "from-indigo-500 to-violet-500",
  },
];

export default features;