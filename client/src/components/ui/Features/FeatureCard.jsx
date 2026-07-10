import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-pink-100
        bg-white/80
        p-8
        shadow-[0_15px_45px_rgba(236,72,153,.08)]
        backdrop-blur-xl
        transition-all
        duration-500
        hover:border-pink-300
        hover:shadow-[0_30px_60px_rgba(236,72,153,.18)]
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -right-16
        -top-16
        h-40
        w-40
        rounded-full
        bg-pink-100/40
        blur-3xl
        transition-all
        duration-500
        group-hover:scale-125
      "
      />

      {/* Icon */}

      <div
        className={`
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          ${feature.color}
          text-white
          shadow-lg
        `}
      >
        <Icon size={30} />
      </div>

      {/* Title */}

      <h3 className="mt-6 text-2xl font-bold text-slate-900">
        {feature.title}
      </h3>

      {/* Description */}

      <p className="mt-4 leading-8 text-slate-600">
        {feature.description}
      </p>

      {/* Bottom */}

      <div className="mt-8 flex items-center justify-between">

        <span className="text-sm font-semibold text-pink-500">
          Learn More
        </span>

        <div
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-pink-100
          text-pink-500
          transition
          group-hover:translate-x-1
          group-hover:-translate-y-1
        "
        >
          <ArrowUpRight size={18} />
        </div>

      </div>
    </motion.div>
  );
}

export default FeatureCard;