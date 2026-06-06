import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const dotColors = ['#00D4FF', '#8B5CF6'];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">Career</p>
          <h2 className="section-title">Work <span className="gradient-text">Experience</span></h2>
          <p className="section-copy">
            Enterprise and freelance roles that shaped my skills in full-stack engineering,
            performance optimisation, and cross-team delivery.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="timeline-wrap">
            {portfolioData.experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="timeline-item"
              >
                <div
                  className="timeline-dot"
                  style={{ '--dot-color': dotColors[i % dotColors.length] }}
                />

                <div className="exp-card">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="exp-role">{exp.role}</p>
                      <p className="exp-company">{exp.company}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="exp-meta-pill">
                        <Calendar size={12} />{exp.period}
                      </span>
                      <span className="exp-meta-pill">
                        <MapPin size={12} />{exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2 mt-2">
                    {exp.points.map((pt, pi) => (
                      <li key={pi} className="exp-point">
                        <span className="exp-bullet" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
