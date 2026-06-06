import { motion } from 'framer-motion';

const services = [
  {
    icon: '🌐', title: 'Portfolio Website', price: '₹5,000',
    gradient: 'linear-gradient(90deg,#00D4FF,#8B5CF6)',
    bg: 'rgba(0,212,255,0.08)',
    desc: 'Clean, responsive personal portfolio tailored to your brand and goals. Built with React and Tailwind CSS.',
    features: ['Responsive design', 'SEO optimised', 'Fast load time', 'Custom domain support'],
  },
  {
    icon: '⚡', title: 'Full Stack App', price: '₹20,000',
    gradient: 'linear-gradient(90deg,#8B5CF6,#EC4899)',
    bg: 'rgba(139,92,246,0.08)',
    desc: 'End-to-end web applications with React frontend and Java/Node.js backend, fully production-ready.',
    features: ['REST API design', 'DB integration', 'Auth & security', 'CI/CD pipeline'],
  },
  {
    icon: '🎨', title: 'UI / UX Design', price: 'Custom',
    gradient: 'linear-gradient(90deg,#EC4899,#F97316)',
    bg: 'rgba(236,72,153,0.08)',
    desc: 'Beautiful, user-friendly interfaces designed for maximum engagement and conversion.',
    features: ['Figma mockups', 'Design system', 'Component library', 'Accessibility'],
  },
  {
    icon: '🔧', title: 'Bug Fixing', price: '₹1,000/hr',
    gradient: 'linear-gradient(90deg,#F97316,#00D4FF)',
    bg: 'rgba(249,115,22,0.08)',
    desc: 'Quick diagnosis and fixes for production bugs, performance issues, and code reviews.',
    features: ['Root cause analysis', 'Performance audit', 'Code review', 'Same-day turnaround'],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">What I Offer</p>
          <h2 className="section-title">My <span className="gradient-text">Services</span></h2>
          <p className="section-copy">
            From idea to deployment — I build fast, clean, and scalable digital products.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="service-card"
              style={{ '--srv-gradient': s.gradient }}
            >
              <div className="service-icon" style={{ background: s.bg }}>
                {s.icon}
              </div>

              <h3 className="text-[var(--text)] font-extrabold text-base mb-2">{s.title}</h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>

              <ul className="flex flex-col gap-1.5 mb-5 text-left">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-[var(--muted)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <p className="service-price">{s.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
