'use client'

import { useEffect, useState } from 'react'
import apiClient from '@/lib/api/apiClient'

type UserInfo = {
    id: number
    name: string
    email: string
    role: 'admin' | 'user'
}

export default function ProfilePage() {
    const [user, setUser] = useState<UserInfo | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        apiClient.get('/users/me')
            .then(res => setUser(res.data))
            .catch(err => {
                console.error(err)
                setError('ユーザー情報の取得に失敗しました')
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p className="text-gray-500 text-center mt-8">読み込み中...</p>
    if (error) return <p className="text-red-500 text-center mt-8">{error}</p>

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6 border border-gray-100">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">プロフィール</h1>
            <div className="space-y-2">
                <p><span className="font-medium text-gray-600">名前：</span>{user?.name}</p>
                <p><span className="font-medium text-gray-600">メール：</span>{user?.email}</p>
                <p><span className="font-medium text-gray-600">権限：</span>{user?.role === 'admin' ? '管理者' : '一般ユーザー'}</p>
            </div>
        </div>
    )
}
