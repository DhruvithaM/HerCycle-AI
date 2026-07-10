import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import features from "./featuresData";

function Features() {
  return (
    <section
      id="features"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-[#fff5f9]
        via-[#fffafc]
        to-white
        py-28
      "
    >
      {/* Background Glow */}

      <div className="absolute left-[-150px] top-20 h-[400px] w-[400px] rounded-full bg-pink-200/30 blur-[140px]" />

      <div className="absolute right-[-180px] bottom-0 h-[450px] w-[450px] rounded-full bg-pink-300/20 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            ✨ Why Choose HerCycle AI
          </span>

          <h2 className="mt-6 text-5xl font-black leading-tight text-slate-900">
            Everything You Need for
            <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Smarter Women's Healthcare
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            From AI-powered PCOD prediction to smart cycle tracking,
            personalized wellness insights, diet planning, and secure
            health records — everything is designed to help women take
            control of their health with confidence.
          </p>
        </motion.div>

        {/* Features Grid */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;