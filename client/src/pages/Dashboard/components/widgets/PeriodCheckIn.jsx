import { useState } from "react";

import { motion } from "framer-motion";

import {
  CalendarHeart,
  CheckCircle2,
  Clock3,
} from "lucide-react";

function PeriodCheckIn({
  cycleData,
  startNewPeriod,
}) {
  const [loading, setLoading] = useState(false);

  const [completed, setCompleted] = useState(false);

  const [dismissed, setDismissed] = useState(false);

  if (!cycleData) return null;

  if (completed) return null;

  if (dismissed) return null;

  const shouldShow =
    cycleData.daysUntilNextPeriod === 0 ||
    cycleData.isDelayed;

  if (!shouldShow) return null;

  const delayedDays =
    cycleData.delayedDays;

  async function handleStart() {
    try {
      setLoading(true);

      await startNewPeriod(new Date());

      // Hide the card immediately.
      // Dashboard will refresh automatically
      // through the realtime Firestore listener.
      setCompleted(true);
    } catch (error) {
      console.error(error);

      alert(
        "Unable to record your period."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleNotYet() {
    setDismissed(true);
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="w-full rounded-[30px] border border-pink-100 bg-white p-6 shadow-[0_15px_40px_rgba(236,72,153,.08)]"
    >
      {/* Header */}

      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100">
          <CalendarHeart
            size={28}
            className="text-pink-600"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Period Check-in
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Let's keep your predictions accurate.
          </p>
        </div>
      </div>

      {/* Body */}

      <div className="mt-8 rounded-3xl bg-pink-50 p-5">
        {cycleData.isDelayed ? (
          <>
            <div className="flex items-center gap-3">
              <Clock3
                size={22}
                className="text-orange-500"
              />

              <h3 className="text-lg font-semibold">
                Your period seems delayed
              </h3>
            </div>

            <p className="mt-3 text-slate-600">
              Your period is delayed by

              <span className="font-bold text-pink-600">
                {" "}
                {delayedDays} day
                {delayedDays !== 1 ? "s" : ""}
              </span>
              .
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold">
              Your period is expected today
            </h3>

            <p className="mt-2 text-slate-600">
              Has your period started today?
            </p>
          </>
        )}
      </div>

      {/* Buttons */}

      <div className="mt-8 flex gap-4">
        <button
          onClick={handleStart}
          disabled={loading}
          className="flex-1 rounded-2xl bg-pink-500 py-4 font-semibold text-white hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="flex items-center justify-center gap-2">
            <CheckCircle2 size={18} />

            {loading
              ? "Saving..."
              : "Yes, My Period Started"}
          </span>
        </button>

        <button
          onClick={handleNotYet}
          disabled={loading}
          className="rounded-2xl border border-pink-200 bg-white px-6 py-4 font-semibold hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Not Yet
        </button>
      </div>

      <div className="mt-6 border-t border-pink-100 pt-5">
        <p className="text-sm text-slate-500">
          Your confirmation improves future AI
          predictions.
        </p>
      </div>
    </motion.div>
  );
}

export default PeriodCheckIn;