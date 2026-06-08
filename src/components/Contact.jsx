import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Link2 } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import emailjs from '@emailjs/browser';
import { portfolioData } from '../data/portfolio';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function isEmailJSConfigured() {
  return Boolean(
    EMAILJS_SERVICE_ID && EMAILJS_SERVICE_ID !== 'your_emailjs_service_id' &&
    EMAILJS_TEMPLATE_ID && EMAILJS_TEMPLATE_ID !== 'your_emailjs_template_id' &&
    EMAILJS_PUBLIC_KEY  && EMAILJS_PUBLIC_KEY  !== 'your_emailjs_public_key'
  );
}

const contactInfo = [
  { icon: Mail,   label: 'Email',    value: portfolioData.email,    href: `mailto:${portfolioData.email}`, color: '#00D4FF', bg: 'rgba(0,212,255,0.1)'    },
  { icon: Phone,  label: 'Phone',    value: portfolioData.phone,    href: `tel:${portfolioData.phone}`,    color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)'   },
  { icon: MapPin, label: 'Location', value: portfolioData.location, href: null,                            color: '#EC4899', bg: 'rgba(236,72,153,0.1)'   },
];

function FloatField({ label, type = 'text', value, onChange, required, name, rows }) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const isUp   = focused || filled;

  const shared = {
    name,
    value,
    onChange,
    required,
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
  };

  return (
    <div className="relative w-full">
      {rows
        ? <textarea {...shared} rows={rows} style={{ resize: 'none' }}
            className={`contact-float-input peer ${focused ? 'focused' : ''}`} />
        : <input {...shared} type={type}
            className={`contact-float-input peer ${focused ? 'focused' : ''}`} />
      }
      <label className={`contact-float-label ${isUp ? 'up' : ''} ${focused ? 'active' : ''}`}>
        {label}
      </label>
    </div>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    if (isEmailJSConfigured()) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
          { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message, to_name: 'Sujoy', reply_to: form.email },
          EMAILJS_PUBLIC_KEY
        );
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      } catch {
        setError('Failed to send. Please email me directly.');
      }
    } else {
      try {
        const { submitContactForm } = await import('../utils/googleSheets');
        await submitContactForm(form);
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      } catch {
        setError('Failed to send. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="section-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-shell"
        >
          <p className="section-sub">Get In Touch</p>
          <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
          <p className="section-copy">Have a project or want to hire me? Send a message and I'll reply within 24h.</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-8 items-start">

          {/* ── Left: Info Panel ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {/* Contact Cards */}
            {contactInfo.map(({ icon: Icon, label, value, href, color, bg }) => (
              <motion.div key={label} variants={fadeUp}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="glass-card p-5 flex items-center gap-4 cursor-default"
                  style={{ border: `1px solid ${color}22` }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--muted)] mb-0.5 uppercase tracking-wider">{label}</p>
                    {href
                      ? <a href={href} className="text-[var(--text)] text-sm font-medium hover:text-[#00D4FF] transition-colors">{value}</a>
                      : <p className="text-[var(--text)] text-sm font-medium">{value}</p>
                    }
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div variants={fadeUp} className="glass-card p-5">
              <p className="text-xs font-semibold text-[var(--muted)] mb-3 uppercase tracking-wider">Find me on</p>
              <div className="flex gap-3">
                {[
                  { href: portfolioData.github,   icon: SiGithub, label: 'GitHub',   color: '#fff'     },
                  { href: portfolioData.linkedin,  icon: Link2,    label: 'LinkedIn', color: '#0A66C2'  },
                  { href: `mailto:${portfolioData.email}`, icon: Mail, label: 'Email', color: '#00D4FF' },
                ].map(({ href, icon: Icon, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <Icon size={18} style={{ color }} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div variants={fadeUp} className="glass-card p-4 flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-60" />
              </div>
              <p className="text-sm text-[var(--text)]">
                <span className="font-bold text-green-400">Available</span> for freelance &amp; full-time roles
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                /* Success State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card p-10 flex flex-col items-center justify-center text-center gap-5 min-h-[420px]"
                  style={{ border: '1px solid rgba(0,212,255,0.25)' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,rgba(0,212,255,0.2),rgba(139,92,246,0.2))', border: '2px solid rgba(0,212,255,0.4)' }}
                  >
                    <CheckCircle size={40} className="text-[#00D4FF]" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text)] mb-2">Message Sent! 🎉</h3>
                    <p className="text-[var(--muted)] text-sm leading-relaxed">
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSent(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                /* Form */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card p-6 sm:p-8"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <h3 className="text-lg font-bold text-[var(--text)] mb-6">Send a Message</h3>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FloatField label="Your Name" value={form.name}    onChange={set('name')}    required name="from_name" />
                      <FloatField label="Email Address" type="email" value={form.email} onChange={set('email')} required name="from_email" />
                    </div>

                    <FloatField label="Subject" value={form.subject} onChange={set('subject')} required name="subject" />

                    <div className="relative">
                      <FloatField label="Your Message" value={form.message} onChange={set('message')} required name="message" rows={5} />
                      <span className="absolute bottom-3 right-3 text-[10px] text-[var(--muted)] pointer-events-none">
                        {form.message.length}/500
                      </span>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-xl px-4 py-3"
                        >
                          <AlertCircle size={15} />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={loading}
                      className="btn-primary justify-center py-3.5 text-base disabled:opacity-60 mt-1"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <Send size={17} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
