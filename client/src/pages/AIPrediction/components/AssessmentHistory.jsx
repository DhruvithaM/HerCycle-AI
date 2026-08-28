import {
  CalendarDays,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";

/* ==========================================================
   ASSESSMENT HISTORY
========================================================== */

function AssessmentHistory({
  assessmentHistory = [],
  assessmentChange = null,
}) {
  if (!Array.isArray(assessmentHistory)) {
    return null;
  }

  if (assessmentHistory.length === 0) {
    return null;
  }

  /* ========================================================
     GET SCORE
  ======================================================== */

  const getScore = (assessment) => {
    const value =
      assessment?.probabilityPercentage ??
      assessment?.score ??
      0;

    return Number(value) || 0;
  };

  /* ========================================================
     FORMAT DATE
  ======================================================== */

  const formatDate = (createdAt) => {
    if (!createdAt) {
      return "Recently";
    }

    try {
      let date;

      if (
        typeof createdAt?.toDate === "function"
      ) {
        date = createdAt.toDate();
      } else if (
        createdAt?.seconds
      ) {
        date = new Date(
          createdAt.seconds * 1000
        );
      } else {
        date = new Date(createdAt);
      }

      if (
        Number.isNaN(date.getTime())
      ) {
        return "Recently";
      }

      return date.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return "Recently";
    }
  };

  /* ========================================================
     RISK LABEL
  ======================================================== */

  const getRiskLevel = (
    assessment
  ) => {
    if (assessment?.riskLevel) {
      return assessment.riskLevel;
    }

    const score =
      getScore(assessment);

    if (score <= 25) {
      return "Low";
    }

    if (score <= 50) {
      return "Moderate";
    }

    return "High";
  };

  /* ========================================================
     RISK STYLE
  ======================================================== */

  const getRiskStyle = (
    riskLevel
  ) => {
    if (riskLevel === "High") {
      return "bg-pink-50 text-pink-600";
    }

    if (riskLevel === "Moderate") {
      return "bg-amber-50 text-amber-600";
    }

    return "bg-emerald-50 text-emerald-600";
  };

  /* ========================================================
     CHANGE STATUS
  ======================================================== */

  const getChangeDetails = () => {
    if (!assessmentChange) {
      return {
        label: "First Assessment",
        Icon: Minus,
        className:
          "bg-slate-100 text-slate-600",
      };
    }

    if (
      assessmentChange.direction ===
      "decreased"
    ) {
      return {
        label: "Risk Improved",
        Icon: TrendingDown,
        className:
          "bg-emerald-100 text-emerald-700",
      };
    }

    if (
      assessmentChange.direction ===
      "increased"
    ) {
      return {
        label: "Risk Increased",
        Icon: TrendingUp,
        className:
          "bg-amber-100 text-amber-700",
      };
    }

    return {
      label: "No Change",
      Icon: Minus,
      className:
        "bg-slate-100 text-slate-600",
    };
  };

  const changeDetails =
    getChangeDetails();

  const ChangeIcon =
    changeDetails.Icon;

  /* ========================================================
     UI
  ======================================================== */

  return (
    <section className="space-y-6">

      {/* ====================================================
          RISK PROGRESS
      ==================================================== */}

      {assessmentChange && (
        <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">

          <div className="flex flex-col gap-4 border-b border-pink-50 px-6 py-5 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-sm font-semibold text-pink-500">
                Risk Progress
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-800">
                How Your Estimated Risk Changed
              </h2>
            </div>

            <div
              className={`inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-bold md:self-auto ${changeDetails.className}`}
            >
              <ChangeIcon size={17} />

              {changeDetails.label}
            </div>

          </div>

          <div className="grid gap-4 p-6 md:grid-cols-3">

            {/* PREVIOUS RISK */}

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Previous Risk
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-700">
                {assessmentChange.previousRisk.toFixed(
                  2
                )}

                <span className="ml-1 text-sm font-semibold text-slate-400">
                  /100
                </span>
              </p>

            </div>

            {/* CURRENT RISK */}

            <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-pink-400">
                Current Risk
              </p>

              <p className="mt-2 text-2xl font-bold text-pink-600">
                {assessmentChange.latestRisk.toFixed(
                  2
                )}

                <span className="ml-1 text-sm font-semibold text-pink-400">
                  /100
                </span>
              </p>

            </div>

            {/* CHANGE */}

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                Change
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-700">
                {assessmentChange.difference > 0
                  ? "+"
                  : ""}

                {assessmentChange.difference.toFixed(
                  2
                )}

                <span className="ml-1 text-sm font-semibold text-emerald-500">
                  points
                </span>
              </p>

            </div>

          </div>

          <p className="px-6 pb-6 text-sm leading-6 text-slate-500">
            Your estimated risk score has{" "}

            {assessmentChange.direction ===
            "decreased"
              ? "decreased"
              : assessmentChange.direction ===
                  "increased"
                ? "increased"
                : "not changed"}{" "}

            compared with your previous assessment.
            This is a preliminary comparison and is
            not a medical diagnosis.
          </p>

        </div>
      )}

      {/* ====================================================
          ASSESSMENT HISTORY
      ==================================================== */}

      <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm md:p-8">

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Your Assessment History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track your previous AI-based assessment
              results over time.
            </p>
          </div>

          <span className="self-start rounded-full bg-pink-50 px-4 py-2 text-sm font-bold text-pink-600 md:self-auto">
            {assessmentHistory.length}{" "}
            {assessmentHistory.length === 1
              ? "Assessment"
              : "Assessments"}
          </span>

        </div>

        <div className="space-y-3">

          {assessmentHistory.map(
            (assessment, index) => {
              const riskLevel =
                getRiskLevel(
                  assessment
                );

              const score =
                getScore(
                  assessment
                );

              return (
                <div
                  key={
                    assessment.id ||
                    `assessment-${index}`
                  }
                  className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 transition hover:border-pink-100 hover:bg-pink-50/30 md:flex-row md:items-center md:justify-between"
                >

                  {/* LEFT */}

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50">

                      <CalendarDays
                        size={20}
                        className="text-pink-500"
                      />

                    </div>

                    <div>
                      <h3 className="font-bold text-slate-700">

                        {index === 0
                          ? "Latest Assessment"
                          : `Previous Assessment ${index}`}

                      </h3>

                      <p className="mt-1 text-xs text-slate-400">

                        {formatDate(
                          assessment.createdAt
                        )}

                      </p>
                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="flex items-center gap-4 self-end md:self-auto">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${getRiskStyle(
                        riskLevel
                      )}`}
                    >
                      {riskLevel} Risk
                    </span>

                    <p className="font-bold text-slate-700">

                      {score.toFixed(2)}

                      <span className="ml-1 text-sm font-medium text-slate-400">
                        /100
                      </span>

                    </p>

                  </div>

                </div>
              );
            }
          )}

        </div>

        <p className="mt-6 text-xs leading-5 text-slate-400">
          Assessment results are preliminary AI-based
          estimates and are not a medical diagnosis.
        </p>

      </div>

    </section>
  );
}

/* ==========================================================
   DEFAULT EXPORT — IMPORTANT
========================================================== */

export default AssessmentHistory;