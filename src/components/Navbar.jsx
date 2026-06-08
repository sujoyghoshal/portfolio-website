import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Moon, MoreVertical, ShieldCheck, Sun, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAdminAuthenticated } from '../utils/auth';
import { useAuth } from '../utils/AuthContext';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About Me', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'YouTube',  href: '#youtube'  },
  { label: 'Education', href: '#education' },
  { label: 'Payment', href: '#payment' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user: currentUser, logout } = useAuth();
  const isAuthenticated = Boolean(currentUser);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isAdmin = isAdminAuthenticated();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
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
        <Link to="/" className="nav-brand-link">
          <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-1 cursor-pointer shrink-0">
            <span className="brand-word font-black text-xl tracking-tight">SUJOY</span>
            <span className="text-orange-500 font-black text-xl">.</span>
          </motion.div>
        </Link>

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
                  {currentUser?.photoURL
                    ? <img src={currentUser.photoURL} alt={currentUser.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                    : <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{(currentUser?.name || 'U')[0].toUpperCase()}</span>
                  }
                  <strong className="max-w-[120px] truncate">{currentUser?.name || currentUser?.email}</strong>
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
          <button
            type="button"
            onClick={() => setMenuOpen((currentState) => !currentState)}
            className="mobile-menu-toggle md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <MoreVertical size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mobile-menu-panel md:hidden"
          >
            <div className="mobile-menu-content px-4 py-3 flex flex-col">

              {/* ── Nav links ── */}
              {isHome ? navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-nav-link"
                >
                  {link.label}
                </a>
              )) : (
                <Link to="/" onClick={() => setMenuOpen(false)} className="mobile-nav-link">
                  Home
                </Link>
              )}

              {/* ── Divider ── */}
              <div className="mobile-menu-divider" />

              {/* ── Theme toggle row ── */}
              <button
                type="button"
                onClick={onToggleTheme}
                className="mobile-menu-row"
              >
                <div className="mobile-menu-row-icon">
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </div>
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                <span className="mobile-menu-row-badge">
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </span>
              </button>

              {/* ── Auth rows ── */}
              {isAuthenticated ? (
                <>
                  {isAdmin ? (
                    <Link to="/admin" onClick={() => setMenuOpen(false)} className="mobile-menu-row">
                      <div className="mobile-menu-row-icon mobile-menu-row-icon-admin">
                        <ShieldCheck size={16} />
                      </div>
                      <span>Admin Dashboard</span>
                    </Link>
                  ) : (
                    <div className="mobile-menu-row" style={{ cursor: 'default' }}>
                      <div className="mobile-menu-row-icon overflow-hidden p-0">
                        {currentUser?.photoURL
                          ? <img src={currentUser.photoURL} alt="" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                          : <span className="text-white text-xs font-bold">{(currentUser?.name || 'U')[0].toUpperCase()}</span>
                        }
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-[var(--text)] font-semibold text-sm">{currentUser?.name || 'User'}</span>
                        <span className="text-[var(--muted)] text-xs truncate max-w-[160px]">{currentUser?.email}</span>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="mobile-menu-row mobile-menu-row-danger"
                  >
                    <div className="mobile-menu-row-icon mobile-menu-row-icon-danger">
                      <LogOut size={16} />
                    </div>
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="mobile-menu-row">
                    <div className="mobile-menu-row-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    </div>
                    <span>Login</span>
                  </Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)} className="mobile-menu-row-signup">
                    <div className="mobile-menu-row-signup-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                    </div>
                    <span>Sign Up</span>
                    <span className="mobile-menu-row-badge mobile-menu-row-badge-new">Free</span>
                  </Link>
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
