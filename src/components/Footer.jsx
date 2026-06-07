import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ChevronUp, Link2 } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { portfolioData } from '../data/portfolio';

const quickLinks = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Education',  href: '#education'  },
  { label: 'Contact',    href: '#contact'    },
];

const socials = [
  { icon: SiGithub,   href: portfolioData.github,            label: 'GitHub'   },
  { icon: Link2,      href: portfolioData.linkedin,           label: 'LinkedIn' },
  { icon: Mail,       href: `mailto:${portfolioData.email}`,  label: 'Email'    },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative pt-14 pb-6 px-4 overflow-hidden">
      <div className="footer-gradient-line mb-10" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[160px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(0,212,255,0.05),transparent 70%)' }} />

      <div className="section-center relative z-10">

        {/* 3-col grid → stacks on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black tracking-tight gradient-text">SUJOY</span>
              <span className="text-[#00D4FF] font-black text-2xl">.</span>
            </div>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-[260px]">
              Full Stack Developer crafting high-performance digital products with React, Java &amp; Spring Boot.
            </p>
            <div className="flex gap-2 mt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="footer-social-link"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[var(--text)] font-semibold text-xs tracking-widest uppercase mb-4 opacity-50">Quick Links</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[var(--muted)] text-sm hover:text-[#00D4FF] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[var(--text)] font-semibold text-xs tracking-widest uppercase mb-4 opacity-50">Contact</p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${portfolioData.email}`}
                className="flex items-center gap-2 text-[var(--muted)] text-sm hover:text-[#00D4FF] transition-colors">
                <Mail size={14} className="shrink-0 text-[#00D4FF]" />
                {portfolioData.email}
              </a>
              <a href={`tel:${portfolioData.phone}`}
                className="flex items-center gap-2 text-[var(--muted)] text-sm hover:text-[#00D4FF] transition-colors">
                <Phone size={14} className="shrink-0 text-[#00D4FF]" />
                {portfolioData.phone}
              </a>
              <div className="flex items-center gap-2 text-[var(--muted)] text-sm">
                <MapPin size={14} className="shrink-0 text-[#00D4FF]" />
                {portfolioData.location}
              </div>
              <a href={portfolioData.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-[var(--muted)] text-sm hover:text-[#00D4FF] transition-colors">
                <SiGithub size={14} className="shrink-0 text-[#00D4FF]" />
                github.com/sujoyghoshal
              </a>
            </div>
          </div>
        </div>

        <div className="footer-gradient-line mb-5" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[var(--muted)] text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Sujoy Ghoshal. All rights reserved.
          </p>
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="back-to-top"
          >
            <ChevronUp size={14} />
            Back to top
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
