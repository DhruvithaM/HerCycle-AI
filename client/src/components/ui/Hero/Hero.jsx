import {
  Sparkles,
  BrainCircuit,
  ShieldCheck,
  PlayCircle,
  ArrowRight,
} from "lucide-react";

import HeroIllustration from "./HeroIllustration";
import StatsSection from "./StatsSection";

function Hero() {
  return (
    <section
      className="
      relative
      overflow-hidden
      min-h-screen
      pt-28
      bg-gradient-to-br
      from-[#fff7fa]
      via-[#ffeef5]
      to-[#fff5f9]
    "
    >
      {/* ================= BACKGROUND GLOWS ================= */}

      <div className="absolute -top-52 -left-44 h-[700px] w-[700px] rounded-full bg-pink-300/20 blur-[170px]" />

      <div className="absolute top-20 right-[-200px] h-[900px] w-[900px] rounded-full bg-pink-300/20 blur-[190px]" />

      <div className="absolute bottom-[-180px] left-[15%] h-[450px] w-[450px] rounded-full bg-pink-200/20 blur-[150px]" />

      {/* ================= MAIN CONTAINER ================= */}

      <div className="relative mx-auto max-w-[1450px] px-8">

        <div className="grid min-h-screen items-center gap-12 lg:grid-cols-2">

          {/* ================= LEFT CONTENT ================= */}

          <div>

            {/* Badge */}

            <div
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-pink-200
              bg-white/90
              px-6
              py-3
              text-sm
              font-semibold
              text-pink-600
              shadow-md
              backdrop-blur
            "
            >
              <Sparkles size={17} />

              AI Powered Women's Healthcare
            </div>

            {/* Heading */}

            <h1 className="mt-8 text-[72px] font-black leading-[1.02] tracking-tight">

              AI-Powered

              <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">

                PCOD Prediction

              </span>

              <span className="block text-slate-900">

                & Women's Health

              </span>

            </h1>

            {/* Description */}

            <p
              className="
              mt-8
              max-w-xl
              text-[22px]
              leading-10
              text-slate-600
            "
            >
              Empower your health with AI-driven PCOD prediction,
              intelligent menstrual cycle tracking,
              personalized lifestyle recommendations,
              and early risk analysis — all in one secure healthcare platform.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-5">

              <button
                className="
                flex
                items-center
                gap-2
                rounded-full
                bg-gradient-to-r
                from-pink-500
                via-fuchsia-500
                to-purple-600
                px-8
                py-4
                font-semibold
                text-white
                shadow-[0_20px_35px_rgba(236,72,153,.35)]
                transition
                duration-300
                hover:-translate-y-1
              "
              >
                Start Free Assessment

                <ArrowRight size={18} />

              </button>

              <button
                className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-pink-200
                bg-white/90
                px-8
                py-4
                font-semibold
                shadow-md
                backdrop-blur
                transition
                hover:border-pink-400
                hover:text-pink-600
              "
              >
                <PlayCircle size={20} />

                Watch Demo

              </button>

            </div>

            {/* Chips */}

            <div className="mt-10 flex flex-wrap gap-4">

              <div className="flex items-center gap-2 rounded-full bg-pink-100 px-5 py-3 font-medium text-pink-600">

                <BrainCircuit size={18} />

                95%+ AI Accuracy

              </div>

              <div className="flex items-center gap-2 rounded-full bg-cyan-100 px-5 py-3 font-medium text-cyan-700">

                <ShieldCheck size={18} />

                Privacy First

              </div>

            </div>

            {/* Stats */}

            <StatsSection />

          </div>

          {/* ================= RIGHT ================= */}

          <div className="flex justify-center">

            <HeroIllustration />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;