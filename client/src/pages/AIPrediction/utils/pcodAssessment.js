/* ==========================================================
   PCOD / PCOS RISK ASSESSMENT ENGINE
   ----------------------------------------------------------
   This is a preliminary screening tool.
   It does NOT provide a medical diagnosis.
========================================================== */

export function assessPCODRisk(profile = {}, answers = {}) {
  let score = 0;
  const riskFactors = [];

  /* ==========================================================
     HELPER FUNCTION
  ========================================================== */

  const addRisk = (points, factor) => {
    score += points;
    riskFactors.push(factor);
  };

  /* ==========================================================
     1. MENSTRUAL IRREGULARITY
  ========================================================== */

  if (answers.irregularPeriods === "yes") {
    addRisk(
      20,
      "Irregular menstrual cycles"
    );
  }

  /* ==========================================================
     2. MISSED PERIODS
  ========================================================== */

  if (answers.missedPeriods === "often") {
    addRisk(
      15,
      "Frequent missed periods"
    );
  }

  if (answers.missedPeriods === "sometimes") {
    addRisk(
      8,
      "Occasional missed periods"
    );
  }

  /* ==========================================================
     3. EXCESSIVE FACIAL OR BODY HAIR
  ========================================================== */

  if (answers.excessHair === "yes") {
    addRisk(
      15,
      "Excessive facial or body hair growth"
    );
  }

  /* ==========================================================
     4. ACNE
  ========================================================== */

  if (answers.acne === "severe") {
    addRisk(
      12,
      "Severe or persistent acne"
    );
  }

  if (answers.acne === "moderate") {
    addRisk(
      7,
      "Moderate acne"
    );
  }

  /* ==========================================================
     5. WEIGHT CHANGES
  ========================================================== */

  if (answers.weightGain === "yes") {
    addRisk(
      10,
      "Unexplained weight gain"
    );
  }

  /* ==========================================================
     6. HAIR THINNING OR HAIR LOSS
  ========================================================== */

  if (answers.hairLoss === "yes") {
    addRisk(
      10,
      "Hair thinning or excessive hair loss"
    );
  }

  /* ==========================================================
     7. DARK PATCHES ON SKIN
  ========================================================== */

  if (answers.darkSkinPatches === "yes") {
    addRisk(
      8,
      "Darkened skin patches"
    );
  }

  /* ==========================================================
     8. FAMILY HISTORY
  ========================================================== */

  if (answers.familyHistory === "yes") {
    addRisk(
      10,
      "Family history of PCOD/PCOS"
    );
  }

  /* ==========================================================
     9. PROFILE CYCLE LENGTH
  ========================================================== */

  const cycleLength = Number(profile?.cycleLength);

  if (cycleLength >= 35) {
    addRisk(
      10,
      "Long menstrual cycle length"
    );
  }

  if (
    cycleLength > 0 &&
    cycleLength < 21
  ) {
    addRisk(
      10,
      "Very short menstrual cycle length"
    );
  }

  /* ==========================================================
     LIMIT SCORE
  ========================================================== */

  score = Math.min(score, 100);

  /* ==========================================================
     DETERMINE RISK LEVEL
  ========================================================== */

  let riskLevel = "";
  let message = "";

  if (score <= 25) {
    riskLevel = "Low";

    message =
      "Your responses currently indicate a lower likelihood of PCOD-related symptoms.";
  } else if (score <= 50) {
    riskLevel = "Moderate";

    message =
      "Some symptoms associated with PCOD/PCOS are present. Consider monitoring your symptoms and discussing them with a healthcare professional if they continue.";
  } else {
    riskLevel = "High";

    message =
      "Several symptoms associated with PCOD/PCOS are present. Consider consulting a qualified healthcare professional for proper evaluation.";
  }

  /* ==========================================================
     RETURN RESULT
  ========================================================== */

  return {
    score,
    riskLevel,
    message,
    riskFactors,
    disclaimer:
      "This assessment is only a preliminary screening tool and is not a medical diagnosis.",
  };
}