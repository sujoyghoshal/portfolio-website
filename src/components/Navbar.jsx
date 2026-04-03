import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Moon, MoreVertical, ShieldCheck, Sun, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AUTH_STORAGE_KEY, clearAuthSession, getCurrentUser, isAdminAuthenticated } from '../utils/auth';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About Me', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Payment', href: '#payment' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getCurrentUser()));
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isAdmin = isAdminAuthenticated();

  useEffect(() => {
    const syncAuth = () => {
      const sessionUser = getCurrentUser();
      setCurrentUser(sessionUser);
      setIsAuthenticated(Boolean(sessionUser));
    };

    window.addEventListener('storage', syncAuth);
    window.addEventListener(AUTH_STORAGE_KEY, syncAuth);

    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener(AUTH_STORAGE_KEY, syncAuth);
    };
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const sessionUser = getCurrentUser();
    setCurrentUser(sessionUser);
    setIsAuthenticated(Boolean(sessionUser));
  }, [location.pathname]);

  const handleLogout = () => {
    clearAuthSession();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`app-navbar ${scrolled ? 'is-scrolled' : ''}`}
    >
      <div className="nav-inner max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="hidden md:block">
          <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-1 cursor-pointer shrink-0">
            <span className="brand-word font-black text-xl tracking-tight">SUJOY</span>
            <span className="text-orange-500 font-black text-xl">.</span>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        {isHome && (
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <div className="nav-actions-wrap">
          <button
            type="button"
            onClick={onToggleTheme}
            className="theme-toggle hidden md:inline-flex"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Theme: ${theme}`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          {isAuthenticated ? (
            <div className="nav-auth-group hidden md:flex">
              {isAdmin ? (
                <Link to="/admin">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="nav-auth-btn nav-auth-btn-admin"
                  >
                    <ShieldCheck size={15} />
                    Admin
                  </motion.button>
                </Link>
              ) : (
                <div className="nav-user-pill">
                  <span>User</span>
                  <strong>{currentUser?.name || currentUser?.email}</strong>
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleLogout}
                className="nav-auth-btn nav-auth-btn-ghost"
              >
                <LogOut size={15} />
                Logout
              </motion.button>
            </div>
          ) : (
            <div className="nav-auth-group hidden md:flex">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="nav-auth-btn nav-auth-btn-ghost"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="nav-auth-btn nav-auth-btn-primary"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          )}
          {isHome && (
            <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-toggle lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
              {menuOpen ? <X size={22} /> : <MoreVertical size={22} />}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu-panel md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="nav-link text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={onToggleTheme}
                className="theme-toggle mobile-theme-toggle"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span>{theme === 'dark' ? 'Switch To Light Mode' : 'Switch To Dark Mode'}</span>
              </button>
              <div className="flex gap-3 pt-2">
                {isAuthenticated ? (
                  <>
                    {isAdmin ? (
                      <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex-1">
                        <button className="w-full nav-auth-btn nav-auth-btn-admin justify-center">Admin</button>
                      </Link>
                    ) : (
                      <div className="flex-1 nav-user-pill justify-center">
                        <span>User</span>
                        <strong>{currentUser?.name || currentUser?.email}</strong>
                      </div>
                    )}
                    <button onClick={handleLogout} className="flex-1 nav-auth-btn nav-auth-btn-ghost justify-center">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1">
                      <button className="w-full nav-auth-btn nav-auth-btn-ghost justify-center">Login</button>
                    </Link>
                    <Link to="/signup" onClick={() => setMenuOpen(false)} className="flex-1">
                      <button className="w-full nav-auth-btn nav-auth-btn-primary justify-center">Sign Up</button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
