import React, { useEffect } from "react";
import {
  setApplicantId,
  setCountry,
  usePostOnBoardingMutation,
} from "../store/onboarding.slice";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { onBoardingSchema } from "../schema/onboarding";
import { useNavigate } from "react-router-dom";

const countries = [
  { name: "Philippines", value: "PHL" },
  { name: "United States", value: "USA" },
];

export default function Home() {
  const [reqApplicant, resApplicant] = usePostOnBoardingMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(onBoardingSchema),
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    reqApplicant({
      firstName: "Joseph",
      lastName: "Aguilar",
      dob: new Date("10-18-1992 UTC"),
      email: "sojda018@gmail.com",
    });
  }, [reqApplicant]);

  useEffect(() => {
    if (resApplicant.isSuccess) {
      dispatch(setApplicantId(resApplicant.data.id));
    }
  }, [dispatch, resApplicant]);

  const onSubmit = (data) => {
    dispatch(setCountry(data));
    navigate("/selectId");
  };

  return (
    <Container sx={{ margin: "20px 0px" }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ minWidth: 120 }}
      >
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select label="Country" {...register("country")}>
            {countries.map((item) => (
              <MenuItem key={item.name} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          sx={{ marginTop: "20px" }}
          variant="contained"
          fullWidth
          type="submit"
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}
