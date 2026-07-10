import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

import ProfileHeader from "./components/ProfileHeader";
import ProfileAvatar from "./components/ProfileAvatar";
import PersonalInfo from "./components/PersonalInfo";
import HealthInfo from "./components/HealthInfo";
import MenstrualHealth from "./components/MenstrualHealth";
import HealthGoals from "./components/HealthGoals";
import SaveButton from "./components/SaveButton";

function ProfileSetup() {
  const [formData, setFormData] = useState({
    // Firebase
    uid: "",
    fullName: "",
    email: "",
    photoURL: "",
    provider: "",

    // Personal
    phone: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    occupation: "",

    // Health
    height: "",
    weight: "",
    bloodGroup: "",
    emergencyContact: "",

    // Menstrual
    lastPeriodDate: "",
    cycleLength: "",
    periodLength: "",
    cyclePhase: "",
    hasPCOS: false,

    // Goals
    goals: [],

    // Symptoms
    symptoms: [],
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const userRef = doc(db, "users", user.uid);

        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();

          setFormData({
            uid: user.uid,

            fullName:
              data.fullName ||
              user.displayName ||
              "",

            email:
              data.email ||
              user.email ||
              "",

            photoURL:
              data.photoURL ||
              user.photoURL ||
              "",

            provider:
              data.provider ||
              user.providerData?.[0]?.providerId ||
              "email",

            phone:
              data.phone || "",

            dateOfBirth:
              data.dateOfBirth || "",

            age:
              data.age || "",

            gender:
              data.gender || "",

            occupation:
              data.occupation || "",

            height:
              data.height || "",

            weight:
              data.weight || "",

            bloodGroup:
              data.bloodGroup || "",

            emergencyContact:
              data.emergencyContact || "",

            lastPeriodDate:
              data.lastPeriodDate || "",

            cycleLength:
              data.cycleLength || "",

            periodLength:
              data.periodLength || "",

            cyclePhase:
              data.cyclePhase || "",

            hasPCOS:
              data.hasPCOS || false,

            goals:
              data.goals || [],

            symptoms:
              data.symptoms || [],
          });
        } else {
          setFormData((prev) => ({
            ...prev,

            uid: user.uid,

            fullName:
              user.displayName || "",

            email:
              user.email || "",

            photoURL:
              user.photoURL || "",

            provider:
              user.providerData?.[0]?.providerId ||
              "email",
          }));
        }
      } catch (error) {
        console.error(
          "Error loading profile:",
          error
        );
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF7FB] via-[#FFF9FD] to-[#F7F2FF] py-8 sm:py-10 lg:py-14">

      {/* Background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-pink-300/25 blur-3xl" />

        <div className="absolute right-0 top-20 h-[28rem] w-[28rem] rounded-full bg-purple-300/20 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-pink-200/20 blur-3xl" />

        <div className="absolute left-20 top-40 h-3 w-3 rounded-full bg-pink-300 opacity-70" />

        <div className="absolute right-20 top-72 h-2 w-2 rounded-full bg-purple-300 opacity-70" />

        <div className="absolute bottom-32 left-1/4 h-2 w-2 rounded-full bg-pink-400 opacity-60" />

        <div className="absolute bottom-40 right-24 h-3 w-3 rounded-full bg-pink-300 opacity-60" />

      </div>

      {/* Main Container */}

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-[32px] border border-white/60 bg-white/80 shadow-[0_20px_80px_rgba(236,72,153,.12)] backdrop-blur-2xl"
        >

          <div className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">

            <ProfileHeader />

            <div className="mt-8">
              <ProfileAvatar
                formData={formData}
                setFormData={setFormData}
              />
            </div>

            <div className="mt-10 space-y-6">

              <PersonalInfo
                formData={formData}
                setFormData={setFormData}
              />

              <HealthInfo
                formData={formData}
                setFormData={setFormData}
              />

              <MenstrualHealth
                formData={formData}
                setFormData={setFormData}
              />

              <HealthGoals
                formData={formData}
                setFormData={setFormData}
              />

              <SaveButton
                formData={formData}
              />

            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-500">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 0h12a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a5 5 0 00-10 0v1H6a2 2 0 00-2 2v5a2 2 0 002 2z"
                />
              </svg>

              <span>
                Your information is securely encrypted and protected by HerCycle AI.
              </span>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default ProfileSetup;