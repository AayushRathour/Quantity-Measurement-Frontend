import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, signupUser } from '../api/authApi'
import type { LoginRequest, SignupRequest } from '../types'

const TOKEN_KEY = 'token'

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function useAuth() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(
    async (data: LoginRequest) => {
      setLoading(true)
      setError(null)
      try {
        const token = await loginUser(data)
        setStoredToken(token)
        navigate('/dashboard')
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    },
    [navigate],
  )

  const signup = useCallback(
    async (data: SignupRequest) => {
      setLoading(true)
      setError(null)
      try {
        await signupUser(data)
        navigate('/login', { state: { signupSuccess: true } })
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    },
    [navigate],
  )

  const logout = useCallback(() => {
    clearStoredToken()
    navigate('/login')
  }, [navigate])

  return { login, signup, logout, loading, error, setError }
}
