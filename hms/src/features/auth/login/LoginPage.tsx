import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { login, logout } from '../authSlice'
import LoginForm from '../components/LoginForm'
import { Button } from '../../../components/ui/Button'
import { PublicNavBar } from '../../../components/layout/PublicNavBar'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user, status, error } = useAppSelector((state) => state.auth)
  const glowRef = useRef<HTMLDivElement>(null)
  const [showGoogleModal, setShowGoogleModal] = useState(false)

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
      <PublicNavBar />

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
                    <span>{user.roles[0]}{user.hospitalName ? ` | ${user.hospitalName}` : ''}</span>
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

              <div className="login-divider" style={{
                display: 'flex',
                alignItems: 'center',
                margin: '20px 0 16px 0',
                color: 'var(--outline)',
                fontSize: '11px',
                fontWeight: 750,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(195,198,215,0.2)' }}></div>
                <span style={{ padding: '0 12px' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(195,198,215,0.2)' }}></div>
              </div>

              <Button
                type="button"
                variant="outlined"
                colorType="primary"
                onClick={() => setShowGoogleModal(true)}
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-3 h-12 bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 transition-all font-semibold rounded-xl"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  height: '48px',
                  backgroundColor: '#ffffff',
                  color: '#1e293b',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: 'var(--r-lg)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s'
                }}
              >
                <img
                  alt="Google"
                  className="w-5 h-5 object-contain animate-pulse-soft"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJJxocefS5zl662GBbqzdYmIoLl5rg1SvPK-av2S_sHWKtcstU7FLAMAnYeedtgnL8VUi04axry2KINWOBGsA9I3g73WJZXfCtIrskVKDJDAVjXOuqmBbsPnl-40iNfGfw0qPBC_J0q11imbLCmCkY9cCP3MAc36cTuTC-d5vQ0WGq0cpTY--SlUrXIqx-kLy3BSMUKP8WFZyhy7U8m83Plmn9FCpcv6nl2JLTjcnDnTe-Ojf_dXM0Y0Z_LiYo7Nb59epBr8DZb-s"
                />
                <span>Sign in with Google</span>
              </Button>

              {/* Status / Error Messages */}
              {status === 'loading' && (
                <div className="status-message" style={{ marginTop: 'var(--sp-md)' }}>
                  <span className="material-symbols-outlined">progress_activity</span>
                  Authenticating...
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
      {/* ── Google Select Modal Overlay ── */}
      {showGoogleModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            borderRadius: '24px',
            padding: '28px',
            maxWidth: '360px',
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            animation: 'fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div>
              <img
                alt="Google"
                style={{ width: '40px', height: '40px', objectFit: 'contain', margin: '0 auto 12px auto' }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJJxocefS5zl662GBbqzdYmIoLl5rg1SvPK-av2S_sHWKtcstU7FLAMAnYeedtgnL8VUi04axry2KINWOBGsA9I3g73WJZXfCtIrskVKDJDAVjXOuqmBbsPnl-40iNfGfw0qPBC_J0q11imbLCmCkY9cCP3MAc36cTuTC-d5vQ0WGq0cpTY--SlUrXIqx-kLy3BSMUKP8WFZyhy7U8m83Plmn9FCpcv6nl2JLTjcnDnTe-Ojf_dXM0Y0Z_LiYo7Nb59epBr8DZb-s"
              />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Choose an account</h3>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', marginBottom: 0 }}>to continue to Clinical Clarity</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => {
                  setShowGoogleModal(false);
                  handleLogin('doctor@hospital.com', 'Doctor@123');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
                className="google-account-btn hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#eff4ff',
                  color: '#003c90',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>D</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 750, color: '#1e293b' }}>Dr. Julian Thorne</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>doctor@hospital.com (Clinical Care)</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowGoogleModal(false);
                  handleLogin('patient@hospital.com', 'Patient@123');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
                className="google-account-btn hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#e6f4ef',
                  color: '#006c49',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>P</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 750, color: '#1e293b' }}>Default EHR Patient</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>patient@hospital.com (Patient Portal)</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowGoogleModal(false);
                  handleLogin('admin@hospital.com', 'Admin@123');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
                className="google-account-btn hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#fff5f5',
                  color: '#ba1a1a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>A</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 750, color: '#1e293b' }}>System Administrator</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>admin@hospital.com (Operations)</div>
                </div>
              </button>
            </div>

            <Button
              variant="text"
              onClick={() => setShowGoogleModal(false)}
              style={{
                width: '100%',
                padding: '10px 0',
                color: '#64748b',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginPage
