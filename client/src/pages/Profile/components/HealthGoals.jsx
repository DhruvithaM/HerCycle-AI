import { motion } from "framer-motion";
import {
  HeartPulse,
  Sparkles,
  ShieldCheck,
  Baby,
  Dumbbell,
} from "lucide-react";

function HealthGoals({ formData, setFormData }) {
  const goals = [
    {
      title: "Track My Cycle",
      icon: HeartPulse,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Improve Wellness",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Manage PCOS",
      icon: ShieldCheck,
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      title: "Pregnancy Planning",
      icon: Baby,
      color: "from-pink-500 to-violet-500",
    },
    {
      title: "Weight Management",
      icon: Dumbbell,
      color: "from-rose-500 to-purple-500",
    },
  ];

  const toggleGoal = (goal) => {
    const exists = formData.goals.includes(goal);

    if (exists) {
      setFormData((prev) => ({
        ...prev,
        goals: prev.goals.filter((g) => g !== goal),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        goals: [...prev.goals, goal],
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="
        mt-8
        rounded-[32px]
        border
        border-pink-100
        bg-white/80
        p-8
        shadow-[0_20px_60px_rgba(236,72,153,.08)]
        backdrop-blur-xl
      "
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Health Goals
        </h2>

        <p className="mt-2 text-slate-500">
          Select one or more goals so HerCycle AI can personalize your
          experience.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const selected = formData.goals.includes(goal.title);
          const Icon = goal.icon;

          return (
            <button
              key={goal.title}
              type="button"
              onClick={() => toggleGoal(goal.title)}
              className={`
                group
                rounded-3xl
                border-2
                p-6
                text-left
                transition-all
                duration-300

                ${
                  selected
                    ? "border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 shadow-xl scale-[1.02]"
                    : "border-pink-100 bg-white hover:border-pink-300 hover:-translate-y-1 hover:shadow-lg"
                }
              `}
            >
              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-r
                  ${goal.color}
                  text-white
                  shadow-lg
                `}
              >
                <Icon size={26} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {goal.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Personalized recommendations and AI insights based on
                this goal.
              </p>

              <div className="mt-5">
                <span
                  className={`
                    inline-flex
                    rounded-full
                    px-4
                    py-2
                    text-xs
                    font-semibold

                    ${
                      selected
                        ? "bg-pink-500 text-white"
                        : "bg-pink-50 text-pink-600"
                    }
                  `}
                >
                  {selected ? "Selected" : "Select"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-10 rounded-3xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 p-6 text-white">
        <h3 className="text-xl font-bold">
          AI Personalized Experience
        </h3>

        <p className="mt-3 leading-7 text-pink-100">
          Your selected goals help HerCycle AI generate smarter cycle
          predictions, wellness insights, nutrition suggestions, and
          health recommendations tailored specifically for you.
        </p>
      </div>
    </motion.div>
  );
}

export default HealthGoals;