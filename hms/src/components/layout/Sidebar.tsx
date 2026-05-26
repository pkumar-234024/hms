import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/auth/authSlice'

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const role = user?.roles?.[0] || ''
  const displayName = user?.firstName
    ? `${user.firstName}${user.lastName ? ' ' + user.lastName : ''}`
    : user?.email || 'User'
  const initials = user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar__brand">
        <span className="material-symbols-outlined">clinical_notes</span>
        <span className="sidebar__brand-name">MediFlow</span>
      </NavLink>

      <nav className="sidebar__nav">
        {(role === 'Super Admin' || role === 'Admin') && (
          <>
            <NavLink to="/admin" className={({isActive}) => `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`} end>
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </NavLink>
            <NavLink to="/admin/doctors" className={({isActive}) => `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}>
              <span className="material-symbols-outlined">groups</span>
              Doctors
            </NavLink>
          </>
        )}

        {role === 'Doctor' && (
          <>
            <NavLink to="/doctor/dashboard" className={({isActive}) => `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`} end>
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </NavLink>
            <NavLink to="/doctor/patients" className={({isActive}) => `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}>
              <span className="material-symbols-outlined">group</span>
              My Patients
            </NavLink>
            <NavLink to="/doctor/schedule" className={({isActive}) => `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}>
              <span className="material-symbols-outlined">calendar_month</span>
              Schedule
            </NavLink>
          </>
        )}
        
        {role === 'Patient' && (
          <>
            <NavLink to="/patient/dashboard" className={({isActive}) => `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`} end>
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </NavLink>
            <NavLink to="/patient/reports" className={({isActive}) => `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}>
              <span className="material-symbols-outlined">description</span>
              Medical Reports
            </NavLink>
            <NavLink to="/book" className={({isActive}) => `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}>
              <span className="material-symbols-outlined">add_circle</span>
              Book Appointment
            </NavLink>
          </>
        )}
        
        <NavLink to="/settings" className={({isActive}) => `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}>
          <span className="material-symbols-outlined">settings</span>
          Settings
        </NavLink>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__avatar">
            {initials}
          </div>
          <div className="sidebar__user-info">
            <div className="sidebar__user-name">{displayName}</div>
            <div className="sidebar__user-role">{role || 'User'}</div>
          </div>
        </div>
        <button onClick={handleLogout} className="sidebar__logout">
          <span className="material-symbols-outlined" style={{fontSize: '18px'}}>logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
