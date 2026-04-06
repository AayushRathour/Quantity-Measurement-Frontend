import { useState, type FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants/units'
import GoogleLoginButton from './GoogleLoginButton'

export default function LoginForm() {
  const { login, loading, error, setError } = useAuth()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})

  function validate(): boolean {
    const errors: typeof fieldErrors = {}

    if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }

    if (!PASSWORD_REGEX.test(password)) {
      errors.password =
        'Password must be 8–20 chars and include uppercase, lowercase, number, and special character.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!validate()) return
    await login({ email: email.trim(), password })
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {/* Email */}
      <input
        type="email"
        placeholder="Email Id"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />
      {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}

      {/* Password */}
      <div className="password-field">
        <input
          type={showPass ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPass((v) => !v)}
        >
          {showPass ? 'Hide' : 'Show'}
        </button>
      </div>
      {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}

      {/* API error */}
      {error && <span className="field-error">{error}</span>}

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Logging in…' : 'Login'}
      </button>

      <GoogleLoginButton />
    </form>
  )
}
