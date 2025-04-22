import Link from 'next/link';

export default function Step3() {
    return (
        <div className="flex flex-col gap-4">
            <p>登録が完了しました</p>
            <Link href="/login" className="text-blue-600 underline">ログイン画面へ</Link>
        </div>
    );
}
