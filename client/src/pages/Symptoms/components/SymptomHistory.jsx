import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  FileText,
  HeartPulse,
  Loader2,
  Trash2,
} from "lucide-react";

import { getSymptomById } from "../utils/symptomData";

/* ==========================================================
   SYMPTOM HISTORY
========================================================== */

function SymptomHistory({
  history = [],
  loading = false,
  onDelete,
}) {
  const formatDate = (entry) => {
    if (!entry?.entryDate) {
      return "Unknown date";
    }

    const date = new Date(
      `${entry.entryDate}T12:00:00`
    );

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getSeverityLabel = (severity) => {
    const level = Number(severity);

    if (level === 3) return "Severe";
    if (level === 2) return "Moderate";

    return "Mild";
  };

  const getSeverityClasses = (severity) => {
    const level = Number(severity);

    if (level === 3) {
      return "border-pink-200 bg-pink-50 text-pink-600";
    }

    if (level === 2) {
      return "border-amber-200 bg-amber-50 text-amber-600";
    }

    return "border-emerald-200 bg-emerald-50 text-emerald-600";
  };

  /* ========================================================
     LOADING STATE
  ======================================================== */

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Loader2
            size={28}
            className="animate-spin text-pink-500"
          />

          <p className="mt-4 text-sm text-slate-500">
            Loading your symptom history...
          </p>
        </div>
      </section>
    );
  }

  /* ========================================================
     EMPTY STATE
  ======================================================== */

  if (!history || history.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-purple-50 text-purple-500">
            <HeartPulse size={29} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-800">
            No symptom history yet
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Your saved daily symptom check-ins will appear
            here. Start by selecting your symptoms above and
            saving your first entry.
          </p>
        </div>
      </section>
    );
  }

  /* ========================================================
     HISTORY
  ======================================================== */

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-7">
      
      {/* HEADER */}

      <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm font-semibold text-pink-500">
            Health History
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-800 md:text-2xl">
            Your recent symptom check-ins
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Review previous entries and notice patterns in how
            you have been feeling over time.
          </p>
        </div>

        <div className="rounded-2xl bg-purple-50 px-4 py-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">
            Entries
          </p>

          <p className="mt-1 text-xl font-bold text-purple-600">
            {history.length}
          </p>
        </div>

      </div>

      {/* ENTRIES */}

      <div className="mt-6 space-y-4">

        {history.map((entry) => {
          const symptoms = Array.isArray(
            entry.symptoms
          )
            ? entry.symptoms
            : [];

          return (
            <div
              key={entry.id}
              className="rounded-3xl border border-slate-100 bg-slate-50/60 p-5 transition hover:border-pink-200"
            >
              {/* ENTRY TOP */}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div className="flex items-start gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
                    <CalendarDays size={21} />
                  </div>

                  <div>
                    <p className="font-bold text-slate-800">
                      {formatDate(entry)}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {symptoms.length} symptom
                      {symptoms.length !== 1
                        ? "s"
                        : ""}{" "}
                      recorded
                    </p>
                  </div>

                </div>

                {/* DELETE */}

                <button
                  type="button"
                  onClick={() => onDelete(entry.id)}
                  className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500"
                >
                  <Trash2 size={15} />
                  Delete
                </button>

              </div>

              {/* SYMPTOMS */}

              <div className="mt-5 flex flex-wrap gap-2">

                {symptoms.map((item, index) => {
                  const symptomId =
                    typeof item === "string"
                      ? item
                      : item.id;

                  const symptom =
                    getSymptomById(symptomId);

                  if (!symptom) {
                    return null;
                  }

                  const severity =
                    typeof item === "string"
                      ? 1
                      : item.severity || 1;

                  return (
                    <div
                      key={`${symptomId}-${index}`}
                      className="flex items-center gap-2 rounded-xl border border-white bg-white px-3 py-2 shadow-sm"
                    >
                      <span className="text-xs font-semibold text-slate-700">
                        {symptom.name}
                      </span>

                      <span
                        className={`
                          rounded-full
                          border
                          px-2
                          py-0.5
                          text-[10px]
                          font-bold
                          ${getSeverityClasses(
                            severity
                          )}
                        `}
                      >
                        {getSeverityLabel(
                          severity
                        )}
                      </span>
                    </div>
                  );
                })}

              </div>

              {/* NOTES */}

              {entry.notes && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-purple-100 bg-purple-50/70 p-4">

                  <FileText
                    size={18}
                    className="mt-0.5 shrink-0 text-purple-500"
                  />

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-purple-500">
                      Your notes
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {entry.notes}
                    </p>
                  </div>

                </div>
              )}

            </div>
          );
        })}

      </div>
    </section>
  );
}

export default SymptomHistory;