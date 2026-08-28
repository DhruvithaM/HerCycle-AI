import useProfile from "../../hooks/useProfile";
import usePeriod from "../../hooks/usePeriod";

import { predictCycle } from "../../utils/cyclePrediction";

import WelcomeSection from "./components/sections/WelcomeSection";

import CalendarCard from "./components/widgets/CalendarCard";
import QuickActions from "./components/widgets/QuickActions";
import ReminderCard from "./components/widgets/ReminderCard";

import HealthInsights from "./components/widgets/HealthInsights";
import MoodTracker from "./components/widgets/MoodTracker";
import PeriodCheckIn from "./components/widgets/PeriodCheckIn";

function Dashboard() {
  /* ==========================================
     USER PROFILE
  ========================================== */

  const { profile } = useProfile();

  /* ==========================================
     PERIOD HISTORY
  ========================================== */

  const {
    periodHistory,
    loading: periodLoading,
    startNewPeriod,
  } = usePeriod();

  /* ==========================================
     CYCLE DATA
  ========================================== */

  const cycleData = predictCycle(
    periodHistory,
    profile
  );

  /* ==========================================
     LOADING
  ========================================== */

  if (periodLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div
            className="
              mx-auto
              h-12
              w-12
              animate-spin
              rounded-full
              border-4
              border-pink-200
              border-t-pink-500
            "
          />

          <p className="mt-5 text-slate-500">
            Loading your health dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-10">
      {/* ================= Welcome ================= */}

      <WelcomeSection
        profile={profile}
        cycleData={cycleData}
      />

      {/* ================= Period Check-In ================= */}

      <div className="mt-6">
        <PeriodCheckIn
          cycleData={cycleData}
          startNewPeriod={startNewPeriod}
        />
      </div>

      {/* ================= Second Row ================= */}

      <div className="mt-8 grid grid-cols-12 items-stretch gap-6">
        {/* Calendar */}

        <div className="col-span-12 flex xl:col-span-6">
          <CalendarCard
            cycleData={cycleData}
          />
        </div>

        {/* Quick Actions */}

        <div className="col-span-12 flex md:col-span-6 xl:col-span-3">
          <QuickActions />
        </div>

        {/* Reminder */}

        <div className="col-span-12 flex md:col-span-6 xl:col-span-3">
          <ReminderCard
            cycleData={cycleData}
          />
        </div>
      </div>

      {/* ================= Third Row ================= */}

      <div className="mt-8 grid grid-cols-12 items-stretch gap-6">
        {/* Health Insights */}

        <div className="col-span-12 flex xl:col-span-8">
          <HealthInsights
            profile={profile}
            cycleData={cycleData}
          />
        </div>

        {/* Mood Tracker */}

        <div className="col-span-12 flex xl:col-span-4">
          <MoodTracker
            profile={profile}
            cycleData={cycleData}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;