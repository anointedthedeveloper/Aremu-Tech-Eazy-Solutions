import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../lib/useAuth'
import { useNoIndex } from '../lib/useNoIndex'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const from = (useLocation().state as { from?: string } | null)?.from
  useNoIndex()

  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />

  return (
    <AuthCard
      title="Applicant sign in"
      subtitle="Use the email and password we sent you when you applied to follow your application."
      footer={
        <>
          Haven&apos;t applied yet?{' '}
          <Link to="/apply" className="font-semibold text-violet-700 underline decoration-amber-500 underline-offset-4 dark:text-violet-400">Apply now</Link>
          <p className="mt-3 text-[13px]">Lost your password? Contact us and we&apos;ll send a new one.</p>
        </>
      }
    >
      <LoginForm
        submitLabel="Sign in"
        onSubmit={async (email, password) => {
          await login(email, password)
          navigate(from && from.startsWith('/dashboard') ? from : '/dashboard', { replace: true })
        }}
      />
    </AuthCard>
  )
}
