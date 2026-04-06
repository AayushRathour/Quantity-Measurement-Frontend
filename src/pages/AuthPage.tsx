import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AuthLeft from '../components/auth/AuthLeft'
import LoginForm from '../components/auth/LoginForm'
import SignupForm from '../components/auth/SignupForm'
import { setStoredToken, getStoredToken } from '../hooks/useAuth'
import '../styles/auth.css'

interface Props {
  defaultTab?: 'login' | 'signup'
}

export default function AuthPage({ defaultTab = 'login' }: Props) {
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab)
  const navigate      = useNavigate()
  const location      = useLocation()

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (getStoredToken()) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  // Handle OAuth2 redirect: /login?token=xxx  or  /login?oauthError=true
  useEffect(() => {
    const params      = new URLSearchParams(location.search)
    const oauthToken  = params.get('token')
    const oauthError  = params.get('oauthError')

    if (oauthToken) {
      setStoredToken(oauthToken)
      navigate('/dashboard', { replace: true })
    }

    if (oauthError) {
      // Clear the query string and stay on login
      navigate('/login', { replace: true })
      alert('Google login failed. Please try again.')
    }
  }, [location.search, navigate])

  // Show success banner when redirected here after signup
  const signupSuccess = (location.state as { signupSuccess?: boolean } | null)
    ?.signupSuccess ?? false

  return (
    <div className="auth-body">
      <div className="auth-container">
        <AuthLeft />

        <div className="auth-right">
          {/* Tabs */}
          <div className="tabs">
            <span
              className={tab === 'login' ? 'active' : ''}
              onClick={() => setTab('login')}
            >
              LOGIN
            </span>
            <span
              className={tab === 'signup' ? 'active' : ''}
              onClick={() => setTab('signup')}
            >
              SIGNUP
            </span>
          </div>

          {/* Signup success banner */}
          {tab === 'login' && signupSuccess && (
            <div className="success-banner">
              Account created! Please log in.
            </div>
          )}

          {/* Forms */}
          {tab === 'login' ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  )
}
