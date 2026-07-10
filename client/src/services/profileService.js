import { auth, db } from "../firebase/firebase";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import {
  setProfile,
  clearProfile,
  setLoading,
  setError,
} from "../redux/profileSlice";

import {
  onAuthStateChanged,
} from "firebase/auth";

export const initializeProfileListener = (store) => {
  store.dispatch(setLoading(true));

  let unsubscribeProfile = null;

  const unsubscribeAuth = onAuthStateChanged(
    auth,
    (user) => {
      if (!user) {
        if (unsubscribeProfile) {
          unsubscribeProfile();
        }

        store.dispatch(clearProfile());
        store.dispatch(setLoading(false));

        return;
      }

      const userRef = doc(db, "users", user.uid);

      unsubscribeProfile = onSnapshot(
        userRef,
        (snapshot) => {
          if (snapshot.exists()) {
            store.dispatch(
              setProfile(snapshot.data())
            );
          }

          store.dispatch(setLoading(false));
        },
        (error) => {
          console.error(error);

          store.dispatch(setError(error.message));

          store.dispatch(setLoading(false));
        }
      );
    }
  );

  return () => {
    unsubscribeAuth();

    if (unsubscribeProfile) {
      unsubscribeProfile();
    }
  };
};