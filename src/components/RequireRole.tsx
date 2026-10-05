import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'
import { useNoIndex } from '../lib/useNoIndex'
import type { Role } from '../lib/auth-context'

/** Renders children only for a signed-in user with the right role; otherwise sends them to the matching login page. */
export default function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  useNoIndex()

  if (loading) {
    return (
      <div role="status" className="flex min-h-[70svh] items-center justify-center">
        <span className="sr-only">Loading…</span>
        <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-violet-200 border-t-violet-600" />
      </div>
    )
  }
  if (!user) return <Navigate to={role === 'admin' ? '/lgad' : '/login'} replace state={{ from: location.pathname }} />
  if (user.role !== role) return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />
  return <>{children}</>
}
