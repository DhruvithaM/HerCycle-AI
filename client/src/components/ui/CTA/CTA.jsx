import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

function CTA() {
  return (
    <section className="relative overflow-hidden py-32">

      {/* Background */}

      <div className="mx-auto max-w-7xl px-6">

        <div
          className="
          relative
          overflow-hidden
          rounded-[40px]
          bg-gradient-to-br
          from-pink-500
          via-fuchsia-500
          to-purple-600
          px-12
          py-24
          text-center
          shadow-[0_40px_100px_rgba(236,72,153,.30)]
        "
        >

          {/* Glow */}

          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-[120px]" />

          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-[120px]" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >

            <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
              🌸 Join HerCycle AI Today
            </span>

            <h2 className="mt-8 text-5xl font-black leading-tight text-white">

              Ready to Take Control

              <span className="block">

                of Your Health?

              </span>

            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-pink-100">

              Experience AI-powered PCOD prediction,
              personalized health recommendations,
              smart cycle tracking,
              and real-time wellness insights.

            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">

              <button
                className="
                flex
                items-center
                gap-2
                rounded-full
                bg-white
                px-8
                py-4
                font-semibold
                text-pink-600
                transition
                hover:scale-105
              "
              >
                Get Started

                <ArrowRight size={18} />

              </button>

              <button
                className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/40
                bg-white/10
                px-8
                py-4
                font-semibold
                text-white
                backdrop-blur
                transition
                hover:bg-white/20
              "
              >

                <PlayCircle size={20} />

                Watch Demo

              </button>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default CTA;