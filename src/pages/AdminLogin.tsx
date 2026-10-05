import { Navigate, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../lib/useAuth'
import { useNoIndex } from '../lib/useNoIndex'

/** Staff-only entry point at /lgad. It is deliberately not linked from anywhere on the site. */
export default function AdminLogin() {
  const { user, adminLogin } = useAuth()
  const navigate = useNavigate()
  useNoIndex()

  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />

  return (
    <AuthCard title="Staff access" subtitle="Sign in to manage applications and enquiries.">
      <LoginForm
        submitLabel="Sign in to admin"
        onSubmit={async (email, password) => {
          await adminLogin(email, password)
          navigate('/admin', { replace: true })
        }}
      />
    </AuthCard>
  )
}
