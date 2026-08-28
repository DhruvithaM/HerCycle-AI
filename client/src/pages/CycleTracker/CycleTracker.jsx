import { useState } from "react";
import { CalendarPlus } from "lucide-react";

import useProfile from "../../hooks/useProfile";
import usePeriod from "../../hooks/usePeriod";

import { predictCycle } from "../../utils/cyclePrediction";

import CycleHero from "./components/CycleHero";
import CycleOverview from "./components/CycleOverview";
import CycleTimeline from "./components/CycleTimeline";

import CycleCalendar from "./components/CycleCalendar/CycleCalendar";
import CycleStatistics from "./components/CycleStatistics";

import RecordPeriodModal from "./components/RecordPeriodModal";

/* ==========================================================
   CYCLE TRACKER
========================================================== */

function CycleTracker() {
  /* ========================================================
     PROFILE
  ======================================================== */

  const { profile } = useProfile();

  /* ========================================================
     PERIOD DATA
  ======================================================== */

  const {
    latestPeriod,
    periodHistory,
    loading,
    startNewPeriod,
    finishPeriod,
  } = usePeriod();

  /* ========================================================
     RECORD PERIOD MODAL
  ======================================================== */

  const [isRecordModalOpen, setIsRecordModalOpen] =
    useState(false);

  /* ========================================================
     CYCLE PREDICTION
  ======================================================== */

  const cycleData = predictCycle(
    periodHistory,
    profile
  );

  /* ========================================================
     OPEN / CLOSE MODAL
  ======================================================== */

  const openRecordPeriod = () => {
    setIsRecordModalOpen(true);
  };

  const closeRecordPeriod = () => {
    setIsRecordModalOpen(false);
  };

  /* ========================================================
     LOADING
  ======================================================== */

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
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
            Loading your cycle tracker...
          </p>
        </div>
      </div>
    );
  }

  /* ========================================================
     PAGE CONTENT ONLY

     IMPORTANT:
     Sidebar and Topbar are NOT included here.

     DashboardLayout.jsx already provides:
     ✓ Sidebar
     ✓ Topbar
  ======================================================== */

  return (
    <>
      {/* ====================================================
          HERO
      ==================================================== */}

      <CycleHero
        profile={profile}
        cycleData={cycleData}
      />

      {/* ====================================================
          OVERVIEW
      ==================================================== */}

      <CycleOverview
        cycleData={cycleData}
      />

      {/* ====================================================
          TIMELINE
      ==================================================== */}

      <CycleTimeline
        cycleData={cycleData}
      />

      {/* ====================================================
          RECORD PERIOD BUTTON
      ==================================================== */}

      <div className="mb-5 flex justify-end">
        <button
          type="button"
          onClick={openRecordPeriod}
          className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-pink-500
            to-purple-500
            px-5
            py-3
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-pink-200
            transition
            duration-200
            hover:-translate-y-0.5
            hover:shadow-xl
          "
        >
          <CalendarPlus size={18} />

          Record Period
        </button>
      </div>

      {/* ====================================================
          CALENDAR
      ==================================================== */}

      <CycleCalendar
        cycleData={cycleData}
      />

      {/* ====================================================
          STATISTICS
      ==================================================== */}

      <CycleStatistics
        cycleData={cycleData}
      />

      {/* ====================================================
          RECORD PERIOD MODAL
      ==================================================== */}

      <RecordPeriodModal
        isOpen={isRecordModalOpen}
        onClose={closeRecordPeriod}
        latestPeriod={latestPeriod}
        profile={profile}
        startNewPeriod={startNewPeriod}
        finishPeriod={finishPeriod}
      />
    </>
  );
}

export default CycleTracker;