'use client';

import {useState} from 'react';

type Props = {
    onLoginAction: (orgCode: string, email: string, password: string) => Promise<void>;
    error: string;
};

export default function LoginForm({onLoginAction, error}: Props) {
    const [orgCode, setOrgCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onLoginAction(orgCode, email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="組織コード"
                name="organization_code"
                value={orgCode}
                onChange={(e) => setOrgCode(e.target.value)}
                className="border p-2 rounded"
                required
            />
            <input
                type="email"
                placeholder="メールアドレス"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded"
                required
            />
            <input
                type="password"
                placeholder="パスワード"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded"
                required
            />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-blue-600 text-white py-2 rounded">
                ログイン
            </button>
        </form>
    );
}
