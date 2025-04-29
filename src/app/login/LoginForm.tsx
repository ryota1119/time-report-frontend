'use client'

import {useState} from 'react'
import {Card} from "@/components/ui/card/Card";
import {CardTitle} from "@/components/ui/card/CardTitle";
import {Input} from "@/components/ui/form/Input";
import Button from "@/components/ui/buttons/Button";
import {CsrApiClient} from "@/lib/api/client/CsrApiClient";
import {handleApiError} from "@/lib/api/errorHandler";

export default function LoginForm() {
    const [organizationCode, setOrganizationCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        const apiClient = new CsrApiClient()

        await apiClient.post('/api/auth/login', {
            organizationCode: organizationCode,
            email: email,
            password: password,
        })
            .then(() => {
                window.location.href = '/dashboard';
            })
            .catch((error) => {
                const { message } = handleApiError(error);
                setError(message);
            })
            .finally(() => {
                setLoading(false)
            });
    };

    return (
        <Card className="w-full max-w-md">
            <CardTitle>ログイン</CardTitle>
            <Input
                label="組織コード"
                type="text"
                id="organizationCode"
                placeholder="例: org123"
                value={organizationCode}
                required={true}
                onChange={setOrganizationCode}
            />
            <Input
                label="メールアドレス"
                type="email"
                id="email"
                placeholder="メールアドレス"
                value={email}
                required={true}
                onChange={setEmail}
            />
            <Input
                label="パスワード"
                type="password"
                id="password"
                placeholder="パスワード"
                value={password}
                required={true}
                onChange={setPassword}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
                type="button"
                onClick={handleLogin}
                className="w-full max-w-md"
            >
                {loading ? 'ログイン中...' : 'ログイン'}
            </Button>
        </Card>
    )
}
