import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { getStoredToken } from '../../hooks/useAuth'

interface Props {
  children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const token = getStoredToken()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
