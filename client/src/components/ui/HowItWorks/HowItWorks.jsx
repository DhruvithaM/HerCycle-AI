import { motion } from "framer-motion";
import StepCard from "./StepCard";
import steps from "./stepsData";

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-white
        via-[#fff7fb]
        to-[#fff1f8]
        py-32
      "
    >
      {/* Background Glow */}

      <div className="absolute left-[-150px] top-20 h-[400px] w-[400px] rounded-full bg-pink-200/30 blur-[150px]" />

      <div className="absolute right-[-180px] bottom-0 h-[450px] w-[450px] rounded-full bg-purple-200/20 blur-[180px]" />

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
            🚀 How It Works
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Get Started in
            <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Just 5 Simple Steps
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            HerCycle AI simplifies women's healthcare by combining AI,
            smart health tracking, and personalized recommendations
            into one seamless experience.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="grid gap-12 lg:grid-cols-5">
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;