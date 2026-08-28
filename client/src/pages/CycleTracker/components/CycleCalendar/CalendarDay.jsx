import { motion } from "framer-motion";
import {
  Flower2,
  Egg,
  Heart,
  Sparkles,
} from "lucide-react";

function CalendarDay({
  item,
  selectedDay,
  setSelectedDay,
}) {
  const isSelected =
    selectedDay?.date?.toDateString() ===
    item?.date?.toDateString();

  let bg =
    "bg-white border border-transparent text-slate-700";

  let Icon = null;

  // Recorded Period
  if (item.isPeriod) {
    bg =
      "bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-200";

    Icon = Flower2;
  }

  // Predicted Period
  else if (item.isPredictedPeriod) {
    bg =
      "bg-white border-2 border-pink-500 text-pink-600";

    Icon = Flower2;
  }

  // Ovulation
  else if (item.isOvulation) {
    bg =
      "bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-200";

    Icon = Egg;
  }

  // Fertile
  else if (item.isFertile) {
    bg =
      "bg-gradient-to-br from-green-100 to-green-200 text-green-700";

    Icon = Heart;
  }

  // Today
  else if (item.isToday) {
    bg =
      "bg-blue-50 border border-blue-200 text-blue-600";

    Icon = Sparkles;
  }

  if (isSelected) {
    bg +=
      " ring-4 ring-pink-300 scale-105";
  }

  return (
    <motion.button
      whileHover={{
        y: -6,
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.96,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      onClick={() => setSelectedDay(item)}
      className={`
        relative
        mx-auto
        flex
        h-16
        w-16
        flex-col
        items-center
        justify-center
        rounded-2xl
        transition-all
        duration-300
        ${bg}
      `}
    >
      {/* Day */}

      <span className="text-base font-bold">
        {item.day}
      </span>

      {/* Icon */}

      {Icon && (
        <Icon
          size={12}
          className="mt-1 opacity-90"
        />
      )}

      {/* Today Dot */}

      {item.isToday && (
        <span
          className="
            absolute
            -top-1
            -right-1
            h-3
            w-3
            rounded-full
            bg-blue-500
            ring-2
            ring-white
          "
        />
      )}
    </motion.button>
  );
}

export default CalendarDay;