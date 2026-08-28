import { useState, useEffect } from "react";

import {
  AlertCircle,
  CheckCircle2,
  HeartPulse,
  Sparkles,
  Info,
  Check,
} from "lucide-react";

import SymptomsHero from "./components/SymptomsHero";
import SymptomSelector from "./components/SymptomSelector";
import SymptomNotes from "./components/SymptomNotes";
import TodaySymptoms from "./components/TodaySymptoms";
import SymptomHistory from "./components/SymptomHistory";

import useSymptoms from "../../hooks/useSymptoms";

function Symptoms() {
  /* ==========================================================
     LOCAL STATE
  ========================================================== */

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  /* ==========================================================
     FIREBASE
  ========================================================== */

  const {
    symptomHistory,
    loading,
    saving,
    error,
    saveSymptoms,
    removeSymptomEntry,
  } = useSymptoms();

  /* ==========================================================
     AUTO HIDE MESSAGE
  ========================================================== */

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);

  /* ==========================================================
     TOGGLE SYMPTOM
  ========================================================== */

  const handleToggleSymptom = (symptom) => {
    setSelectedSymptoms((previousSymptoms) => {
      const alreadySelected = previousSymptoms.some(
        (item) => item.id === symptom.id
      );

      if (alreadySelected) {
        return previousSymptoms.filter(
          (item) => item.id !== symptom.id
        );
      }

      return [
        ...previousSymptoms,
        {
          id: symptom.id,
          name:
            symptom.name ||
            symptom.title ||
            symptom.label ||
            symptom.id,
          category:
            symptom.category || "General",
          severity: 1,
        },
      ];
    });
  };

  /* ==========================================================
     CHANGE SEVERITY
  ========================================================== */

  const handleSeverityChange = (
    symptomId,
    severity
  ) => {
    setSelectedSymptoms((previousSymptoms) =>
      previousSymptoms.map((symptom) =>
        symptom.id === symptomId
          ? {
              ...symptom,
              severity,
            }
          : symptom
      )
    );
  };

  /* ==========================================================
     REMOVE SYMPTOM
  ========================================================== */

  const handleRemoveSymptom = (symptomId) => {
    setSelectedSymptoms((previousSymptoms) =>
      previousSymptoms.filter(
        (symptom) =>
          symptom.id !== symptomId
      )
    );
  };

  /* ==========================================================
     SAVE SYMPTOMS
  ========================================================== */

  const handleSaveSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      setMessageType("error");
      setMessage(
        "Please select at least one symptom before saving."
      );
      return;
    }

    try {
      setMessage("");
      setMessageType("");

      await saveSymptoms({
        symptoms: selectedSymptoms,
        notes: notes.trim(),
        entryDate: new Date()
          .toISOString()
          .split("T")[0],
      });

      setMessageType("success");
      setMessage(
        "Your symptom check-in has been saved successfully."
      );

      setSelectedSymptoms([]);
      setNotes("");
    } catch (saveError) {
      console.error(
        "Failed to save symptoms:",
        saveError
      );

      setMessageType("error");

      setMessage(
        saveError.message ||
          "Failed to save your symptoms. Please try again."
      );
    }
  };

  /* ==========================================================
     DELETE HISTORY
  ========================================================== */

  const handleDeleteEntry = async (
    entryId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this symptom entry?"
    );

    if (!confirmed) return;

    try {
      await removeSymptomEntry(entryId);

      setMessageType("success");
      setMessage(
        "Symptom entry deleted successfully."
      );
    } catch (deleteError) {
      console.error(
        "Failed to delete symptom entry:",
        deleteError
      );

      setMessageType("error");

      setMessage(
        deleteError.message ||
          "Failed to delete the symptom entry."
      );
    }
  };

  /* ==========================================================
     SEVERITY OPTIONS
  ========================================================== */

  const severityOptions = [
    {
      value: 1,
      label: "Mild",
      description:
        "Noticeable, but manageable",
    },
    {
      value: 2,
      label: "Moderate",
      description:
        "Affects some daily activities",
    },
    {
      value: 3,
      label: "Severe",
      description:
        "Strongly affects your day",
    },
  ];

  /* ==========================================================
     PAGE CONTENT ONLY

     IMPORTANT:
     Sidebar and Topbar are already provided by DashboardLayout.
     Do NOT add Sidebar or Topbar in this feature file.
  ========================================================== */

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1800px]">

        {/* HERO */}

        <SymptomsHero
          selectedCount={selectedSymptoms.length}
          onSave={handleSaveSymptoms}
          saving={saving}
        />

        {/* BENEFITS */}

        <div className="mt-8">
          <div className="mb-5">
            <p className="text-sm font-semibold text-pink-500">
              Why track symptoms?
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-800">
              Understand what your body is telling you
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Regular check-ins help you notice recurring
              patterns, understand changes over time, and
              build a clearer picture of your health.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="rounded-xl bg-pink-50 p-3 text-pink-500">
                  <HeartPulse size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Track patterns
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Notice which symptoms repeat and how
                    they change over time.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="rounded-xl bg-purple-50 p-3 text-purple-500">
                  <Sparkles size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Improve insights
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Your symptom history can support more
                    personalised health insights.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-500">
                  <Info size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    See changes
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Review your history and notice changes
                    in frequency and severity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MESSAGE */}

        {message && (
          <div
            className={`
              mt-6 flex items-start gap-3 rounded-2xl
              border p-4 shadow-sm
              ${
                messageType === "success"
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-red-200 bg-red-50"
              }
            `}
          >
            {messageType === "success" ? (
              <CheckCircle2
                size={22}
                className="mt-0.5 shrink-0 text-emerald-500"
              />
            ) : (
              <AlertCircle
                size={22}
                className="mt-0.5 shrink-0 text-red-500"
              />
            )}

            <div>
              <p
                className={`
                  font-semibold
                  ${
                    messageType === "success"
                      ? "text-emerald-700"
                      : "text-red-700"
                  }
                `}
              >
                {messageType === "success"
                  ? "Check-in saved"
                  : "Please check"}
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {message}
              </p>
            </div>
          </div>
        )}

        {error && !message && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
            <AlertCircle
              size={22}
              className="mt-0.5 shrink-0 text-red-500"
            />

            <div>
              <p className="font-semibold text-red-700">
                Unable to load symptom history
              </p>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* STEP 1 */}

        <div className="mt-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
              1
            </div>

            <div>
              <p className="text-sm font-semibold text-pink-500">
                Step 1 of 2
              </p>

              <h2 className="font-bold text-slate-800">
                Select what you are experiencing
              </h2>
            </div>
          </div>

          <SymptomSelector
            selectedSymptoms={selectedSymptoms}
            onToggleSymptom={handleToggleSymptom}
          />
        </div>

        {/* STEP 2 */}

        <div className="mt-8">
          <div className="mb-5 flex items-center gap-3">
            <div
              className={`
                flex h-9 w-9 items-center justify-center
                rounded-full text-sm font-bold
                ${
                  selectedSymptoms.length > 0
                    ? "bg-pink-500 text-white"
                    : "bg-pink-100 text-pink-400"
                }
              `}
            >
              2
            </div>

            <div>
              <p className="text-sm font-semibold text-pink-500">
                Step 2 of 2
              </p>

              <h2 className="font-bold text-slate-800">
                Rate your selected symptoms
              </h2>
            </div>
          </div>

          {selectedSymptoms.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-pink-200 bg-white p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
                <HeartPulse size={25} />
              </div>

              <h3 className="mt-4 font-bold text-slate-800">
                No symptoms selected yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Select one or more symptoms above. Then you
                can rate how strongly each one is affecting
                you today.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {selectedSymptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold text-slate-800">
                        {symptom.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {symptom.category}
                      </p>
                    </div>

                    <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                      Severity
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {severityOptions.map((option) => {
                      const isActive =
                        symptom.severity === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          disabled={saving}
                          onClick={() =>
                            handleSeverityChange(
                              symptom.id,
                              option.value
                            )
                          }
                          className={`
                            flex w-full items-center gap-4
                            rounded-2xl border p-4 text-left
                            transition-all
                            ${
                              isActive
                                ? "border-pink-400 bg-pink-50 shadow-sm"
                                : "border-slate-200 bg-white hover:border-pink-200 hover:bg-pink-50/30"
                            }
                            ${
                              saving
                                ? "cursor-not-allowed opacity-60"
                                : ""
                            }
                          `}
                        >
                          <div
                            className={`
                              flex h-8 w-8 shrink-0 items-center
                              justify-center rounded-full
                              ${
                                isActive
                                  ? "bg-pink-500 text-white"
                                  : "border border-slate-300 bg-white"
                              }
                            `}
                          >
                            {isActive && (
                              <Check size={16} />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p
                              className={`
                                font-bold
                                ${
                                  isActive
                                    ? "text-pink-600"
                                    : "text-slate-700"
                                }
                              `}
                            >
                              {option.label}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {option.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TODAY + NOTES */}

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <TodaySymptoms
            selectedSymptoms={selectedSymptoms}
            onRemoveSymptom={handleRemoveSymptom}
          />

          <SymptomNotes
            value={notes}
            onChange={setNotes}
            disabled={saving}
          />
        </div>

        {/* SAVE */}

        <div className="mt-6 flex flex-col-reverse gap-4 rounded-3xl border border-pink-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-800">
              Ready to save your check-in?
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {selectedSymptoms.length > 0
                ? `${selectedSymptoms.length} symptom${
                    selectedSymptoms.length > 1
                      ? "s are"
                      : " is"
                  } ready to save.`
                : "Select at least one symptom to continue."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveSymptoms}
            disabled={
              saving ||
              selectedSymptoms.length === 0
            }
            className="
              rounded-2xl bg-gradient-to-r from-pink-500
              to-purple-600 px-8 py-3.5 font-semibold
              text-white shadow-lg shadow-pink-200
              transition-all hover:-translate-y-0.5
              hover:shadow-xl disabled:cursor-not-allowed
              disabled:opacity-50 disabled:hover:translate-y-0
            "
          >
            {saving
              ? "Saving your check-in..."
              : "Save Today's Check-in"}
          </button>
        </div>

        {/* HISTORY */}

        <div className="mt-10">
          <SymptomHistory
            history={symptomHistory}
            loading={loading}
            onDelete={handleDeleteEntry}
          />
        </div>

        {/* MEDICAL NOTE */}

        <div className="mt-8 rounded-2xl border border-pink-100 bg-pink-50/50 px-5 py-4">
          <p className="text-sm leading-6 text-slate-500">
            <span className="font-semibold text-pink-600">
              Important:
            </span>{" "}
            Symptom tracking helps you monitor patterns and
            supports personalised health insights. It does
            not provide a medical diagnosis or replace advice
            from a qualified healthcare professional.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Symptoms;