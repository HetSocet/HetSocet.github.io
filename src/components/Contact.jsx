import { motion } from 'framer-motion';

const links = [
  {
    label: 'Email',
    value: 'hetwork0312@gmail.com',
    href: 'mailto:hetwork0312@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'het-patel-804a352aa',
    href: 'https://www.linkedin.com/in/het-patel-804a352aa',
    external: true,
  },
  {
    label: 'Phone',
    value: '+91 88665 43503',
    href: 'tel:+918866543503',
  },
];

const divider = { borderTop: '1px solid rgba(255,255,255,0.08)' };

export default function Contact() {
  return (
    <footer
      id="contact"
      className="py-32 px-8"
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
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
          Contact
        </p>

        <h2
          className="font-bold tracking-tight leading-none mb-20"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          Let's work
          <br />
          together.
        </h2>

        <div>
          {links.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              style={divider}
              className="flex justify-between items-center py-5 group transition-all duration-200 block"
              onMouseEnter={e => {
                e.currentTarget.style.borderTopColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderTopColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <span
                className="text-xs font-mono uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                {link.label}
              </span>
              <span
                className="text-sm transition-colors duration-200 group-hover:text-white"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {link.value}
              </span>
            </motion.a>
          ))}
          <div style={divider} />
        </div>

        <div
          className="mt-16 flex justify-between items-center text-xs font-mono"
          style={{ color: 'rgba(255,255,255,0.15)' }}
        >
          <span>Ahmedabad, Gujarat, India</span>
          <span>© {new Date().getFullYear()} Het Patel</span>
        </div>
      </motion.div>
    </footer>
  );
}
