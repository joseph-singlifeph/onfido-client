import React, { useEffect, useState } from 'react'
import { setToken, usePostOnfidoTokenMutation } from '../store/onboarding.slice'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Onfido from '../components/onfido'

export default function LiveLinessCheck() {
    const applicantId = useSelector(({ onboarding: { applicantId } }) => applicantId)
    const [loading, setLoading] = useState(false)
    const [reqGeToken, resGetToken] = usePostOnfidoTokenMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const steps = [
        {
            type: "face",
            "options": {
                requestedVariant: "motion",
            }
        },
    ]

    const completeOnfido = async (data) => {
        try {
            const response = await axios.post("http://localhost:4000/onfido/check", {
                applicant_id: applicantId, reportNames: ['facial_similarity_motion'], webhookIds: [`${process.env.REACT_APP_WEBHOOK_ID}`]
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })

            console.log("response", response)
        } catch (error) {
            console.log("error", error)
        } finally {
            navigate("/nextpage")
        }
    }


    useEffect(() => {
        reqGeToken({ applicantId })
    }, [reqGeToken, applicantId])

    useEffect(() => {
        if (resGetToken.isSuccess) {
            setLoading(false)
            dispatch(setToken(resGetToken.data.sdkToken))
        }
        if (resGetToken.isLoading) {
            setLoading(true)
        }
    }, [resGetToken, dispatch])

    return (
        <>
            {loading ? <h1>Loading</h1> : <Onfido steps={steps} completeOnfido={completeOnfido} />}
        </>
    )
}