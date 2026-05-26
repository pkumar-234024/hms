import { useState } from 'react'
import type { FormEvent } from 'react'

interface LoginFormProps {
  onLogin: (username: string, password: string) => void
  disabled?: boolean
  loading?: boolean
}

const LoginForm = ({ onLogin, disabled = false, loading = false }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onLogin(email.trim(), password)
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} id="login-form">
      {/* ── Email Field ── */}
      <div className="form-group">
        <label className="form-label" htmlFor="email-input">
          Institutional Email
        </label>
        <div className="input-wrapper">
          <span className="material-symbols-outlined">mail</span>
          <input
            id="email-input"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="dr.vance@mediflow.com"
            disabled={disabled}
            type="email"
            autoComplete="email"
            required
          />
        </div>
      </div>

      {/* ── Password Field ── */}
      <div className="form-group">
        <div className="form-group__label-row">
          <label className="form-label" htmlFor="password-input" style={{ padding: 0 }}>
            Password
          </label>
          <a href="#" className="forgot-link" id="forgot-password-link">
            Forgot Password?
          </a>
        </div>
        <div className="input-wrapper">
          <span className="material-symbols-outlined">lock</span>
          <input
            id="password-input"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={disabled}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            <span className="material-symbols-outlined">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
      </div>

      {/* ── 2FA Security Code ── */}
      <div className="form-group">
        <label className="form-label" htmlFor="2fa-input">
          2FA Security Code
        </label>
        <div className="input-wrapper">
          <span className="material-symbols-outlined">shield_lock</span>
          <input
            id="2fa-input"
            className="form-input form-input--2fa"
            placeholder="000000"
            disabled={disabled}
            type="text"
            maxLength={6}
            inputMode="numeric"
            autoComplete="one-time-code"
          />
        </div>
      </div>

      {/* ── Submit Button ── */}
      <button
        className="form-button"
        type="submit"
        id="login-submit-button"
        disabled={disabled || !email.trim() || !password}
      >
        {loading ? (
          <>
            <span className="spinner" />
            Authenticating…
          </>
        ) : (
          <>
            <span>Sign In to Portal</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </>
        )}
      </button>
    </form>
  )
}

export default LoginForm
