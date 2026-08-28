
import {
  CalendarDays,
  HeartPulse,
  Sparkles,
} from "lucide-react";

/* ==========================================================
   SYMPTOMS HERO
========================================================== */

function SymptomsHero({
  selectedCount = 0,
  onSave,
  saving = false,
}) {
  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
    }
  );

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 p-6 text-white shadow-lg md:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        
        {/* LEFT CONTENT */}

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <CalendarDays size={16} />
            {today}
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
            How are you feeling today?
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-white/85 md:text-base">
            Track your symptoms, understand your body better,
            and build a helpful health history over time.
          </p>

          {/* STATS */}

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm">
              <p className="text-xs font-medium text-white/70">
                Symptoms Selected
              </p>

              <div className="mt-1 flex items-center gap-2">
                <HeartPulse size={18} />

                <span className="text-xl font-bold">
                  {selectedCount}
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm">
              <p className="text-xs font-medium text-white/70">
                Daily Check-In
              </p>

              <div className="mt-1 flex items-center gap-2">
                <Sparkles size={18} />

                <span className="text-sm font-bold">
                  Stay in tune
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}

        <div className="flex flex-col gap-3 lg:min-w-[220px]">
          <button
            type="button"
            onClick={onSave}
            disabled={selectedCount === 0 || saving}
            className="
              rounded-2xl
              bg-white
              px-6
              py-4
              text-sm
              font-bold
              text-pink-600
              shadow-lg
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:translate-y-0
            "
          >
            {saving
              ? "Saving your check-in..."
              : "Save Today's Symptoms"}
          </button>

          <p className="text-center text-xs leading-5 text-white/70">
            Your symptoms are saved securely to your personal
            health history.
          </p>
        </div>

      </div>
    </section>
  );
}

export default SymptomsHero;