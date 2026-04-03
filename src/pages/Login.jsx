import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, LogIn, UserRound } from 'lucide-react';
import { authenticateUser } from '../utils/auth';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    const result = authenticateUser(form);

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(result.role === 'admin' ? '/admin' : '/');
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
          <h1 className="auth-title">User Login</h1>
          <p className="auth-subtitle">Sign in with your user account or admin credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field-group">
            <div className="auth-line-field">
              <Mail size={17} className="auth-field-icon" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="Email ID"
                className="auth-line-input"
              />
            </div>

            <div className="auth-line-field">
              <Lock size={17} className="auth-field-icon" />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                placeholder="Password"
                className="auth-line-input auth-line-input-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="auth-field-eye"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
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
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="auth-error-box"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="auth-submit-btn"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                <LogIn size={18} />
                <span>LOGIN</span>
              </>
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
