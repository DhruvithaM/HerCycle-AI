import {
  HeartPulse,
  Activity,
  Salad,
  Moon,
  Stethoscope,
  Sparkles,
} from "lucide-react";

/* ==========================================================
   RECOMMENDATION CARD
========================================================== */

function RecommendationCard({ result }) {
  if (!result) {
    return null;
  }

  const riskLevel =
    result.riskLevel ||
    result.risk_level ||
    "Low";

  let recommendations = [];

  /* ========================================================
     LOW RISK
  ======================================================== */

  if (riskLevel === "Low") {
    recommendations = [
      {
        icon: Activity,
        title: "Continue regular physical activity",
        description:
          "Maintain regular exercise and an active lifestyle according to your comfort and ability.",
      },
      {
        icon: Salad,
        title: "Maintain a balanced diet",
        description:
          "Include nutritious foods and try to maintain consistent, balanced eating habits.",
      },
      {
        icon: HeartPulse,
        title: "Continue tracking your cycle",
        description:
          "Keep monitoring your menstrual cycle and note any significant changes in timing or symptoms.",
      },
      {
        icon: Moon,
        title: "Prioritize sleep and stress management",
        description:
          "Adequate sleep and healthy stress-management habits can support your overall wellbeing.",
      },
    ];
  }

  /* ========================================================
     MODERATE RISK
  ======================================================== */

  if (riskLevel === "Moderate") {
    recommendations = [
      {
        icon: HeartPulse,
        title: "Monitor your symptoms regularly",
        description:
          "Track changes in your menstrual cycle, acne, hair growth, hair loss, and weight.",
      },
      {
        icon: Activity,
        title: "Maintain regular physical activity",
        description:
          "Regular movement may support general metabolic and overall health.",
      },
      {
        icon: Salad,
        title: "Focus on balanced nutrition",
        description:
          "Try to maintain regular, balanced meals and reduce highly processed foods where possible.",
      },
      {
        icon: Stethoscope,
        title: "Consider professional advice",
        description:
          "If symptoms continue or worsen, consider discussing them with a qualified healthcare professional.",
      },
    ];
  }

  /* ========================================================
     HIGH RISK
  ======================================================== */

  if (
    riskLevel === "High" ||
    riskLevel === "Higher"
  ) {
    recommendations = [
      {
        icon: Stethoscope,
        title: "Consider consulting a healthcare professional",
        description:
          "Several PCOD/PCOS-related symptoms may be present. A qualified professional can provide proper evaluation.",
      },
      {
        icon: HeartPulse,
        title: "Track your symptoms and menstrual cycle",
        description:
          "Keep a record of cycle changes and other symptoms to help with future medical evaluation.",
      },
      {
        icon: Activity,
        title: "Maintain healthy daily routines",
        description:
          "Focus on regular movement, adequate rest, and routines that support your overall wellbeing.",
      },
      {
        icon: Salad,
        title: "Follow balanced nutrition habits",
        description:
          "Aim for consistent, balanced meals and discuss any specific nutritional concerns with a qualified professional.",
      },
    ];
  }

  /* ========================================================
     FALLBACK
  ======================================================== */

  if (recommendations.length === 0) {
    recommendations = [
      {
        icon: HeartPulse,
        title: "Continue monitoring your health",
        description:
          "Keep tracking your menstrual cycle and any changes in your symptoms.",
      },
      {
        icon: Stethoscope,
        title: "Seek professional advice when needed",
        description:
          "A qualified healthcare professional can provide appropriate evaluation and medical guidance.",
      },
    ];
  }

  /* ========================================================
     UI
  ======================================================== */

  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-pink-100
        bg-white
        shadow-sm
      "
    >

      {/* HEADER */}

      <div
        className="
          border-b
          border-pink-100
          bg-gradient-to-r
          from-pink-50
          via-white
          to-purple-50
          px-6
          py-6
          md:px-8
        "
      >

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-pink-500
              to-purple-500
              text-white
              shadow-lg
              shadow-pink-100
            "
          >
            <Sparkles size={23} />
          </div>

          <div>

            <p
              className="
                text-sm
                font-semibold
                text-pink-500
              "
            >
              Personalized Wellness Guidance
            </p>

            <h3
              className="
                mt-1
                text-xl
                font-bold
                text-slate-800
              "
            >
              Recommended Next Steps
            </h3>

          </div>

        </div>

        <p
          className="
            mt-4
            max-w-3xl
            text-sm
            leading-6
            text-slate-500
          "
        >
          These recommendations are general wellness
          guidance based on your preliminary AI-based
          assessment.
        </p>

      </div>

      {/* RECOMMENDATIONS */}

      <div
        className="
          grid
          gap-4
          p-6
          md:grid-cols-2
          md:p-8
        "
      >

        {recommendations.map(
          (
            recommendation,
            index
          ) => {
            const Icon =
              recommendation.icon;

            return (
              <div
                key={index}
                className="
                  rounded-2xl
                  border
                  border-slate-100
                  bg-slate-50
                  p-5
                  transition
                  duration-200
                  hover:-translate-y-1
                  hover:bg-white
                  hover:shadow-md
                "
              >

                <div className="flex items-start gap-4">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-pink-50
                      text-pink-500
                    "
                  >
                    <Icon size={21} />
                  </div>

                  <div>

                    <h4
                      className="
                        font-bold
                        text-slate-800
                      "
                    >
                      {recommendation.title}
                    </h4>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                        text-slate-500
                      "
                    >
                      {recommendation.description}
                    </p>

                  </div>

                </div>

              </div>
            );
          }
        )}

      </div>

      {/* DISCLAIMER */}

      <div
        className="
          mx-6
          mb-6
          rounded-2xl
          border
          border-pink-100
          bg-pink-50
          px-5
          py-4
          md:mx-8
          md:mb-8
        "
      >
        <p
          className="
            text-sm
            leading-6
            text-slate-600
          "
        >
          <span
            className="
              font-bold
              text-pink-600
            "
          >
            Remember:
          </span>{" "}
          These recommendations are general wellness
          guidance based on a preliminary symptom screening.
          They are not a substitute for professional medical
          advice, diagnosis, or treatment.
        </p>
      </div>

    </section>
  );
}

export default RecommendationCard;