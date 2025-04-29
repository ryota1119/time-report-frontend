'use client'

import {AnimatePresence, Variants} from "motion/react";
import Step1 from "@/components/features/register/Step1";
import Step2 from "@/components/features/register/Step2";
import Step3 from "@/components/features/register/Step3";
import {useState} from "react";
import {CsrApiClient} from "@/lib/api/client/CsrApiClient";
import {handleApiError} from "@/lib/api/errorHandler";

export default function RegisterForm() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState<1 | -1>(1);
    const [organizationCode, setOrganizationCode] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleCheckOrganization = async () => {
        setError('');

        const apiClient = new CsrApiClient()
        try {
            const data = await apiClient.fetchOrganizationByCode(organizationCode)
            if (data) {
                setError('この組織コードは既に使われています。');
                return;
            }
        } catch (error) {
            const {message, statusCode} = handleApiError(error);
            if (statusCode === 404) {
                setDirection(1);
                setStep(2);
                return;
            }
            setError(message);
        }
    };

    const handleRegister = async () => {
        setError('');

        const apiClient = new CsrApiClient()
        try {
            await apiClient.createOrganization(
                organizationCode,
                organizationName,
                userName,
                email,
                password,
            )
            setDirection(1);
            setStep(3);
        } catch (error) {
            const {message} = handleApiError(error);
            setError(message);
        }
    };

    const stepVariants: Variants | undefined = {
        initial: (dir: number) => ({x: dir * 100, opacity: 0}),
        animate: {x: 0, opacity: 1},
        exit: (dir: number) => ({x: dir * -100, opacity: 0}),
    };

    return (
        <AnimatePresence mode="wait" initial={false} custom={direction}>
            {step === 1 && (
                <Step1
                    direction={direction}
                    organizationCode={organizationCode}
                    organizationName={organizationName}
                    setOrganizationCode={setOrganizationCode}
                    setOrganizationName={setOrganizationName}
                    handleCheckOrganization={handleCheckOrganization}
                    error={error}
                    stepVariants={stepVariants}
                />
            )}
            {step === 2 && (
                <Step2
                    direction={direction}
                    userName={userName}
                    email={email}
                    password={password}
                    error={error}
                    setUserName={setUserName}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setDirection={setDirection}
                    setStep={setStep}
                    handleRegister={handleRegister}
                    stepVariants={stepVariants}
                />
            )}

            {step === 3 && (
                <Step3 direction={direction} stepVariants={stepVariants}/>
            )}
        </AnimatePresence>
    )
}
