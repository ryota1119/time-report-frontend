'use client'

import {createContext, ReactNode, useContext} from "react"
import {User} from "@/types/user"
import {Project} from "@/types/project"

type AuthContextType = {
    user: User | null
    projects: Project[]
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    projects: [],
})

export const AuthProvider = ({
                                 user,
                                 projects,
                                 children,
                             }: {
    user: User | null
    projects: Project[]
    children: ReactNode
}) => {
    return (
        <AuthContext.Provider value={{user, projects}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
