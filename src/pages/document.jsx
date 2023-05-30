
import { useForm } from "react-hook-form";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { documentSchema } from "../schema/onboarding";
import { yupResolver } from "@hookform/resolvers/yup";
import { setDocumentType } from "../store/onboarding.slice";
import { useNavigate } from "react-router-dom";

const documentTypes = [
    { value: "passport", name: "Passport" },
    { value: "driving_licence", name: "Driving License" },
    { value: "national_identity_card", name: "National Identity Card" },
];



export default function DocumentReview() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(documentSchema),
    });

    const onSubmit = (data) => {
        dispatch(setDocumentType(data.type));
        navigate("/onfido")
    }


    return (<Container sx={{ margin: "20px 0px" }}>
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ minWidth: 120 }}
        >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">ID Type</InputLabel>
                <Select
                    {...register("type")}
                    label="ID Type"
                >
                    {documentTypes.map((item) => (
                        <MenuItem key={item.name} value={item.value}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button sx={{ marginTop: "20px" }} variant="contained" fullWidth type="submit">Next</Button>
        </Box>
    </Container>)
}