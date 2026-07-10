import { motion, AnimatePresence } from "framer-motion";

import {
  Laugh,
  Smile,
  Meh,
  Frown,
  Angry,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import useMood from "../../../../hooks/useMood";

const moods = [
  {
    id: 1,
    label: "Great",
    icon: Laugh,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
    insight:
      "Amazing! Keep your healthy routine going today.",
  },

  {
    id: 2,
    label: "Good",
    icon: Smile,
    color: "text-pink-500",
    bg: "bg-pink-100",
    insight:
      "You're doing well. Stay hydrated and enjoy your day.",
  },

  {
    id: 3,
    label: "Okay",
    icon: Meh,
    color: "text-orange-500",
    bg: "bg-orange-100",
    insight:
      "A balanced day. Remember to take small breaks and relax.",
  },

  {
    id: 4,
    label: "Low",
    icon: Frown,
    color: "text-amber-500",
    bg: "bg-amber-100",
    insight:
      "Take things slowly today. Rest and nourishing meals may help.",
  },

  {
    id: 5,
    label: "Awful",
    icon: Angry,
    color: "text-red-500",
    bg: "bg-red-100",
    insight:
      "Be kind to yourself today. Rest, hydrate and don't hesitate to slow down.",
  },
];

function MoodTracker({ cycleData }) {

  const {
    mood,
    loading,
    updateMood,
  } = useMood();

  const selectedMood =
    moods.find(
      (item) =>
        item.label === mood?.mood
    ) || moods[1];

  const Icon =
    selectedMood.icon;

  const handleMoodClick = async (
    moodItem
  ) => {
    await updateMood(
      moodItem.label,
      cycleData
    );
  };

  if (loading) {
    return (
      <div
        className="
          flex
          h-full
          items-center
          justify-center
          rounded-[30px]
          border
          border-pink-100
          bg-white
          p-6
          shadow-[0_15px_40px_rgba(236,72,153,.08)]
        "
      >
        <p className="text-slate-500">
          Loading mood...
        </p>
      </div>
    );
  }

  return (
        <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        relative
        w-full
        overflow-hidden
        rounded-[30px]
        border
        border-pink-100
        bg-white
        p-6
        shadow-[0_15px_40px_rgba(236,72,153,.08)]
      "
    >
      {/* Background Glow */}

      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-pink-100/40 blur-3xl"></div>

      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-purple-100/30 blur-3xl"></div>

      {/* Header */}

      <div className="relative z-10">

        <h2 className="text-[24px] font-bold leading-tight text-slate-900">
          How are you feeling today?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Track your mood to help HerCycle AI personalize recommendations.
        </p>

      </div>

      {/* Mood Grid */}

      <div className="relative z-10 mt-8">

        <div className="mx-auto max-w-[280px]">

          <div className="grid grid-cols-3 gap-3">

            {moods.map((moodItem) => {

              const MoodIcon = moodItem.icon;

              const active =
                selectedMood.label ===
                moodItem.label;

              return (

                <motion.button
                  key={moodItem.id}
                  whileHover={{
                    y: -3,
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() =>
                    handleMoodClick(moodItem)
                  }
                  className={`
                    flex
                    flex-col
                    items-center
                    rounded-2xl
                    px-2
                    py-3
                    transition-all
                    duration-300

                    ${
                      active
                        ? "bg-gradient-to-br from-pink-500 to-purple-500 shadow-xl"
                        : "bg-white hover:bg-pink-50"
                    }
                  `}
                >

                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      transition-all
                      duration-300

                      ${
                        active
                          ? "bg-white/20"
                          : moodItem.bg
                      }
                    `}
                  >

                    <MoodIcon
                      size={22}
                      className={
                        active
                          ? "text-white"
                          : moodItem.color
                      }
                    />

                  </div>

                  <span
                    className={`
                      mt-2
                      text-xs
                      font-semibold

                      ${
                        active
                          ? "text-white"
                          : "text-slate-700"
                      }
                    `}
                  >
                    {moodItem.label}
                  </span>

                </motion.button>

              );

            })}

          </div>

        </div>

      </div>

      {/* Selected Mood */}
            <AnimatePresence mode="wait">

        <motion.div
          key={selectedMood.id}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -15,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            relative
            z-10
            mt-7
            rounded-3xl
            border
            border-pink-100
            bg-gradient-to-br
            from-pink-50
            via-white
            to-purple-50
            p-5
          "
        >

          {/* Top */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div
                className={`
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  ${selectedMood.bg}
                `}
              >

                <Icon
                  size={22}
                  className={selectedMood.color}
                />

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Today's Mood
                </p>

                <h3 className="text-xl font-bold text-slate-900">
                  {selectedMood.label}
                </h3>

              </div>

            </div>

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-green-100
                px-3
                py-1
              "
            >

              <CheckCircle2
                size={16}
                className="text-green-600"
              />

              <span className="text-xs font-semibold text-green-700">
                Saved
              </span>

            </div>

          </div>

          {/* Divider */}

          <div className="my-5 h-px bg-pink-100"></div>

          {/* AI Insight */}

          <div className="flex items-start gap-3">

            <div
              className="
                mt-1
                rounded-xl
                bg-pink-100
                p-2
              "
            >

              <Sparkles
                size={18}
                className="text-pink-500"
              />

            </div>

            <div className="flex-1">

              <h4 className="font-semibold text-slate-800">
                AI Insight
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {selectedMood.insight}
              </p>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-5 flex items-center justify-between border-t border-pink-100 pt-4">

            <span className="text-xs text-slate-500">
              Personalized from today's mood
            </span>

            <span className="text-xs font-semibold text-pink-500">
              {cycleData?.currentPhase || "Cycle"}
            </span>

          </div>

        </motion.div>

      </AnimatePresence>

    </motion.div>
  );
}

export default MoodTracker;