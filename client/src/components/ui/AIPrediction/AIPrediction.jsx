import { motion } from "framer-motion";
import SymptomsCard from "./SymptomsCard";
import PredictionCard from "./PredictionCard";
import SuggestionCard from "./SuggestionCard";
import {
  symptoms,
  prediction,
  suggestions,
} from "./predictionData";

function AIPrediction() {
  return (
    <section
      id="ai-prediction"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-[#fff1f8]
        via-[#fff8fb]
        to-white
        py-28
      "
    >
      {/* Background Glow */}

      <div className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-pink-200/25 blur-[170px]" />

      <div className="absolute -right-40 bottom-10 h-[500px] w-[500px] rounded-full bg-purple-200/20 blur-[190px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            🤖 AI Prediction Engine
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Experience Our
            <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Intelligent Prediction System
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Discover how HerCycle AI analyzes symptoms, predicts PCOD
            risk, and provides personalized recommendations in just
            a few seconds.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-3">

          <SymptomsCard symptoms={symptoms} />

          <PredictionCard prediction={prediction} />

          <SuggestionCard suggestions={suggestions} />

        </div>

      </div>
    </section>
  );
}

export default AIPrediction;