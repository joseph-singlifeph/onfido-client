import * as yup from "yup";

export const onBoardingSchema = yup.object().shape({
  country: yup.string().required("country is required"),
});
