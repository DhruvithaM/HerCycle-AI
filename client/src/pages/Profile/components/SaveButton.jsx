import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../../../firebase/firebase";

import { updateProfile } from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

function SaveButton({ formData }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }

      // ==========================
      // Update Firebase Auth
      // ==========================

      await updateProfile(user, {
        displayName:
          formData.fullName || "",

        photoURL:
          formData.photoURL || "",
      });

      await user.reload();

      // ==========================
      // Save Firestore Profile
      // ==========================

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,

          fullName:
            formData.fullName || "",

          email:
            user.email || "",

          photoURL:
            formData.photoURL || "",

          provider:
            user.providerData?.[0]
              ?.providerId || "email",

          createdAt:
            serverTimestamp(),

          lastLogin:
            serverTimestamp(),

          // ==================
          // Personal Info
          // ==================

          phone:
            formData.phone || "",

          dateOfBirth:
            formData.dateOfBirth || "",

          age:
            Number(formData.age) || 0,

          gender:
            formData.gender || "",

          occupation:
            formData.occupation || "",

          // ==================
          // Health
          // ==================

          height:
            Number(formData.height) || 0,

          weight:
            Number(formData.weight) || 0,

          bloodGroup:
            formData.bloodGroup || "",

          emergencyContact:
            formData.emergencyContact || "",

          // ==================
          // Menstrual
          // ==================

          lastPeriodDate:
            formData.lastPeriodDate || "",

          cycleLength:
            Number(
              formData.cycleLength
            ) || 28,

          periodLength:
            Number(
              formData.periodLength
            ) || 5,

          cyclePhase:
            formData.cyclePhase || "",

          hasPCOS:
            formData.hasPCOS || false,

          // ==================
          // Goals
          // ==================

          goals:
            formData.goals || [],

          symptoms:
            formData.symptoms || [],
        },
        {
          merge: true,
        }
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        "Unable to save profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="pt-6"
    >
      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-gradient-to-r
          from-pink-500
          via-pink-500
          to-purple-600
          px-6
          py-4
          text-lg
          font-semibold
          text-white
          shadow-[0_15px_35px_rgba(236,72,153,.35)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_20px_45px_rgba(236,72,153,.45)]
          disabled:cursor-not-allowed
          disabled:opacity-70
        "
      >
        {loading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />
            Saving Profile...
          </>
        ) : (
          <>
            Save & Continue
            <ArrowRight size={20} />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-sm text-slate-500">
        Your information is securely encrypted and used only to personalize your
        HerCycle AI experience.
      </p>
    </motion.div>
  );
}

export default SaveButton;