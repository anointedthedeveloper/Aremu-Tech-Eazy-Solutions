import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api } from './api'
import { AuthContext, type AuthUser } from './auth-context'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const { user } = await api.get<{ user: AuthUser | null }>('/api/auth?action=me')
      setUser(user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const value = useMemo(
    () => ({
      user,
      loading,
      refresh,
      login: async (email: string, password: string) => {
        const { user } = await api.post<{ user: AuthUser }>('/api/auth?action=login', { email, password })
        setUser(user)
        return user
      },
      adminLogin: async (email: string, password: string) => {
        const { user } = await api.post<{ user: AuthUser }>('/api/auth?action=admin-login', { email, password })
        setUser(user)
        return user
      },
      logout: async () => {
        await api.post('/api/auth?action=logout').catch(() => {})
        setUser(null)
      },
    }),
    [user, loading, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
