import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { submitContactForm, submitCollabEmail } from '../utils/googleSheets';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [collabEmail, setCollabEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [collabSent, setCollabSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collabLoading, setCollabLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitContactForm(form);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch {
      setError('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCollabSubmit = async (e) => {
    e.preventDefault();
    setCollabLoading(true);
    try {
      await submitCollabEmail(collabEmail);
      setCollabSent(true);
      setCollabEmail('');
      setTimeout(() => setCollabSent(false), 3000);
    } catch {
      // silent fail for collab
    } finally {
      setCollabLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="section-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="section-sub">Get In Touch</p>
          <h2 className="section-title">Contact <span className="gradient-text">Me</span></h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.35fr_1fr] gap-6 md:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-lg p-5 sm:p-7 border border-white/10 space-y-6 w-full h-full"
          >
            <div className="grid sm:grid-cols-3 gap-3 w-full">
            {[
              { icon: <Mail size={19} />, label: 'Email', value: portfolioData.email, href: `mailto:${portfolioData.email}` },
              { icon: <Phone size={19} />, label: 'Phone', value: portfolioData.phone, href: `tel:${portfolioData.phone}` },
              { icon: <MapPin size={19} />, label: 'Location', value: portfolioData.location },
            ].map(({ icon, label, value, href }) => (
              <motion.div key={label} whileHover={{ y: -3 }} className="contact-info-card flex flex-col items-center gap-3 rounded-lg p-4 transition-all text-center w-full min-h-[128px] justify-center">
                <div className="w-11 h-11 rounded-lg bg-orange-500 flex items-center justify-center shrink-0 shadow-md shadow-orange-500/25 text-white">{icon}</div>
                <div className="w-full">
                  <p className="panel-muted text-xs mb-1 font-semibold">{label}</p>
                  {href ? <a href={href} className="panel-title block font-medium text-sm hover:text-orange-400 transition-colors break-all leading-snug">{value}</a>
                         : <p className="panel-title font-medium text-sm break-words leading-snug">{value}</p>}
                </div>
              </motion.div>
            ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="panel-muted text-xs mb-1.5 block">Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Your name"
                    className="input-field" />
                </div>
                <div>
                  <label className="panel-muted text-xs mb-1.5 block">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="your@email.com"
                    className="input-field" />
                </div>
              </div>
              <div>
                <label className="panel-muted text-xs mb-1.5 block">Subject</label>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required placeholder="Project inquiry"
                  className="input-field" />
              </div>
              <div>
                <label className="panel-muted text-xs mb-1.5 block">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} placeholder="Tell me about your project..."
                  className="input-field resize-none min-h-[124px]" />
              </div>
              {error && <p className="text-red-400 text-xs text-center">{error}</p>}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 orange-btn rounded-lg flex items-center justify-center gap-2 text-sm shadow-lg shadow-orange-500/25 disabled:opacity-60"
              >
                <Send size={16} /> {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-lg p-6 sm:p-8 border border-orange-500/15 relative overflow-hidden text-center flex flex-col justify-center h-full"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-orange-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center justify-center">
              <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-3">Let's Collaborate</p>
              <h3 className="section-title mb-3">
                Let's <span className="gradient-text">Design Together</span>
              </h3>
              <p className="panel-muted text-base mb-8 max-w-md mx-auto">
                Have a project in mind? Drop your email and I'll get back to you within 24 hours.
              </p>
              <form onSubmit={handleCollabSubmit} className="flex flex-col gap-2.5 w-full max-w-[280px] mx-auto items-center">
                <input
                  type="email"
                  value={collabEmail}
                  onChange={(e) => setCollabEmail(e.target.value)}
                  required
                  placeholder="Enter Your Email"
                  className="input-field text-center"
                />
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={collabLoading}
                  className="w-full px-4 py-2.5 orange-btn rounded-md text-xs flex items-center gap-1.5 justify-center shadow-lg shadow-orange-500/30 disabled:opacity-60"
                >
                  {collabSent ? 'Sent!' : collabLoading ? 'Sending...' : 'Contact Me'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
            className="fixed contact-toast bottom-8 left-1/2 -translate-x-1/2 z-50 glass rounded-2xl px-6 py-4 flex items-center gap-3 border border-orange-500/30"
          >
            <CheckCircle size={20} className="text-orange-400" />
            <p className="panel-title font-semibold text-sm">Message sent! I'll reply soon.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
