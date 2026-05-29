import { useAppDispatch } from '../../app/hooks'
import { logout } from '../auth/authSlice'

const SettingsPage = () => {
  const dispatch = useAppDispatch()

  return (
    <div className="fade-up">
      <div className="glass-card glass-card--flat" style={{ padding: 0, marginBottom: 'var(--sp-lg)' }}>
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="material-symbols-outlined">person</span>
            <div className="profile-avatar__edit">
              <span className="material-symbols-outlined">edit</span>
            </div>
          </div>
          <div>
            <h1 className="profile-info__name">Dr. Julian Vance</h1>
            <div className="profile-info__detail">Chief Surgeon | Hospital ID: 8829</div>
          </div>
        </div>
        <div style={{ padding: '0 var(--sp-md) var(--sp-md)' }}>
          <div className="profile-field">
            <div className="profile-field__label">Full Name</div>
            <div className="profile-field__value">Julian Vance</div>
          </div>
          <div className="profile-field" style={{ borderBottom: 'none' }}>
            <div className="profile-field__label">Work Email</div>
            <div className="profile-field__value">j.vance@mediflow.health</div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 'var(--sp-lg)' }}>
        <h2 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--on-surface)', marginBottom: 'var(--sp-sm)' }}>App Preferences</h2>
        <div className="glass-card glass-card--flat" style={{ padding: '0 var(--sp-md)' }}>
          <div className="pref-row">
            <div className="pref-row__icon pref-row__icon--blue">
              <span className="material-symbols-outlined">dark_mode</span>
            </div>
            <div className="pref-row__text">
              <div className="pref-row__title">Dark Mode</div>
              <div className="pref-row__subtitle">Adjust visual interface</div>
            </div>
            <button className="toggle">
              <div className="toggle__knob" />
            </button>
          </div>
          <div className="pref-row">
            <div className="pref-row__icon pref-row__icon--blue">
              <span className="material-symbols-outlined">translate</span>
            </div>
            <div className="pref-row__text">
              <div className="pref-row__title">Language</div>
              <div className="pref-row__subtitle">English (US)</div>
            </div>
            <span className="material-symbols-outlined" style={{ color: 'var(--outline-variant)' }}>chevron_right</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 'var(--sp-xl)' }}>
        <h2 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--on-surface)', marginBottom: 'var(--sp-sm)' }}>Security & Privacy</h2>
        <div className="glass-card glass-card--flat" style={{ padding: '0 var(--sp-md)' }}>
          <div className="pref-row">
            <div className="pref-row__icon pref-row__icon--teal">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div className="pref-row__text">
              <div className="pref-row__title">Two-Factor Authentication</div>
              <div className="pref-row__subtitle" style={{ color: 'var(--secondary)' }}>Enabled via Authenticator</div>
            </div>
            <span className="material-symbols-outlined" style={{ color: 'var(--outline)' }}>settings</span>
          </div>
          <div className="pref-row">
            <div className="pref-row__icon pref-row__icon--blue">
              <span className="material-symbols-outlined">fingerprint</span>
            </div>
            <div className="pref-row__text">
              <div className="pref-row__title">Biometric Login</div>
              <div className="pref-row__subtitle">Use FaceID or TouchID</div>
            </div>
            <button className="toggle toggle--on">
              <div className="toggle__knob" />
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 'var(--sp-lg)' }}>
        <div className="section-header" style={{ marginBottom: 'var(--sp-sm)' }}>
          <h2 className="section-title" style={{ fontSize: 20 }}>Medical Alerts</h2>
          <button className="section-link">Clear All</button>
        </div>

        <div className="alert-card alert-card--critical">
          <div className="alert-card__header">
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--r-md)', background: 'var(--error-container)', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined">emergency</span>
              </div>
              <div className="alert-card__title">Critical Vitals Alert</div>
            </div>
            <div className="alert-card__time">2m ago</div>
          </div>
          <div className="alert-card__body">
            Patient Sarah Miller (Room 402) - Heart rate exceeded 140 BPM. Immediate review required.
          </div>
          <div className="alert-card__actions">
            <button className="alert-card__btn alert-card__btn--primary">Review Now</button>
            <button className="alert-card__btn alert-card__btn--secondary" style={{ background: 'var(--surface-container-high)', border: 'none' }}>Dismiss</button>
          </div>
        </div>

        <div className="alert-card alert-card--success">
          <div className="alert-card__header">
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--r-md)', background: 'rgba(109,245,225,.2)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined">medication</span>
              </div>
              <div className="alert-card__title">Scheduled Medication</div>
            </div>
            <div className="alert-card__time">15m ago</div>
          </div>
          <div className="alert-card__body">
            Post-op insulin dosage due for James Chen (Bed 12). Pharmacy has delivered the kit.
          </div>
        </div>

        <div className="alert-card alert-card--info">
          <div className="alert-card__header">
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--r-md)', background: 'var(--primary-fixed)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined">biotech</span>
              </div>
              <div className="alert-card__title">Lab Results Ready</div>
            </div>
            <div className="alert-card__time">1h ago</div>
          </div>
          <div className="alert-card__body">
            Complete Blood Count (CBC) results available for Patient Robert Garcia.
          </div>
        </div>
      </div>

      <button className="btn-signout" onClick={() => dispatch(logout())}>
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>logout</span>
        Sign Out
      </button>
    </div>
  )
}

export default SettingsPage
