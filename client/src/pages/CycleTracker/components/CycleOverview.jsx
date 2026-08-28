import { motion } from "framer-motion";
import {
  CalendarClock,
  Egg,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

import { formatShortDate } from "../../../utils/formatDate";

function CycleOverview({ cycleData }) {
  const cards = [
    {
      id: 1,
      title: "Next Period",
      value: formatShortDate(cycleData?.nextPeriodDate),
      subtitle: `${cycleData?.daysUntilNextPeriod ?? "--"} days remaining`,
      icon: CalendarClock,
      color: "from-pink-500 to-rose-400",
    },

    {
      id: 2,
      title: "Ovulation",
      value: formatShortDate(cycleData?.ovulationDate),
      subtitle: "Predicted Ovulation",
      icon: Egg,
      color: "from-purple-500 to-fuchsia-400",
    },

    {
      id: 3,
      title: "Fertility Window",
      value: `${formatShortDate(
        cycleData?.fertileStartDate
      )} - ${formatShortDate(cycleData?.fertileEndDate)}`,
      subtitle: "Highest chance of conception",
      icon: HeartPulse,
      color: "from-emerald-500 to-green-400",
    },

    {
      id: 4,
      title: "Cycle Health",
      value: cycleData?.isIrregular
        ? "Needs Attention"
        : "Healthy",
      subtitle: cycleData?.isDelayed
        ? `Delayed by ${cycleData?.delayedDays} day(s)`
        : "Cycle is on track",
      icon: ShieldCheck,
      color: "from-sky-500 to-cyan-400",
    },
  ];

  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
              }}
              className="
                rounded-3xl
                border
                border-pink-100
                bg-white
                p-6
                shadow-sm
                transition-all
                hover:shadow-xl
              "
            >
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
                <Icon size={26} />
              </div>

              <p className="mt-6 text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {card.value}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {card.subtitle}
              </p>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
}

export default CycleOverview;