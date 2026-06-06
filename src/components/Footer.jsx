import { motion } from 'framer-motion';
import { Mail, ChevronUp, Link2 } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { portfolioData } from '../data/portfolio';

const socials = [
  { Icon: SiGithub,   href: portfolioData.github,            label: 'GitHub'   },
  { Icon: Link2,      href: portfolioData.linkedin,          label: 'LinkedIn' },
  { Icon: Mail,       href: `mailto:${portfolioData.email}`, label: 'Email'    },
];

const quickLinks = [
  { label: 'About',        href: '#about'       },
  { label: 'Skills',       href: '#skills'      },
  { label: 'Experience',   href: '#experience'  },
  { label: 'Projects',     href: '#projects'    },
  { label: 'Education',    href: '#education'   },
  { label: 'Contact',      href: '#contact'     },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative pt-16 pb-8 px-4 sm:px-6 overflow-hidden">
      <div className="footer-gradient-line mb-12" />

      {/* Subtle bg glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(0,212,255,0.04),transparent 70%)' }} />

      <div className="section-center relative z-10">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-2xl font-black tracking-tight gradient-text">SUJOY</span>
              <span className="text-[#00D4FF] font-black text-2xl">.</span>
            </div>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-xs">
              Full Stack Developer crafting elegant, high-performance digital products
              with React, Java, and Spring Boot.
            </p>
            <div className="flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label} href={href}
                  target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.12, y: -3 }}
                  className="footer-social-link"
                  title={label}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[var(--text)] font-bold text-sm mb-4 tracking-widest uppercase opacity-60">Quick Links</p>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[var(--muted)] text-sm font-medium hover:text-[#00D4FF] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[var(--text)] font-bold text-sm mb-4 tracking-widest uppercase opacity-60">Contact</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: portfolioData.email,    href: `mailto:${portfolioData.email}` },
                { label: portfolioData.phone,    href: `tel:${portfolioData.phone}`    },
                { label: portfolioData.location, href: null                            },
              ].map(({ label, href }) => (
                <div key={label}>
                  {href
                    ? <a href={href} className="text-[var(--muted)] text-sm hover:text-[#00D4FF] transition-colors">{label}</a>
                    : <p className="text-[var(--muted)] text-sm">{label}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-gradient-line mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--muted)] text-sm">
            © {new Date().getFullYear()} Sujoy Ghoshal. All rights reserved.
          </p>
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="back-to-top"
          >
            <ChevronUp size={15} />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
