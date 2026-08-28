import {
  Calendar,
  Heart,
  Brain,
  Activity,
} from "lucide-react";

import { motion } from "framer-motion";

function StatisticsCards({ cycleData }) {
  if (!cycleData) return null;

  const cards = [
    {
      title: "Average Cycle",
      value: `${cycleData.averageCycleLength} Days`,
      icon: Calendar,
      color:
        "from-pink-500 to-pink-400",
    },
    {
      title: "Period Length",
      value: `${cycleData.averagePeriodLength} Days`,
      icon: Activity,
      color:
        "from-purple-500 to-violet-500",
    },
    {
      title: "AI Confidence",
      value: `${cycleData.confidence}%`,
      icon: Brain,
      color:
        "from-cyan-500 to-sky-500",
    },
    {
      title: "Cycle Health",
      value: cycleData.isIrregular
        ? "Irregular"
        : "Healthy",
      icon: Heart,
      color:
        "from-emerald-500 to-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-6">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (
          <motion.div
            key={index}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              col-span-12
              md:col-span-6
              xl:col-span-3
              rounded-[30px]
              border
              border-pink-100
              bg-white
              p-6
              shadow-[0_20px_45px_rgba(236,72,153,.08)]
            "
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-black text-slate-900">
                  {card.value}
                </h2>

              </div>

              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  ${card.color}
                  text-white
                `}
              >
                <Icon size={24} />
              </div>

            </div>

          </motion.div>
        );

      })}

    </div>
  );
}

export default StatisticsCards;