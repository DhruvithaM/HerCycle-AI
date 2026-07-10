import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

function SymptomsCard({ symptoms }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
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
      <div className="mb-6">
        <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
          Symptoms Selected
        </span>
      </div>

      <div className="space-y-5">
        {symptoms.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -20 }}
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
              bg-pink-50
              px-5
              py-4
            "
          >
            <CheckCircle2
              size={22}
              className="text-pink-500"
            />

            <span className="font-medium text-slate-700">
              {item}
            </span>
          </motion.div>
        ))}
      </div>

      {/* AI Processing */}

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">

          <span className="text-sm font-semibold text-slate-600">
            AI Processing...
          </span>

          <span className="text-sm font-bold text-pink-600">
            92%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-pink-100">

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "92%" }}
            viewport={{ once: true }}
            transition={{
              duration: 1.5,
            }}
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-pink-500
              to-purple-600
            "
          />

        </div>
      </div>
    </motion.div>
  );
}

export default SymptomsCard;