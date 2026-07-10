import {
  HeartPulse,
  Droplets,
  Scale,
  NotebookPen,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Log Symptoms",
    icon: HeartPulse,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Track Water",
    icon: Droplets,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Track Weight",
    icon: Scale,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Daily Notes",
    icon: NotebookPen,
    color: "from-orange-500 to-yellow-500",
  },
];

function QuickActions() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        w-full
        h-full
        flex
        flex-col
        rounded-[30px]
        border
        border-pink-100
        bg-white
        p-6
        shadow-[0_15px_40px_rgba(236,72,153,.08)]
      "
    >
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Access your daily health tools.
        </p>
      </div>

      {/* Actions */}

      <div className="mt-6 grid grid-cols-2 gap-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="
                flex
                h-[120px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-pink-100
                bg-pink-50/40
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
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
                  ${action.color}
                  text-white
                `}
              >
                <Icon size={24} />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-700 text-center">
                {action.title}
              </p>
            </button>
          );
        })}

      </div>

      {/* Button */}

      <div className="mt-auto pt-6">
        <button
          className="
            flex
            h-14
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-pink-500
            to-purple-600
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-[1.02]
          "
        >
          <Sparkles size={18} />
          AI Health Check
        </button>
      </div>
    </motion.div>
  );
}

export default QuickActions;