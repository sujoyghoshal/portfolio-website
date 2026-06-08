import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import {
  SiGithub, SiReact, SiTypescript, SiJavascript, SiOpenjdk, SiPython,
  SiCplusplus, SiSpringboot, SiNodedotjs, SiExpress, SiNextdotjs,
  SiTailwindcss, SiMysql, SiPostgresql, SiMongodb, SiRedis, SiFirebase,
  SiDocker, SiKubernetes, SiGit, SiLinux, SiNginx,
  SiGrafana, SiPostman, SiRedux, SiGraphql, SiHtml5, SiCss,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { portfolioData } from '../data/portfolio';

/* ── Stats ──────────────────────────────────────────────────── */
const stats = [
  { value: 1,   suffix: '+',   label: 'Years Exp.'       },
  { value: 10,  suffix: '+',   label: 'Projects Built'   },
  { value: 8,   suffix: '.27', label: 'CGPA / 10'        },
  { value: 4,   suffix: '+',   label: 'Clients Served'   },
];

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = value / 50;
    const t = setInterval(() => {
      cur += step;
      if (cur >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(cur * 10) / 10);
    }, 25);
    return () => clearInterval(t);
  }, [inView, value]);

  return (
    <span ref={ref} className="about-stat-num">
      {suffix === '.27' ? count.toFixed(2) : Math.round(count)}{suffix}
    </span>
  );
}

/* ── Contact info ───────────────────────────────────────────── */
const infoItems = [
  { Icon: Mail,     value: portfolioData.email,       href: `mailto:${portfolioData.email}` },
  { Icon: Phone,    value: portfolioData.phone,        href: `tel:${portfolioData.phone}`   },
  { Icon: MapPin,   value: 'Sector 48, Gurgaon, India', href: null                          },
  { Icon: SiGithub, value: 'github.com/sujoyghoshal',  href: portfolioData.github           },
];

