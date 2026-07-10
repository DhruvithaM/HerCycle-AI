import useProfile from "../../hooks/useProfile";
import usePeriod from "../../hooks/usePeriod";

import { predictCycle } from "../../utils/cyclePrediction";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

import WelcomeSection from "./components/sections/WelcomeSection";

import CalendarCard from "./components/widgets/CalendarCard";
import QuickActions from "./components/widgets/QuickActions";
import ReminderCard from "./components/widgets/ReminderCard";

import HealthInsights from "./components/widgets/HealthInsights";
import MoodTracker from "./components/widgets/MoodTracker";
import PeriodCheckIn from "./components/widgets/PeriodCheckIn";

function Dashboard() {
  /* ==========================================
     User Profile
  ========================================== */

  const { profile } = useProfile();

  /* ==========================================
     Period History
  ========================================== */

  const {
    periodHistory,
    loading: periodLoading,
    startNewPeriod,
  } = usePeriod();

  /* ==========================================
     Single Source Of Truth
  ========================================== */

  const cycleData = predictCycle(
    periodHistory,
    profile
  );

  /* ==========================================
     Loading
  ========================================== */

  if (periodLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF8FC]">
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
    <div className="flex min-h-screen bg-[#FFF8FC]">
      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1800px] px-8 py-6">
          {/* Topbar */}

          <Topbar />

          {/* Welcome */}

          <div className="mt-8">
            <WelcomeSection
              profile={profile}
              cycleData={cycleData}
            />
          </div>

          {/* Period Check In */}

          <div className="mt-6">
            <PeriodCheckIn
              cycleData={cycleData}
              startNewPeriod={startNewPeriod}
            />
          </div>

          {/* ==========================
              Second Row
          ========================== */}

          <div className="mt-8 grid grid-cols-12 gap-6 items-stretch">
            {/* Calendar */}

            <div className="col-span-12 xl:col-span-6 flex">
              <CalendarCard
                cycleData={cycleData}
              />
            </div>

            {/* Quick Actions */}

            <div className="col-span-12 md:col-span-6 xl:col-span-3 flex">
              <QuickActions />
            </div>

            {/* Reminder */}

            <div className="col-span-12 md:col-span-6 xl:col-span-3 flex">
              <ReminderCard
                cycleData={cycleData}
              />
            </div>
          </div>

          {/* ==========================
              Third Row
          ========================== */}

          <div className="mt-8 grid grid-cols-12 gap-6 items-stretch">
            {/* Health Insights */}

            <div className="col-span-12 xl:col-span-8 flex">
              <HealthInsights
                profile={profile}
                cycleData={cycleData}
              />
            </div>

            {/* Mood Tracker */}

            <div className="col-span-12 xl:col-span-4 flex">
              <MoodTracker
                profile={profile}
                cycleData={cycleData}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;