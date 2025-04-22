import {NextRequest, NextResponse} from 'next/server'

// 認証が必要なパスのprefix
const protectedPaths = ['/dashboard']

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl

    // 保護パスに該当しないなら通す
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path))
    if (!isProtected) return NextResponse.next()

    // cookie から access_token を取得
    const token = request.cookies.get('access_token')?.value

    const loginUrl = new URL('/login', request.url)
    // token がなければ login にリダイレクト
    if (!token) {
        return NextResponse.redirect(loginUrl)
    }

    // 認証OKならそのまま進める
    return NextResponse.next()
}
