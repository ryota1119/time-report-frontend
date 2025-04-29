'use client'

import {useState} from "react";
import Button from "@/components/ui/buttons/Button";
import {CsrApiClient} from "@/lib/api/client/CsrApiClient";
import {handleApiError} from "@/lib/api/errorHandler";

export default function LogoutButton() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogout = async () => {
        setLoading(true)
        setError(null)

        const apiClient = new CsrApiClient()
        await apiClient.delete("/api/auth/logout")
            .then(() => {
                window.location.href = '/logout/complete';
            })
            .catch((error) => {
                const { message } = handleApiError(error);
                setError(message)
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