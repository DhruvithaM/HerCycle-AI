import { motion } from "framer-motion";
import testimonials from "./testimonialsData";
import TestimonialCard from "./TestimonialCard";
import StatsBanner from "./StatsBanner";

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-[#fff2f8]
        via-[#fff8fb]
        to-white
        py-32
      "
    >
      {/* Background Glow */}

      <div className="absolute -left-32 top-20 h-[450px] w-[450px] rounded-full bg-pink-200/20 blur-[180px]" />

      <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-200/20 blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <StatsBanner />

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            ❤️ Trusted by Women
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Loved by Thousands
            <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Across India
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Women trust HerCycle AI to monitor their health,
            understand their menstrual cycle,
            and receive AI-powered healthcare insights.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;