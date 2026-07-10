import { motion } from "framer-motion";
import DashboardCard from "./DashboardCard";
import dashboardCards from "./dashboardData";
import {
  CalendarDays,
  TrendingUp,
  BrainCircuit,
} from "lucide-react";

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="
        rounded-[35px]
        border
        border-pink-100
        bg-white/90
        p-8
        shadow-[0_30px_80px_rgba(236,72,153,.12)]
        backdrop-blur-xl
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Health Dashboard
          </h2>

          <p className="text-slate-500">
            AI Powered Health Insights
          </p>

        </div>

        <div className="rounded-xl bg-pink-100 p-3 text-pink-600">

          <BrainCircuit size={26} />

        </div>

      </div>

      {/* Dashboard Cards */}

      <div className="grid gap-5 md:grid-cols-2">

        {dashboardCards.map((card, index) => (
          <DashboardCard
            key={card.id}
            card={card}
            index={index}
          />
        ))}

      </div>

      {/* Bottom Widgets */}

      <div className="mt-8 grid gap-5 lg:grid-cols-2">

        {/* Calendar */}

        <div className="rounded-2xl bg-pink-50 p-6">

          <div className="mb-4 flex items-center gap-3">

            <CalendarDays className="text-pink-500" />

            <h3 className="font-bold text-slate-800">
              Next Cycle
            </h3>

          </div>

          <p className="text-4xl font-black text-pink-600">
            5 Days
          </p>

          <p className="mt-2 text-slate-500">
            Predicted using AI
          </p>

        </div>

        {/* Monthly Progress */}

        <div className="rounded-2xl bg-purple-50 p-6">

          <div className="mb-4 flex items-center gap-3">

            <TrendingUp className="text-purple-600" />

            <h3 className="font-bold text-slate-800">
              Monthly Progress
            </h3>

          </div>

          {/* Fake Chart */}

          <div className="mt-5 flex h-24 items-end gap-2">

            <div className="h-10 w-5 rounded bg-pink-300"></div>
            <div className="h-16 w-5 rounded bg-pink-400"></div>
            <div className="h-14 w-5 rounded bg-pink-500"></div>
            <div className="h-20 w-5 rounded bg-purple-400"></div>
            <div className="h-12 w-5 rounded bg-purple-500"></div>
            <div className="h-24 w-5 rounded bg-pink-500"></div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}

export default DashboardMockup;