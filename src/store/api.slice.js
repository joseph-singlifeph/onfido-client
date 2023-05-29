import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiBackendSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URI,
    // prepareHeaders: (headers) => {
    //   const token = localStorage?.getItem("accessToken");
    // if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //     headers.set("x_app_key", `${process.env.REACT_APP_X_APP_KEY}`);
    // }
    // return headers;
    // },
  }),
  tagTypes: ["Quotes"],
  endpoints: () => ({}),
});
