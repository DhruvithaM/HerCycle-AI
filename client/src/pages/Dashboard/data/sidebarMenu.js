import {
  LayoutDashboard,
  CalendarDays,
  BrainCircuit,
  HeartPulse,
  Pill,
  Apple,
  FileText,
  MessageCircle,
  Users,
  Settings,
} from "lucide-react";

const sidebarMenu = [
  {
    id: 1,
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Cycle Tracker",
    icon: CalendarDays,
    path: "/cycle-tracker",
  },
  {
    id: 3,
    title: "AI Prediction",
    icon: BrainCircuit,
    path: "/prediction",
  },
  {
    id: 4,
    title: "Symptoms",
    icon: HeartPulse,
    path: "/symptoms",
  },
  {
    id: 5,
    title: "Medicine Reminder",
    icon: Pill,
    path: "/medicine",
  },
  {
    id: 6,
    title: "Diet & Nutrition",
    icon: Apple,
    path: "/diet",
  },
  {
    id: 7,
    title: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    id: 8,
    title: "AI Assistant",
    icon: MessageCircle,
    path: "/chatbot",
  },
  {
    id: 9,
    title: "Community",
    icon: Users,
    path: "/community",
  },
  {
    id: 10,
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default sidebarMenu;