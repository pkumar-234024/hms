import { useState } from 'react';
import { Bell, Settings, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAppSelector } from '../../app/hooks';
import './PublicNavBar.css';

export const PublicNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const handleLinkClick = (id: string, path: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(path);
  };

  return (
    <>
      {/* ── Custom Landing Header / Navigation Bar ── */}
      <header className="bg-surface border-b border-outline-variant shadow-sm top-0 z-50 sticky">
        <nav className="flex justify-between items-center w-full px-gutter mx-auto h-16">
          <div
            className="flex items-center gap-md cursor-pointer"
            onClick={() => navigate('/')}
          >
            <span className="font-headline-md text-headline-md font-bold text-primary">
              Clinical Clarity
            </span>
          </div>

          <div className="hidden md:flex items-center gap-lg">
            <button
              onClick={() => navigate('/login')}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleLinkClick('booking', '/')}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Appointments
            </button>
            <button
              onClick={() => navigate('/login')}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Medical Records
            </button>
            <button
              onClick={() => handleLinkClick('integrated-services', '/')}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Pathology
            </button>
            <button
              onClick={() => navigate('/login')}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Store
            </button>
          </div>

          <div className="flex items-center gap-xs">
            <div className="hidden sm:flex items-center gap-md mr-md">
              <button
                className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            <Button
              variant="filled"
              colorType="primary"
              onClick={() => handleLinkClick('booking', '/')}
              className="!py-1.5 !px-5 h-auto text-sm"
            >
              Book Now
            </Button>

            {user ? (
              <Button
                variant="filled"
                colorType="primary"
                onClick={() => navigate('/')}
                className="!py-1.5 !px-5 h-auto text-sm"
              >
                Go to Portal
              </Button>
            ) : (
              <Button
                variant="filled"
                colorType="primary"
                onClick={() => navigate('/login')}
                className="!py-1.5 !px-5 h-auto text-sm"
              >
                Login
              </Button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-all bg-transparent border-none cursor-pointer flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-surface/95 backdrop-blur-md border-b border-outline-variant shadow-lg z-40 transition-all duration-300">
          <div className="flex flex-col p-4 gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/login');
              }}
              className="text-left font-body-md text-body-md text-on-surface-variant hover:text-primary py-2.5 px-3 bg-transparent hover:bg-slate-100 rounded-lg border-none cursor-pointer transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleLinkClick('booking', '/')}
              className="text-left font-body-md text-body-md text-on-surface-variant hover:text-primary py-2.5 px-3 bg-transparent hover:bg-slate-100 rounded-lg border-none cursor-pointer transition-colors"
            >
              Appointments
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/login');
              }}
              className="text-left font-body-md text-body-md text-on-surface-variant hover:text-primary py-2.5 px-3 bg-transparent hover:bg-slate-100 rounded-lg border-none cursor-pointer transition-colors"
            >
              Medical Records
            </button>
            <button
              onClick={() => handleLinkClick('integrated-services', '/')}
              className="text-left font-body-md text-body-md text-on-surface-variant hover:text-primary py-2.5 px-3 bg-transparent hover:bg-slate-100 rounded-lg border-none cursor-pointer transition-colors"
            >
              Pathology
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/login');
              }}
              className="text-left font-body-md text-body-md text-on-surface-variant hover:text-primary py-2.5 px-3 bg-transparent hover:bg-slate-100 rounded-lg border-none cursor-pointer transition-colors"
            >
              Store
            </button>
          </div>
        </div>
      )}
    </>
  );
};
