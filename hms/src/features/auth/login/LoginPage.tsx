import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { login, logout } from '../authSlice'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user, status, error } = useAppSelector((state) => state.auth)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleLogin = async (email: string, password: string) => {
    try {
      await dispatch(login({ email, password })).unwrap()
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('Login failed:', msg)
    }
  }

  // Subtle glow follows cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 40
      const y = (e.clientY / window.innerHeight - 0.5) * 40
      glowRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* ── Top Navigation Bar ── */}
      <header className="top-nav" id="top-nav">
        <div className="top-nav__brand">
          <span className="material-symbols-outlined">clinical_notes</span>
          <span className="top-nav__brand-name">MediFlow</span>
        </div>
        <div className="top-nav__actions">
          <button className="top-nav__help-btn" id="help-button" aria-label="Help">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="login-main">
        {/* Background glow */}
        <div className="login-main__glow" ref={glowRef} aria-hidden="true" />

        {user ? (
          /* ── Welcome / Success State ── */
          <section className="login-section" id="welcome-section">
            <div className="login-success">
              {/* Avatar */}
              <div className="login-success__avatar-wrapper">
                <div className="login-success__avatar-pulse" />
                <div className="login-success__avatar">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div className="login-success__check">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
              </div>

              {/* Info */}
              <div className="login-success__info">
                <h2>Welcome back,<br />{user.firstName || user.email}</h2>
                {user.roles && user.roles.length > 0 && (
                  <div className="login-success__role">
                    <span className="login-success__role-dot" />
                    <span>{user.roles[0]}{user.hospitalName ? ` • ${user.hospitalName}` : ''}</span>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="login-success__stats">
                <div className="login-success__stat-card glass-panel">
                  <span className="stat-label">Active Patients</span>
                  <p className="stat-value">—</p>
                </div>
                <div className="login-success__stat-card glass-panel">
                  <span className="stat-label">Appointments</span>
                  <p className="stat-value">—</p>
                </div>
              </div>

              {/* Actions */}
              <button 
                className="secondary-button glass-panel" 
                id="enter-dashboard-btn"
                onClick={() => navigate('/')}
              >
                <span className="material-symbols-outlined">dashboard</span>
                <span>Enter Dashboard</span>
              </button>

              <button
                className="secondary-button"
                id="logout-button"
                onClick={() => dispatch(logout())}
                style={{ color: 'var(--error)', height: 40 }}
              >
                Sign Out
              </button>

              <p className="login-success__sync">Last sync: Just now</p>
            </div>
          </section>
        ) : (
          /* ── Login State ── */
          <section className="login-section" id="login-section">
            {/* Header */}
            <div className="login-section__header">
              <h1>Secure Provider Access</h1>
              <p>Enter your credentials to access clinical data</p>
            </div>

            {/* Login Card */}
            <div className="login-card glass-panel medical-glow">
              <LoginForm
                onLogin={handleLogin}
                disabled={status === 'loading'}
                loading={status === 'loading'}
              />

              {/* Status / Error Messages */}
              {status === 'loading' && (
                <div className="status-message" style={{ marginTop: 'var(--sp-md)' }}>
                  <span className="material-symbols-outlined">progress_activity</span>
                  Authenticating…
                </div>
              )}
              {error && (
                <div className="error-message" role="alert" style={{ marginTop: 'var(--sp-md)' }}>
                  <span className="material-symbols-outlined">error</span>
                  {error}
                </div>
              )}

              {/* Request Access */}
              <div className="card-footer" style={{ marginTop: 'var(--sp-md)' }}>
                <p>
                  New to the network?{' '}
                  <a href="#" id="request-access-link">Request Access</a>
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <span className="material-symbols-outlined">verified_user</span>
                <span>HIPAA Compliant</span>
              </div>
              <div className="trust-badge">
                <span className="material-symbols-outlined">lock_reset</span>
                <span>AES-256 Encrypted</span>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ── Footer Disclaimer ── */}
      <footer className="login-footer">
        <div className="login-footer__box">
          <p>
            Unauthorized access to this health information system is strictly
            prohibited and subject to legal action. All activity is logged and
            monitored for clinical compliance and security auditing purposes.
          </p>
        </div>
      </footer>
    </>
  )
}

export default LoginPage
