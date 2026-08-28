import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import {
  Download,
  FileText,
  HeartPulse,
  CalendarDays,
  Pill,
  Utensils,
  BrainCircuit,
  Loader2,
  User,
  Activity,
} from "lucide-react";

import { auth, db } from "../../firebase/firebase";

function Reports() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState(null);
  const [periodHistory, setPeriodHistory] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [assessment, setAssessment] = useState(null);

  /* ==========================================
     GET LOGGED-IN USER DIRECTLY FROM FIREBASE
  ========================================== */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        console.log("No user is currently logged in");
        setUser(null);
        setLoading(false);
        return;
      }

      console.log("Logged-in user:", currentUser.uid);

      setUser(currentUser);

      await fetchReportData(currentUser.uid);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* ==========================================
     FETCH ALL FIRESTORE DATA
  ========================================== */

  const fetchReportData = async (uid) => {
    try {
      console.log("Fetching report data for UID:", uid);

      /* ---------- PROFILE ---------- */

      const profileRef = doc(db, "users", uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        const profileData = profileSnap.data();

        console.log("Profile data:", profileData);

        setProfile({
          ...profileData,
          uid,
        });
      } else {
        console.log("Profile document does not exist");
      }

      /* ---------- PERIOD HISTORY ---------- */

      const periodRef = collection(
        db,
        "users",
        uid,
        "periodHistory"
      );

      const periodSnap = await getDocs(periodRef);

      const periodData = periodSnap.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      console.log("Period history:", periodData);

      setPeriodHistory(periodData);

      /* ---------- SYMPTOMS ---------- */

      const symptomsRef = collection(
        db,
        "users",
        uid,
        "symptoms"
      );

      const symptomsSnap = await getDocs(symptomsRef);

      const symptomsData = symptomsSnap.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      console.log("Symptoms:", symptomsData);

      setSymptoms(symptomsData);

      /* ---------- MEDICINES ---------- */

      const medicinesRef = collection(
        db,
        "users",
        uid,
        "medicines"
      );

      const medicinesSnap = await getDocs(medicinesRef);

      const medicinesData = medicinesSnap.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      console.log("Medicines:", medicinesData);

      setMedicines(medicinesData);

      /* ---------- NUTRITION ---------- */

      try {
        const nutritionRef = collection(
          db,
          "users",
          uid,
          "nutrition"
        );

        const nutritionSnap = await getDocs(nutritionRef);

        const nutritionData = nutritionSnap.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        console.log("Nutrition:", nutritionData);

        setNutrition(nutritionData);
      } catch (nutritionError) {
        console.log(
          "Nutrition data could not be fetched:",
          nutritionError
        );

        setNutrition([]);
      }

      /* ---------- PCOD ASSESSMENT ---------- */

      const assessmentRef = collection(
        db,
        "users",
        uid,
        "pcodAssessments"
      );

      const assessmentSnap = await getDocs(assessmentRef);

      if (!assessmentSnap.empty) {
        const assessmentData = assessmentSnap.docs.map(
          (document) => ({
            id: document.id,
            ...document.data(),
          })
        );

        console.log(
          "PCOD assessments:",
          assessmentData
        );

        setAssessment(
          assessmentData[assessmentData.length - 1]
        );
      } else {
        setAssessment(null);
      }

    } catch (error) {
      console.error(
        "Error fetching report data:",
        error
      );
    }
  };

  /* ==========================================
     GET PROFILE NAME
  ========================================== */

  const getUserName = () => {
    if (!profile) {
      return user?.displayName || "HerCycle AI User";
    }

    return (
      profile.name ||
      profile.fullName ||
      profile.displayName ||
      user?.displayName ||
      "HerCycle AI User"
    );
  };

  /* ==========================================
     GET LAST PERIOD
  ========================================== */

  const getLastPeriod = () => {
    if (!profile) return "Not available";

    if (profile.lastPeriodDate) {
      return formatDate(profile.lastPeriodDate);
    }

    if (profile.lastPeriod) {
      return formatDate(profile.lastPeriod);
    }

    if (periodHistory.length > 0) {
      const latestPeriod =
        periodHistory[periodHistory.length - 1];

      return formatDate(
        latestPeriod.startDate ||
          latestPeriod.periodStartDate ||
          latestPeriod.date
      );
    }

    return "Not available";
  };

  /* ==========================================
     FORMAT DATE SAFELY
  ========================================== */

  const formatDate = (value) => {
    if (!value) return "Not available";

    try {
      if (value?.toDate) {
        return value
          .toDate()
          .toLocaleDateString("en-IN");
      }

      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        return String(value);
      }

      return date.toLocaleDateString("en-IN");
    } catch {
      return "Not available";
    }
  };

  /* ==========================================
     DOWNLOAD REPORT
  ========================================== */

  const downloadReport = () => {
    if (!user) {
      alert("Please log in to download your health report.");
      return;
    }

    const reportContent = `
HERCYCLE AI - HEALTH REPORT

USER INFORMATION
Name: ${getUserName()}
Email: ${user.email || "Not available"}
Age: ${profile?.age || "Not available"}
Cycle Length: ${profile?.cycleLength || profile?.cycle || "Not available"}
Last Period: ${getLastPeriod()}

HEALTH RECORDS
Period Records: ${periodHistory.length}
Symptoms Recorded: ${symptoms.length}
Medicine Reminders: ${medicines.length}
Nutrition Records: ${nutrition.length}
PCOD Assessment: ${assessment ? "Available" : "Not available"}

Generated by HerCycle AI
`;

    const blob = new Blob(
      [reportContent],
      { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "HerCycle-AI-Health-Report.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            size={42}
            className="animate-spin text-pink-600"
          />

          <p className="text-sm font-medium text-slate-500">
            Loading your health report...
          </p>
        </div>
      </div>
    );
  }

  /* ==========================================
     MAIN UI
  ========================================== */

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 pb-10 sm:px-6">

      {/* HEADER */}

      <section className="rounded-3xl border border-pink-100 bg-gradient-to-r from-pink-50 via-white to-purple-50 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg">
              <FileText size={26} />
            </div>

            <div>
              <p className="text-sm font-semibold text-pink-500">
                Health Insights
              </p>

              <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                Your Health Report
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Hello {getUserName()}. View a complete summary
                of your cycle, symptoms, medicines, nutrition
                and health assessment data.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={downloadReport}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:opacity-95"
          >
            <Download size={18} />
            Download Report
          </button>
        </div>
      </section>

      {/* LOGIN WARNING */}

      {!user && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-700">
          Please log in to view your health report.
        </div>
      )}

      {/* STAT CARDS */}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <ReportCard
          title="Profile Information"
          value={getUserName()}
          subtitle="Personal health profile"
          icon={<User size={21} />}
          iconClass="bg-pink-500"
        />

        <ReportCard
          title="Cycle Records"
          value={periodHistory.length}
          subtitle="Period history records"
          icon={<CalendarDays size={21} />}
          iconClass="bg-purple-500"
        />

        <ReportCard
          title="Symptoms"
          value={symptoms.length}
          subtitle="Symptoms tracked"
          icon={<HeartPulse size={21} />}
          iconClass="bg-rose-500"
        />

        <ReportCard
          title="Medicines"
          value={medicines.length}
          subtitle="Medicine reminders"
          icon={<Pill size={21} />}
          iconClass="bg-orange-500"
        />

        <ReportCard
          title="Nutrition"
          value={nutrition.length}
          subtitle="Diet records"
          icon={<Utensils size={21} />}
          iconClass="bg-emerald-500"
        />

        <ReportCard
          title="Assessment"
          value={assessment ? "Available" : "Not available"}
          subtitle="Latest health assessment"
          icon={<BrainCircuit size={21} />}
          iconClass="bg-sky-500"
        />
      </section>

      {/* REPORT SUMMARY */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
            <Activity size={21} />
          </div>

          <div>
            <p className="text-sm font-semibold text-pink-500">
              Report Summary
            </p>

            <h2 className="text-xl font-bold text-slate-800">
              Your Health Data Overview
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          <SummaryItem
            label="User Name"
            value={getUserName()}
          />

          <SummaryItem
            label="Last Period"
            value={getLastPeriod()}
          />

          <SummaryItem
            label="Cycle Length"
            value={
              profile?.cycleLength ||
              profile?.cycle ||
              "Not available"
            }
          />

          <SummaryItem
            label="Symptoms Recorded"
            value={`${symptoms.length} record(s)`}
          />

          <SummaryItem
            label="Medicine Reminders"
            value={`${medicines.length} record(s)`}
          />

          <SummaryItem
            label="Latest Assessment"
            value={
              assessment
                ? "Available"
                : "Not available"
            }
          />
        </div>
      </section>

      {/* RECENT MEDICINES */}

      {medicines.length > 0 && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-slate-800">
            Active Medicine Reminders
          </h2>

          <div className="mt-4 space-y-3">
            {medicines.slice(0, 5).map((medicine) => (
              <div
                key={medicine.id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-800">
                    {medicine.name || "Medicine"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {medicine.dosage || "No dosage"}
                    {medicine.frequency
                      ? ` • ${medicine.frequency}`
                      : ""}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Active
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ==========================================
   REPORT CARD
========================================== */

function ReportCard({
  title,
  value,
  subtitle,
  icon,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-800">
            {value}
          </h3>

          <p className="mt-2 text-xs text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   SUMMARY ITEM
========================================== */

function SummaryItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

export default Reports;