const AUTH_STORAGE_KEY = 'portfolio-admin-auth';
const CURRENT_USER_STORAGE_KEY = 'portfolio-current-user';
const USERS_STORAGE_KEY = 'portfolio-registered-users';
const LOGIN_ACTIVITY_STORAGE_KEY = 'portfolio-login-activity';

export const ADMIN_CREDENTIALS = {
  email: 'sujoyghoshal.s@gmail.com',
  password: 'Sujay2003s@123',
};

const ADMIN_PROFILE = {
  id: 'admin-1',
  name: 'Sujoy Admin',
  email: ADMIN_CREDENTIALS.email,
  role: 'admin',
  createdAt: '2026-04-03T00:00:00.000Z',
};

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function dispatchAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_STORAGE_KEY));
  }
}

function readJson(key, fallbackValue) {
  if (!canUseStorage()) {
    return fallbackValue;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

function writeJson(key, value) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function persistSession(user) {
  if (!canUseStorage()) {
    return;
  }

  writeJson(CURRENT_USER_STORAGE_KEY, user);

  if (user?.role === 'admin') {
    window.localStorage.setItem(AUTH_STORAGE_KEY, 'true');
  } else {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  dispatchAuthChange();
}

function recordLogin(user) {
  const loginHistory = getLoginActivity();
  const entry = {
    id: `login-${Date.now()}`,
    name: user.name,
    email: user.email,
    role: user.role,
    loggedInAt: new Date().toISOString(),
  };

  writeJson(LOGIN_ACTIVITY_STORAGE_KEY, [entry, ...loginHistory].slice(0, 30));
}

export function getRegisteredUsers() {
  return readJson(USERS_STORAGE_KEY, []);
}

export function getLoginActivity() {
  return readJson(LOGIN_ACTIVITY_STORAGE_KEY, []);
}

export function getCurrentUser() {
  return readJson(CURRENT_USER_STORAGE_KEY, null);
}

export function isAdminAuthenticated() {
  return getCurrentUser()?.role === 'admin';
}

export function clearAuthSession() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  dispatchAuthChange();
}

export function setAdminAuthenticated(value) {
  if (value) {
    persistSession({
      ...ADMIN_PROFILE,
      lastLoginAt: new Date().toISOString(),
    });
    return;
  }

  clearAuthSession();
}

export function validatePasswordPolicy(password) {
  if (password.length < 8) {
    return {
      valid: false,
      message: 'Password must be at least 8 characters long.',
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: 'Password must include at least one uppercase letter.',
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: 'Password must include at least one number.',
    };
  }

  return {
    valid: true,
    message: '',
  };
}

export function registerUser({ name, email, password }) {
  const normalizedEmail = normalizeEmail(email);
  const trimmedName = name.trim();
  const users = getRegisteredUsers();

  if (!trimmedName) {
    return {
      success: false,
      message: 'Full name is required.',
    };
  }

  if (
    normalizedEmail === normalizeEmail(ADMIN_CREDENTIALS.email)
    || users.some((user) => normalizeEmail(user.email) === normalizedEmail)
  ) {
    return {
      success: false,
      message: 'This email is already registered.',
    };
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: trimmedName,
    email: normalizedEmail,
    password,
    role: 'user',
    createdAt: new Date().toISOString(),
  };

  writeJson(USERS_STORAGE_KEY, [newUser, ...users]);

  return {
    success: true,
    user: newUser,
  };
}

export function authenticateUser({ email, password }) {
  const normalizedEmail = normalizeEmail(email);

  if (
    normalizedEmail === normalizeEmail(ADMIN_CREDENTIALS.email)
    && password === ADMIN_CREDENTIALS.password
  ) {
    const adminSession = {
      ...ADMIN_PROFILE,
      lastLoginAt: new Date().toISOString(),
    };

    persistSession(adminSession);
    recordLogin(adminSession);

    return {
      success: true,
      role: 'admin',
      user: adminSession,
    };
  }

  const matchedUser = getRegisteredUsers().find((user) => (
    normalizeEmail(user.email) === normalizedEmail && user.password === password
  ));

  if (!matchedUser) {
    return {
      success: false,
      message: 'Invalid email or password.',
    };
  }

  const userSession = {
    ...matchedUser,
    lastLoginAt: new Date().toISOString(),
  };

  persistSession(userSession);
  recordLogin(userSession);

  return {
    success: true,
    role: 'user',
    user: userSession,
  };
}

export { AUTH_STORAGE_KEY };