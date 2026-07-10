import { motion } from "framer-motion";

function StepCard({ step, index }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Vertical Line */}

      {index !== 4 && (
        <div className="absolute top-28 left-1/2 h-24 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-300 to-purple-300"></div>
      )}

      {/* Icon Circle */}

      <div
        className={`
          relative
          z-10
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          ${step.color}
          text-white
          shadow-[0_20px_40px_rgba(236,72,153,.25)]
        `}
      >
        <Icon size={34} />
      </div>

      {/* Card */}

      <div
        className="
          mt-8
          w-full
          rounded-3xl
          border
          border-pink-100
          bg-white/80
          p-7
          backdrop-blur-xl
          shadow-[0_15px_45px_rgba(236,72,153,.08)]
          transition-all
          duration-500
          hover:shadow-[0_25px_55px_rgba(236,72,153,.15)]
        "
      >
        {/* Step Number */}

        <div className="mb-4 inline-flex rounded-full bg-pink-100 px-4 py-1 text-sm font-semibold text-pink-600">
          Step {step.id}
        </div>

        <h3 className="text-2xl font-bold text-slate-900">
          {step.title}
        </h3>

        <p className="mt-4 leading-8 text-slate-600">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default StepCard;