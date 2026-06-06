import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Building2, X, ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { portfolioData } from '../data/portfolio';

/* ── project catalogue ─────────────────────────────────────── */
const allProjects = [
  {
    name: 'LG 5G NR – PDCP Layer MBS',
    period: 'Oct 2025 – Present',
    tech: ['C', 'C++', 'Linux', 'Telecom', 'Jira'],
    company: 'Capgemini',
    category: 'Systems',
    description: 'Engineering 5G NR PDCP features for LG — message parsing, API handlers, and memory optimisations for MBS layer on an embedded Linux platform.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#1a0a2e 40%,#16213e 100%)',
    accentColor: '#8B5CF6',
    icon: '📡',
    liveUrl: null,
    githubUrl: null,
    points: portfolioData.projects[0].points,
  },
  {
    name: 'Hotel Booking Platform',
    period: 'Aug 2024 – Feb 2025',
    tech: ['React', 'Node.js', 'Firebase', 'CSS'],
    company: 'Freelance – US Client',
    category: 'Frontend',
    description: 'Real-time hotel booking platform with Firebase authentication, live availability, and a streamlined 3-step checkout flow for a US hospitality client.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#1a0d1a 40%,#2d0a2d 100%)',
    accentColor: '#EC4899',
    icon: '🏨',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    points: [
      'Integrated real-time booking and authentication via Firebase.',
      'Cut booking workflow steps by 3, raising task completion rate significantly.',
      'Full cross-browser compatibility with zero post-launch defects.',
    ],
  },
  {
    name: 'Developer Portfolio Sites ×6+',
    period: 'Aug 2024 – Present',
    tech: ['React', 'Tailwind CSS', 'HTML5', 'Framer Motion'],
    company: 'Freelance – US Clients',
    category: 'Frontend',
    description: 'Six+ custom developer portfolio websites delivered for US-based clients — responsive, animated, Framer Motion transitions, and all shipped on schedule with zero post-launch defects.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#1a1200 40%,#2a1800 100%)',
    accentColor: '#F97316',
    icon: '💼',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    points: [
      'Delivered 6+ portfolio websites for US clients — all shipped on schedule.',
      'Responsive, mobile-first design with zero post-launch layout defects across all projects.',
      'Custom animations with Framer Motion — smooth page transitions and scroll reveals.',
      'Each site tailored to the client\'s brand, colour palette, and content requirements.',
    ],
  },
  {
    name: 'GENAI SpecGPT',
    period: '2025 – Present',
    tech: ['Python', 'React', 'FastAPI', 'LLM', 'Langchain'],
    company: 'Personal Project',
    category: 'AI / ML',
    description: 'AI-powered specification generator that uses large language models to auto-create detailed technical specs, user stories, and acceptance criteria from plain-English requirements.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#052e16 40%,#064e3b 100%)',
    accentColor: '#10B981',
    icon: '🤖',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    points: [
      'Built a GenAI pipeline that converts plain-English requirements into structured technical specs.',
      'Integrated Langchain for multi-step LLM reasoning and context management.',
      'React frontend with FastAPI backend — real-time streaming responses via SSE.',
      'Supports export to Markdown, JIRA-ready user stories, and acceptance criteria.',
    ],
  },
  {
    name: 'Claude AI Application',
    period: '2025 – Present',
    tech: ['React', 'Claude API', 'Node.js', 'Anthropic SDK'],
    company: 'Capgemini',
    category: 'AI / ML',
    description: 'Latest project at Capgemini — an intelligent assistant application powered by Claude (Anthropic) for automated code review, documentation generation, and developer productivity workflows.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#1e0533 40%,#2d0a4e 100%)',
    accentColor: '#A78BFA',
    icon: '✨',
    liveUrl: null,
    githubUrl: null,
    points: [
      'Integrated Claude API (Anthropic) for intelligent code review and documentation generation.',
      'Built multi-turn conversation context management for complex developer queries.',
      'Reduced manual documentation effort by automating spec and README generation.',
      'Implemented streaming responses for real-time AI output with React Server Events.',
    ],
  },
  {
    name: 'Flight Booking Website',
    period: 'Aug 2024 – May 2025',
    tech: ['React', 'Spring Boot', 'MySQL', 'JWT', 'REST API'],
    company: 'Final Year Project',
    category: 'Full Stack',
    description: 'End-to-end flight booking web application built as a Final Year Project — seat selection, booking management, user authentication with JWT, and admin dashboard.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#0c1a2e 40%,#0f2a4a 100%)',
    accentColor: '#F59E0B',
    icon: '✈️',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    points: [
      'Built full booking flow — search, seat selection, payment summary, and e-ticket generation.',
      'Secure JWT-based authentication with role separation (user vs admin).',
      'Spring Boot REST APIs with MySQL — handling flight schedules, seat availability, and reservations.',
      'Admin dashboard for managing flights, routes, and passenger records.',
    ],
  },
];

