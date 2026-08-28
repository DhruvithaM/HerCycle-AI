/* ==========================================================
   PCOD / PCOS RECOMMENDATION ENGINE
========================================================== */

export function getRecommendations(result = {}) {
  const riskLevel = result.riskLevel || "Low";
  const recommendations = [];

  if (riskLevel === "Low") {
    recommendations.push(
      {
        title: "Maintain a balanced lifestyle",
        description:
          "Continue following a balanced diet, regular physical activity, and healthy daily routines.",
      },
      {
        title: "Track your menstrual cycle",
        description:
          "Keep tracking your periods and note any major changes in cycle length or symptoms.",
      },
      {
        title: "Monitor new symptoms",
        description:
          "If you notice persistent irregular periods, increased acne, hair changes, or unexplained weight changes, consider speaking with a healthcare professional.",
      }
    );
  }

  if (riskLevel === "Moderate") {
    recommendations.push(
      {
        title: "Monitor your symptoms regularly",
        description:
          "Track your menstrual cycle and any recurring symptoms such as acne, hair changes, or weight changes.",
      },
      {
        title: "Focus on regular activity",
        description:
          "Regular physical activity and a balanced lifestyle may support overall metabolic and menstrual health.",
      },
      {
        title: "Consider medical advice",
        description:
          "If symptoms continue or become worse, consider consulting a qualified healthcare professional for proper evaluation.",
      }
    );
  }

  if (riskLevel === "High") {
    recommendations.push(
      {
        title: "Consider consulting a healthcare professional",
        description:
          "Several PCOD/PCOS-related symptoms may be present. A healthcare professional can provide appropriate evaluation and testing.",
      },
      {
        title: "Continue tracking your symptoms",
        description:
          "Record changes in your menstrual cycle, weight, skin, hair, and other symptoms.",
      },
      {
        title: "Follow a healthy routine",
        description:
          "Focus on regular physical activity, balanced meals, adequate sleep, and stress management.",
      }
    );
  }

  return recommendations;
}