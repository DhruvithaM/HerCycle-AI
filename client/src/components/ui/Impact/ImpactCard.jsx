import { motion } from "framer-motion";

function ImpactCard({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      className="
        rounded-3xl
        border
        border-pink-100
        bg-white
        p-8
        text-center
        shadow-[0_20px_50px_rgba(236,72,153,.10)]
      "
    >
      <div
        className={`
          mx-auto
          mb-6
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          ${item.color}
          text-white
        `}
      >
        <Icon size={30} />
      </div>

      <h2 className="text-5xl font-black text-slate-900">
        {item.number}
      </h2>

      <p className="mt-3 text-slate-500">
        {item.title}
      </p>
    </motion.div>
  );
}

export default ImpactCard;