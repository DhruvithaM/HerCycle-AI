import { motion } from "framer-motion";
import impactData from "./impactData";
import ImpactCard from "./ImpactCard";

function Impact() {
  return (
    <section
      id="impact"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-white
        via-[#fff6fb]
        to-[#fff1f8]
        py-32
      "
    >
      {/* Background Glow */}

      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-pink-200/20 blur-[180px]" />

      <div className="absolute -right-40 bottom-0 h-[550px] w-[550px] rounded-full bg-purple-200/20 blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            🌍 Our Impact
          </span>

          <h2 className="mt-6 text-5xl font-black leading-tight text-slate-900">
            Empowering Women's Health
            <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Through AI Innovation
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Every prediction, every reminder, and every insight is
            designed to help women take control of their health with
            confidence and technology.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {impactData.map((item, index) => (
            <ImpactCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default Impact;