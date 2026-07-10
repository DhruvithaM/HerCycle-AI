import {
  Pill,
  Footprints,
  Bell,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";

import menstrualImage from "../../../../assets/illustrations/menstrual.png";
import follicularImage from "../../../../assets/illustrations/follicular.png";
import ovulationImage from "../../../../assets/illustrations/ovulation.png";
import lutealImage from "../../../../assets/illustrations/luteal.png";

function ReminderCard({ cycleData }) {
  const phase =
    cycleData?.currentPhase || "";

  let reminders = [];

  let aiTip =
    "Complete your profile to receive personalized AI health tips.";

  let illustration =
    menstrualImage;

  // ==========================
  // MENSTRUAL
  // ==========================

  if (phase === "Menstrual") {
    reminders = [
      {
        title:
          "Change Sanitary Product",

        time:
          "Every 4-6 Hours",

        status:
          "Important",

        icon: Bell,

        iconColor:
          "text-red-600",

        iconBg:
          "bg-red-100",

        badge:
          "bg-red-100 text-red-600",
      },

      {
        title:
          "Drink Plenty of Water",

        time:
          "2.5-3 Litres Today",

        status:
          "Active",

        icon: Bell,

        iconColor:
          "text-cyan-600",

        iconBg:
          "bg-cyan-100",

        badge:
          "bg-cyan-100 text-cyan-600",
      },

      {
        title:
          "Iron Rich Foods",

        time:
          "Lunch & Dinner",

        status:
          "Today",

        icon: Pill,

        iconColor:
          "text-green-600",

        iconBg:
          "bg-green-100",

        badge:
          "bg-green-100 text-green-700",
      },
    ];

    aiTip =
      "Your body is shedding the uterine lining. Prioritize rest, hydration and iron-rich foods to replenish nutrients.";

    illustration =
      menstrualImage;
  }

  // ==========================
  // FOLLICULAR
  // ==========================

  else if (
    phase === "Follicular"
  ) {
    reminders = [
      {
        title:
          "30 Minute Workout",

        time:
          "Today",

        status:
          "Today",

        icon: Footprints,

        iconColor:
          "text-blue-600",

        iconBg:
          "bg-blue-100",

        badge:
          "bg-blue-100 text-blue-600",
      },

      {
        title:
          "High Protein Meals",

        time:
          "Breakfast & Lunch",

        status:
          "Healthy",

        icon: Pill,

        iconColor:
          "text-green-600",

        iconBg:
          "bg-green-100",

        badge:
          "bg-green-100 text-green-700",
      },

      {
        title:
          "Drink Water",

        time:
          "Every 2 Hours",

        status:
          "Active",

        icon: Bell,

        iconColor:
          "text-cyan-600",

        iconBg:
          "bg-cyan-100",

        badge:
          "bg-cyan-100 text-cyan-600",
      },
    ];

    aiTip =
      "Energy levels are rising. This is an excellent time for exercise, learning, creativity and protein-rich meals.";

    illustration =
      follicularImage;
  }

  // ==========================
  // OVULATION
  // ==========================

  else if (
    phase === "Ovulation"
  ) {
    reminders = [
      {
        title:
          "Peak Fertility Today",

        time:
          "Cycle Peak",

        status:
          "Important",

        icon: Bell,

        iconColor:
          "text-pink-600",

        iconBg:
          "bg-pink-100",

        badge:
          "bg-pink-100 text-pink-600",
      },

      {
        title:
          "Stay Hydrated",

        time:
          "3 Litres Today",

        status:
          "Today",

        icon: Bell,

        iconColor:
          "text-cyan-600",

        iconBg:
          "bg-cyan-100",

        badge:
          "bg-cyan-100 text-cyan-600",
      },

      {
        title:
          "Eat Antioxidant Foods",

        time:
          "Today's Meals",

        status:
          "Healthy",

        icon: Pill,

        iconColor:
          "text-green-600",

        iconBg:
          "bg-green-100",

        badge:
          "bg-green-100 text-green-700",
      },
    ];

    aiTip =
      "You're currently in your ovulation phase. Focus on hydration, antioxidant-rich foods and moderate exercise.";

    illustration =
      ovulationImage;
  }

  // ==========================
  // LUTEAL
  // ==========================

  else if (
    phase === "Luteal"
  ) {
    reminders = [
      {
        title:
          "Magnesium Rich Foods",

        time:
          "Dinner",

        status:
          "Healthy",

        icon: Pill,

        iconColor:
          "text-green-600",

        iconBg:
          "bg-green-100",

        badge:
          "bg-green-100 text-green-700",
      },

      {
        title:
          "Light Yoga",

        time:
          "Evening",

        status:
          "Today",

        icon: Footprints,

        iconColor:
          "text-blue-600",

        iconBg:
          "bg-blue-100",

        badge:
          "bg-blue-100 text-blue-600",
      },

      {
        title:
          "Sleep Early",

        time:
          "Before 10 PM",

        status:
          "Reminder",

        icon: Bell,

        iconColor:
          "text-purple-600",

        iconBg:
          "bg-purple-100",

        badge:
          "bg-purple-100 text-purple-700",
      },
    ];

    aiTip =
      "Progesterone is rising. Magnesium-rich foods, quality sleep and stress management may help reduce PMS symptoms.";

    illustration =
      lutealImage;
  }

  // ==========================
  // DEFAULT
  // ==========================

  else {
    reminders = [
      {
        title:
          "Complete Your Profile",

        time:
          "Required",

        status:
          "Pending",

        icon: Bell,

        iconColor:
          "text-pink-600",

        iconBg:
          "bg-pink-100",

        badge:
          "bg-pink-100 text-pink-600",
      },
    ];
  }

  return (
        <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="
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

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-900">
          Today's Reminders
        </h2>

        <button
          className="
            text-sm
            font-semibold
            text-pink-500
            hover:text-pink-600
          "
        >
          View All
        </button>

      </div>

      {/* Reminder List */}

      <div className="mt-6 space-y-4">

        {reminders.map((item) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              whileHover={{
                scale: 1.02,
              }}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-pink-100
                bg-white
                p-4
                transition
                hover:shadow-lg
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}
                >

                  <Icon
                    size={20}
                    className={item.iconColor}
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.time}
                  </p>

                </div>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${item.badge}`}
              >
                {item.status}
              </span>

            </motion.div>

          );

        })}

      </div>

      {/* AI Health Tip */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
        }}
        className="
          mt-6
          rounded-3xl
          bg-gradient-to-br
          from-pink-50
          via-white
          to-purple-50
          p-5
        "
      >

        <div className="flex items-center gap-2">

          <Sparkles
            size={18}
            className="text-pink-500"
          />

          <h3 className="font-bold text-slate-900">
            AI Health Tip For You
          </h3>

        </div>

        <div className="relative mt-4 min-h-[170px]">

          {/* Text */}

          <div className="w-[60%]">

            <p
              className="
                text-sm
                leading-7
                text-slate-600
              "
            >
              {aiTip}
            </p>

            <button
              className="
                mt-6
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-pink-500
                transition-all
                duration-300
                hover:translate-x-1
              "
            >

              Explore More

              <ArrowRight size={16} />

            </button>

          </div>

          {/* Dynamic Illustration */}

          <motion.img
            key={phase}
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.4,
            }}
            src={illustration}
            alt={phase}
            className="
              absolute
              bottom-0
              right-0
              h-40
              object-contain
              drop-shadow-xl
            "
          />

        </div>

      </motion.div>

    </motion.div>
  );
}

export default ReminderCard;