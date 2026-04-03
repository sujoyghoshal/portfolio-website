import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User, UserPlus } from 'lucide-react';
import { registerUser, validatePasswordPolicy } from '../utils/auth';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError("Passwords don't match");
      return;
    }

    const passwordCheck = validatePasswordPolicy(form.password);

    if (!passwordCheck.valid) {
      setError(passwordCheck.message);
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));

    const result = registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate('/login');
  };

  const strength = (pw) => {
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (pw.length >= 10) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^a-zA-Z0-9]/.test(pw)) s++;
    return s;
  };

  const strengthColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const s = strength(form.password);

  return (
    <main className="auth-page-shell signup-auth-shell">
      <div className="auth-page-glow auth-page-glow-left" />
      <div className="auth-page-glow auth-page-glow-right" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="auth-card auth-card-signup"
      >
        <Link to="/" className="auth-back-link">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>

        <div className="auth-icon-wrap">
          <UserPlus size={34} className="text-white" />
        </div>

        <div className="auth-header-block">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Save user details in local storage with a stronger password rule</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form auth-form-signup">
          <div className="auth-field-group compact-gap">
            <div className="auth-line-field">
              <User size={17} className="auth-field-icon" />
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Full Name"
                className="auth-line-input"
              />
            </div>

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

            <div className="auth-line-field">
              <Lock size={17} className="auth-field-icon" />
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                required
                placeholder="Confirm Password"
                className="auth-line-input"
              />
            </div>
          </div>

          {form.password && (
            <div className="auth-strength-wrap">
              <div className="auth-strength-bars">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`auth-strength-bar ${level <= s ? strengthColors[s] : 'bg-white/12'}`}
                  />
                ))}
              </div>
              <p className="auth-strength-label">{strengthLabels[s]}</p>
              <p className="auth-strength-hint">Use 8+ characters with one uppercase letter and one number.</p>
            </div>
          )}

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
                <UserPlus size={18} />
                <span>SIGN UP</span>
              </>
            )}
          </motion.button>
        </form>

        <p className="auth-footer-note">
          Already have an account?{' '}
          <Link to="/login">Sign In</Link>
        </p>
      </motion.div>
    </main>
  );
}
