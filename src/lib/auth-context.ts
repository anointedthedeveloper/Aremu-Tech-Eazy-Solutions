import { createContext } from 'react'

export type Role = 'admin' | 'applicant'

export interface AuthUser {
  role: Role
  email: string
  name: string
  mustChangePassword: boolean
}

export interface AuthContextValue {
  user: AuthUser | null
  /** True until the first "who am I" check finishes. */
  loading: boolean
  login: (email: string, password: string) => Promise<AuthUser>
  adminLogin: (email: string, password: string) => Promise<AuthUser>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => {
    throw new Error('AuthProvider missing')
  },
  adminLogin: async () => {
    throw new Error('AuthProvider missing')
  },
  logout: async () => {},
  refresh: async () => {},
})
