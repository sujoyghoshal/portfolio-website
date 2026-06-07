import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
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

export default function Contact() {
  const formRef                     = useRef(null);
  const [form, setForm]             = useState({ name: '', email: '', subject: '', message: '' });
  const [collabEmail, setCollabEmail] = useState('');
  const [sent, setSent]             = useState(false);
  const [collabSent, setCollabSent] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [collabLoading, setCollabLoading] = useState(false);
  const [error, setError]           = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');

    if (isEmailJSConfigured()) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name:    form.name,
            from_email:   form.email,
            subject:      form.subject,
            message:      form.message,
            to_name:      'Sujoy',
            reply_to:     form.email,
          },
          EMAILJS_PUBLIC_KEY
        );
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 4000);
      } catch (err) {
        setError('Failed to send. Please try again or email directly.');
      }
    } else {
      /* fallback — Google Sheets */
      try {
        const { submitContactForm } = await import('../utils/googleSheets');
        await submitContactForm(form);
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 4000);
      } catch {
        setError('Failed to send. Please try again.');
      }
    }
    setLoading(false);
  };

  const handleCollabSubmit = async (e) => {
    e.preventDefault();
    setCollabLoading(true);
    try {
      const { submitCollabEmail } = await import('../utils/googleSheets');
      await submitCollabEmail(collabEmail);
      setCollabSent(true);
      setCollabEmail('');
      setTimeout(() => setCollabSent(false), 3500);
    } catch { /* silent */ }
    finally { setCollabLoading(false); }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">Get In Touch</p>
          <h2 className="section-title">Contact <span className="gradient-text">Me</span></h2>
          <p className="section-copy">
            Have a project in mind or want to hire me? Let's talk.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.35fr_1fr] gap-6 items-stretch">

          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 sm:p-8 flex flex-col gap-6"
          >
            {/* Info rows */}
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { Icon: Mail,   label: 'Email',    value: portfolioData.email, href: `mailto:${portfolioData.email}`, color: '#00D4FF' },
                { Icon: Phone,  label: 'Phone',    value: portfolioData.phone, href: `tel:${portfolioData.phone}`,    color: '#8B5CF6' },
                { Icon: MapPin, label: 'Location', value: portfolioData.location,                                     color: '#EC4899' },
              ].map(({ Icon, label, value, href, color }) => (
                <motion.div key={label} whileHover={{ y: -3 }} className="contact-info-row flex-col text-center justify-center min-h-[100px]">
                  <div className="contact-icon" style={{ background: `${color}20` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-[var(--muted)] text-xs mb-1 font-semibold">{label}</p>
                    {href
                      ? <a href={href} className="text-[var(--text)] text-sm font-medium hover:text-[#00D4FF] transition-colors break-all">{value}</a>
                      : <p className="text-[var(--text)] text-sm font-medium">{value}</p>}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[var(--muted)] text-xs font-semibold">Name</label>
                  <input name="from_name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required placeholder="Your name" className="input-field" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[var(--muted)] text-xs font-semibold">Email</label>
                  <input name="from_email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required placeholder="your@email.com" className="input-field" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[var(--muted)] text-xs font-semibold">Subject</label>
                <input name="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required placeholder="Project inquiry" className="input-field" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[var(--muted)] text-xs font-semibold">Message</label>
                <textarea name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required rows={5} placeholder="Tell me about your project…" className="input-field resize-none" />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs">
                  <AlertCircle size={14} /><span>{error}</span>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                type="submit" disabled={loading}
                className="btn-primary justify-center disabled:opacity-60"
              >
                {loading
                  ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                  : <><Send size={16} />Send Message</>
                }
              </motion.button>

            </form>
          </motion.div>

          {/* Right — Collab CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse,rgba(0,212,255,0.1),transparent 70%)' }} />

            <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,rgba(0,212,255,0.12),rgba(139,92,246,0.12))', border: '1px solid rgba(0,212,255,0.2)' }}>
                <Mail size={28} style={{ color: '#00D4FF' }} />
              </div>

              <div>
                <p className="section-sub" style={{ justifyContent: 'center', marginBottom: 8 }}>Let's Collaborate</p>
                <h3 className="text-2xl font-extrabold text-[var(--text)] leading-tight mb-3">
                  Let's <span className="gradient-text">Build Together</span>
                </h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  Have a project in mind? Drop your email and I'll respond within 24 hours.
                </p>
              </div>

              <form onSubmit={handleCollabSubmit} className="flex flex-col gap-3 w-full max-w-xs">
                <input type="email" value={collabEmail} onChange={(e) => setCollabEmail(e.target.value)}
                  required placeholder="Enter your email" className="input-field text-center" />
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  type="submit" disabled={collabLoading}
                  className="btn-primary justify-center disabled:opacity-60"
                >
                  {collabSent ? '✓ Sent!' : collabLoading ? 'Sending…' : 'Contact Me'}
                </motion.button>
              </form>

              <p className="text-[var(--muted)] text-xs">No spam. Reply within 24h.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            className="contact-toast fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-card px-6 py-4 flex items-center gap-3"
            style={{ border: '1px solid rgba(0,212,255,0.3)' }}
          >
            <CheckCircle size={20} style={{ color: '#00D4FF' }} />
            <p className="text-[var(--text)] font-semibold text-sm">Message sent! I'll reply soon.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
