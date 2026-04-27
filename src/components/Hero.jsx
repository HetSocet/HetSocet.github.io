import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center px-8 pt-24 pb-16"
      style={{ maxWidth: '1100px', margin: '0 auto' }}
    >
      <motion.p
        {...fade(0.1)}
        className="text-xs font-mono uppercase tracking-[0.3em] mb-6"
        style={{ color: 'rgba(255,255,255,0.25)' }}
      >
        Software Developer · Ahmedabad, India
      </motion.p>

      <motion.h1
        {...fade(0.2)}
        className="font-bold tracking-tight leading-none mb-8"
        style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
      >
        Het Patel
      </motion.h1>

      <motion.p
        {...fade(0.35)}
        className="text-base leading-relaxed mb-12 max-w-lg font-light"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        B.Tech Computer Engineering student at Silver Oak University.
        Currently building software at Brilworks — focused on C++, Python,
        and modern web development.
      </motion.p>

      <motion.div {...fade(0.5)} className="flex items-center gap-10">
        <a
          href="#experience"
          className="text-sm font-medium transition-colors duration-200"
          style={{
            color: '#fff',
            borderBottom: '1px solid rgba(255,255,255,0.6)',
            paddingBottom: '2px',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          onMouseLeave={e => e.currentTarget.style.color = '#fff'}
        >
          View my work
        </a>
        <a
          href="#contact"
          className="text-sm transition-colors duration-200"
          style={{ color: 'rgba(255,255,255,0.3)' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
        >
          Get in touch →
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2.5, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-8 text-xs font-mono tracking-widest"
        style={{ color: 'rgba(255,255,255,0.2)' }}
      >
        scroll
      </motion.div>
    </section>
  );
}