const filters = ['All', 'Frontend', 'Full Stack', 'Systems', 'AI / ML'];

/* ── browser-chrome thumbnail ──────────────────────────────── */
function ProjectThumb({ project }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 190, background: project.gradient }}
    >
      {/* browser chrome bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-3 py-2"
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}>
        <span className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-80" />
        <div className="flex-1 mx-2 h-4 rounded-sm flex items-center px-2"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="text-white/30 text-[9px] truncate">sujoyghoshal.dev/{project.name.toLowerCase().replace(/[^a-z0-9]/g,'-').replace(/-+/g,'-')}</span>
        </div>
      </div>

      {/* content area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 pb-2 gap-2">
        {/* ambient glow */}
        <div className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(ellipse at 50% 60%,${project.accentColor},transparent 65%)` }} />

        <span className="text-4xl relative z-10">{project.icon}</span>
        <p className="text-white font-black text-sm text-center px-4 leading-tight relative z-10 drop-shadow">{project.name}</p>

        {/* floating tech chips */}
        <div className="flex flex-wrap justify-center gap-1.5 px-4 relative z-10">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="text-[9px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${project.accentColor}22`, border: `1px solid ${project.accentColor}44`, color: project.accentColor }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* category badge */}
      <div className="absolute top-9 right-2.5 text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full"
        style={{ background: `${project.accentColor}22`, border: `1px solid ${project.accentColor}55`, color: project.accentColor }}>
        {project.category}
      </div>
    </div>
  );
}

/* ── main component ────────────────────────────────────────── */
export default function Projects() {
  const [active, setActive] = useState('All');
  const [modal,  setModal]  = useState(null);

  const filtered = active === 'All' ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">Portfolio</p>
          <h2 className="section-title">My <span className="gradient-text">Projects</span></h2>
          <p className="section-copy">
            Real-world projects shipped at Capgemini and for freelance clients worldwide.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`filter-btn ${active === f ? 'active' : ''}`}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit    ={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="project-card group cursor-pointer"
                onClick={() => setModal(project)}
                whileHover={{ y: -6 }}
              >
                {/* ── thumbnail ── */}
                <div className="overflow-hidden" style={{ borderRadius: '20px 20px 0 0' }}>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProjectThumb project={project} />
                  </motion.div>
                </div>

                {/* ── body ── */}
                <div className="project-body">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <h3 className="project-title leading-snug">{project.name}</h3>
                      <p className="text-[var(--muted)] text-xs mt-0.5">{project.company}</p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank" rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[#00D4FF] hover:border-[rgba(0,212,255,0.4)] transition-all"
                        >
                          <SiGithub size={13} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank" rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[#00D4FF] hover:border-[rgba(0,212,255,0.4)] transition-all"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="project-desc line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-chip">{t}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="exp-meta-pill text-[10px]"><Calendar size={10} />{project.period}</span>
                    <span
                      className="text-[10px] font-bold"
                      style={{ color: project.accentColor }}
                    >
                      View details →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <motion.div
              className="modal-card"
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit   ={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal thumbnail */}
              <div className="overflow-hidden rounded-2xl mb-6">
                <ProjectThumb project={modal} />
              </div>

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-[0.72rem] font-bold tracking-widest uppercase mb-1"
                    style={{ color: modal.accentColor }}>
                    {modal.category} Project
                  </p>
                  <h3 className="text-2xl font-extrabold text-[var(--text)]">{modal.name}</h3>
                  <p className="text-[var(--muted)] text-sm mt-1">{modal.company}</p>
                </div>
                <button
                  onClick={() => setModal(null)}
                  className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-[var(--muted)] text-sm leading-relaxed mb-5">{modal.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                <span className="exp-meta-pill"><Calendar size={12} />{modal.period}</span>
                <span className="exp-meta-pill"><Building2 size={12} />{modal.company}</span>
              </div>

              <h4 className="text-xs font-bold text-[var(--text)] mb-3 uppercase tracking-widest opacity-60">Key Achievements</h4>
              <ul className="flex flex-col gap-3 mb-6">
                {modal.points.map((pt, pi) => (
                  <li key={pi} className="exp-point">
                    <span className="exp-bullet" style={{ background: modal.accentColor }} />
                    <span className="text-sm">{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-5">
                {modal.tech.map((t) => (
                  <span key={t} className="tech-chip">{t}</span>
                ))}
              </div>

              <div className="flex gap-3 flex-wrap">
                {modal.githubUrl && (
                  <a href={modal.githubUrl} target="_blank" rel="noreferrer"
                    className="btn-secondary text-sm py-2.5 px-5 inline-flex items-center gap-2">
                    <SiGithub size={15} /> View on GitHub
                  </a>
                )}
                {modal.liveUrl && (
                  <a href={modal.liveUrl} target="_blank" rel="noreferrer"
                    className="btn-primary text-sm py-2.5 px-5 inline-flex items-center gap-2">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
