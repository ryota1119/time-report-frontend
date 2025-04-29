'use client'

import {AnimatePresence, Variants} from "motion/react";
import Step1 from "@/components/register/Step1";
import Step2 from "@/components/register/Step2";
import Step3 from "@/components/register/Step3";
import {useState} from "react";
import apiClient from "@/lib/api/apiClient";
import {AxiosError, AxiosResponse, isAxiosError} from "axios";
import {CsrApiClient} from "@/lib/api/client/CsrApiClient";

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
        await apiClient.get(`/api/organizations/${organizationCode}`)
            .then((res: AxiosResponse) => {
                if (res.status === 200) {
                    setError('この組織コードは既に使われています。');
                    return;
                }
            })
            .catch((err: AxiosError) => {
                if (err.response?.status === 404) {
                    setDirection(1);
                    setStep(2);
                    return;
                }
                setError('予期せぬエラーが発生しました');
            })
    };

    const handleRegister = async () => {
        setError('');

        const apiClient = new CsrApiClient()
        await apiClient.post(`/api/organizations/register`, {
            organizationCode,
            organizationName,
            userName,
            email,
            password,
        })
            .then(() => {
                setDirection(1);
                setStep(3);
            })
            .catch((err: AxiosError) => {
                setError(err.message || '予期せぬエラーが発生しました');

            })
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
