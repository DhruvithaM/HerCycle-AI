import { motion } from "framer-motion";

import CycleCard from "../cards/CycleCard";
import HealthScoreCard from "../cards/HealthScoreCard";
import NextPeriodCard from "../cards/NextPeriodCard";

function WelcomeSection({
  profile,
  cycleData,
}) {
  const displayName =
    profile?.fullName || "User";

  const firstName =
    displayName.split(" ")[0];

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12)
      return "Good Morning";

    if (hour < 17)
      return "Good Afternoon";

    return "Good Evening";
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      {/* Heading */}

      <div className="mb-8">

        <h1
          className="
            text-[42px]
            font-black
            leading-none
            text-slate-900
            lg:text-[46px]
          "
        >
          {greeting()}, {firstName} 👋
        </h1>

        <p className="mt-3 text-lg text-slate-500">

          {cycleData
            ? `Today is Day ${cycleData.cycleDay} of your cycle. You're currently in the ${cycleData.currentPhase} phase.`
            : "Welcome back! Let's take care of your health today."}

        </p>

      </div>

      {/* Dashboard Cards */}

      <div className="grid gap-6 lg:grid-cols-3">

        <CycleCard
          profile={profile}
          cycleData={cycleData}
        />

        <HealthScoreCard
          profile={profile}
          cycleData={cycleData}
        />

        <NextPeriodCard
          profile={profile}
          cycleData={cycleData}
        />

      </div>

    </motion.section>
  );
}

export default WelcomeSection;