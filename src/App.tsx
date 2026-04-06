import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import HistoryPage from './pages/HistoryPage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import ProtectedRoute from './components/shared/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<HomePage />} />

      {/* Public routes */}
      <Route path="/login"  element={<AuthPage defaultTab="login"  />} />
      <Route path="/signup" element={<AuthPage defaultTab="signup" />} />

      {/* Handle auth callback */}
      <Route path="/auth.html" element={<AuthCallbackPage />} />
      <Route path="/html/auth.html" element={<AuthCallbackPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
