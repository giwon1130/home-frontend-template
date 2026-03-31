import { createContext, useContext, useMemo, useState } from 'react'
import { loginApi } from '../api/authApi'
import type { LoginUser } from '../types/api'

const TOKEN_KEY = 'home-token'

type AuthContextValue = {
  token: string | null
  user: LoginUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState<LoginUser | null>(null)

  const login = async (email: string, password: string) => {
    const response = await loginApi({ email, password })

    if (!response.success || !response.data) {
      throw new Error(response.message ?? 'Login failed')
    }

    setToken(response.data.token)
    setUser(response.data.user)
    localStorage.setItem(TOKEN_KEY, response.data.token)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(TOKEN_KEY)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAuthenticated: token !== null,
      login,
      logout,
    }),
    [token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
