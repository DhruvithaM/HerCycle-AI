import {
  Activity,
  Brain,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  HeartPulse,
  Search,
  Sparkles,
} from "lucide-react";

import {
  symptomCategories,
} from "../utils/symptomData";

/* ==========================================================
   ICON MAP
========================================================== */

const iconMap = {
  CalendarDays,
  HeartPulse,
  Sparkles,
  Brain,
  Activity,
};

/* ==========================================================
   SYMPTOM SELECTOR
========================================================== */

function SymptomSelector({
  selectedSymptoms = [],
  onToggleSymptom,
}) {
  const selectedIds = selectedSymptoms.map(
    (symptom) =>
      typeof symptom === "string"
        ? symptom
        : symptom.id
  );

  const isSelected = (symptomId) => {
    return selectedIds.includes(symptomId);
  };

  return (
    <section className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm md:p-7">
      
      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-sm font-semibold text-pink-500">
            Symptom Selection
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-800 md:text-2xl">
            What symptoms are you experiencing?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Select all symptoms you are currently experiencing.
            You can choose multiple symptoms from different categories.
          </p>
        </div>

        {/* SELECTED COUNT */}

        <div className="shrink-0 rounded-2xl bg-pink-50 px-4 py-3 text-center">

          <p className="text-xs font-semibold uppercase tracking-wide text-pink-400">
            Selected
          </p>

          <p className="mt-1 text-xl font-bold text-pink-600">
            {selectedIds.length}
          </p>

        </div>

      </div>

      {/* ====================================================
          CATEGORIES
      ==================================================== */}

      <div className="mt-6 space-y-6">

        {symptomCategories.map(
          (category) => {
            const CategoryIcon =
              iconMap[category.icon] || Activity;

            return (
              <div
                key={category.id}
                className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/60"
              >

                {/* CATEGORY HEADER */}

                <div className="flex items-center gap-4 border-b border-slate-100 bg-white px-5 py-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-sm">

                    <CategoryIcon size={21} />

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-800">
                      {category.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {category.description}
                    </p>

                  </div>

                </div>

                {/* SYMPTOMS */}

                <div className="grid gap-3 p-4 md:grid-cols-2">

                  {category.symptoms.map(
                    (symptom) => {
                      const selected =
                        isSelected(symptom.id);

                      return (
                        <button
                          key={symptom.id}
                          type="button"
                          onClick={() =>
                            onToggleSymptom(
                              symptom
                            )
                          }
                          className={`
                            group
                            flex
                            w-full
                            items-start
                            gap-3
                            rounded-2xl
                            border
                            p-4
                            text-left
                            transition-all
                            duration-200
                            ${
                              selected
                                ? `
                                  border-pink-300
                                  bg-pink-50
                                  shadow-sm
                                `
                                : `
                                  border-slate-200
                                  bg-white
                                  hover:border-pink-200
                                  hover:bg-pink-50/40
                                `
                            }
                          `}
                        >

                          {/* CHECK */}

                          <div
                            className={`
                              mt-0.5
                              flex
                              h-5
                              w-5
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              transition-all
                              ${
                                selected
                                  ? `
                                    border-pink-500
                                    bg-pink-500
                                    text-white
                                  `
                                  : `
                                    border-slate-300
                                    bg-white
                                    text-transparent
                                  `
                              }
                            `}
                          >

                            <Check size={13} />

                          </div>

                          {/* TEXT */}

                          <div>

                            <p
                              className={`
                                text-sm
                                font-semibold
                                ${
                                  selected
                                    ? "text-pink-700"
                                    : "text-slate-700"
                                }
                              `}
                            >
                              {symptom.name}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {symptom.description}
                            </p>

                          </div>

                        </button>
                      );
                    }
                  )}

                </div>

              </div>
            );
          }
        )}

      </div>

      {/* ====================================================
          EMPTY / HELPER TEXT
      ==================================================== */}

      <div className="mt-6 rounded-2xl border border-pink-100 bg-pink-50 px-4 py-4">

        <p className="text-sm leading-6 text-slate-600">
          <span className="font-semibold text-pink-600">
            Tip:
          </span>{" "}
          Select only the symptoms you are experiencing today.
          You can update your symptoms anytime to keep your
          health history accurate.
        </p>

      </div>

    </section>
  );
}

export default SymptomSelector;