import {
  HeartPulse,
  Droplets,
  Moon,
  CalendarDays,
  BrainCircuit,
  Activity,
} from "lucide-react";

const dashboardCards = [
  {
    id: 1,
    icon: HeartPulse,
    title: "Health Score",
    value: "92%",
    color: "from-pink-500 to-rose-500",
  },

  {
    id: 2,
    icon: Droplets,
    title: "Water Intake",
    value: "2.0 / 2.5 L",
    color: "from-cyan-500 to-blue-500",
  },

  {
    id: 3,
    icon: Moon,
    title: "Sleep",
    value: "7.5 Hours",
    color: "from-indigo-500 to-violet-500",
  },

  {
    id: 4,
    icon: CalendarDays,
    title: "Next Cycle",
    value: "5 Days",
    color: "from-pink-500 to-fuchsia-500",
  },

  {
    id: 5,
    icon: Activity,
    title: "BMI",
    value: "22.4",
    color: "from-green-500 to-emerald-500",
  },

  {
    id: 6,
    icon: BrainCircuit,
    title: "AI Insights",
    value: "Healthy",
    color: "from-purple-500 to-fuchsia-500",
  },
];

export default dashboardCards;