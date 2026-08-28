import {
  Activity,
  CalendarDays,
  HeartPulse,
  Sparkles,
  Trash2,
} from "lucide-react";

import { getSymptomById } from "../utils/symptomData";

/* ==========================================================
   TODAY'S SYMPTOMS
========================================================== */

function TodaySymptoms({
  selectedSymptoms = [],
  onRemoveSymptom,
}) {
  const getSeverityLabel = (severity) => {
    const severityNumber = Number(severity);

    if (severityNumber === 3) {
      return "Severe";
    }

    if (severityNumber === 2) {
      return "Moderate";
    }

    return "Mild";
  };

  const getSeverityClasses = (severity) => {
    const severityNumber = Number(severity);

    if (severityNumber === 3) {
      return "bg-pink-100 text-pink-600 border-pink-200";
    }

    if (severityNumber === 2) {
      return "bg-amber-100 text-amber-600 border-amber-200";
    }

    return "bg-emerald-100 text-emerald-600 border-emerald-200";
  };

  return (
    <section className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm md:p-7">
      
      {/* HEADER */}

      <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-start gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 text-white">
            <Activity size={21} />
          </div>

          <div>
            <p className="text-sm font-semibold text-pink-500">
              Today's Check-In
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-800">
              Your selected symptoms
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Review your symptoms before saving today's entry.
            </p>
          </div>

        </div>

        <div className="rounded-2xl bg-pink-50 px-4 py-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-pink-400">
            Total
          </p>

          <p className="mt-1 text-xl font-bold text-pink-600">
            {selectedSymptoms.length}
          </p>
        </div>

      </div>

      {/* EMPTY STATE */}

      {selectedSymptoms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-50 text-pink-400">
            <CalendarDays size={28} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-700">
            No symptoms selected yet
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Select the symptoms you are experiencing and they
            will appear here for review.
          </p>

        </div>
      ) : (

        /* SELECTED SYMPTOMS */

        <div className="mt-6 grid gap-4 md:grid-cols-2">

          {selectedSymptoms.map(
            (selectedSymptom) => {
              const symptomId =
                typeof selectedSymptom === "string"
                  ? selectedSymptom
                  : selectedSymptom.id;

              const symptom =
                getSymptomById(symptomId);

              if (!symptom) {
                return null;
              }

              const severity =
                typeof selectedSymptom === "string"
                  ? 1
                  : selectedSymptom.severity || 1;

              return (
                <div
                  key={symptomId}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-pink-200 hover:bg-pink-50/30"
                >

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="font-bold text-slate-800">
                        {symptom.name}
                      </h3>

                      <span
                        className={`
                          rounded-full
                          border
                          px-2.5
                          py-1
                          text-xs
                          font-semibold
                          ${getSeverityClasses(severity)}
                        `}
                      >
                        {getSeverityLabel(severity)}
                      </span>

                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {symptom.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">

                      <HeartPulse size={14} />

                      <span>
                        {symptom.categoryTitle}
                      </span>

                    </div>

                  </div>

                  {/* REMOVE */}

                  <button
                    type="button"
                    onClick={() =>
                      onRemoveSymptom(symptomId)
                    }
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm transition hover:bg-pink-50 hover:text-pink-500"
                    aria-label={`Remove ${symptom.name}`}
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              );
            }
          )}

        </div>
      )}

      {/* HELPER */}

      {selectedSymptoms.length > 0 && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-purple-100 bg-purple-50 p-4">

          <Sparkles
            size={19}
            className="mt-0.5 shrink-0 text-purple-500"
          />

          <p className="text-sm leading-6 text-slate-600">
            You can select multiple symptoms and assign a
            severity level to each one. Review everything here
            before saving your daily symptom check-in.
          </p>

        </div>
      )}

    </section>
  );
}

export default TodaySymptoms;