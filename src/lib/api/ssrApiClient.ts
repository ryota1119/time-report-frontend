import axios, {AxiosInstance} from 'axios'
import {extractAccessTokenFromCookie} from "@/lib/auth/extractAccessToken";

type ContextLike = {
    req: {
        headers: { cookie?: string }
    }
}

export const createSsrApiClient = (ctx: ContextLike): AxiosInstance => {
    const cookieStr = ctx.req.headers.cookie || '';
    const accessToken = extractAccessTokenFromCookie(cookieStr)

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1',
        headers: {
            "Content-Type": "application/json",
            ...(accessToken &&
                { Authorization: `Bearer ${accessToken}` }
            ),
        },
        withCredentials: true,
    })
}