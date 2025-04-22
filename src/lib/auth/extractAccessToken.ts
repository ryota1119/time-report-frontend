export const extractAccessTokenFromCookie = (cookieStr: string): string | null => {
    const match = cookieStr.match(/access_token=([^;]+)/)
    return match ? match[1] : null
}
