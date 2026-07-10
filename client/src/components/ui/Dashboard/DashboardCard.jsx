import { motion } from "framer-motion";

function DashboardCard({ card, index }) {
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      className="
        rounded-2xl
        border
        border-pink-100
        bg-white/90
        p-5
        shadow-[0_15px_35px_rgba(236,72,153,.08)]
        backdrop-blur-xl
        transition-all
      "
    >
      {/* Icon */}

      <div
        className={`
          mb-4
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
        <Icon size={28} />
      </div>

      {/* Title */}

      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {card.title}
      </h3>

      {/* Value */}

      <p className="mt-2 text-3xl font-black text-slate-900">
        {card.value}
      </p>

      {/* Progress */}

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-pink-100">

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "85%" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`h-full rounded-full bg-gradient-to-r ${card.color}`}
        />

      </div>
    </motion.div>
  );
}

export default DashboardCard;