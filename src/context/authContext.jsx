import React, {
    useState,
    useContext,
    createContext,
    useLayoutEffect,
} from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    return (
        <AuthContext.Provider value={AuthValue()}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

function AuthValue() {
    const [isAuth, setIsAuth] = useState(false)
    const [token, setToken] = useState(
        localStorage.getItem('access-token') || null
    )

    const login = async (user, token) => {
        localStorage.setItem('email', user?.email)
        localStorage.setItem('userId', user?.email)
        localStorage.setItem('displayName', user?.displayName)
        localStorage.setItem('access-token', token)
        setIsAuth(true)
        setToken(token)
        return true
    }

    const logout = () => {
        localStorage.removeItem('email')
        localStorage.removeItem('userId')
        localStorage.removeItem('access-token')
        setIsAuth(false)
    }

    useLayoutEffect(() => {
        setIsAuth(!!localStorage.getItem('access-token'))
    }, [])

    return {
        isAuth,
        token,
        login,
        logout,
    }
}
