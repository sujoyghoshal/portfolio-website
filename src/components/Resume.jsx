import { motion } from 'framer-motion';
import { Download, Eye, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export default function Resume() {
  const { resumePath, resumeFileName } = portfolioData;

  return (
    <section id="resume" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-10 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-12 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="section-center relative z-10">
        <div className="section-shell">
          <p className="section-sub">Resume</p>
          <h2 className="section-title">
            View My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mt-3 text-sm leading-relaxed">
            Open the full resume in a new tab, download it directly, or preview it here inside the portfolio.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="resume-panel p-7 md:p-8"
          >
            <div className="resume-badge mb-5">
              <FileText size={16} />
              <span>Professional Resume</span>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              <motion.a
                href={resumePath}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="orange-btn"
              >
                <Eye size={16} />
                View Resume
              </motion.a>
              <motion.a
                href={resumePath}
                download={resumeFileName}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="outline-btn"
              >
                <Download size={16} />
                Download Resume
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="resume-frame-wrap"
          >
            <div className="resume-topbar">
              <div className="flex items-center gap-2">
                <span className="resume-dot bg-rose-400" />
                <span className="resume-dot bg-amber-300" />
                <span className="resume-dot bg-emerald-400" />
              </div>
              <span className="text-xs text-slate-400 tracking-[0.18em] uppercase">Resume Preview</span>
            </div>

            <iframe
              src={`${resumePath}#toolbar=0&navpanes=0&scrollbar=1`}
              title="Sujoy Ghoshal Resume"
              className="resume-frame"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}