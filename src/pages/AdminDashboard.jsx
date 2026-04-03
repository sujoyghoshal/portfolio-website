import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Briefcase,
  ChartColumnBig,
  Download,
  Eye,
  FileText,
  FolderKanban,
  History,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquareText,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { portfolioData } from '../data/portfolio';
import { AUTH_STORAGE_KEY, clearAuthSession, getCurrentUser, getLoginActivity, getRegisteredUsers } from '../utils/auth';

const sidebarLinks = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'documents', label: 'Documents', icon: FileText },
  { key: 'projects', label: 'Projects', icon: FolderKanban },
  { key: 'messages', label: 'Messages', icon: MessageSquareText },
  { key: 'profile', label: 'Profile', icon: UserRound },
  { key: 'analytics', label: 'Analytics', icon: ChartColumnBig },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const adminDocuments = [
  '/Documents/Profile.pdf',
  '/Documents/Sujoy_Ghoshal_Resume (2).pdf',
  '/Documents/in.edu.chitkarauniversity-DGMST-211198119620222111981196I.pdf',
  '/Documents/in.edu.chitkarauniversity-DGMST-211198119620222111981196II.pdf',
  '/Documents/in.edu.chitkarauniversity-DGMST-211198119620222111981196III.pdf',
  '/Documents/in.edu.chitkarauniversity-DGMST-211198119620242111981196V.pdf',
  '/Documents/in.edu.chitkarauniversity-DGMST-211198119620242111981196VI.pdf',
  '/Documents/in.edu.chitkarauniversity-DGMST-211198119620252111981196VII.pdf',
  '/Documents/in.edu.chitkarauniversity-DGMST-211198119620252111981196VIII.pdf',
  '/Documents/in.gov.abc-ABCID-787929210386.pdf',
  '/Documents/in.gov.epfindia-UNCRD-102210799640XX01YY05YY2003.pdf',
  '/Documents/in.gov.nha-NHCRD-80badbf37970dcf46fe26be43118416a37c9d2712759c880ade81130489fb91f.pdf',
  '/Documents/in.gov.pan-PANCR-DPIPG0692L.pdf',
  '/Documents/in.gov.transport-DRVLC-WB3320250006403.pdf',
  '/Documents/in.gov.transport-RVCER-WB33J1471.pdf',
  '/Documents/in.gov.transport-RVCER-WB33M9332.pdf',
  '/Documents/in.gov.uidai-ADHAR-afd98176d8b72df91c810a0d6fb61748.pdf',
  '/Documents/in.gov.wb.wbbse-SSCER-603401NXX0192XX2019.pdf',
  '/Documents/in.nic.wbchse-HSCER-320211XX1060XX2021.pdf',
];

const socialCards = [
  { label: 'LinkedIn', value: '758+', subValue: 'Connections', meta: '365 Feeds', color: 'linkedin' },
  { label: 'GitHub', value: '128', subValue: 'Repositories', meta: '24 Active', color: 'github' },
  { label: 'Mail', value: '54', subValue: 'Unread', meta: '12 Priority', color: 'mail' },
  { label: 'Portfolio', value: '450', subValue: 'Leads', meta: '57 New', color: 'orange' },
];

function AreaChart() {
  return (
    <svg viewBox="0 0 760 260" className="admin-chart-svg" role="img" aria-label="Portfolio traffic chart">
      <defs>
        <linearGradient id="adminAreaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <g className="admin-chart-grid">
        {[40, 90, 140, 190, 240].map((y) => <line key={y} x1="0" y1={y} x2="760" y2={y} />)}
        {[95, 190, 285, 380, 475, 570, 665].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="260" />)}
      </g>
      <path
        d="M0 195 C55 172 72 104 125 114 C170 122 190 184 245 180 C294 176 323 89 380 82 C434 75 450 131 505 136 C555 140 580 91 635 96 C686 101 710 146 760 126 L760 260 L0 260 Z"
        fill="url(#adminAreaFill)"
      />
      <path
        d="M0 195 C55 172 72 104 125 114 C170 122 190 184 245 180 C294 176 323 89 380 82 C434 75 450 131 505 136 C555 140 580 91 635 96 C686 101 710 146 760 126"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {[125, 245, 380, 505, 635].map((x, index) => (
        <circle
          key={x}
          cx={x}
          cy={[114, 180, 82, 136, 96][index]}
          r="7"
          fill="#0f172a"
          stroke="#fb923c"
          strokeWidth="4"
        />
      ))}
    </svg>
  );
}

