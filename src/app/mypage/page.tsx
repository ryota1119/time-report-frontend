import {Card} from "@/components/elements/card/Card";
import {CardTitle} from "@/components/elements/card/CardTitle";
import {User} from "@/types/user";
import {SsrApiClient} from "@/lib/api/client/SsrApiClient";
import {cookies} from "next/headers";
import {handleApiError} from "@/lib/api/errorHandler";

export default async function MyPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    let user: User;
    const apiClient = new SsrApiClient({accessToken})
    try {
        user = await apiClient.fetchCurrentUser();
    } catch (error) {
        const {message} = handleApiError(error);
        throw new Error(message);
    }

    return (
        <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
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
}