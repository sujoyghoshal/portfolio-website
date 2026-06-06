import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const iconColors = [
  { bg: 'linear-gradient(135deg,#00D4FF,#8B5CF6)', shadow: 'rgba(0,212,255,0.25)' },
  { bg: 'linear-gradient(135deg,#8B5CF6,#EC4899)', shadow: 'rgba(139,92,246,0.25)' },
];

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-24 px-4 sm:px-6">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">Academic</p>
          <h2 className="section-title">My <span className="gradient-text">Education</span></h2>
          <p className="section-copy">
            Academic foundation that supports my engineering and product thinking.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="edu-timeline">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="edu-item"
              >
                <div
                  className="edu-icon"
                  style={{
                    background: iconColors[i % iconColors.length].bg,
                    boxShadow: `0 8px 24px ${iconColors[i % iconColors.length].shadow}`,
                  }}
                >
                  <GraduationCap size={22} className="text-white" />
                </div>

                <div className="edu-card">
                  <h3 className="text-[var(--text)] font-extrabold text-base leading-snug mb-1">
                    {edu.institution}
                  </h3>
                  <p className="gradient-text font-bold text-sm mb-3">{edu.degree}</p>

                  <div className="flex flex-wrap gap-3">
                    <span className="exp-meta-pill">
                      <Calendar size={11} />{edu.period}
                    </span>
                    {edu.score && (
                      <span className="exp-meta-pill" style={{ color: '#00D4FF', borderColor: 'rgba(0,212,255,0.2)' }}>
                        <Award size={11} />{edu.score}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
