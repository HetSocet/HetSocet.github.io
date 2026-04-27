import { motion } from 'framer-motion';

const groups = [
  {
    category: 'Languages',
    items: ['C++', 'Python', 'JavaScript', 'HTML / CSS'],
  },
  {
    category: 'Frameworks & Tools',
    items: ['React Native', 'FlutterFlow', 'Adalo', 'Web Development'],
  },
  {
    category: 'Concepts',
    items: ['Data Structures & Algorithms', 'Sales', 'Software Engineering'],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
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
          Skills
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {groups.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p
                className="text-xs font-mono uppercase tracking-widest mb-6"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                {g.category}
              </p>
              <ul className="space-y-3">
                {g.items.map((skill, j) => (
                  <li
                    key={j}
                    className="text-sm font-light"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
