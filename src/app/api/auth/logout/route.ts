import {NextRequest, NextResponse} from "next/server";
import {isAxiosError} from "axios";
import {BackendApiClient} from "@/lib/api/client/BackendApiClient";

export async function DELETE(req: NextRequest) {
    const accessToken = req.cookies.get('access_token')?.value

    const apiClient = new BackendApiClient({accessToken})

    try {
        await apiClient.delete("/auth/logout")
        const response = NextResponse.json({message: 'ログアウト成功'});

        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');

        return response
    } catch (e: unknown) {
        if (isAxiosError(e) && e.response?.status === 401) {
            return NextResponse.json({message: '認証エラー'}, {status: 401})
        }
        return NextResponse.json({message: 'ログアウトに失敗しました'}, {status: 500})
    }
}