'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useState} from 'react'
import {useAuth} from "@/hooks/useAuth";

export default function Header() {
    const {user, loading} = useAuth()
    const [isOpen, setIsOpen] = useState(false)

    console.log(user)

    return (
        <header className="w-full bg-white shadow-md border-gray-100 px-6 py-4 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
                <Image
                    src="/TimeReport_logo_yoko.png"
                    alt="TimeReport Logo"
                    width={160}
                    height={40}
                />
            </Link>

            {!loading && (
                <nav className="relative flex gap-6 text-sm text-gray-600 items-center">
                    {user ? (
                        <>
                            <Link href="/dashboard">ダッシュボード</Link>

                            <div
                                className="relative"
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)}
                            >
                                <button className="hover:text-black transition">組織 ▾</button>

                                {isOpen && (
                                    <div
                                        className="absolute top-full bg-white shadow-md rounded-xl border border-gray-100 py-2 w-40 z-50">
                                        <Link
                                            href="/customers"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            クライアント
                                        </Link>
                                        <Link
                                            href="/projects"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            プロジェクト
                                        </Link>
                                        <Link
                                            href="/users"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            メンバー
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link href="/profile">プロフィール</Link>

                            <Link href="/logout" className="text-red-500 hover:underline">
                                ログアウト
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/register">新規登録</Link>
                            <Link href="/login">ログイン</Link>
                        </>
                    )}
                </nav>
            )}
        </header>
    )
}
