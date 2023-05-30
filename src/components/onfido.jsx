import { init } from "onfido-sdk-ui";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Onfido({ completeOnfido, steps }) {
    const document = useSelector(({ onboarding: { document } }) => document)
    const token = useSelector(({ onboarding: { token } }) => token)
    useEffect(() => {

        const onfido = init({
            token,
            containerId: 'onfido',
            smsNumberCountryCode: document.country,
            onComplete: async (data) => {
                await completeOnfido(data)
                onfido.tearDown();
            },
            steps,
            overrideSdkConfiguration: {
                document_capture: {
                    enable_js_camera_doc_capture: true,
                },
                sdk_features: {
                    logger: {
                        enabled: true,
                    },
                }
            }
        });

    }, [completeOnfido, steps, token, document.country])

    return (
        <div id="onfido"></div>
    )
}