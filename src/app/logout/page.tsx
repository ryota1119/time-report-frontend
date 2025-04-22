'use client'

import { useState } from 'react'
import apiClient from '@/lib/api/apiClient'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogout = async () => {
        setLoading(true)
        try {
            await apiClient.delete('/auth/logout')

            // Cookieを削除（HttpOnlyでなければこれでOK）
            document.cookie = 'access_token=; Max-Age=0; path=/'
            document.cookie = 'refresh_token=; Max-Age=0; path=/'

            // 完了ページへ遷移
            router.push('/logout/complete')
        } catch (err) {
            console.error('ログアウト失敗:', err)
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <button
                onClick={handleLogout}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-md shadow transition disabled:opacity-50"
            >
                {loading ? 'ログアウト中...' : 'ログアウト'}
            </button>
        </div>
    )
}
