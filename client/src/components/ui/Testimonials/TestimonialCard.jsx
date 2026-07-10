import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-pink-100
        bg-white/90
        p-8
        shadow-[0_20px_55px_rgba(236,72,153,.10)]
        backdrop-blur-xl
      "
    >
      {/* Quote Icon */}

      <div className="absolute right-6 top-6 text-pink-200">
        <Quote size={38} />
      </div>

      {/* Avatar */}

      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="h-20 w-20 rounded-full border-4 border-pink-100 object-cover"
      />

      {/* Name */}

      <h3 className="mt-5 text-xl font-bold text-slate-900">
        {testimonial.name}
      </h3>

      <p className="text-sm text-pink-500">
        {testimonial.role}
      </p>

      {/* Rating */}

      <div className="mt-4 flex gap-1">

        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}

      </div>

      {/* Review */}

      <p className="mt-6 leading-8 text-slate-600">
        "{testimonial.review}"
      </p>
    </motion.div>
  );
}

export default TestimonialCard;