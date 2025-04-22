'use client';

import { useState } from 'react';
import LoginForm from '@/components/login/LoginForm';
import apiClient from "@/lib/api/apiClient";

export default function LoginPage() {
    const [error, setError] = useState('');

    const handleLogin = async (
        orgCode: string,
        email: string,
        password: string
    ) => {
        setError('');
        try {
            await apiClient.post(`/auth/login`, {
                "organization_code": orgCode,
                "email": email,
                "password": password
            })
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err instanceof Error ? err.message : 'ログインに失敗しました');
        }
    };

    return (
        <main className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">ログイン</h1>
            <LoginForm onLoginAction={handleLogin} error={error} />
        </main>
    );
}
