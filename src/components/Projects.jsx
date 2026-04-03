import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Building2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const allProjects = [
  ...portfolioData.projects.map(p => ({ ...p, category: 'Backend' })),
  {
    name: 'Hotel Booking Platform',
    period: 'Aug 2024 – Feb 2025',
    tech: ['React', 'Node.js', 'Firebase', 'CSS'],
    company: 'Freelance – US Client',
    category: 'Frontend',
    points: [
      'Integrated real-time booking and authentication via Firebase.',
      'Cut booking workflow steps by 3, raising task completion rate significantly.',
      'Full cross-browser compatibility with zero post-launch defects.',
    ],
  },
  {
    name: 'Client Portfolio Sites (x3)',
    period: 'Aug 2024 – Feb 2025',
    tech: ['React', 'Tailwind CSS', 'HTML5'],
    company: 'Freelance – US Clients',
    category: 'Frontend',
    points: [
      'Delivered 3 portfolio websites — all shipped on schedule.',
      'Responsive design with zero post-launch layout defects reported.',
    ],
  },
];

const filters = ['All', 'Frontend', 'Backend'];

export default function Projects() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? allProjects : allProjects.filter(p => p.category === active);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">Portfolio</p>
          <h2 className="section-title">My <span className="gradient-text">Projects</span></h2>
          <p className="text-slate-400 text-center max-w-xl mx-auto mt-3 text-sm">
            Real-world projects built at Capgemini and for freelance clients worldwide.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="showcase-filter-row">
          {filters.map((f) => (
            <motion.button key={f} onClick={() => setActive(f)}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className={`showcase-filter-btn ${active === f ? 'is-active' : ''}`}
            >
              {f}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="showcase-grid max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.name}
                layout
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.28, delay: i * 0.04 }}
                className="showcase-card"
              >
                <div className="showcase-card-header">
                  <div className="showcase-icon showcase-icon-project">
                    <span className="text-white text-xl leading-none">{project.category === 'Frontend' ? '🎨' : '⚙️'}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="showcase-kicker">{project.category} Project</div>
                    <h3 className="showcase-title">{project.name}</h3>
                    <p className="showcase-subtitle">{project.company}</p>
                  </div>
                </div>

                <div className="showcase-meta-list">
                  <div className="showcase-meta-item">
                    <Calendar size={14} className="text-slate-400 shrink-0" />
                    <span>{project.period}</span>
                  </div>
                  <div className="showcase-meta-item">
                    <Building2 size={14} className="text-orange-400 shrink-0" />
                    <span>{project.category}</span>
                  </div>
                </div>

                <ul className="showcase-points">
                  {project.points.map((pt, pi) => (
                    <li key={pi}>
                      <span className="showcase-dot" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="chip-grid mt-5">
                  {project.tech.map((tech) => (
                    <span key={tech} className="chip-item">{tech}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
