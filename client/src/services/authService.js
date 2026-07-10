import { auth, db } from "../firebase/firebase";

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

// ================= GOOGLE PROVIDER =================

const googleProvider = new GoogleAuthProvider();

// ================= SAVE USER =================

const saveUserToFirestore = async (user, provider = "email") => {
  const userRef = doc(db, "users", user.uid);

  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,

      fullName: user.displayName || "",

      email: user.email,

      photoURL: user.photoURL || "",

      provider,

      createdAt: serverTimestamp(),

      lastLogin: serverTimestamp(),

      // ---------- Profile ----------

      dateOfBirth: "",

      age: "",

      height: "",

      weight: "",

      bloodGroup: "",

      emergencyContact: "",

      // ---------- Cycle ----------

      cycleLength: 28,

      periodLength: 5,

      lastPeriodDate: "",

      cyclePhase: "",

      // ---------- Medical ----------

      hasPCOS: false,

      goals: [],

      symptoms: [],
    });
  } else {
    await setDoc(
      userRef,
      {
        lastLogin: serverTimestamp(),
      },
      { merge: true }
    );
  }
};

// ================= GOOGLE LOGIN =================

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    await saveUserToFirestore(result.user, "google");

    return result.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ================= EMAIL REGISTER =================

export const registerUser = async (
  name,
  email,
  password
) => {
  try {
    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await updateProfile(result.user, {
      displayName: name,
    });

    await saveUserToFirestore(
      {
        ...result.user,
        displayName: name,
      },
      "email"
    );

    return result.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ================= EMAIL LOGIN =================

export const loginUser = async (
  email,
  password
) => {
  try {
    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    await saveUserToFirestore(result.user, "email");

    return result.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};