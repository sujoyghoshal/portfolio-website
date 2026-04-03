import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'James Carter',
    role: 'CEO, TravelStay Inc.',
    text: 'Sujoy delivered our hotel booking platform ahead of schedule. The code quality was excellent and the UI was exactly what we envisioned. Highly recommend!',
    rating: 5, initial: 'J',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Founder, CreativeEdge',
    text: 'Amazing work on my portfolio site! Sujoy understood my brand perfectly and built a site that truly represents me. Very responsive and professional.',
    rating: 5, initial: 'S',
  },
  {
    name: 'David Thompson',
    role: 'CTO, FinancePro',
    text: 'Sujoy built our enterprise banking APIs with incredible precision. Clean, scalable, and handles peak load perfectly.',
    rating: 5, initial: 'D',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 md:py-24">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">Client Reviews</p>
          <h2 className="section-title"><span className="gradient-text">Testimonials</span></h2>
          <p className="text-slate-400 text-center max-w-lg mx-auto mt-3 text-sm">What clients say about working with me.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card p-6 flex flex-col h-full"
            >
              <div className="flex gap-1 mb-4">
                {Array(t.rating).fill(0).map((_, si) => (
                  <Star key={si} size={13} className="text-orange-400 fill-orange-400" />
                ))}
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-6 flex-1 italic min-h-[84px]">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#2a2a2a]">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === 0 ? 'w-6 bg-orange-500' : 'w-2 bg-[#2a2a2a]'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
