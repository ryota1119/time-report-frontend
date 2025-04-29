'use client'

import {useState} from "react";
import Link from "next/link";

export default function DropMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="hover:text-black transition">組織 ▾</button>
            {isOpen && (
                <div
                    className="absolute top-full bg-white shadow-md rounded-xl border border-gray-100 py-2 w-40 z-50">
                    <Link href="/customers"
                          className="block px-4 py-2 hover:bg-gray-100">クライアント</Link>
                    <Link href="/projects"
                          className="block px-4 py-2 hover:bg-gray-100">プロジェクト</Link>
                    <Link href="/users"
                          className="block px-4 py-2 hover:bg-gray-100">メンバー</Link>
                </div>
            )}
        </div>
    )
}