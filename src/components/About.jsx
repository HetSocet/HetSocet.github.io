import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  return (
    <section id="about" className="about-sketch">
      <motion.div
        className="about-container-sketch"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="hand section-title-sketch">About Me</h2>
        <div className="about-text-sketch hand">
          <p>
            I'm a designer who believes that software should feel as natural as a sketch in a notebook.
            My work focuses on transparency, tactility, and the human side of digital interfaces.
          </p>
          <p>
            Based in Ahemdabad, I collaborate with teams worldwide to build products
            that don't just work well, but feel right.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default About
