import { motion } from "framer-motion";
import { BrainCircuit, ShieldCheck } from "lucide-react";

function PredictionCard({ prediction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="
        rounded-3xl
        border
        border-pink-100
        bg-white/90
        p-8
        backdrop-blur-xl
        shadow-[0_20px_55px_rgba(236,72,153,.12)]
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white">

          <BrainCircuit size={26} />

        </div>

        <div>

          <h3 className="text-xl font-bold text-slate-900">
            AI Prediction
          </h3>

          <p className="text-sm text-slate-500">
            Machine Learning Analysis
          </p>

        </div>

      </div>

      {/* Gauge */}

      <div className="mt-10 flex justify-center">

        <div className="relative flex h-44 w-44 items-center justify-center">

          {/* Outer Circle */}

          <div className="absolute h-44 w-44 rounded-full border-[14px] border-pink-100" />

          {/* Progress */}

          <motion.div
            initial={{ rotate: -90 }}
            animate={{ rotate: 240 }}
            transition={{ duration: 1.8 }}
            className="
              absolute
              h-44
              w-44
              rounded-full
              border-[14px]
              border-transparent
              border-t-pink-500
              border-r-purple-600
            "
          />

          {/* Center */}

          <div className="text-center">

            <h2 className="text-5xl font-black text-green-600">
              {prediction.risk}
            </h2>

            <p className="mt-2 text-slate-500">
              PCOD Risk
            </p>

          </div>

        </div>

      </div>

      {/* Confidence */}

      <div className="mt-10 rounded-2xl bg-pink-50 p-5">

        <div className="mb-3 flex items-center justify-between">

          <span className="font-semibold text-slate-700">
            Confidence
          </span>

          <span className="font-bold text-pink-600">
            {prediction.confidence}
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-pink-100">

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: prediction.confidence }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
          />

        </div>

      </div>

      {/* Description */}

      <div className="mt-8 flex gap-3 rounded-2xl bg-green-50 p-5">

        <ShieldCheck className="mt-1 text-green-600" />

        <p className="leading-7 text-slate-600">
          {prediction.description}
        </p>

      </div>

    </motion.div>
  );
}

export default PredictionCard;