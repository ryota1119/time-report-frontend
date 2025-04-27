import {Card} from "@/components/ui/card/Card";
import {redirect} from "next/navigation";
import {CardTitle} from "@/components/ui/card/CardTitle";
import {getLoginUser} from "@/lib/api/user/user";
import {isAxiosError} from "axios";

export default async function ProfilePage() {
    let user;
    try {
        user = await getLoginUser();

        return  (
            <div className="min-h-screen flex items-center justify-center">
                <Card>
                    <CardTitle>プロフィール</CardTitle>
                    <div className="space-y-2">
                        <p><span className="font-medium text-gray-600">名前：</span>{user?.name}</p>
                        <p><span className="font-medium text-gray-600">メール：</span>{user?.email}</p>
                        <p><span
                            className="font-medium text-gray-600">権限：</span>{user?.role === 'admin' ? '管理者' : '一般ユーザー'}
                        </p>
                    </div>
                </Card>
            </div>
        )
    } catch (e) {
        if (isAxiosError(e) && e.response?.status === 401) {
            redirect('/login');
        }

        return (
            <p>ユーザー情報の取得に失敗しました。</p>
        )
    }
}