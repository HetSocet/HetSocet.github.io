import { motion } from 'framer-motion'
import heroSketch from '../assets/main-image.png'
import './Hero.css'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <img src={heroSketch} alt="Sketch illustration" className="hero-illustration" />

      <div className="hero-content">
        <motion.div
          className="hero-badges"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="hand text-accent">SOFTWARE DEVELOPER</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="hero-quote-secondary hand text-accent">
            Software should<br />
            feel honest
          </h1>
        </motion.div>

        <motion.div
          className="hero-location"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="hand text-grey">Ahmedabad • GMT +5:30</p>
        </motion.div>
      </div>

      <motion.div
        className="scroll-down-arrow hand"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        ↓
      </motion.div>
    </section>
  )
}

export default Hero
