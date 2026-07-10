import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import DashboardMockup from "./DashboardMockup";

function Dashboard() {
  return (
    <section
      id="dashboard"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-white
        via-[#fff8fb]
        to-[#fff2f8]
        py-32
      "
    >
      {/* Background Glow */}

      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-pink-200/25 blur-[180px]" />

      <div className="absolute -right-52 bottom-0 h-[650px] w-[650px] rounded-full bg-pink-300/20 blur-[200px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            📊 Smart Dashboard
          </span>

          <h2 className="mt-6 text-5xl font-black leading-tight text-slate-900">
            Monitor Every Aspect of
            <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Your Health Journey
            </span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Access your personalized dashboard to monitor health score,
            cycle prediction, AI insights, sleep, hydration,
            BMI and wellness reports—all in one place.
          </p>

          {/* Highlights */}

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-pink-500"></div>
              <p className="text-slate-700">Real-time Health Monitoring</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
              <p className="text-slate-700">AI-Based Health Insights</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-cyan-500"></div>
              <p className="text-slate-700">Personalized Wellness Reports</p>
            </div>

          </div>

          {/* Button */}

          <button
            className="
              mt-10
              flex
              items-center
              gap-3
              rounded-full
              bg-gradient-to-r
              from-pink-500
              to-purple-600
              px-8
              py-4
              font-semibold
              text-white
              shadow-[0_20px_35px_rgba(236,72,153,.30)]
              transition
              hover:-translate-y-1
            "
          >
            Explore Dashboard

            <ArrowRight size={20} />

          </button>

        </motion.div>

        {/* RIGHT */}

        <DashboardMockup />

      </div>

    </section>
  );
}

export default Dashboard;