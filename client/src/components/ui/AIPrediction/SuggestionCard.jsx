import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

function SuggestionCard({ suggestions }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
        rounded-3xl
        border
        border-pink-100
        bg-white/80
        p-8
        backdrop-blur-xl
        shadow-[0_20px_50px_rgba(236,72,153,.10)]
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white">

          <Sparkles size={26} />

        </div>

        <div>

          <h3 className="text-xl font-bold text-slate-900">
            AI Recommendations
          </h3>

          <p className="text-sm text-slate-500">
            Personalized Wellness Tips
          </p>

        </div>

      </div>

      {/* Suggestions */}

      <div className="mt-8 space-y-4">

        {suggestions.map((item, index) => (

          <motion.div
            key={item}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
            }}
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              bg-green-50
              px-5
              py-4
            "
          >

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <span className="font-medium text-slate-700">

              {item}

            </span>

          </motion.div>

        ))}

      </div>

      {/* Bottom Card */}

      <div className="mt-8 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 p-5 text-white">

        <h4 className="font-bold text-lg">

          Healthy Progress

        </h4>

        <p className="mt-2 text-sm leading-6 text-pink-100">

          Continue following these recommendations to maintain
          hormonal balance and improve overall reproductive health.

        </p>

      </div>

    </motion.div>
  );
}

export default SuggestionCard;