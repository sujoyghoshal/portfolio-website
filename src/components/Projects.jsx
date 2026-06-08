import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Building2, X, ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { portfolioData } from '../data/portfolio';

/* ── project catalogue ─────────────────────────────────────── */
const allProjects = [
  {
    name: 'AI-Powered RAG SaaS Platform',
    period: '2025',
    tech: ['LLM / GPT-4', 'LangChain', 'Pinecone', 'AWS Lambda', 'Next.js', 'TypeScript', 'Docker', 'Redis'],
    company: 'Personal Project',
    category: 'AI / ML',
    description: 'Multi-tenant SaaS — upload docs, chat with them via LLM + vector search. Usage billing, auth, and full CI/CD pipeline included.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#052e16 40%,#064e3b 100%)',
    accentColor: '#10B981',
    icon: '🧠',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    badge: '~500ms query · multi-tenant · production-ready',
    points: [
      'Multi-tenant SaaS architecture with usage-based billing and isolated vector namespaces per tenant.',
      'LangChain RAG pipeline over Pinecone/pgvector — semantic search with GPT-4 for document Q&A.',
      'AWS Lambda serverless backend with full CI/CD via Jenkins and Docker containerisation.',
      'Next.js + TypeScript frontend with real-time streaming responses and Redis cache layer.',
    ],
  },
  {
    name: 'Real-Time DevOps Monitoring Dashboard',
    period: '2025',
    tech: ['AWS EC2', 'Prometheus', 'Grafana', 'Python FastAPI', 'React', 'TypeScript', 'Docker', 'WebSockets'],
    company: 'Personal Project',
    category: 'Systems',
    description: 'Observability platform ingesting logs, metrics, and alerts from microservices. Live graphs, alerting rules, and Slack notifications.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#0c1a10 40%,#0f2a1a 100%)',
    accentColor: '#F59E0B',
    icon: '📊',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    badge: 'Monitors 20+ microservices in real-time',
    points: [
      'Observability platform ingesting logs, metrics, and traces from 20+ microservices via Prometheus.',
      'Live Grafana dashboards with custom alerting rules and Slack webhook notifications.',
      'Python FastAPI backend with WebSocket push for real-time metric streaming to React frontend.',
      'Dockerised on AWS EC2 + ECS with Kubernetes orchestration and Jenkins CI/CD pipeline.',
    ],
  },
  {
    name: 'Scalable E-Commerce Microservices',
    period: '2025',
    tech: ['Node.js', 'TypeScript', 'Django', 'AWS SQS/SNS', 'AWS EC2', 'Redis', 'Docker', 'Next.js'],
    company: 'Personal Project',
    category: 'Full Stack',
    description: 'Event-driven backend with separate services for orders, inventory, payments, and notifications. Full system design with AWS infra.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#1a0d1a 40%,#2d0a2d 100%)',
    accentColor: '#EC4899',
    icon: '🛒',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    badge: 'Handles 50,000+ orders/day architecture',
    points: [
      'Event-driven microservices for orders, inventory, payments, and notifications using AWS SQS/SNS.',
      'Node.js + TypeScript services with Django admin panel — each service independently deployable.',
      'Redis session management and caching layer to handle 50k+ orders/day throughput.',
      'Next.js storefront with Docker Compose local dev and AWS EC2 + RDS production deployment.',
    ],
  },
  {
    name: 'High-Performance C/C++ Trading Engine',
    period: '2025',
    tech: ['C / C++', 'Python Analytics', 'Linux Systems', 'Redis', 'WebSocket', 'Docker', 'Memory Optimisation'],
    company: 'Personal Project',
    category: 'Systems',
    description: 'Low-latency order matching engine in C++ with Python analytics dashboard. Custom allocators, benchmarked on Linux embedded platform.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#1a0a2e 40%,#16213e 100%)',
    accentColor: '#8B5CF6',
    icon: '⚡',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    badge: '<1ms order matching latency',
    points: [
      'C++ order matching engine with custom memory allocators — benchmarked at <1ms latency on Linux.',
      'Lock-free data structures and Redis order book for ultra-low-latency bid/ask matching.',
      'WebSocket feed for real-time price streaming to Python analytics and React dashboard.',
      'Profiled with perf + valgrind; zero-copy serialisation via FlatBuffers for wire efficiency.',
    ],
  },
  {
    name: 'AI Video Content Generator',
    period: '2025',
    tech: ['LLM Orchestration', 'AWS Lambda', 'AWS S3', 'Python FastAPI', 'Next.js', 'TypeScript', 'FFmpeg', 'Jenkins'],
    company: 'Personal Project',
    category: 'AI / ML',
    description: 'Upload a topic → get script + voiceover + auto-generated scenes. Serverless pipeline with Lambda, S3, and LLM orchestration.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#0a1628 40%,#0f2040 100%)',
    accentColor: '#00D4FF',
    icon: '🎬',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    badge: 'End-to-end in under 3 mins · fully serverless',
    points: [
      'Fully serverless pipeline: topic input → LLM script → TTS voiceover → FFmpeg video assembly on Lambda.',
      'AWS S3 + CloudFront for video storage and CDN delivery; each step triggered by S3 events.',
      'LLM orchestration layer coordinates script writing, scene description, and narration generation.',
      'Next.js frontend with real-time progress tracking; Jenkins CI/CD for pipeline deployments.',
    ],
  },
  {
    name: 'Real-Time Collaborative Workspace',
    period: '2025',
    tech: ['MERN Stack', 'Next.js', 'TypeScript', 'Socket.io', 'LLM AI', 'Redis', 'AWS EC2', 'Docker'],
    company: 'Personal Project',
    category: 'Full Stack',
    description: 'Notion-like editor with AI writing assistant, live presence, role-based permissions — full MERN + Next.js frontend.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#052e16 40%,#064e3b 100%)',
    accentColor: '#10B981',
    icon: '✍️',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    badge: '100+ concurrent editors · conflict-free sync',
    points: [
      'Real-time CRDT-based collaborative editor supporting 100+ concurrent users conflict-free.',
      'Socket.io for live presence indicators, cursor positions, and instant sync across clients.',
      'LLM writing assistant integrated inline — auto-complete, summarise, and rewrite selections.',
      'Role-based permissions (viewer/editor/admin) with Redis Pub/Sub and AWS EC2 deployment.',
    ],
  },
  {
    name: 'Zero-Trust API Gateway & Auth Platform',
    period: '2025',
    tech: ['Node.js', 'TypeScript', 'AWS API Gateway', 'Redis', 'Docker', 'Python', 'React', 'JWT / OAuth2'],
    company: 'Personal Project',
    category: 'Systems',
    description: 'Secure API gateway with JWT/OAuth2, rate limiting, IP whitelisting, audit logs, and a React admin panel. Enterprise-grade security architecture.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#1a0a0a 40%,#2d0f0f 100%)',
    accentColor: '#EF4444',
    icon: '🔐',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    badge: '99.99% uptime · blocks 10k+ req/sec attacks',
    points: [
      'Zero-trust gateway with JWT/OAuth2, IP whitelisting, and per-route rate limiting via Redis.',
      'Python audit log service captures every request with fingerprinting for compliance reporting.',
      'React admin panel for real-time traffic monitoring, rule management, and IP block lists.',
      'AWS API Gateway + Lambda edge functions; blocks 10k+ malicious req/sec with 99.99% uptime.',
    ],
  },
  {
    name: 'AI Stock & Crypto Analytics Engine',
    period: '2025',
    tech: ['LLM Sentiment AI', 'Python', 'Django', 'Weaviate', 'AWS Lambda', 'Redis', 'Next.js', 'WebSockets'],
    company: 'Personal Project',
    category: 'AI / ML',
    description: 'Real-time market data pipeline with LLM-powered sentiment analysis from news + Twitter. Predictive signals dashboard with backtesting.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#1a0d00 40%,#2a1500 100%)',
    accentColor: '#F97316',
    icon: '📈',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    badge: 'Processes 1M+ data points daily · live signals',
    points: [
      'LLM sentiment analysis on 1M+ daily news articles and tweets — scores mapped to price signals.',
      'Weaviate vector DB for semantic financial news search and similarity-based pattern detection.',
      'Django REST + Redis Streams for real-time market data ingestion and signal computation.',
      'Next.js dashboard with WebSocket charts, backtesting engine, and AWS Lambda data workers.',
    ],
  },
  {
    name: 'Multi-Agent AI Automation Platform',
    period: '2025',
    tech: ['LLM Multi-Agent', 'LangGraph', 'CrewAI', 'Python FastAPI', 'AWS Lambda', 'Vector DB', 'Next.js', 'Docker'],
    company: 'Personal Project',
    category: 'AI / ML',
    description: 'Drag-and-drop workflow builder where AI agents execute tasks — web scraping, emailing, data processing — autonomously with no code.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#1e0533 40%,#2d0a4e 100%)',
    accentColor: '#A78BFA',
    icon: '🤖',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    badge: 'Automates 50+ workflow types · zero-code',
    points: [
      'Drag-and-drop workflow canvas — connect LLM agents to automate 50+ task types with no code.',
      'LangGraph + CrewAI for multi-agent orchestration — agents delegate, retry, and self-correct.',
      'AWS Lambda workers execute tasks (scraping, emailing, data processing) in parallel at scale.',
      'Vector DB for agent memory; Next.js frontend with real-time execution logs and run history.',
    ],
  },
  {
    name: 'Healthcare Patient Management System',
    period: '2025',
    tech: ['C/C++ Device Driver', 'Django REST', 'LLM Diagnosis AI', 'AWS EC2', 'React', 'TypeScript', 'Docker', 'Redis'],
    company: 'Personal Project',
    category: 'Full Stack',
    description: 'HIPAA-compliant platform with appointment booking, EHR records, AI diagnosis assist, and billing. Full-stack with embedded C++ vitals device driver.',
    gradient: 'linear-gradient(135deg,#0A0A0F 0%,#0a1a1f 40%,#0f2a30 100%)',
    accentColor: '#06B6D4',
    icon: '🏥',
    liveUrl: null,
    githubUrl: 'https://github.com/sujoyghoshal',
    badge: 'HIPAA-compliant · AI diagnosis assist',
    points: [
      'C/C++ embedded device driver streams real-time vitals data to the Django REST API over serial.',
      'LLM-powered diagnosis assistant surfaces differential diagnoses from patient EHR history.',
      'HIPAA-compliant architecture — AES-256 encryption at rest, audit trails, and role-based access.',
      'React + TypeScript frontend with appointment scheduler, billing module, and AWS EC2 deployment.',
    ],
  },
];

const filters = ['All', 'Full Stack', 'Systems', 'AI / ML'];

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

                  {project.badge && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accentColor }} />
                      <span className="text-[10px] font-semibold truncate" style={{ color: project.accentColor }}>{project.badge}</span>
                    </div>
                  )}

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

              <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">{modal.description}</p>

              {modal.badge && (
                <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl" style={{ background: `${modal.accentColor}12`, border: `1px solid ${modal.accentColor}30` }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: modal.accentColor }} />
                  <span className="text-xs font-bold" style={{ color: modal.accentColor }}>{modal.badge}</span>
                </div>
              )}

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
