import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User, UserPlus } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { registerUser, validatePasswordPolicy, persistGoogleOAuthUser } from '../utils/auth';

export default function Signup() {
  const [form, setForm]         = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError]       = useState('');
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError("Passwords don't match"); return; }
    const check = validatePasswordPolicy(form.password);
    if (!check.valid) { setError(check.message); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    const result = registerUser({ name: form.name, email: form.email, password: form.password });
    setLoading(false);
    if (!result.success) { setError(result.message); return; }
    navigate('/login');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const googleUser = await res.json();
        persistGoogleOAuthUser(googleUser);
        navigate('/');
      } catch {
        setError('Failed to fetch Google profile. Please try again.');
        setGoogleLoading(false);
      }
    },
    onError: () => {
      setError('Google sign-up failed. Please try again.');
      setGoogleLoading(false);
    },
    onNonOAuthError: (err) => {
      if (err.type !== 'popup_closed') setError('Sign-up cancelled.');
      setGoogleLoading(false);
    },
  });

  const handleGoogleSignup = () => {
    setError('');
    setGoogleLoading(true);
    googleLogin();
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
  const sc = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const sl = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const s  = strength(form.password);

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
          <ArrowLeft size={16} /><span>Back to Portfolio</span>
        </Link>

        <div className="auth-icon-wrap">
          <UserPlus size={34} className="text-white" />
        </div>

        <div className="auth-header-block">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join with Google or create an email account</p>
        </div>

        {/* Real Google Sign-Up */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleGoogleSignup}
          disabled={googleLoading}
          className="w-full min-h-[52px] flex items-center justify-center gap-3 rounded-2xl border border-white/20 text-white font-bold text-sm mb-4 transition-all hover:bg-white/12 disabled:opacity-60"
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
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Continue with Google
            </>
          )}
        </motion.button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/12" />
          <span className="text-white/40 text-xs">or create with email</span>
          <div className="flex-1 h-px bg-white/12" />
        </div>

        <form onSubmit={handleSubmit} className="auth-form auth-form-signup">
          <div className="auth-field-group compact-gap">
            <div className="auth-line-field">
              <User size={17} className="auth-field-icon" />
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                required placeholder="Full Name" className="auth-line-input" />
            </div>
            <div className="auth-line-field">
              <Mail size={17} className="auth-field-icon" />
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                required placeholder="Email ID" className="auth-line-input" />
            </div>
            <div className="auth-line-field">
              <Lock size={17} className="auth-field-icon" />
              <input type={showPass ? 'text' : 'password'} value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required placeholder="Password" className="auth-line-input auth-line-input-password" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="auth-field-eye" aria-label="Toggle password">
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            <div className="auth-line-field">
              <Lock size={17} className="auth-field-icon" />
              <input type="password" value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                required placeholder="Confirm Password" className="auth-line-input" />
            </div>
          </div>

          {form.password && (
            <div className="auth-strength-wrap">
              <div className="auth-strength-bars">
                {[1,2,3,4,5].map((l) => (
                  <div key={l} className={`auth-strength-bar ${l <= s ? sc[s] : 'bg-white/12'}`} />
                ))}
              </div>
              <p className="auth-strength-label">{sl[s]}</p>
              <p className="auth-strength-hint">Use 8+ chars with one uppercase letter and one number.</p>
            </div>
          )}

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
              <><UserPlus size={18} /><span>SIGN UP</span></>
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
