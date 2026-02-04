import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="hero-badge" variants={item}>
          <span>👋 Welcome to my portfolio</span>
        </motion.div>

        <motion.h1 className="hero-title" variants={item}>
          Hi, I'm <span className="gradient-text">Het Dev</span>
        </motion.h1>

        <motion.h2 className="hero-subtitle" variants={item}>
          Mobile & Web Developer
        </motion.h2>

        <motion.p className="hero-description" variants={item}>
          Crafting beautiful, responsive applications for mobile and web.
          Specializing in modern frameworks and cutting-edge technologies
          to bring your ideas to life.
        </motion.p>

        <motion.div className="hero-buttons" variants={item}>
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-outline">
            Get In Touch
          </a>
        </motion.div>

        <motion.div className="hero-social" variants={item}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="mailto:contact@het-dev.me">
            <FaEnvelope />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="mouse"></div>
      </motion.div>
    </section>
  )
}

export default Hero