function BarsChart() {
  const bars = [72, 48, 86, 58, 93, 64, 78];

  return (
    <div className="admin-bars-wrap" aria-label="Performance bars">
      {bars.map((height, index) => (
        <div key={index} className="admin-bar-group">
          <div className="admin-bar-track">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.7, delay: 0.08 * index }}
              className="admin-bar-fill"
            />
          </div>
          <span className="admin-bar-label">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
        </div>
      ))}
    </div>
  );
}

function formatDateTime(value) {
  if (!value) {
    return 'Just now';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Just now';
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function getDocumentTitle(path) {
  const fileName = path.split('/').pop() || path;

  if (fileName === 'Profile.pdf') return 'Profile Document';
  if (fileName === 'Sujoy_Ghoshal_Resume (2).pdf') return 'Resume';
  if (fileName.includes('uidai-ADHAR')) return 'Aadhaar Card';
  if (fileName.includes('pan-PANCR')) return 'PAN Card';
  if (fileName.includes('transport-DRVLC')) return 'Driving Licence';
  if (fileName.includes('transport-RVCER-WB33J1471')) return 'Vehicle RC WB33J1471';
  if (fileName.includes('transport-RVCER-WB33M9332')) return 'Vehicle RC WB33M9332';
  if (fileName.includes('wbbse-SSCER')) return 'Secondary Marksheet';
  if (fileName.includes('wbchse-HSCER')) return 'Higher Secondary Marksheet';
  if (fileName.includes('gov.abc-ABCID')) return 'ABC ID';
  if (fileName.includes('epfindia-UNCRD')) return 'EPF Document';
  if (fileName.includes('nha-NHCRD')) return 'Health Card';

  if (fileName.includes('chitkarauniversity')) {
    if (fileName.endsWith('VIII.pdf')) return 'College Marksheet Semester 8';
    if (fileName.endsWith('VII.pdf')) return 'College Marksheet Semester 7';
    if (fileName.endsWith('VI.pdf')) return 'College Marksheet Semester 6';
    if (fileName.endsWith('V.pdf')) return 'College Marksheet Semester 5';
    if (fileName.endsWith('III.pdf')) return 'College Marksheet Semester 3';
    if (fileName.endsWith('II.pdf')) return 'College Marksheet Semester 2';
    if (fileName.endsWith('I.pdf')) return 'College Marksheet Semester 1';
  }

  return fileName.replace('.pdf', '').replace(/[-_]/g, ' ');
}

function getDocumentCategory(path) {
  const fileName = path.split('/').pop() || path;

  if (fileName.includes('uidai-ADHAR') || fileName.includes('pan-PANCR') || fileName.includes('transport-DRVLC') || fileName.includes('gov.abc-ABCID') || fileName.includes('epfindia-UNCRD') || fileName.includes('nha-NHCRD')) {
    return 'Identity';
  }

  if (fileName.includes('transport-RVCER')) {
    return 'Vehicle';
  }

  if (fileName.includes('wbbse-SSCER') || fileName.includes('wbchse-HSCER') || fileName.includes('chitkarauniversity')) {
    return 'Education';
  }

  if (fileName === 'Sujoy_Ghoshal_Resume (2).pdf' || fileName === 'Profile.pdf') {
    return 'Profile';
  }

  return 'Document';
}

function getDocumentUrl(path) {
  return encodeURI(path);
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [registeredUsers, setRegisteredUsers] = useState(() => getRegisteredUsers());
  const [loginActivity, setLoginActivity] = useState(() => getLoginActivity());
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [selectedDocument, setSelectedDocument] = useState(adminDocuments[0]);

  useEffect(() => {
    const syncDashboardData = () => {
      setRegisteredUsers(getRegisteredUsers());
      setLoginActivity(getLoginActivity());
      setCurrentUser(getCurrentUser());
    };

    window.addEventListener('storage', syncDashboardData);
    window.addEventListener(AUTH_STORAGE_KEY, syncDashboardData);

    return () => {
      window.removeEventListener('storage', syncDashboardData);
      window.removeEventListener(AUTH_STORAGE_KEY, syncDashboardData);
    };
  }, []);

  const statsCards = [
    {
      title: 'Registered Users',
      value: String(registeredUsers.length).padStart(2, '0'),
      subtitle: 'Stored in local storage',
      accent: 'amber',
      icon: Users,
    },
    {
      title: 'Recent Logins',
      value: String(loginActivity.length).padStart(2, '0'),
      subtitle: 'Successful sign-ins',
      accent: 'cyan',
      icon: History,
    },
    {
      title: 'Project Leads',
      value: '184',
      subtitle: 'Qualified contacts',
      accent: 'emerald',
      icon: Briefcase,
    },
    {
      title: 'Admin Status',
      value: 'Secure',
      subtitle: 'Protected access',
      accent: 'rose',
      icon: ShieldCheck,
    },
  ];

  const activityList = [
    registeredUsers.length
      ? `${registeredUsers.length} user account${registeredUsers.length === 1 ? '' : 's'} saved in browser storage.`
      : 'No registered users yet. Create one from the sign up page.',
    loginActivity.length
      ? `Latest login captured for ${loginActivity[0].email}.`
      : 'No successful login has been recorded yet.',
    'Admin route remains protected and only the admin account can open this dashboard.',
  ];

  const handleLogout = () => {
    clearAuthSession();
    navigate('/login');
  };

  const activeSidebarLink = sidebarLinks.find((item) => item.key === activeSection) || sidebarLinks[0];

  const renderDashboardContent = () => (
    <>
      <section className="admin-stats-grid">
        {statsCards.map(({ title, value, subtitle, accent, icon: Icon }, index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 * index }}
            className={`admin-metric-card accent-${accent}`}
          >
            <div className="admin-metric-icon">
              <Icon size={24} />
            </div>
            <h2>{value}</h2>
            <p className="admin-metric-title">{title}</p>
            <span className="admin-metric-subtitle">{subtitle}</span>
          </motion.article>
        ))}
      </section>

      <section className="admin-social-grid">
        {socialCards.map(({ label, value, subValue, meta, color }, index) => (
          <motion.article
            key={label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 + 0.05 * index }}
            className={`admin-social-card social-${color}`}
          >
            <div className="admin-social-top">{label}</div>
            <div className="admin-social-bottom">
              <div>
                <strong>{value}</strong>
                <span>{subValue}</span>
              </div>
              <div>
                <strong>{meta.split(' ')[0]}</strong>
                <span>{meta.split(' ').slice(1).join(' ')}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="admin-charts-grid">
        <motion.article
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="admin-panel-card"
        >
          <div className="admin-panel-head">
            <div>
              <p className="admin-panel-kicker">Traffic</p>
              <h3>Portfolio reach overview</h3>
            </div>
            <span className="admin-panel-tag">Last 30 days</span>
          </div>
          <AreaChart />
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="admin-panel-card"
        >
          <div className="admin-panel-head">
            <div>
              <p className="admin-panel-kicker">Performance</p>
              <h3>Weekly activity</h3>
            </div>
            <span className="admin-panel-tag">Updated live</span>
          </div>
          <BarsChart />
        </motion.article>
      </section>

      <section className="admin-bottom-grid">
        <motion.article
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="admin-panel-card"
        >
          <div className="admin-panel-head">
            <div>
              <p className="admin-panel-kicker">Recent Activity</p>
              <h3>Latest dashboard updates</h3>
            </div>
          </div>
          <div className="space-y-4">
            {activityList.map((item) => (
              <div key={item} className="admin-activity-row">
                <span className="admin-list-dot" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="admin-panel-card"
        >
          <div className="admin-panel-head">
            <div>
              <p className="admin-panel-kicker">Admin Profile</p>
              <h3>Account summary</h3>
            </div>
          </div>

          <div className="admin-profile-summary">
            <img src="/myphoto.jpeg" alt={portfolioData.name} className="admin-profile-summary-photo" />
            <div>
              <h4>{currentUser?.name || portfolioData.name}</h4>
              <p>{currentUser?.role === 'admin' ? 'Administrator session active' : portfolioData.title}</p>
              <a href={`mailto:${currentUser?.email || portfolioData.email}`}>{currentUser?.email || portfolioData.email}</a>
              <p className="admin-session-note">Last login: {formatDateTime(currentUser?.lastLoginAt)}</p>
            </div>
          </div>
        </motion.article>
      </section>
    </>
  );

  const renderUsersContent = () => (
    <section className="admin-data-grid">
      <motion.article
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="admin-panel-card"
      >
        <div className="admin-panel-head">
          <div>
            <p className="admin-panel-kicker">Users</p>
            <h3>Registered user accounts</h3>
          </div>
          <span className="admin-panel-tag">{registeredUsers.length} total</span>
        </div>

        <div className="admin-user-list">
          {registeredUsers.length ? registeredUsers.map((user, index) => (
            <div key={user.id} className="admin-user-row">
              <div className="admin-user-index">{index + 1}</div>
              <div className="admin-user-meta">
                <strong>{user.name}</strong>
                <span className="admin-user-email">{user.email}</span>
              </div>
              <div className="admin-user-tags">
                <span className="admin-user-badge">User</span>
                <span className="admin-user-date">{formatDateTime(user.createdAt)}</span>
              </div>
            </div>
          )) : (
            <p className="admin-empty-state">No registered users yet. Sign up once and the user list will appear here.</p>
          )}
        </div>
      </motion.article>

      <motion.article
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16 }}
        className="admin-panel-card"
      >
        <div className="admin-panel-head">
          <div>
            <p className="admin-panel-kicker">Login Activity</p>
            <h3>Who signed in recently</h3>
          </div>
          <span className="admin-panel-tag">{loginActivity.length} records</span>
        </div>

        <div className="admin-user-list">
          {loginActivity.length ? loginActivity.map((entry, index) => (
            <div key={entry.id} className="admin-user-row">
              <div className="admin-user-index">{index + 1}</div>
              <div className="admin-user-meta">
                <strong>{entry.name}</strong>
                <span className="admin-user-email">{entry.email}</span>
              </div>
              <div className="admin-user-tags">
                <span className={`admin-user-badge role-${entry.role}`}>{entry.role}</span>
                <span className="admin-user-date">{formatDateTime(entry.loggedInAt)}</span>
              </div>
            </div>
          )) : (
            <p className="admin-empty-state">No one has logged in yet. Successful logins will be listed here.</p>
          )}
        </div>
      </motion.article>
    </section>
  );

  const renderDocumentsContent = () => (
    <section className="admin-documents-shell">
      <motion.article
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="admin-panel-card admin-documents-list-card"
      >
        <div className="admin-panel-head">
          <div>
            <p className="admin-panel-kicker">Documents</p>
            <h3>Stored PDF files</h3>
          </div>
          <span className="admin-panel-tag">{adminDocuments.length} files</span>
        </div>

        <div className="admin-documents-list-scroll">
          <div className="admin-documents-list">
          {adminDocuments.map((documentPath, index) => {
            const isSelected = selectedDocument === documentPath;

            return (
              <div key={documentPath} className={`admin-document-row ${isSelected ? 'is-selected' : ''}`}>
                <div className="admin-document-order">{index + 1}</div>
                <div className="admin-document-meta">
                  <strong>{getDocumentTitle(documentPath)}</strong>
                  <span>{getDocumentCategory(documentPath)}</span>
                </div>
                <div className="admin-document-actions">
                  <button type="button" className="admin-document-btn review" onClick={() => setSelectedDocument(documentPath)}>
                    <Eye size={15} />
                    Review
                  </button>
                  <a href={getDocumentUrl(documentPath)} download className="admin-document-btn download">
                    <Download size={15} />
                    Download
                  </a>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </motion.article>

      <motion.article
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16 }}
        className="admin-panel-card admin-documents-preview-card"
      >
        <div className="admin-panel-head">
          <div>
            <p className="admin-panel-kicker">Preview</p>
            <h3>{getDocumentTitle(selectedDocument)}</h3>
          </div>
          <a href={getDocumentUrl(selectedDocument)} download className="admin-panel-tag admin-preview-download">
            <Download size={14} />
            Download PDF
          </a>
        </div>

        <div className="admin-document-preview-meta">
          <span>{getDocumentCategory(selectedDocument)}</span>
          <span>{selectedDocument.split('/').pop()}</span>
        </div>

        <div className="admin-document-preview-wrap">
          <iframe
            key={selectedDocument}
            src={`${getDocumentUrl(selectedDocument)}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
            title={getDocumentTitle(selectedDocument)}
            className="admin-document-preview"
          />
        </div>
      </motion.article>
    </section>
  );

  const renderPlaceholderContent = () => (
    <section className="grid gap-5">
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="admin-panel-card"
      >
        <div className="admin-panel-head">
          <div>
            <p className="admin-panel-kicker">{activeSidebarLink.label}</p>
            <h3>{activeSidebarLink.label} section</h3>
          </div>
        </div>
        <p className="admin-empty-state">This section is ready for the next admin feature. Right now the full stored user data is available from the Users menu.</p>
      </motion.article>
    </section>
  );

  return (
    <main className="admin-dashboard-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-profile">
            <img src="/myphoto.jpeg" alt={portfolioData.name} className="admin-sidebar-avatar" />
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">{portfolioData.name}</h2>
              <p className="text-cyan-300 text-sm flex items-center gap-2 mt-1">
                <span className="admin-online-dot" />
                Online
              </p>
            </div>
          </div>

          <div className="admin-sidebar-heading">General</div>

          <nav className="admin-sidebar-nav">
            {sidebarLinks.map(({ key, label, icon: Icon }) => (
              <button key={key} className={`admin-nav-item ${activeSection === key ? 'is-active' : ''}`} onClick={() => setActiveSection(key)}>
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <div className="admin-mini-card">
              <p className="text-slate-400 text-xs uppercase tracking-[0.18em] mb-2">Portfolio Status</p>
              <p className="text-white font-bold text-lg">Live & Protected</p>
              <p className="text-slate-400 text-sm mt-2">Admin route secured for your personal dashboard access.</p>
            </div>
          </div>
        </aside>

        <section className="admin-main">
          <header className="admin-topbar">
            <div>
              <div className="admin-badge mb-3">
                <Sparkles size={14} />
                <span>Admin Workspace</span>
              </div>
              <h1 className="admin-page-title">{activeSidebarLink.label}</h1>
            </div>

            <div className="admin-topbar-actions">
              <div className="admin-search-box">
                <Search size={16} className="text-slate-500" />
                <span>Search dashboard</span>
              </div>
              <button className="admin-icon-button" aria-label="Notifications">
                <Bell size={18} />
              </button>
              <a href={`mailto:${portfolioData.email}`} className="admin-icon-button" aria-label="Mail">
                <Mail size={18} />
              </a>
              <div className="admin-user-chip">
                <img src="/myphoto.jpeg" alt={portfolioData.name} className="admin-user-chip-avatar" />
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{currentUser?.name || 'Sujoy Admin'}</p>
                  <p className="text-slate-400 text-xs">{currentUser?.email || portfolioData.email}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="orange-btn">
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </header>

          {activeSection === 'dashboard' && renderDashboardContent()}
          {activeSection === 'users' && renderUsersContent()}
          {activeSection === 'documents' && renderDocumentsContent()}
          {activeSection !== 'dashboard' && activeSection !== 'users' && activeSection !== 'documents' && renderPlaceholderContent()}

          <footer className="admin-footer">
            <span>Admin dashboard for {portfolioData.name}</span>
            <span>{portfolioData.location}</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
