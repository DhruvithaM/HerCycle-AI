import { motion } from "framer-motion";

function FloatingBadge({
  icon,
  title,
  subtitle,
  className = "",
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.05,
        y: -12,
      }}
      className={`
        absolute
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-pink-100
        bg-white/95
        px-5
        py-4
        shadow-[0_18px_40px_rgba(236,72,153,.18)]
        backdrop-blur-xl
        transition-all
        ${className}
      `}
    >
      {/* Icon */}

      <div
        className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        bg-gradient-to-br
        from-pink-100
        to-pink-200
        text-pink-600
      "
      >
        {icon}
      </div>

      {/* Text */}

      <div>

        <h4 className="text-sm font-bold text-slate-800">

          {title}

        </h4>

        <p className="text-xs text-slate-500">

          {subtitle}

        </p>

      </div>

    </motion.div>
  );
}

export default FloatingBadge;