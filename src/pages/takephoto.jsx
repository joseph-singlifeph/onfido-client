import { setCustomerInformation, setPhoto } from "../store/onboarding.slice";
import { Box, Button, Container, IconButton, Modal, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import { useDispatch, useSelector } from "react-redux";
import { PhotoCamera } from "@mui/icons-material"
import { extractData, uploadDocument } from "@/api/onfido";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TakePhoto() {
    const camera = useRef(null);
    const dispatch = useDispatch();
    const applicantId = useSelector(({ onboarding: { applicantId } }) => applicantId)
    const { type, country } = useSelector(({ onboarding: { document } }) => document)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleTakePhoto = async () => {
        const photo = camera.current.takePhoto();

        const respose = await fetch(photo)
        const blob = await respose.blob();
        const file = new File([blob], "document.png", { type: "image/png" })

        dispatch(setPhoto(photo));

        const formData = new FormData();
        formData.append('type', type);
        formData.append('file', file);
        formData.append('side', 'front');
        formData.append('issuing_country', country);
        formData.append('applicant_id', applicantId);
        formData.append('validate_image_quality', true);

        // const document = await uploadDocument({ type, side: "front", issuingCountry: country, applicantId, validateImageQuality: true, file });
        // if (document.status !== 422) {
        //     const { id: documentId } = await document.json();

        //     const extractDataResponse = await extractData(documentId);

        //     const { extractedData } = await extractDataResponse.json();

        //     console.log(extractData);

        //     dispatch(setCustomerInformation(extractedData));

        //     handleNextStep();
        // } else {
        //     const data = await document.json();
        //     setMessage(data.fields.document_detection[0]);
        //     setOpen(true);
        // }

    }

    const handleClose = () => {
        setOpen(false);
    }

    return (<Container sx={{ margin: "20px 0px" }}>

        <Camera ref={camera} width="100%" height="100%" />
        <Box width="100%" height="30vh" sx={{ zIndex: "2", position: "relative" }}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        There is an error on image
                    </Typography>
                    <Typography align="center" id="modal-modal-description" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                    <Box alignItems="center" align="center">
                        <Button variant="contained" color="secondary" onClick={handleClose}>Retry</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
        <Box width="100%" height="40vh" sx={{ zIndex: "2", position: "relative" }}>
            <Box sx={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(to right, white 4px, transparent 4px) 0 0, linear-gradient(to right, white 4px, transparent 4px) 0 100%, linear-gradient(to left, white 4px, transparent 4px) 100% 0, linear-gradient(to left, white 4px, transparent 4px) 100% 100%, linear-gradient(to bottom, white 4px, transparent 4px) 0 0, linear-gradient(to bottom, white 4px, transparent 4px) 100% 0, linear-gradient(to top, white 4px, transparent 4px) 0 100%,linear-gradient(to top, white 4px, transparent 4px) 100% 100%;",
                backgroundRepeat: "no-repeat",
                backgroundSize: "20px 20px",
            }}>
            </Box>
        </Box>
        <Box width="100%" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", background: "rgba(0,0,0,0.3); ", zIndex: "3", position: "relative", padding: "0px 25px", margin: "0px -25px" }}>
            <Typography color="#ffffff">Position the front of your ID in the frame.</Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton color="primary" size="large" onClick={handleTakePhoto}><PhotoCamera sx={{ fontSize: 50 }} /></IconButton>
            </Box>
            <Box></Box>
        </Box>
    </Container >)
}