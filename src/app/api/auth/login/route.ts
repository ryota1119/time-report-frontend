import {NextRequest, NextResponse} from "next/server";
import {AxiosError} from "axios";
import {BackendApiClient} from "@/lib/api/client/BackendApiClient";
import {LoginResponse} from "@/types/auth";
import {handleApiError} from "@/lib/api/errorHandler";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const {organizationCode, email, password} = body

    if (!organizationCode || !email || !password) {
        return NextResponse.json({message: '全ての項目を入力してください'}, {status: 400})
    }

    const accessToken = req.cookies.get("access_token")?.value || "";

    const apiClient = new BackendApiClient({ accessToken })

    try {
        const res = await apiClient.post<LoginResponse>("/auth/login", {
            organizationCode,
            email,
            password,
        })

        const {access_token, refresh_token, expires_at} = res.data

        const response = NextResponse.json({message: 'ログイン成功'})

        response.cookies.set("access_token", access_token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            expires: new Date(expires_at),
        })

        response.cookies.set("refresh_token", refresh_token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            // 通常 refresh_token の有効期限は access より長いので調整してもOK
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30日後
        })

        return response
    } catch (error) {
        const {message, statusCode} = handleApiError(error)
        console.log(message)
        return NextResponse.json({message: message}, {status: statusCode})
    }
}