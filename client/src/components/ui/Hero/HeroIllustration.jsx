import {
  BrainCircuit,
  CalendarDays,
  HeartPulse,
} from "lucide-react";

import FloatingBadge from "./FloatingBadge";
import FloatingIcons from "./FloatingIcons";
import Decorations from "./Decorations";
import Leaves from "./Leaves";

function HeroIllustration() {
  return (
    <div className="relative flex h-[760px] w-[760px] items-center justify-center overflow-hidden">

      {/* Background Glow */}

      <div className="absolute h-[760px] w-[760px] rounded-full bg-pink-300/25 blur-[210px]" />

      {/* Outer Circle */}

      <div className="absolute h-[640px] w-[640px] rounded-full bg-pink-100/70" />

      {/* Decorations */}

      <FloatingIcons />
      <Decorations />
      <Leaves />

      {/* Main Circle */}

      <div
        className="
          relative
          flex
          h-[580px]
          w-[580px]
          items-center
          justify-center
          overflow-hidden
          rounded-full
          bg-gradient-to-br
          from-pink-500
          via-fuchsia-500
          to-purple-600
          shadow-[0_50px_120px_rgba(236,72,153,.35)]
        "
      >
        {/* Inner Glow */}

        <div className="absolute inset-0 rounded-full bg-white/10" />

        {/* Woman */}

        <img
          src="/illustrations/woman-phone.png"
          alt="HerCycle AI"
          className="
            relative
            z-20
            h-[126%]
            -translate-y-4
            object-contain
            transition-all
            duration-500
            hover:scale-105
          "
        />
      </div>

      {/* AI Prediction */}

      <FloatingBadge
        icon={<BrainCircuit size={20} />}
        title="AI Prediction"
        subtitle="95% Accurate"
        delay={0}
        className="left-8 top-24"
      />

      {/* Cycle Tracker */}

      <FloatingBadge
        icon={<CalendarDays size={20} />}
        title="Cycle Tracker"
        subtitle="Smart Calendar"
        delay={1}
        className="right-2 top-36"
      />

      {/* AI Insights */}

      <FloatingBadge
        icon={<HeartPulse size={20} />}
        title="AI Insights"
        subtitle="Personalized Care"
        delay={2}
        className="left-16 bottom-40"
      />

    </div>
  );
}

export default HeroIllustration;