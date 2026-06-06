import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, ChevronDown, Link2 } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { portfolioData } from '../data/portfolio';

const roles = [
  'Software Engineer',
  'Full Stack Developer',
  'React Specialist',
  'Java & Spring Boot Dev',
  'Freelance Developer',
];

function useTypewriter(words) {
  const [index, setIndex]       = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    let t;
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    else if (!deleting && displayed.length === current.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    else { setDeleting(false); setIndex((i) => (i + 1) % words.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, index, words]);

  return displayed;
}

export default function Hero() {
  const canvasRef = useRef(null);
  const roleText  = useTypewriter(roles);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="hero" className="hero-section">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }} />
      <div className="hero-bg" />
      <div className="blob blob-blue"   aria-hidden="true" />
      <div className="blob blob-purple" aria-hidden="true" />
      <div className="blob blob-pink"   aria-hidden="true" />

      <div className="section-center w-full relative z-10 pt-28 pb-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center md:text-left"
          >
            <div className="flex justify-center md:justify-start">
              <span className="hero-badge-tag">
                <span className="badge-pulse" />
                Available for opportunities
              </span>
            </div>

            <h1 className="hero-name-text">
              {portfolioData.name.split(' ')[0]}{' '}
              <span className="hero-name-highlight">{portfolioData.name.split(' ')[1]}</span>
            </h1>

            <div className="hero-role-line justify-center md:justify-start">
              <span className="role-bracket">&lt;</span>
              <span className="typewriter-word">{roleText}</span>
              <span className="cursor-caret" />
              <span className="role-bracket">/&gt;</span>
            </div>

            <p className="hero-description mx-auto md:mx-0">
              Passionate Software Engineer at Capgemini building scalable full-stack
              apps with React, Java &amp; Spring Boot. I turn complex problems into
              clean, high-performance solutions.
            </p>

            <div className="hero-cta-group justify-center md:justify-start">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-primary"
              >
                Hire Me
              </motion.a>
              <motion.a
                href={portfolioData.resumePath}
                download={portfolioData.resumeFileName}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-secondary"
              >
                <Download size={16} />
                Resume
              </motion.a>
            </div>

            <div className="hero-socials justify-center md:justify-start">
              {[
                { Icon: SiGithub,   href: portfolioData.github,             label: 'GitHub'   },
                { Icon: Link2,      href: portfolioData.linkedin,         label: 'LinkedIn' },
                { Icon: Mail,     href: `mailto:${portfolioData.email}`,  label: 'Email'    },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label} href={href}
                  target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.12, y: -3 }}
                  className="social-icon-btn"
                  title={label}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right — Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.7, type: 'spring', stiffness: 70 }}
            className="flex justify-center"
          >
            <div className="hero-photo-ring float-anim">
              <div className="ring-outer" />
              <div className="ring-inner" />
              <div className="hero-img-wrap">
                <img
                  src="/myphoto.jpeg"
                  alt="Sujoy Ghoshal"
                  className="hero-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hero-img-fallback">SG</div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="float-badge float-badge-tr"
              >
                <span className="float-badge-num">1+</span>
                <span className="float-badge-lbl">Years Exp</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="float-badge float-badge-bl"
              >
                <span className="float-badge-num">10+</span>
                <span className="float-badge-lbl">Projects</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <a href="#about" className="scroll-down-btn" aria-label="Scroll down">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={26} />
        </motion.div>
      </a>
    </section>
  );
}
