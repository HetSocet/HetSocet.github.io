import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'Brilworks Software',
    role: 'Software Developer',
    duration: 'Aug 2024 — Present',
    location: 'Ahmedabad',
    description:
      'Developing high-performance software solutions, collaborating with cross-functional teams, and driving technical innovation.',
  },
  {
    company: 'Socialora',
    role: 'Junior Software Engineer',
    duration: 'Dec 2025 — Feb 2026',
    location: 'Remote',
    description:
      'Focused on backend optimizations and contributing to the core engineering lifecycle.',
  },
];

const divider = { borderTop: '1px solid rgba(255,255,255,0.08)' };

export default function Experience() {
  return (
    <section
      id="experience"
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
          Experience
        </p>

        <div>
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={divider}
              className="py-10 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6"
            >
              <div>
                <p
                  className="text-sm font-mono mb-1"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                  {exp.duration}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                >
                  {exp.location}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-1">
                  {exp.role}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {exp.company}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
          <div style={divider} />
        </div>
      </motion.div>
    </section>
  );
}