/* ── Tech stack by category ─────────────────────────────────── */
const techCategories = [
  {
    label: 'Languages',
    color: '#F59E0B',
    bg:    'rgba(245,158,11,0.1)',
    items: [
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'Java',       Icon: SiOpenjdk,    color: '#ED8B00' },
      { name: 'Python',     Icon: SiPython,     color: '#3776AB' },
      { name: 'C++',        Icon: SiCplusplus,  color: '#00599C' },
      { name: 'C',          Icon: SiCplusplus,  color: '#A8B9CC' },
    ],
  },
  {
    label: 'Frontend',
    color: '#00D4FF',
    bg:    'rgba(0,212,255,0.1)',
    items: [
      { name: 'React',       Icon: SiReact,       color: '#61DAFB' },
      { name: 'Next.js',     Icon: SiNextdotjs,   color: '#fff'    },
      { name: 'Redux',       Icon: SiRedux,       color: '#764ABC' },
      { name: 'HTML5',       Icon: SiHtml5,       color: '#E34F26' },
      { name: 'CSS3',        Icon: SiCss,         color: '#1572B6' },
      { name: 'Tailwind',    Icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    label: 'Backend',
    color: '#10B981',
    bg:    'rgba(16,185,129,0.1)',
    items: [
      { name: 'Spring Boot', Icon: SiSpringboot,  color: '#6DB33F' },
      { name: 'Node.js',     Icon: SiNodedotjs,   color: '#339933' },
      { name: 'Express',     Icon: SiExpress,     color: '#fff'    },
      { name: 'REST APIs',   Icon: SiPostman,     color: '#FF6C37' },
      { name: 'GraphQL',     Icon: SiGraphql,     color: '#E10098' },
    ],
  },
  {
    label: 'Database',
    color: '#8B5CF6',
    bg:    'rgba(139,92,246,0.1)',
    items: [
      { name: 'MySQL',      Icon: SiMysql,      color: '#4479A1' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#336791' },
      { name: 'MongoDB',    Icon: SiMongodb,    color: '#47A248' },
      { name: 'Redis',      Icon: SiRedis,      color: '#DC382D' },
      { name: 'Firebase',   Icon: SiFirebase,   color: '#FFCA28' },
    ],
  },
  {
    label: 'DevOps & Cloud',
    color: '#EC4899',
    bg:    'rgba(236,72,153,0.1)',
    items: [
      { name: 'Docker',      Icon: SiDocker,             color: '#2496ED' },
      { name: 'Kubernetes',  Icon: SiKubernetes,         color: '#326CE5' },
      { name: 'AWS',         Icon: FaAws,                color: '#FF9900' },
      { name: 'Git',         Icon: SiGit,                color: '#F05032' },
      { name: 'Linux',       Icon: SiLinux,              color: '#FCC624' },
      { name: 'Nginx',       Icon: SiNginx,              color: '#009639' },
      { name: 'Grafana',     Icon: SiGrafana,            color: '#F46800' },
    ],
  },
];

/* ── Proficiency bars ───────────────────────────────────────── */
const progressItems = [
  { name: 'React & Frontend',    pct: 90, color: '#61DAFB' },
  { name: 'Java & Spring Boot',  pct: 85, color: '#6DB33F' },
  { name: 'REST APIs & Backend', pct: 82, color: '#00D4FF' },
  { name: 'MySQL / MongoDB',     pct: 78, color: '#47A248' },
  { name: 'Node.js',             pct: 75, color: '#339933' },
  { name: 'CI/CD & DevOps',      pct: 80, color: '#8B5CF6' },
  { name: 'Python & AI / ML',    pct: 70, color: '#3776AB' },
  { name: 'C / C++',             pct: 72, color: '#00599C' },
  { name: 'Cloud (AWS)',         pct: 65, color: '#FF9900' },
];

function SkillBar({ name, pct, color, delay }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="skill-progress-item">
      <div className="skill-progress-label">
        <span>{name}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          className="skill-bar-fill"
          style={{ background: `linear-gradient(90deg,${color},${color}aa)` }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ delay, duration: 1.1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/* ── Stagger helpers ────────────────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55 } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55 } },
};

/* ── Component ──────────────────────────────────────────────── */
export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="section-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-shell"
        >
          <p className="section-sub">Who I Am</p>
          <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
          <p className="section-copy">
            Product-minded engineering, clean interfaces, and scalable backend thinking — brought together in one focused profile.
          </p>
        </motion.div>

        {/* Stats row */}
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

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ── Left Panel ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Profile card */}
            <div className="glass-card p-7">
              <p className="section-sub mb-1" style={{ justifyContent: 'flex-start', fontSize: '0.7rem' }}>Profile</p>
              <h3 className="text-xl font-extrabold text-[var(--text)] mb-3">
                Software Engineer @ <span className="gradient-text">Capgemini</span>
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed mb-5">{portfolioData.about}</p>

              {/* Contact rows */}
              <div className="flex flex-col gap-2.5">
                {infoItems.map(({ Icon, value, href }) => (
                  <motion.div
                    key={value}
                    whileHover={{ x: 4 }}
                    className="info-row"
                  >
                    <Icon size={14} className="text-[#00D4FF] shrink-0" />
                    {href
                      ? <a href={href} target="_blank" rel="noreferrer" className="text-sm truncate hover:text-[#00D4FF] transition-colors">{value}</a>
                      : <span className="text-sm truncate">{value}</span>
                    }
                    {href && <ExternalLink size={11} className="ml-auto text-[var(--muted)] opacity-0 group-hover:opacity-100 shrink-0" />}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Stack by category */}
            <div className="glass-card p-7">
              <p className="section-sub mb-1" style={{ justifyContent: 'flex-start', fontSize: '0.7rem' }}>Tech Stack</p>
              <h3 className="text-lg font-extrabold text-[var(--text)] mb-5">Skills &amp; Technologies</h3>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col gap-5"
              >
                {techCategories.map(({ label, color, bg, items }) => (
                  <motion.div key={label} variants={fadeUp}>
                    {/* Category label */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{ background: bg, color }}
                      >
                        {label}
                      </span>
                      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${color}33,transparent)` }} />
                    </div>

                    {/* Skill pills */}
                    <div className="flex flex-wrap gap-2">
                      {items.map(({ name, Icon, color: ic }) => (
                        <motion.span
                          key={name}
                          whileHover={{ scale: 1.07, y: -2 }}
                          className="about-tech-pill"
                          style={{ '--pill-color': ic }}
                        >
                          <Icon size={13} style={{ color: ic, flexShrink: 0 }} />
                          {name}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right Panel — Proficiency bars ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="glass-card p-7 flex flex-col gap-1"
          >
            <p className="section-sub mb-1" style={{ justifyContent: 'flex-start', fontSize: '0.7rem' }}>Proficiency</p>
            <h3 className="text-xl font-extrabold text-[var(--text)] mb-6">Core Strengths</h3>

            {progressItems.map((s, i) => (
              <SkillBar key={s.name} name={s.name} pct={s.pct} color={s.color} delay={i * 0.08} />
            ))}

            {/* Quick language chips */}
            <div className="mt-6 pt-5 border-t border-[var(--border)]">
              <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">Also worked with</p>
              <div className="flex flex-wrap gap-2">
                {['Microservices', 'WebSockets', 'JWT Auth', 'REST / JSON', 'Maven', 'Gradle',
                  'JUnit', 'Swagger', 'Vite', 'Jest', 'Agile / Scrum', 'System Design'].map((t) => (
                  <span key={t} className="skill-tag-pill">{t}</span>
                ))}
              </div>
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary mt-6 self-start"
            >
              Let's Work Together →
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
