import { createSlice } from "@reduxjs/toolkit";
import { apiBackendSlice } from "./api.slice";

const initialState = {
  customerInformation: {
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
  },
  applicantId: "",
  token: "",
  document: {
    type: "",
    country: "",
    photo: "",
  },
};

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setCustomerInformation: (state, { payload }) => ({
      ...state,
      customerInformation: payload,
    }),
    setApplicantId: (state, { payload }) => ({
      ...state,
      applicantId: payload,
    }),
    setToken: (state, { payload }) => ({ ...state, token: payload }),
    setDocumentType: (state, { payload }) => {
      state.document = { ...state.document, type: payload }
      return state
    },
    setCountry: (state, { payload }) => {
      state.document = { ...state.document, country: payload }
      return state
    },
    setPhoto: (state, { payload }) => ({
      ...state,
      document: { ...state.document, photo: payload },
    }),
  },
  extraReducers: () => { },
});

export const {
  setCustomerInformation,
  setApplicantId,
  setDocumentType,
  setCountry,
  setToken,
  setPhoto,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;

export const onBoardingApiSlice = apiBackendSlice.injectEndpoints({
  endpoints: (builder) => ({
    PostOnBoarding: builder.mutation({
      query: (args) => ({
        url: "/api/application/create",
        method: "POST",
        body: args,
      }),
    }),
    PostOnfidoToken: builder.mutation({
      query: (args) => ({
        url: `/api/application/sdk_token?applicantId=${args.applicantId}`,
        method: "GET",
      }),
    }),
    PostTakePhoto: builder.mutation({
      query: (args) => ({
        url: '/api/application/validateImage',
        method: "POST",
        body: args
      }),
    }),
  }),
});

export const { usePostOnBoardingMutation, usePostOnfidoTokenMutation, usePostTakePhotoMutation } = onBoardingApiSlice;
