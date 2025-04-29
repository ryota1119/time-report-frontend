import {NextRequest, NextResponse} from "next/server";
import {SsrApiClient} from "@/lib/api/client/SsrApiClient";
import {handleApiError} from "@/lib/api/errorHandler";

export async function DELETE(req: NextRequest) {
    const accessToken = req.cookies.get('access_token')?.value

    const apiClient = new SsrApiClient({accessToken})

    try {
        await apiClient.logout()
        const response = NextResponse.json({message: 'ログアウト成功'});

        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');

        return response
    } catch (error) {
        const {message, statusCode} = handleApiError(error);
        if (statusCode === 401) {
            return NextResponse.json({message: '認証エラー'}, {status: 401})
        }
        return NextResponse.json({message: message}, {status: statusCode})
    }
}