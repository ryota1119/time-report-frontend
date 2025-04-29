import Link from 'next/link'
import Image from 'next/image'
import {User} from "@/types/user";
import DropMenu from "@/components/layouts/Header/DropMenu";

export interface HeaderProps {
    user: User | null;
}

export default function Header({user}: HeaderProps) {

    return (
        <header
            className="w-full fixed z-50 bg-white shadow-md border-gray-100 px-6 py-4 flex items-center justify-between">
            <Link href={user ? "/dashboard" : "/public"}>
                <Image
                    src="/TimeReport_logo_yoko.png"
                    alt="TimeReport Logo"
                    width={160}
                    height={40}
                    style={{ height: 'auto' }}
                    priority
                />
            </Link>

            <nav className="relative flex gap-6 text-sm text-gray-600 items-center">

                {user ? (
                    <>
                        <Link href="/dashboard">ダッシュボード</Link>
                        <DropMenu/>
                        <Link href="/mypage">マイページ</Link>
                        <Link href="/logout" className="text-red-500 hover:underline">ログアウト</Link>
                    </>
                ) : (
                    <>
                        <Link href="/register">組織登録</Link>
                        <Link href="/login">ログイン</Link>
                    </>
                )}
            </nav>
        </header>
    )
}
