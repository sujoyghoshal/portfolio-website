import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, LogIn, UserRound } from 'lucide-react';
import { authenticateUser, persistGoogleUser } from '../utils/auth';
import { signInWithGoogle, isFirebaseConfigured } from '../utils/firebase';

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError]     = useState('');
  const navigate               = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const result = authenticateUser(form);
    setLoading(false);
    if (!result.success) { setError(result.message); return; }
    navigate(result.role === 'admin' ? '/admin' : '/');
  };

  const handleGoogleLogin = async () => {
    setError(''); setGoogleLoading(true);
    try {
      const firebaseUser = await signInWithGoogle();
      persistGoogleUser(firebaseUser);
      navigate('/');
    } catch (err) {
      setError(err.code === 'auth/popup-closed-by-user' ? 'Sign-in cancelled.' : (err.message || 'Google sign-in failed.'));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="auth-page-shell login-auth-shell">
      <div className="auth-page-glow auth-page-glow-left" />
      <div className="auth-page-glow auth-page-glow-right" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="auth-card"
      >
        <Link to="/" className="auth-back-link">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>

        <div className="auth-icon-wrap">
          <UserRound size={34} className="text-white" />
        </div>

        <div className="auth-header-block">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        {/* Google Sign-In */}
        {isFirebaseConfigured() && (
          <>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full min-h-[52px] flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/08 text-white font-bold text-sm mb-4 transition-all hover:bg-white/12 disabled:opacity-60"
              style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}
            >
              {googleLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </motion.button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-white/12" />
              <span className="text-white/40 text-xs">or sign in with email</span>
              <div className="flex-1 h-px bg-white/12" />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field-group">
            <div className="auth-line-field">
              <Mail size={17} className="auth-field-icon" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required placeholder="Email ID"
                className="auth-line-input"
              />
            </div>
            <div className="auth-line-field">
              <Lock size={17} className="auth-field-icon" />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required placeholder="Password"
                className="auth-line-input auth-line-input-password"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="auth-field-eye" aria-label="Toggle password">
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div className="auth-meta-row">
            <label className="auth-check-row">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
            <span className="auth-meta-link">Admin goes to dashboard</span>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="auth-error-box">
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            type="submit" disabled={loading}
            className="auth-submit-btn"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <><LogIn size={18} /><span>LOGIN</span></>
            )}
          </motion.button>
        </form>

        <p className="auth-footer-note">
          Don&apos;t have an account?{' '}
          <Link to="/signup">Sign Up</Link>
        </p>
      </motion.div>
    </main>
  );
}
