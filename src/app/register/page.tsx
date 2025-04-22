'use client';

import {useRouter} from "next/navigation";
import {useState} from "react";

export default function Step1() {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

    const router = useRouter();
    const [orgCode, setOrgCode] = useState('');
    const [orgName, setOrgName] = useState('');
    const [error, setError] = useState('');

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${apiBase}/organizations/${orgCode}`, {
                method: 'GET',
            });

            if (res.ok) {
                setError('その組織コードはすでに使われています');
                return;
            }

            if (res.status === 404) {
                const params = new URLSearchParams({
                    organization_code: orgCode,
                    organization_name: orgName,
                });
                router.push(`/register/step2?${params.toString()}`)
            }
        } catch (err) {
            console.error(err);
            setError('通信エラーが発生しました');
        }
    };

    return (
        <main className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">組織情報の登録</h1>
            <form onSubmit={handleNext} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="組織名"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="組織コード"
                    value={orgCode}
                    onChange={(e) => setOrgCode(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-600 text-white py-2 rounded">
                    次へ
                </button>
            </form>
        </main>
    )
}