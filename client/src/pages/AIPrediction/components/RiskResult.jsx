import {
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";

/* ==========================================================
   RISK RESULT
========================================================== */

function RiskResult({ result }) {
  if (!result) {
    return null;
  }

  /* ========================================================
     RISK CONFIGURATION
  ======================================================== */

  const riskConfig = {
    Low: {
      icon: CheckCircle2,
      label: "Low Risk",
      gradient: "from-emerald-500 to-teal-500",
      lightBg: "bg-emerald-50",
      border: "border-emerald-100",
      text: "text-emerald-600",
    },

    Moderate: {
      icon: AlertCircle,
      label: "Moderate Risk",
      gradient: "from-amber-400 to-orange-500",
      lightBg: "bg-amber-50",
      border: "border-amber-100",
      text: "text-amber-600",
    },

    High: {
      icon: ShieldAlert,
      label: "Higher Risk",
      gradient: "from-pink-500 to-purple-600",
      lightBg: "bg-pink-50",
      border: "border-pink-100",
      text: "text-pink-600",
    },
  };

  const config =
    riskConfig[result.riskLevel] ||
    riskConfig.Low;

  const RiskIcon = config.icon;

  /* ========================================================
     CALCULATE DISPLAY PERCENTAGE

     Backend may return:
     - probability_percentage: 0.69
     - probability: 0.0069

     We prefer probability_percentage.
  ======================================================== */

  const riskPercentage =
    typeof result.probability_percentage === "number"
      ? result.probability_percentage
      : typeof result.score === "number"
      ? result.score
      : typeof result.probability === "number"
      ? result.probability * 100
      : 0;

  const formattedRiskPercentage =
    Number(riskPercentage.toFixed(2));

  /* ========================================================
     UI
  ======================================================== */

  return (
    <section className="space-y-6">

      {/* ====================================================
          MAIN RESULT CARD
      ==================================================== */}

      <div
        className={`
          overflow-hidden
          rounded-3xl
          border
          ${config.border}
          bg-white
          shadow-sm
        `}
      >

        {/* ==================================================
            RESULT HEADER
        ================================================== */}

        <div
          className={`
            bg-gradient-to-r
            ${config.gradient}
            px-6
            py-7
            text-white
            md:px-8
          `}
        >

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <div className="mb-3 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
                  <RiskIcon size={23} />
                </div>

                <span className="text-sm font-semibold text-white/80">
                  PCOD / PCOS Assessment
                </span>

              </div>

              <h2 className="text-3xl font-bold">
                {config.label}
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/85">
                {result.message}
              </p>

            </div>

            {/* RISK PROBABILITY */}

            <div className="rounded-3xl bg-white/15 px-7 py-5 text-center backdrop-blur-sm">

              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Estimated Risk
              </p>

              <div className="mt-1 flex items-end justify-center">

                <span className="text-5xl font-bold">
                  {formattedRiskPercentage}
                </span>

                <span className="mb-2 ml-1 text-lg text-white/70">
                  %
                </span>

              </div>

              <p className="mt-1 text-xs text-white/60">
                ML prediction probability
              </p>

            </div>

          </div>

        </div>

        {/* ==================================================
            RISK FACTORS / MODEL FEATURES
        ================================================== */}

        <div className="p-6 md:p-8">

          <h3 className="text-lg font-bold text-slate-800">
            Assessment Summary
          </h3>

          {result.riskFactors &&
          result.riskFactors.length > 0 ? (

            <div className="mt-5 grid gap-3 md:grid-cols-2">

              {result.riskFactors.map(
                (factor, index) => (
                  <div
                    key={`${factor}-${index}`}
                    className={`
                      flex
                      items-start
                      gap-3
                      rounded-2xl
                      border
                      ${config.border}
                      ${config.lightBg}
                      px-4
                      py-4
                    `}
                  >

                    <RiskIcon
                      size={19}
                      className={`${config.text} mt-0.5 shrink-0`}
                    />

                    <p className="text-sm font-medium leading-6 text-slate-700">
                      {factor}
                    </p>

                  </div>
                )
              )}

            </div>

          ) : (

            <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

              <div className="flex items-start gap-3">

                <CheckCircle2
                  size={22}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />

                <p className="text-sm leading-6 text-slate-600">
                  Based on the information provided, the
                  machine learning model estimated a lower
                  likelihood of PCOD/PCOS-related risk.
                </p>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* ====================================================
          MEDICAL DISCLAIMER
      ==================================================== */}

      <div className="flex items-start gap-4 rounded-3xl border border-blue-100 bg-blue-50 p-5">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">

          <Stethoscope
            size={20}
            className="text-blue-500"
          />

        </div>

        <div>

          <h4 className="font-bold text-slate-800">
            Important Health Information
          </h4>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            {result.disclaimer ||
              "This result is generated using a machine learning model as a preliminary risk assessment and is not a medical diagnosis. Please consult a qualified healthcare professional for proper evaluation and diagnosis."}
          </p>

        </div>

      </div>

    </section>
  );
}

export default RiskResult;