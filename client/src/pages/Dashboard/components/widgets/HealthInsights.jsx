import { motion } from "framer-motion";

import {
  Moon,
  Droplets,
  Footprints,
  Heart,
  ChevronDown,
} from "lucide-react";

function HealthInsights({
  profile,
  cycleData,
}) {
  const firstName =
    profile?.fullName?.split(" ")[0] ||
    "Your";

  const phase =
    cycleData?.currentPhase || "";

  let stats = [];

  // ==========================
  // MENSTRUAL
  // ==========================

  if (phase === "Menstrual") {
    stats = [
      {
        title: "Energy Level",
        value: "Low",
        status: "Rest Today",
        icon: Moon,
        iconBg: "bg-pink-100",
        iconColor: "text-pink-600",
        statusColor: "text-pink-500",
      },
      {
        title: "Hydration",
        value: "2.5L",
        status: "High Priority",
        icon: Droplets,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        statusColor: "text-blue-500",
      },
      {
        title: "Exercise",
        value: "Light Yoga",
        status: "Recommended",
        icon: Footprints,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        statusColor: "text-purple-500",
      },
      {
        title: "Nutrition",
        value: "Iron Rich",
        status: "Eat Greens",
        icon: Heart,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        statusColor: "text-red-500",
      },
    ];
  }

  // ==========================
  // FOLLICULAR
  // ==========================

  else if (phase === "Follicular") {
    stats = [
      {
        title: "Energy",
        value: "High",
        status: "Excellent",
        icon: Moon,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        statusColor: "text-green-500",
      },
      {
        title: "Hydration",
        value: "2L",
        status: "Maintain",
        icon: Droplets,
        iconBg: "bg-cyan-100",
        iconColor: "text-cyan-600",
        statusColor: "text-cyan-500",
      },
      {
        title: "Workout",
        value: "Strength",
        status: "Best Time",
        icon: Footprints,
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-600",
        statusColor: "text-indigo-500",
      },
      {
        title: "Nutrition",
        value: "Protein",
        status: "Recommended",
        icon: Heart,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        statusColor: "text-emerald-500",
      },
    ];
  }

  // ==========================
  // OVULATION
  // ==========================

  else if (phase === "Ovulation") {
    stats = [
      {
        title: "Fertility",
        value: "Peak",
        status: "Highest",
        icon: Heart,
        iconBg: "bg-pink-100",
        iconColor: "text-pink-600",
        statusColor: "text-pink-500",
      },
      {
        title: "Hydration",
        value: "3L",
        status: "Important",
        icon: Droplets,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        statusColor: "text-blue-500",
      },
      {
        title: "Workout",
        value: "Intense",
        status: "Go For It",
        icon: Footprints,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        statusColor: "text-purple-500",
      },
      {
        title: "Nutrition",
        value: "Antioxidants",
        status: "Healthy",
        icon: Moon,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        statusColor: "text-orange-500",
      },
    ];
  }

  // ==========================
  // LUTEAL
  // ==========================

  else if (phase === "Luteal") {
    stats = [
      {
        title: "Mood",
        value: "Sensitive",
        status: "Take Rest",
        icon: Heart,
        iconBg: "bg-pink-100",
        iconColor: "text-pink-600",
        statusColor: "text-pink-500",
      },
      {
        title: "Sleep",
        value: "8 Hours",
        status: "Priority",
        icon: Moon,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        statusColor: "text-purple-500",
      },
      {
        title: "Nutrition",
        value: "Magnesium",
        status: "Recommended",
        icon: Droplets,
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-600",
        statusColor: "text-indigo-500",
      },
      {
        title: "Exercise",
        value: "Walking",
        status: "Light",
        icon: Footprints,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        statusColor: "text-green-500",
      },
    ];
  }

  else {
    stats = [
      {
        title: "Complete Profile",
        value: "--",
        status: "Required",
        icon: Heart,
        iconBg: "bg-pink-100",
        iconColor: "text-pink-600",
        statusColor: "text-pink-500",
      },
    ];
  }

  return (    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        w-full
        min-h-[340px]
        rounded-[30px]
        border
        border-pink-100
        bg-white
        p-7
        shadow-[0_15px_40px_rgba(236,72,153,.08)]
      "
    >
      {/* ================= Header ================= */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-[34px] font-bold text-slate-900">
            {firstName}'s Health Insights
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Personalized recommendations based on your current{" "}
            <span className="font-semibold text-pink-500">
              {phase}
            </span>{" "}
            phase.
          </p>

        </div>

        <div className="flex items-center gap-4">

          <button
            className="
              text-sm
              font-semibold
              text-pink-500
              transition
              hover:translate-x-1
            "
          >
            View Report →
          </button>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-pink-50
              px-4
              py-2
              text-sm
              font-medium
              text-slate-600
              transition
              hover:bg-pink-100
            "
          >
            Today

            <ChevronDown size={16} />

          </button>

        </div>

      </div>

      {/* ================= Cards ================= */}

      <div className="mt-6 grid grid-cols-4 gap-4">

        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              whileHover={{
                y: -4,
                scale: 1.03,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                h-[150px]
                rounded-3xl
                border
                border-pink-100
                bg-white
                px-5
                py-5
                shadow-sm
                transition-all
                duration-300
                hover:shadow-xl
              "
            >

              <div
                className={`
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  ${item.iconBg}
                `}
              >

                <Icon
                  size={22}
                  className={item.iconColor}
                />

              </div>

              <p className="mt-4 text-sm text-slate-500">
                {item.title}
              </p>

              <h3 className="mt-2 text-[24px] font-bold text-slate-900">
                {item.value}
              </h3>

              <p
                className={`
                  mt-2
                  text-sm
                  font-semibold
                  ${item.statusColor}
                `}
              >
                {item.status}
              </p>

            </motion.div>

          );

        })}

      </div>

      {/* ================= Bottom Info ================= */}

      <div className="mt-6 rounded-2xl bg-pink-50 px-5 py-4">

        <p className="text-sm text-slate-600">
          ✨ Your health insights update automatically based on your cycle,
          symptoms, mood, hydration, and activity. Continue logging your
          health data for more personalized AI recommendations.
        </p>

      </div>

    </motion.div>
  );
}

export default HealthInsights;