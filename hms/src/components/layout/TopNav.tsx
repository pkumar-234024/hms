import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

interface Props {
  showAvatar?: boolean
  avatarInitials?: string
  isPublic?: boolean
  isLight?: boolean
}

const TopNav = ({ showAvatar, avatarInitials = 'U', isPublic = false, isLight = false }: Props) => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <header className={`top-nav ${isLight ? 'top-nav--light' : isPublic ? 'top-nav--public' : ''}`} id="top-nav">
      <Link to="/" className="top-nav__brand">
        <span className="material-symbols-outlined">clinical_notes</span>
        <span className="top-nav__brand-name">MediFlow</span>
      </Link>
      
      {isPublic && (
        <nav className="top-nav__links">
          <NavLink to="/" className={({isActive}) => `top-nav__link ${isActive ? 'top-nav__link--active' : ''}`} end>Home</NavLink>
          <NavLink to="/book" className={({isActive}) => `top-nav__link ${isActive ? 'top-nav__link--active' : ''}`}>Book Appointment</NavLink>
          <NavLink to="/about" className={({isActive}) => `top-nav__link ${isActive ? 'top-nav__link--active' : ''}`}>About</NavLink>
          <NavLink to="/contact" className={({isActive}) => `top-nav__link ${isActive ? 'top-nav__link--active' : ''}`}>Contact</NavLink>
        </nav>
      )}

      <div className="top-nav__actions">
        {isPublic ? (
          user ? (
            <Link to="/" className="btn-sign-in">
              Go to Dashboard
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </Link>
          ) : (
            <Link to="/login" className="btn-sign-in">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>login</span>
              Sign In
            </Link>
          )
        ) : (
          <>
            <button className="top-nav__icon-btn" aria-label="Notifications">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            {showAvatar && (
              <Link to="/settings" className="top-nav__avatar">{avatarInitials}</Link>
            )}
          </>
        )}
      </div>
    </header>
  )
}

export default TopNav
