import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { portfolioData } from '../data/portfolio';

const stats = [
  { value: 1,   suffix: '+', label: 'Years Experience' },
  { value: 10,  suffix: '+', label: 'Projects Built'   },
  { value: 8,   suffix: '.27', label: 'CGPA / 10'      },
  { value: 4,   suffix: '',  label: 'US Clients Served' },
];

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / 40;
    const t = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(start * 10) / 10);
    }, 30);
    return () => clearInterval(t);
  }, [inView, value]);

  return (
    <span ref={ref} className="about-stat-num">
      {suffix === '.27' ? count.toFixed(2) : Math.round(count)}{suffix}
    </span>
  );
}

const infoItems = [
  { Icon: Mail,   value: portfolioData.email },
  { Icon: Phone,  value: portfolioData.phone },
  { Icon: MapPin, value: 'Sector 48, Gurgaon, India' },
  { Icon: SiGithub, value: 'github.com/sujoyghoshal' },
];

const skillTags = [
  'React', 'TypeScript', 'Java', 'Spring Boot',
  'Node.js', 'MySQL', 'MongoDB', 'REST APIs',
  'Tailwind CSS', 'Git', 'CI/CD', 'Agile',
];

const progressItems = [
  { name: 'React / Frontend', pct: 90 },
  { name: 'Java & Spring Boot', pct: 85 },
  { name: 'REST APIs',          pct: 82 },
  { name: 'MySQL / MongoDB',    pct: 78 },
  { name: 'Node.js',            pct: 75 },
  { name: 'CI/CD & Agile',      pct: 80 },
];

function SkillBar({ name, pct, delay }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="skill-progress-item">
      <div className="skill-progress-label">
        <span>{name}</span>
        <span>{pct}%</span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ delay, duration: 1.1, ease: 'easeOut' }}
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
            Product-minded engineering, clean interfaces, and scalable backend
            thinking brought together in one focused profile.
          </p>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="about-stat-card"
            >
              <Counter value={s.value} suffix={s.suffix} />
              <p className="about-stat-lbl">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-7 flex flex-col gap-6"
          >
            <div>
              <p className="section-sub" style={{ justifyContent: 'flex-start' }}>Profile</p>
              <h3 className="text-xl font-extrabold text-[var(--text)] mt-1 mb-3">
                Software Engineer @ <span className="gradient-text">Capgemini</span>
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">{portfolioData.about}</p>
            </div>

            <div className="flex flex-col gap-3">
              {infoItems.map(({ Icon, value }) => (
                <div key={value} className="info-row">
                  <Icon size={15} className="text-[#00D4FF] shrink-0" />
                  <span className="text-sm truncate">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {skillTags.map((t) => (
                <span key={t} className="skill-tag-pill">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Right — Skill Bars */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-7 flex flex-col gap-2"
          >
            <p className="section-sub mb-2" style={{ justifyContent: 'flex-start' }}>Proficiency</p>
            <h3 className="text-xl font-extrabold text-[var(--text)] mb-5">Core Strengths</h3>
            {progressItems.map((s, i) => (
              <SkillBar key={s.name} name={s.name} pct={s.pct} delay={i * 0.09} />
            ))}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary mt-4 self-start"
            >
              Let's Work Together →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
