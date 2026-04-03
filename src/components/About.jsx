import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Mail, Phone, GitBranch } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const skills = [
  { name: 'React / Frontend', pct: 90 },
  { name: 'Java & Spring Boot', pct: 85 },
  { name: 'REST APIs', pct: 82 },
  { name: 'MySQL / MongoDB', pct: 78 },
  { name: 'Node.js', pct: 75 },
  { name: 'CI/CD & Agile', pct: 80 },
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
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-sub">Who I Am</p>
          <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-2xl rotate-3 -z-10" style={{ margin: '-8px' }} />
              <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-[#2a2a2a] float-anim bg-[#141414] flex items-center justify-center">
                <img src="/myphoto.jpeg" alt="Sujoy Ghoshal" className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <div className="hidden w-full h-full items-center justify-center text-8xl font-black gradient-text bg-[#141414]">SG</div>
              </div>
              <div className="absolute about-stat card px-3 py-2.5 text-center">
                <p className="text-orange-400 font-black text-lg sm:text-xl">1+</p>
                <p className="text-slate-500 text-xs">Years Experience</p>
              </div>
            </div>
          </motion.div>

          {/* Text + skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-bold text-white mb-1">
              Software Engineer @ <span className="text-orange-400">Capgemini</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{portfolioData.about}</p>

            <div className="grid grid-cols-1 gap-2 mb-7 justify-items-center md:justify-items-start">
              {[
                { icon: <Mail size={13} />, value: portfolioData.email },
                { icon: <Phone size={13} />, value: portfolioData.phone },
                { icon: <MapPin size={13} />, value: 'Sector 48, Gurgaon, India' },
                { icon: <GitBranch size={13} />, value: 'github.com/sujoyghoshal' },
              ].map(({ icon, value }) => (
                <div key={value} className="flex items-center gap-2 text-slate-400 text-xs">
                  <span className="text-orange-400 shrink-0">{icon}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>

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
