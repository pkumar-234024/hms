import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import './App.css'

// Layouts
import AppShell from './components/layout/AppShell'
import { PublicNavBar } from './components/layout/PublicNavBar'

// Auth
import { LoginPage } from './features/auth'

// Public Pages
import LandingPage from './features/public/LandingPage'
import AboutPage from './features/public/AboutPage'
import ContactPage from './features/public/ContactPage'

// Admin Pages
import AdminDashboard from './features/admin/AdminDashboard'
import DoctorManagement from './features/admin/DoctorManagement'

// Doctor Pages
import DoctorDashboard from './features/doctor/DoctorDashboard'

// Patient Pages
import PatientDashboard from './features/patient/PatientDashboard'
import BookAppointment from './features/patient/BookAppointment'
import MedicalReports from './features/patient/MedicalReports'
import FeedbackPage from './features/patient/FeedbackPage'

// Shared Pages
import SettingsPage from './features/settings/SettingsPage'

const App = () => {
  const { user } = useAppSelector((state) => state.auth)
  
  // Determine role-based nav items and home route
  let navItems: { icon: string; label: string; path: string }[] = []
  let homeRoute = '/'

  if (user) {
    const role = user.roles?.[0] || 'Patient'
    
    if (role === 'Super Admin' || role === 'Admin') {
      homeRoute = '/admin'
      navItems = [
        { icon: 'dashboard', label: 'Home', path: '/admin' },
        { icon: 'groups', label: 'Doctors', path: '/admin/doctors' },
        { icon: 'medical_services', label: 'Alerts', path: '/settings' },
        { icon: 'account_circle', label: 'Profile', path: '/settings' },
      ]
    } else if (role === 'Doctor') {
      homeRoute = '/doctor/dashboard'
      navItems = [
        { icon: 'home', label: 'Home', path: '/doctor/dashboard' },
        { icon: 'person_search', label: 'Patients', path: '/doctor/patients' },
        { icon: 'medical_services', label: 'Alerts', path: '/settings' },
        { icon: 'account_circle', label: 'Profile', path: '/settings' },
      ]
    } else {
      homeRoute = '/patient/dashboard'
      navItems = [
        { icon: 'home', label: 'Home', path: '/patient/dashboard' },
        { icon: 'calendar_month', label: 'Book', path: '/book' },
        { icon: 'description', label: 'Reports', path: '/patient/reports' },
        { icon: 'account_circle', label: 'Profile', path: '/settings' },
      ]
    }
  }

  // Helper for Public routes that share PublicNavBar but don't have BottomNav
  const PublicLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="app-root">
      <PublicNavBar />
      <main className="app-shell app-shell--public">
        <div className="app-shell__content">
          {children}
        </div>
      </main>
    </div>
  )

  // Full-width layout for landing page (has its own nav/footer)
  const FullWidthLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="app-root" style={{ paddingTop: 0 }}>
      {children}
    </div>
  )

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {!user ? (
          <>
            <Route path="/" element={<FullWidthLayout><LandingPage /></FullWidthLayout>} />
            <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
            <Route path="/book" element={<PublicLayout><BookAppointment /></PublicLayout>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          /* Authenticated Routes */
          <Route element={<AppShell navItems={navItems} avatarInitials={user.firstName?.[0] || user.email[0].toUpperCase()} />}>
            
            {/* Automatic redirect to role-specific dashboard */}
            <Route path="/" element={<Navigate to={homeRoute} replace />} />
            <Route path="/login" element={<Navigate to={homeRoute} replace />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/doctors" element={<DoctorManagement />} />
            
            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            
            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/book" element={<BookAppointment />} />
            <Route path="/patient/reports" element={<MedicalReports />} />
            <Route path="/patient/feedback" element={<FeedbackPage />} />
            
            {/* Shared Routes */}
            <Route path="/settings" element={<SettingsPage />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to={homeRoute} replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
