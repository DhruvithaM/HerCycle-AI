import { motion } from "framer-motion";

const stats = [
  {
    number: "50K+",
    label: "Happy Women",
  },
  {
    number: "95%",
    label: "Prediction Accuracy",
  },
  {
    number: "24/7",
    label: "AI Assistance",
  },
  {
    number: "4.9★",
    label: "Average Rating",
  },
];

function StatsBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="
        mb-20
        grid
        gap-6
        rounded-[32px]
        bg-gradient-to-r
        from-pink-500
        via-fuchsia-500
        to-purple-600
        p-10
        text-white
        shadow-[0_30px_80px_rgba(236,72,153,.25)]
        md:grid-cols-4
      "
    >
      {stats.map((item) => (
        <div key={item.label} className="text-center">

          <h2 className="text-5xl font-black">

            {item.number}

          </h2>

          <p className="mt-3 text-pink-100">

            {item.label}

          </p>

        </div>
      ))}
    </motion.div>
  );
}

export default StatsBanner;