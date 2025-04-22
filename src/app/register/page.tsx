'use client'

import {useState} from 'react';
import {AnimatePresence, motion, usePresenceData, wrap} from 'motion/react';
import Step1 from '@/components/register/Step1';
import Step2 from '@/components/register/Step2';
import Step3 from '@/components/register/Step3';
import {isAxiosError} from 'axios';
import apiClient from "@/lib/api/apiClient";

export default function RegisterPage() {
    const steps = [1, 2, 3];
    const [currentStep, setCurrentStep] = useState(steps[0]);
    const [direction, setDirection] = useState<1 | -1>(1);

    const [orgCode, setOrgCode] = useState('');
    const [orgName, setOrgName] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const setSlide = (newDir: 1 | -1) => {
        const nextStep = wrap(1, steps.length + 1, currentStep + newDir);
        setCurrentStep(nextStep);
        setDirection(newDir);
    };

    const handleCheckOrganization = async () => {
        setError('');
        try {
            const res = await apiClient.get(`/organizations/${orgCode}`);
            if (res.status === 200) {
                setError('この組織コードは既に使われています。');
                return;
            }
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.response?.status === 404) {
                    setSlide(1);
                    return;
                }
            } else {
                setError('予期せぬエラーが発生しました');
            }
        }
    };

    const handleRegister = async () => {
        setError('');
        try {
            await apiClient.post(`/organizations/register`, {
                organization_code: orgCode,
                organization_name: orgName,
                user_name: userName,
                user_email: userEmail,
                password: password,
            });
            setSlide(1);
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                setError(error.message || '予期せぬエラーが発生しました');
            } else {
                setError('予期せぬエラーが発生しました');
            }
        }
    };

    const RenderedStep = () => {
        const directionData = usePresenceData();
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        key="step1"
                        initial={{opacity: 0, x: directionData * 50}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: directionData * -50}}
                        transition={{duration: 0.3}}
                    >
                        <Step1
                            orgCode={orgCode}
                            orgName={orgName}
                            onChangeCode={setOrgCode}
                            onChangeName={setOrgName}
                            onNext={handleCheckOrganization}
                            error={error}
                        />
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        key="step2"
                        initial={{opacity: 0, x: directionData * 50}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: directionData * -50}}
                        transition={{duration: 0.3}}
                    >
                        <Step2
                            userName={userName}
                            userEmail={userEmail}
                            password={password}
                            onChangeName={setUserName}
                            onChangeEmail={setUserEmail}
                            onChangePassword={setPassword}
                            onBack={() => setSlide(-1)}
                            onRegister={handleRegister}
                            error={error}
                        />
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        key="step3"
                        initial={{opacity: 0, x: directionData * 50}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: directionData * -50}}
                        transition={{duration: 0.3}}
                    >
                        <Step3/>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <main className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">組織登録</h1>
            <AnimatePresence custom={direction} initial={false} mode="popLayout">
                <RenderedStep key={currentStep}/>
            </AnimatePresence>
        </main>
    );
}
