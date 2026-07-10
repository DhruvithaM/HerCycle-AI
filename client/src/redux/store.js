import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "./profileSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },

  devTools: import.meta.env.DEV,
});

export default store;