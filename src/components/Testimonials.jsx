import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'James Carter', role: 'CEO, TravelStay Inc.', initial: 'J',
    color: 'linear-gradient(135deg,#00D4FF,#8B5CF6)',
    text: 'Sujoy delivered our hotel booking platform ahead of schedule. The code quality was excellent and the UI was exactly what we envisioned. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Sarah Mitchell', role: 'Founder, CreativeEdge', initial: 'S',
    color: 'linear-gradient(135deg,#8B5CF6,#EC4899)',
    text: 'Amazing work on my portfolio site! Sujoy understood my brand perfectly and built a site that truly represents me. Very responsive and professional.',
    rating: 5,
  },
  {
    name: 'David Thompson', role: 'CTO, FinancePro', initial: 'D',
    color: 'linear-gradient(135deg,#EC4899,#F97316)',
    text: 'Sujoy built our enterprise banking APIs with incredible precision. Clean, scalable, and handles peak load perfectly.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((i) => (i + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">Client Reviews</p>
          <h2 className="section-title">What Clients <span className="gradient-text">Say</span></h2>
          <p className="section-copy">Feedback from clients I've worked with on real projects.</p>
        </div>

        {/* All cards visible on lg, carousel on sm */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="testimonial-card"
            >
              <div className="flex gap-1 mb-4">
                {Array(t.rating).fill(0).map((_, si) => (
                  <Star key={si} size={13} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-[var(--muted)] text-sm leading-relaxed mb-6 flex-1 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                <div
                  className="testimonial-avatar"
                  style={{ background: t.color }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-[var(--text)] font-bold text-sm">{t.name}</p>
                  <p className="text-[var(--muted)] text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel for smaller screens */}
        <div className="lg:hidden max-w-lg mx-auto">
          <div className="relative overflow-hidden" style={{ minHeight: 260 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35 }}
                className="testimonial-card"
              >
                <div className="flex gap-1 mb-4">
                  {Array(testimonials[active].rating).fill(0).map((_, si) => (
                    <Star key={si} size={13} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-6 italic">
                  "{testimonials[active].text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                  <div className="testimonial-avatar" style={{ background: testimonials[active].color }}>
                    {testimonials[active].initial}
                  </div>
                  <div>
                    <p className="text-[var(--text)] font-bold text-sm">{testimonials[active].name}</p>
                    <p className="text-[var(--muted)] text-xs">{testimonials[active].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="social-icon-btn"><ChevronLeft size={16} /></button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all rounded-full"
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    background: i === active ? '#00D4FF' : 'var(--border)',
                  }}
                />
              ))}
            </div>
            <button onClick={next} className="social-icon-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
