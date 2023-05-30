import * as yup from "yup";

export const onBoardingSchema = yup.object().shape({
  country: yup.string().required("select your country"),
});

export const documentSchema = yup.object().shape({
  type: yup.string().required("please select document type"),
});
