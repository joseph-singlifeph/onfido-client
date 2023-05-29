import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiBackendSlice } from "./api.slice";
import onboardingSlice from "./onboarding.slice";
export const store = configureStore({
  reducer: {
    onboarding: onboardingSlice,
    [apiBackendSlice.reducerPath]: apiBackendSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiBackendSlice.middleware),
});

setupListeners(store.dispatch);
