import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { setStoredToken } from '../hooks/useAuth'

const AuthCallbackPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')

    if (token) {
      setStoredToken(token)
      navigate('/dashboard', { replace: true })
    } else {
      navigate('/login?error=token-missing', { replace: true })
    }
  }, [location.search, navigate])

  return <div>Loading...</div>
}

export default AuthCallbackPage
