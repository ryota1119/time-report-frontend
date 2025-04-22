'use client'

import {createContext, ReactNode, useEffect, useState} from "react";
import apiClient from "@/lib/api/apiClient";

type User = {
    id: number
    name: string
    email: string
    role: 'admin' | 'member'
}

type AuthContextType = {
    user: User | null
    loading: boolean
    error: Error | null
    logout: () => void
    refreshUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    error: null,
    logout: () => {},
    refreshUser: () => Promise.resolve(),
})

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    let [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        apiClient.get('/users/me')
            .then(res => setUser(res.data))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    const logout = () => {
        apiClient.delete('/users/logout').finally(() => {
            document.cookie = 'access_token=; Max-Age=0; path=/'
            document.cookie = 'refresh_token=; Max-Age=0; path=/'
            window.location.href = '/login'
        })
    }

    const refreshUser = async () => {
        setLoading(true)
        try {
            const res = await apiClient.get('/users/me')
            setUser(res.data)
            setError(null)
        } catch (e: unknown) {
            const error = e as Error
            setUser(null)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{user, loading, error, logout, refreshUser}}>
            {children}
        </AuthContext.Provider>
    )
}