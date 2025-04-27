'use client';

import {useState} from 'react';
import {isAxiosError} from 'axios';
import {AnimatePresence, Variants} from 'motion/react';
import apiClient from "@/lib/api/apiClient";
import Step1 from "@/components/register/Step1";
import Step2 from "@/components/register/Step2";
import Step3 from "@/components/register/Step3";

export default function RegisterPage() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState<1 | -1>(1);
    const [orgCode, setOrgCode] = useState('');
    const [orgName, setOrgName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleCheckOrganization = async () => {
        setError('');
        try {
            const res = await apiClient.get(`/organizations/${orgCode}`);
            if (res.status === 200) {
                setError('この組織コードは既に使われています。');
                return;
            }
        } catch (error: unknown) {
            if (isAxiosError(error) && error.response?.status === 404) {
                setDirection(1);
                setStep(2);
                return;
            }
            setError('予期せぬエラーが発生しました');
        }
    };

    const handleRegister = async () => {
        setError('');
        try {
            await apiClient.post(`/organizations/register`, {
                organization_code: orgCode,
                organization_name: orgName,
                user_name: userName,
                user_email: email,
                password: password,
            });
            setDirection(1);
            setStep(3);
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                setError(error.message || '予期せぬエラーが発生しました');
            } else {
                setError('予期せぬエラーが発生しました');
            }
        }
    };

    const stepVariants: Variants | undefined = {
        initial: (dir: number) => ({x: dir * 100, opacity: 0}),
        animate: {x: 0, opacity: 1},
        exit: (dir: number) => ({x: dir * -100, opacity: 0}),
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
                {step === 1 && (
                    <Step1
                        direction={direction}
                        orgCode={orgCode}
                        orgName={orgName}
                        setOrgCode={setOrgCode}
                        setOrgName={setOrgName}
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
        </div>
    );
}
