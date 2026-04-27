import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        backgroundColor: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-5 transition-all duration-300"
    >
      <a
        href="#home"
        className="text-sm font-medium tracking-wide"
        style={{ color: 'rgba(255,255,255,0.6)' }}
        onMouseEnter={e => e.target.style.color = '#fff'}
        onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
      >
        Het Patel
      </a>
      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
          >
            {link.name}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
