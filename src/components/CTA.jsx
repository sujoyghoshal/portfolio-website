import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useState } from 'react';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setEmail('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="py-24 px-6 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-lg p-10 text-center border border-orange-500/15 relative overflow-hidden orange-glow"
        >
          {/* BG decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-orange-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-3">Let's Collaborate</p>
            <h2 className="section-title mb-3">
              Let's <span className="gradient-text">Design Together</span>
            </h2>
            <p className="text-slate-400 text-base mb-10 max-w-md mx-auto">
              Have a project in mind? Drop your email and I'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Your Email"
                className="w-full bg-white/5 border border-white/10 rounded-md px-5 py-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-orange-500/50 transition-colors text-center"
              />
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="w-full px-7 py-3 orange-btn rounded-md text-sm flex items-center gap-2 justify-center shadow-lg shadow-orange-500/30"
              >
                {sent ? '✓ Sent!' : <><Send size={16} /> Contact Me</>}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
