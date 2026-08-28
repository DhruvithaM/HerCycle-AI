import {
  LayoutDashboard,
  CalendarDays,
  BrainCircuit,
  HeartPulse,
  Pill,
  Utensils,
  FileText,
  Bot,
  Users,
  Settings,
} from "lucide-react";

const sidebarMenu = [
  {
    id: "dashboard",
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "cycle-tracker",
    title: "Cycle Tracker",
    path: "/cycle-tracker",
    icon: CalendarDays,
  },
  {
    id: "ai-prediction",
    title: "AI Prediction",
    path: "/prediction",
    icon: BrainCircuit,
  },
  {
    id: "symptoms",
    title: "Symptoms",
    path: "/symptoms",
    icon: HeartPulse,
  },
  {
    id: "medicine-reminder",
    title: "Medicine Reminder",
    path: "/medicine-reminder",
    icon: Pill,
  },
  {
    id: "diet-nutrition",
    title: "Diet & Nutrition",
    path: "/diet-nutrition",
    icon: Utensils,
  },
  {
    id: "reports",
    title: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    path: "/ai-assistant",
    icon: Bot,
  },
  {
    id: "community",
    title: "Community",
    path: "/community",
    icon: Users,
  },
  {
    id: "settings",
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default sidebarMenu;