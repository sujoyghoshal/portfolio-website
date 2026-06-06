import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import PaymentStatus from './pages/PaymentStatus';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import { isAdminAuthenticated } from './utils/auth';
import './index.css';

const THEME_STORAGE_KEY = 'portfolio-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function ProtectedRoute({ children }) {
  return isAdminAuthenticated() ? children : <Navigate to="/login" replace />;
}

function AppLayout() {
  const location = useLocation();
  const [theme, setTheme] = useState(getInitialTheme);
  const showNavbar = location.pathname !== '/admin';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <>
      {showNavbar && <Navbar theme={theme} onToggleTheme={toggleTheme} />}
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/signup"         element={<Signup />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route
          path="/admin"
          element={(
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      <CustomCursor />
      <LoadingScreen show={loading} />
      <AppLayout />
    </BrowserRouter>
  );
}
