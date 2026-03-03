import { motion } from 'framer-motion'
import './Navbar.css'

const Navbar = () => {
  const navItems = [
    { name: 'about', href: '#about' },
    { name: 'work', href: '#work' },
    { name: 'connect', href: '#connect' }
  ]

  return (
    <nav className="navbar-sketch">
      <div className="nav-container-sketch">
        <div className="nav-smiley hand">☺</div>

        <div className="nav-links-sketch hand">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="nav-link-sketch">
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
