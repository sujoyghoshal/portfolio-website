import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  SiBootstrap, SiCss, SiFirebase, SiGit, SiHtml5,
  SiJavascript, SiJenkins, SiLinux, SiMongodb, SiMysql,
  SiNodedotjs, SiPostman, SiReact, SiSpringboot, SiTailwindcss,
} from 'react-icons/si';
import { Braces, Boxes, Database, GitBranch, Layers3, LayoutTemplate, Network, ServerCog, Workflow } from 'lucide-react';

const iconMap = {
  HTML5: SiHtml5, CSS3: SiCss, JavaScript: SiJavascript, React: SiReact,
  'Tailwind CSS': SiTailwindcss, Bootstrap: SiBootstrap, Java: Braces,
  'Spring Boot': SiSpringboot, 'Node.js': SiNodedotjs, 'REST APIs': Network,
  Microservices: Boxes, MySQL: SiMysql, MongoDB: SiMongodb, Firebase: SiFirebase,
  Git: SiGit, Jenkins: SiJenkins, Postman: SiPostman, Linux: SiLinux,
  'System Design': LayoutTemplate, OOP: Layers3, 'CI/CD': Workflow,
  Agile: GitBranch, 'Web Content Management': Database, Backend: ServerCog,
};

const groups = [
  {
    icon: '🎨', label: 'Frontend', accent: 'linear-gradient(90deg,#00D4FF,#8B5CF6)',
    bg: 'rgba(0,212,255,0.08)',
    skills: ['HTML5','CSS3','JavaScript','React','Tailwind CSS','Bootstrap'],
    bars: [{ n:'HTML5',p:92 },{ n:'CSS3',p:88 },{ n:'JavaScript',p:85 },{ n:'React',p:90 },{ n:'Tailwind CSS',p:82 }],
  },
  {
    icon: '⚙️', label: 'Backend', accent: 'linear-gradient(90deg,#8B5CF6,#EC4899)',
    bg: 'rgba(139,92,246,0.08)',
    skills: ['Java','Spring Boot','Node.js','REST APIs','Microservices'],
    bars: [{ n:'Java',p:85 },{ n:'Spring Boot',p:83 },{ n:'Node.js',p:75 },{ n:'REST APIs',p:88 }],
  },
  {
    icon: '🗄️', label: 'Databases & Tools', accent: 'linear-gradient(90deg,#EC4899,#F97316)',
    bg: 'rgba(236,72,153,0.08)',
    skills: ['MySQL','MongoDB','Firebase','Git','Jenkins','Postman','Linux'],
    bars: [{ n:'MySQL',p:80 },{ n:'MongoDB',p:75 },{ n:'Firebase',p:72 },{ n:'Git',p:88 }],
  },
  {
    icon: '💡', label: 'Concepts', accent: 'linear-gradient(90deg,#F97316,#00D4FF)',
    bg: 'rgba(249,115,22,0.08)',
    skills: ['System Design','OOP','CI/CD','Agile','Web Content Management'],
    bars: [{ n:'System Design',p:78 },{ n:'OOP',p:85 },{ n:'CI/CD',p:80 },{ n:'Agile',p:82 }],
  },
];

function SkillBar({ name, pct, delay, accent }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="skill-progress-item">
      <div className="skill-progress-label">
        <span>{name}</span>
        <span style={{ color: '#00D4FF' }}>{pct}%</span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ delay, duration: 1.1, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: '999px', background: accent, boxShadow: '0 0 10px rgba(0,212,255,.3)' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">What I Know</p>
          <h2 className="section-title">Tech <span className="gradient-text">Stack</span></h2>
          <p className="section-copy">
            A structured overview of the technologies, tools, and engineering concepts
            I use across frontend, backend, databases, and software delivery.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {groups.map((g, gi) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1, duration: 0.5 }}
              className="skill-category-card"
              style={{ '--card-accent': g.accent }}
            >
              <div className="skill-icon-wrap" style={{ background: g.bg }}>
                <span className="text-xl">{g.icon}</span>
              </div>
              <h3 className="text-lg font-extrabold text-[var(--text)] mb-3">{g.label}</h3>

              <div className="flex flex-wrap gap-2 mb-5">
                {g.skills.map((s) => {
                  const Icon = iconMap[s] || Braces;
                  return (
                    <span key={s} className="tech-pill">
                      <Icon size={14} />{s}
                    </span>
                  );
                })}
              </div>

              <div className="flex flex-col gap-0">
                {g.bars.map((b, bi) => (
                  <SkillBar key={b.n} name={b.n} pct={b.p} delay={gi * 0.08 + bi * 0.07} accent={g.accent} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
