import { motion } from 'framer-motion';
import {
  SiBootstrap,
  SiCss,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
} from 'react-icons/si';
import { Braces, Boxes, Database, GitBranch, Layers3, LayoutTemplate, Network, ServerCog, Workflow } from 'lucide-react';

const skillIconMap = {
  HTML5: SiHtml5,
  CSS3: SiCss,
  JavaScript: SiJavascript,
  React: SiReact,
  'Tailwind CSS': SiTailwindcss,
  Bootstrap: SiBootstrap,
  Java: Braces,
  'Spring Boot': SiSpringboot,
  'Node.js': SiNodedotjs,
  'REST APIs': Network,
  Microservices: Boxes,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,
  Git: SiGit,
  Jenkins: SiJenkins,
  Postman: SiPostman,
  Linux: SiLinux,
  'System Design': LayoutTemplate,
  OOP: Layers3,
  'CI/CD': Workflow,
  Agile: GitBranch,
  'Web Content Management': Database,
  Backend: ServerCog,
};

const skillGroups = [
  {
    category: 'Frontend',
    icon: '🎨',
    description: 'Modern UI development focused on responsive, accessible, and polished web interfaces.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    description: 'Scalable service development with APIs, business logic, and production-ready architecture.',
    skills: ['Java', 'Spring Boot', 'Node.js', 'REST APIs', 'Microservices'],
  },
  {
    category: 'Databases & Tools',
    icon: '🗄️',
    description: 'Data handling, version control, delivery tooling, and day-to-day engineering workflow support.',
    skills: ['MySQL', 'MongoDB', 'Firebase', 'Git', 'Jenkins', 'Postman', 'Linux'],
  },
  {
    category: 'Concepts',
    icon: '💡',
    description: 'Core engineering concepts that support maintainable systems and reliable team delivery.',
    skills: ['System Design', 'OOP', 'CI/CD', 'Agile', 'Web Content Management'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">What I Know</p>
          <h2 className="section-title">Tech <span className="gradient-text">Stack</span></h2>
          <p className="skills-section-copy">
            A structured overview of the technologies, tools, and engineering concepts I use across frontend,
            backend, databases, and software delivery.
          </p>
        </div>

        <div className="skills-grid max-w-6xl mx-auto">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1, duration: 0.5 }}
              className="education-panel skills-card"
            >
              <div className="skills-card-top">
                <div className="skills-card-heading-wrap">
                  <div className="education-icon-wrap skills-card-icon">
                    <span className="text-white text-xl leading-none">{group.icon}</span>
                  </div>
                  <div className="skills-card-heading-block">
                    <p className="panel-kicker text-xs font-bold tracking-[0.22em] uppercase mb-1">Tech Stack</p>
                    <h3 className="panel-heading text-xl font-extrabold leading-tight">{group.category}</h3>
                  </div>
                </div>

                <div className="skills-card-count">{group.skills.length} Items</div>
              </div>

              <p className="skills-card-copy">{group.description}</p>

              <div className="skills-pill-grid">
                {group.skills.map((skill) => {
                  const SkillIcon = skillIconMap[skill] || Braces;

                  return (
                    <span key={skill} className="skills-pill">
                      <span className="skills-pill-icon"><SkillIcon size={16} /></span>
                      <span className="skills-pill-label">{skill}</span>
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
