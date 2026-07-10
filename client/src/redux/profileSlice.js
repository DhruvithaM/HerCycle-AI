import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    uid: "",
    fullName: "",
    email: "",
    photoURL: "",
    provider: "",

    phone: "",
    gender: "",
    occupation: "",

    dateOfBirth: "",
    age: "",

    height: "",
    weight: "",
    bloodGroup: "",
    emergencyContact: "",

    cycleLength: 28,
    periodLength: 5,
    lastPeriodDate: "",
    cyclePhase: "",

    hasPCOS: false,

    goals: [],
    symptoms: [],
  },

  loading: false,

  error: null,
};

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },

    updateProfile(state, action) {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },

    clearProfile(state) {
      state.profile = initialState.profile;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  clearProfile,
  setLoading,
  setError,
} = profileSlice.actions;

export default profileSlice.reducer;