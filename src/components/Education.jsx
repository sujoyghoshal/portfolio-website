import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 px-6 md:py-24">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">Academic</p>
          <h2 className="section-title"><span className="gradient-text">Education</span></h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="education-panel p-6 md:p-7 h-full"
          >
            <div className="mb-8 text-center">
              <p className="panel-kicker text-xs font-bold tracking-[0.22em] uppercase mb-2">Education</p>
              <h3 className="panel-heading text-2xl font-extrabold leading-tight">Academic Background</h3>
            </div>

            <div className="education-list max-w-3xl mx-auto">
              {education.map((edu, i) => (
                <div key={i} className="education-item">
                  <div className="education-marker">
                    <div className="education-icon-wrap">
                      <GraduationCap size={20} className="text-white" />
                    </div>
                  </div>

                  <div className="education-content">
                    <h3 className="panel-title font-bold text-base leading-tight">{edu.institution}</h3>
                    <p className="panel-accent text-sm font-semibold mt-1.5 leading-relaxed">{edu.degree}</p>
                    <div className="mt-4 space-y-2.5">
                      <div className="panel-meta flex items-center gap-2 text-sm">
                        <Calendar size={13} className="panel-muted shrink-0" />
                        <span>{edu.period}</span>
                      </div>
                      {edu.score && (
                        <div className="panel-meta flex items-center gap-2 text-sm font-medium">
                          <Award size={13} className="text-orange-400 shrink-0" />
                          <span>{edu.score}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
