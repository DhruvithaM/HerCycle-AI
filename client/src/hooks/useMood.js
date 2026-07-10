import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  getTodayMood,
  saveMood,
} from "../services/moodService";

function useMood() {
  const [mood, setMood] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const user = auth.currentUser;

  // ==========================
  // Load Today's Mood
  // ==========================

  useEffect(() => {
    async function loadMood() {
      if (!user) {
        setLoading(false);
        return;
      }

      const data =
        await getTodayMood(user.uid);

      setMood(data);

      setLoading(false);
    }

    loadMood();
  }, [user]);

  // ==========================
  // Save Mood
  // ==========================

  async function updateMood(
    moodLabel,
    cycleData
  ) {
    if (!user) return;

    const moodData = {
      mood: moodLabel,

      phase:
        cycleData?.currentPhase || "",

      cycleDay:
        cycleData?.cycleDay || 0,
    };

    const success =
      await saveMood(
        user.uid,
        moodData
      );

    if (success) {
      setMood(moodData);
    }
  }

  return {
    mood,

    loading,

    updateMood,
  };
}

export default useMood;