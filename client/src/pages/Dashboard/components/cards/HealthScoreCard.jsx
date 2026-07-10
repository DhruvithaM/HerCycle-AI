import { Heart } from "lucide-react";
import { motion } from "framer-motion";

function HealthScoreCard({
  profile,
  cycleData,
}) {
  // ==========================
  // Health Score Calculation
  // ==========================

  let score = 0;

  // Profile Completion
  if (profile?.fullName) score += 10;
  if (profile?.phone) score += 5;
  if (profile?.age) score += 5;
  if (profile?.bloodGroup) score += 5;
  if (profile?.emergencyContact) score += 5;

  // Menstrual Data
  if (profile?.lastPeriodDate) score += 15;
  if (profile?.cycleLength) score += 15;
  if (profile?.periodLength) score += 10;

  // Health Goals
  if (
    profile?.goals &&
    profile.goals.length > 0
  ) {
    score += 10;
  }

  // ==========================
  // BMI Score
  // ==========================

  if (
    profile?.height &&
    profile?.weight
  ) {
    const height =
      Number(profile.height) / 100;

    const weight =
      Number(profile.weight);

    const bmi =
      weight / (height * height);

    if (bmi >= 18.5 && bmi <= 24.9) {
      score += 20;
    } else if (
      bmi >= 17 &&
      bmi <= 29
    ) {
      score += 10;
    } else {
      score += 5;
    }
  }

  if (score > 100) {
    score = 100;
  }

  // ==========================
  // Status
  // ==========================

  let status = "";
  let emoji = "";

  if (score >= 90) {
    status = "Excellent";
    emoji = "🌟";
  } else if (score >= 75) {
    status = "Great";
    emoji = "✨";
  } else if (score >= 60) {
    status = "Good";
    emoji = "💖";
  } else {
    status = "Needs Attention";
    emoji = "💙";
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        relative
        h-[250px]
        overflow-hidden
        rounded-[28px]
        border
        border-pink-100
        bg-white
        p-6
        shadow-[0_12px_35px_rgba(236,72,153,.08)]
      "
    >
      {/* Background Glow */}

      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-pink-100/40 blur-3xl" />

      {/* Header */}

      <div className="flex items-center gap-2">

        <Heart
          size={16}
          className="text-pink-500"
        />

        <span className="text-sm font-semibold text-slate-700">
          Health Score
        </span>

      </div>

      {/* Score */}

      <div className="mt-5">

        <h1
          className="
            bg-gradient-to-r
            from-pink-500
            to-purple-600
            bg-clip-text
            text-[58px]
            font-black
            leading-none
            text-transparent
          "
        >
          {score}%
        </h1>

        <p className="mt-2 text-slate-500">
          {status} {emoji}
        </p>

      </div>

      {/* Premium Wave Graph */}

      <div className="absolute bottom-12 left-0 right-0 px-6">

        <svg
          viewBox="0 0 420 80"
          className="w-full"
          preserveAspectRatio="none"
        >
          <defs>

            <linearGradient
              id="healthGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="#EC4899"
              />

              <stop
                offset="100%"
                stopColor="#A855F7"
              />

            </linearGradient>

          </defs>

          <path
            d="
              M0 58
              C40 35 70 65 110 48
              S190 28 230 50
              S300 68 340 40
              S395 25 420 12
            "
            fill="none"
            stroke="url(#healthGradient)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            cx="420"
            cy="12"
            r="3.5"
            fill="#EC4899"
          />

        </svg>

      </div>

      {/* Footer */}

      <button
        className="
          absolute
          bottom-5
          left-6
          text-sm
          font-semibold
          text-pink-500
          transition
          hover:translate-x-1
        "
      >
        View Full Report →
      </button>

    </motion.div>
  );
}

export default HealthScoreCard;