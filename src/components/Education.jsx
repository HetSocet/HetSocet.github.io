import { motion } from 'framer-motion';

const divider = { borderTop: '1px solid rgba(255,255,255,0.08)' };

export default function Education() {
  return (
    <section
      id="education"
      className="py-32 px-8"
      style={{ maxWidth: '1100px', margin: '0 auto' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p
          className="text-xs font-mono uppercase tracking-[0.3em] mb-16"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          Education
        </p>

        <div>
          <div
            style={divider}
            className="py-10 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6"
          >
            <div>
              <p
                className="text-sm font-mono"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                2022 — 2026
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-white mb-1">
                Bachelor of Technology
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                Silver Oak University · Computer Engineering
              </p>
              <p
                className="text-sm leading-relaxed max-w-lg"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Building a strong foundation in computer science, software
                engineering, and problem-solving. Actively engaged in technical
                research and development.
              </p>
            </div>
          </div>
          <div style={divider} />
        </div>
      </motion.div>
    </section>
  );
}
