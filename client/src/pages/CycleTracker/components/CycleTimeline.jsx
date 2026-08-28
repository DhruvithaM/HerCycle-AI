import { motion } from "framer-motion";
import {
  Droplets,
  Leaf,
  Egg,
  MoonStar,
} from "lucide-react";

const phaseTips = {
  Menstrual: {
    title: "Menstrual Phase",
    description:
      "Your body is shedding the uterine lining. Prioritize rest, hydration and iron-rich foods.",
  },

  Follicular: {
    title: "Follicular Phase",
    description:
      "Energy levels usually rise during this phase. Great time for workouts and protein-rich meals.",
  },

  Ovulation: {
    title: "Ovulation Phase",
    description:
      "This is your most fertile period. Stay hydrated and pay attention to your body's signals.",
  },

  Luteal: {
    title: "Luteal Phase",
    description:
      "Your body is preparing for the next cycle. Magnesium-rich foods and quality sleep may help reduce PMS symptoms.",
  },
};

const phases = [
  {
    key: "Menstrual",
    icon: Droplets,
    color: "bg-pink-500",
  },
  {
    key: "Follicular",
    icon: Leaf,
    color: "bg-sky-500",
  },
  {
    key: "Ovulation",
    icon: Egg,
    color: "bg-emerald-500",
  },
  {
    key: "Luteal",
    icon: MoonStar,
    color: "bg-purple-500",
  },
];

function CycleTimeline({ cycleData }) {
  const progress = cycleData?.progress || 0;

  const currentPhase =
    cycleData?.currentPhase || "Follicular";

  const currentTip =
    phaseTips[currentPhase];

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="
        mt-8
        rounded-[32px]
        border
        border-pink-100
        bg-white
        p-8
        shadow-sm
      "
    >
      {/* Heading */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Your Cycle Journey
          </h2>

          <p className="mt-2 text-slate-500">
            Track where you are in your menstrual cycle.
          </p>

        </div>

        <div
          className="
            rounded-full
            bg-pink-100
            px-4
            py-2
            text-sm
            font-semibold
            text-pink-600
          "
        >
          Day {cycleData?.cycleDay}
        </div>

      </div>

      {/* Timeline */}

      <div className="mt-10">

        <div className="relative">

          {/* Background Line */}

          <div className="absolute top-6 left-0 h-1 w-full rounded-full bg-pink-100" />

          {/* Progress */}

          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 1.2,
            }}
            className="
              absolute
              top-6
              left-0
              h-1
              rounded-full
              bg-gradient-to-r
              from-pink-500
              to-purple-500
            "
          />

          {/* Phases */}

          <div className="relative flex justify-between">

            {phases.map((phase) => {

              const Icon = phase.icon;

              const active =
                currentPhase === phase.key;

              return (

                <div
                  key={phase.key}
                  className="flex flex-col items-center"
                >

                  <motion.div
                    animate={
                      active
                        ? {
                            scale: [1, 1.15, 1],
                          }
                        : {}
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                    className={`
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      text-white
                      shadow-lg

                      ${phase.color}

                      ${
                        active
                          ? "ring-4 ring-pink-200"
                          : ""
                      }
                    `}
                  >
                    <Icon size={22} />
                  </motion.div>

                  <h3
                    className={`
                      mt-4
                      text-sm
                      font-semibold

                      ${
                        active
                          ? "text-pink-600"
                          : "text-slate-500"
                      }
                    `}
                  >
                    {phase.key}
                  </h3>

                </div>

              );

            })}

          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-12">

        <div className="flex justify-between">

          <span className="font-medium text-slate-600">
            Cycle Progress
          </span>

          <span className="font-bold text-pink-600">
            {progress}%
          </span>

        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-pink-100">

          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 1.2,
            }}
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-pink-500
              to-purple-500
            "
          />

        </div>

      </div>

      {/* AI Tip */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.4,
        }}
        className="
          mt-10
          rounded-3xl
          bg-gradient-to-r
          from-pink-50
          to-purple-50
          p-6
        "
      >

        <h3 className="text-lg font-bold text-slate-800">
          {currentTip.title}
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          {currentTip.description}
        </p>

      </motion.div>

    </motion.section>
  );
}

export default CycleTimeline;