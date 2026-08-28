import {
  AlertTriangle,
  CheckCircle2,
  CircleDot,
} from "lucide-react";

import {
  severityOptions,
} from "../utils/symptomData";

/* ==========================================================
   SEVERITY SELECTOR
========================================================== */

function SeveritySelector({
  value = 1,
  onChange,
  disabled = false,
}) {
  const iconMap = {
    1: CheckCircle2,
    2: CircleDot,
    3: AlertTriangle,
  };

  const colorMap = {
    1: {
      selected:
        "border-emerald-400 bg-emerald-50",
      icon:
        "bg-emerald-500 text-white",
      text:
        "text-emerald-700",
    },

    2: {
      selected:
        "border-amber-400 bg-amber-50",
      icon:
        "bg-amber-500 text-white",
      text:
        "text-amber-700",
    },

    3: {
      selected:
        "border-pink-400 bg-pink-50",
      icon:
        "bg-pink-500 text-white",
      text:
        "text-pink-700",
    },
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      {/* HEADER */}

      <div>
        <p className="text-sm font-semibold text-pink-500">
          Symptom Severity
        </p>

        <h3 className="mt-1 text-lg font-bold text-slate-800">
          How severe is it?
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Choose how much this symptom is affecting you today.
        </p>
      </div>

      {/* OPTIONS */}

      <div className="mt-5 flex flex-col gap-3">

        {severityOptions.map((option) => {
          const selected =
            value === option.value;

          const Icon =
            iconMap[option.value];

          const colors =
            colorMap[option.value];

          return (
            <button
              key={option.value}
              type="button"
              disabled={disabled}
              onClick={() =>
                onChange(option.value)
              }
              className={`
                flex
                w-full
                items-center
                gap-4
                rounded-xl
                border
                p-4
                text-left
                transition-all
                duration-200
                ${
                  selected
                    ? colors.selected
                    : `
                      border-slate-200
                      bg-white
                      hover:border-pink-200
                      hover:bg-pink-50/30
                    `
                }
                ${
                  disabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }
              `}
            >

              {/* ICON */}

              <div
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  ${
                    selected
                      ? colors.icon
                      : "bg-slate-100 text-slate-500"
                  }
                `}
              >
                <Icon size={18} />
              </div>

              {/* CONTENT */}

              <div className="min-w-0 flex-1">

                <p
                  className={`
                    text-sm
                    font-bold
                    ${
                      selected
                        ? colors.text
                        : "text-slate-700"
                    }
                  `}
                >
                  {option.label}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {option.description}
                </p>

              </div>

              {/* SELECTED INDICATOR */}

              <div
                className={`
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  ${
                    selected
                      ? "border-pink-500 bg-pink-500"
                      : "border-slate-300"
                  }
                `}
              >
                {selected && (
                  <CheckCircle2
                    size={13}
                    className="text-white"
                  />
                )}
              </div>

            </button>
          );
        })}

      </div>

    </div>
  );
}

export default SeveritySelector;