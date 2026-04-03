import { motion } from 'framer-motion';

const services = [
  { icon: '🌐', title: 'Portfolio Website', desc: 'Clean, responsive personal portfolio tailored to your brand and goals.', price: '₹5,000' },
  { icon: '⚡', title: 'Full Stack App', desc: 'End-to-end web apps with React frontend and Java/Node.js backend.', price: '₹20,000' },
  { icon: '🎨', title: 'UI / UX Design', desc: 'Beautiful, user-friendly interfaces designed for maximum engagement.', price: 'Custom' },
  { icon: '🔧', title: 'Bug Fixing', desc: 'Quick diagnosis and fixes for production bugs and performance issues.', price: '₹1,000/hr' },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 md:py-24">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">What I Offer</p>
          <h2 className="section-title">My <span className="gradient-text">Services</span></h2>
          <p className="text-slate-400 text-center max-w-xl mx-auto mt-3 text-sm leading-relaxed">
            From idea to deployment - I build fast, clean, and scalable digital products.
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
              className="card p-6 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-3xl mb-5">
                {s.icon}
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{s.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1">{s.desc}</p>
              <span className="text-orange-400 font-bold text-base">{s.price}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
