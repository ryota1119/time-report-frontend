import Link from "next/link";

export default function LogoutCompletePage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Link href="/" className="bg-white hover:bg-gray-100 font-semibold py-3 px-6 rounded-md shadow transition disabled:opacity-50">
                トップページ
            </Link>
        </div>
    )
}
