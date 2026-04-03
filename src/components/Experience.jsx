import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">Career</p>
          <h2 className="section-title">Work <span className="gradient-text">Experience</span></h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mt-3 text-sm leading-relaxed">
            Enterprise and freelance roles arranged in a balanced desktop grid and stacked cleanly on mobile.
          </p>
        </div>

        <div className="showcase-grid max-w-5xl mx-auto">
          {portfolioData.experience.map((exp, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="showcase-card showcase-card-tall"
            >
              <div className="showcase-card-header">
                <div className="showcase-icon">
                  <Briefcase size={20} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="showcase-kicker">Experience</div>
                  <h3 className="showcase-title">{exp.role}</h3>
                  <p className="showcase-subtitle">{exp.company}</p>
                </div>
              </div>

              <div className="showcase-meta-list">
                <div className="showcase-meta-item">
                  <Calendar size={14} className="text-slate-400 shrink-0" />
                  <span>{exp.period}</span>
                </div>
                <div className="showcase-meta-item">
                  <MapPin size={14} className="text-orange-400 shrink-0" />
                  <span>{exp.location}</span>
                </div>
              </div>

              <ul className="showcase-points">
                {exp.points.map((pt, pi) => (
                  <li key={pi}>
                    <span className="showcase-dot" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
