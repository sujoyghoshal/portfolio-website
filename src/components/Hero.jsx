import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, GitBranch, Link as LinkIcon, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const roles = ['Software Engineer', 'Full Stack Developer', 'React Specialist', 'Java Spring Boot Dev', 'Freelance Developer'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let t;
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    else if (!deleting && displayed.length === current.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    else { setDeleting(false); setRoleIndex((i) => (i + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-28 md:pt-24 pb-16 relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-500/6 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.012]" style={{
          backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)',
          backgroundSize: '70px 70px',
        }} />
      </div>

      <div className="section-center w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center md:text-left"
          >
            <p className="text-orange-500 font-semibold text-sm mb-3 tracking-widest uppercase">Hi, I am</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 leading-tight break-words">
              {portfolioData.name.split(' ')[0]}{' '}
              <span className="gradient-text">{portfolioData.name.split(' ')[1]}</span>
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-5 min-h-9">
              <span className="text-orange-500 font-bold text-xl">&lt;</span>
              <span className="text-slate-200 font-bold text-base sm:text-xl text-center md:text-left">
                {displayed}<span className="text-orange-400 animate-pulse">|</span>
              </span>
              <span className="text-orange-500 font-bold text-xl">/&gt;</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-8 mx-auto md:mx-0">
              Passionate Software Engineer at{' '}
              <span className="company-inline-mark">
                <img src="/capgemini.png" alt="Capgemini" className="company-inline-logo" />
              </span>{' '}
              building scalable full-stack apps with React, Java & Spring Boot.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-8">
              <motion.a href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="orange-btn hero-action-btn">
                Hire Me
              </motion.a>
              <motion.a href="#education" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="outline-btn hero-action-btn">
                Education
              </motion.a>
              <motion.a
                href={portfolioData.resumePath}
                download={portfolioData.resumeFileName}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="teal-btn hero-action-btn"
              >
                <Download size={16} />
                Download Resume
              </motion.a>
            </div>

            <div className="flex gap-3 justify-center md:justify-start">
              {[
                { icon: <GitBranch size={17} />, href: portfolioData.github, label: 'GitHub' },
                { icon: <LinkIcon size={17} />, href: portfolioData.linkedin, label: 'LinkedIn' },
                { icon: <Mail size={17} />, href: `mailto:${portfolioData.email}`, label: 'Email' },
              ].map(({ icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center text-slate-500 hover:text-orange-400 hover:border-orange-500/50 transition-all bg-[#161616]"
                  title={label}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, type: 'spring', stiffness: 80 }}
            className="flex justify-center"
          >
            <div className="relative hero-photo-wrap">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-500/25 spin-slow" style={{ margin: '-20px' }} />
              <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 p-[3px] pulse-ring float-anim">
                <div className="w-full h-full rounded-full bg-[#141414] overflow-hidden flex items-center justify-center">
                  <img src="/myphoto.jpeg" alt="Sujoy Ghoshal" className="w-full h-full object-cover rounded-full"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <div className="hidden w-full h-full items-center justify-center text-7xl font-black gradient-text">SG</div>
                </div>
              </div>

              {/* Stat badges */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
                className="absolute hero-stat hero-stat-right card px-3 py-2.5 text-center min-w-[72px]">
                <p className="text-orange-400 font-black text-lg sm:text-xl">1+</p>
                <p className="text-slate-500 text-xs">Years Experience</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}
                className="absolute hero-stat hero-stat-left card px-3 py-2.5 text-center min-w-[72px]">
                <p className="text-orange-400 font-black text-lg sm:text-xl">10+</p>
                <p className="text-slate-500 text-xs">Projects</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
