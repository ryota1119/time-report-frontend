'use client'

import {useState} from 'react'
import {login} from "@/lib/api/auth/login";
import {AxiosError} from "axios";
import {Card} from "@/components/ui/card/Card";
import {CardTitle} from "@/components/ui/card/CardTitle";
import {Input} from "@/components/ui/form/Input";
import Button from "@/components/ui/buttons/Button";

export default function LoginForm() {
    const [orgCode, setOrgCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            await login(orgCode, email, password);
            window.location.href = '/dashboard';
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response?.status === 401) {
                setError('認証に失敗しました。メールアドレスまたはパスワードが間違っています。');
            } else {
                setError('ログインに失敗しました');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardTitle>ログイン</CardTitle>
            <Input
                type="text"
                id="organizationCode"
                placeholder="例: org123"
                value={orgCode}
                required={true}
                onChange={setOrgCode}
            >
                組織コード
            </Input>
            <Input
                type="email"
                id="email"
                placeholder="メールアドレス"
                value={email}
                required={true}
                onChange={setEmail}
            >
                メールアドレス
            </Input>
            <Input
                type="password"
                id="password"
                placeholder="パスワード"
                value={password}
                required={true}
                onChange={setPassword}
            >
                パスワード
            </Input>
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
