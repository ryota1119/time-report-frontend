'use client'

export const isLoggedIn = (): boolean => {
    console.log(document.cookie)
    return document.cookie.includes('access_token=')
}
