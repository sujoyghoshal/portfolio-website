import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Mail, Phone, GitBranch, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const skills = [
  { name: 'React / Frontend', pct: 90 },
  { name: 'Java & Spring Boot', pct: 85 },
  { name: 'REST APIs', pct: 82 },
  { name: 'MySQL / MongoDB', pct: 78 },
  { name: 'Node.js', pct: 75 },
  { name: 'CI/CD & Agile', pct: 80 },
];

const highlights = [
  'Builds clean, scalable React and Spring Boot products.',
  'Focuses on performance, responsive UI, and maintainable code.',
  'Comfortable shipping both client work and enterprise features.',
];

function SkillBar({ name, pct, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-slate-300 text-sm">{name}</span>
        <span className="text-orange-400 text-sm font-bold">{pct}%</span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ delay, duration: 1.2, ease: 'easeOut' }}
          className="skill-bar-fill"
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">Who I Am</p>
          <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
          <p className="section-copy">
            Product-minded engineering, clean interfaces, and scalable backend thinking brought together in one focused profile.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-summary-card card h-full p-6 sm:p-7 md:p-8"
          >
            <div className="about-summary-head">
              <span className="about-summary-badge">
                <Sparkles size={14} />
                Profile Snapshot
              </span>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Software Engineer @{' '}
                  <span className="company-inline-mark company-inline-mark-strong">
                    <img src="/capgemini.png" alt="Capgemini" className="company-inline-logo" />
                  </span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{portfolioData.about}</p>
              </div>
            </div>

            <div className="about-highlight-list">
              {highlights.map((item) => (
                <div key={item} className="about-highlight-item">
                  <span className="about-highlight-dot" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="about-summary-meta">
              {[
                { icon: <Mail size={13} />, value: portfolioData.email },
                { icon: <Phone size={13} />, value: portfolioData.phone },
                { icon: <MapPin size={13} />, value: 'Sector 48, Gurgaon, India' },
                { icon: <GitBranch size={13} />, value: 'github.com/sujoyghoshal' },
              ].map(({ icon, value }) => (
                <div key={value} className="about-meta-pill">
                  <span className="text-orange-400 shrink-0">{icon}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>

            <div className="about-summary-foot">
              <div>
                <p className="text-orange-400 font-black text-2xl sm:text-3xl">1+</p>
                <p className="text-slate-500 text-xs uppercase tracking-[0.2em]">Years Experience</p>
              </div>
              <div>
                <p className="text-orange-400 font-black text-2xl sm:text-3xl">10+</p>
                <p className="text-slate-500 text-xs uppercase tracking-[0.2em]">Projects Built</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-skills-panel card h-full p-6 sm:p-7 md:p-8 text-center md:text-left"
          >
            <div className="about-skill-tags">
              <span>React UI</span>
              <span>Spring Boot</span>
              <span>API Design</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Core Strengths</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Practical frontend and backend execution with a strong focus on shipping responsive, production-ready experiences.
            </p>

            {skills.map((s, i) => (
              <SkillBar key={s.name} name={s.name} pct={s.pct} delay={i * 0.08} />
            ))}
            <motion.a href="#contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="orange-btn mt-6 inline-flex hero-action-btn">
              Let's Work Together →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
