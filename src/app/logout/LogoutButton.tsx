'use client'

import {useState} from "react";
import {logout} from "@/lib/api/auth/logout";
import {isAxiosError} from "axios";
import Button from "@/components/ui/buttons/Button";

export default function LogoutButton() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogout = async () => {
        setLoading(true)
        setError(null)
        logout()
            .then(async res => {
                console.log(res)
                if (res.status === 200) {
                    window.location.href = '/logout/complete';
                } else {
                    setError('ログアウトに失敗しました。もう一度お試しください。')
                }
            })
            .catch((e: unknown) => {
                if (isAxiosError(e)) {
                    setError(`通信エラーが発生しました（${e.response?.status ?? '不明'}）`)
                } else {
                    setError('予期しないエラーが発生しました。')
                }
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <Button
                onClick={handleLogout}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600"
            >
                {loading ? 'ログアウト中...' : 'ログアウト'}
            </Button>
            {error && (
                <div className="text-red-500 mb-4">
                    {error}
                </div>
            )}
        </>
    )
}