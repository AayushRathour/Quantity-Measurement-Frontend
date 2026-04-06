import { useState, type FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from '../../constants/units'
import GoogleLoginButton from './GoogleLoginButton'

interface FieldErrors {
  name?: string
  email?: string
  password?: string
  confirm?: string
}

export default function SignupForm() {
  const { signup, loading, error, setError } = useAuth()

  const [name, setName]             = useState('')
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [confirm, setConfirm]       = useState('')
  const [showPass, setShowPass]     = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  function validate(): boolean {
    const errors: FieldErrors = {}

    if (!NAME_REGEX.test(name.trim())) {
      errors.name = 'Name must be 3–50 letters and spaces only.'
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }

    if (!PASSWORD_REGEX.test(password)) {
      errors.password =
        'Password must be 8–20 chars and include uppercase, lowercase, number, and special character.'
    }

    if (password !== confirm) {
      errors.confirm = 'Passwords do not match.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!validate()) return
    await signup({ name: name.trim(), email: email.trim(), password })
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
        required
      />
      {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}

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
          autoComplete="new-password"
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

      {/* Confirm Password */}
      <div className="password-field">
        <input
          type={showConfirm ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
          required
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowConfirm((v) => !v)}
        >
          {showConfirm ? 'Hide' : 'Show'}
        </button>
      </div>
      {fieldErrors.confirm && <span className="field-error">{fieldErrors.confirm}</span>}

      {/* API error */}
      {error && <span className="field-error">{error}</span>}

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Creating account…' : 'Signup'}
      </button>

      <GoogleLoginButton />
    </form>
  )
}
