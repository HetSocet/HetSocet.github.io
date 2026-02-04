import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCode, FaMobile, FaRocket, FaPalette } from 'react-icons/fa'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const features = [
    {
      icon: <FaMobile />,
      title: 'Mobile Development',
      description: 'Creating native and cross-platform mobile apps with React Native and Flutter'
    },
    {
      icon: <FaCode />,
      title: 'Web Development',
      description: 'Building modern, responsive web applications using React, Vue, and Next.js'
    },
    {
      icon: <FaRocket />,
      title: 'Performance',
      description: 'Optimized code and best practices for lightning-fast user experiences'
    },
    {
      icon: <FaPalette />,
      title: 'UI/UX Design',
      description: 'Crafting beautiful, intuitive interfaces that users love'
    }
  ]

  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <div className="about-content" ref={ref}>
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3>Passionate Developer & Creative Problem Solver</h3>
            <p>
              I'm a full-stack developer specializing in mobile and web development.
              With years of experience building scalable applications, I turn complex
              problems into elegant solutions.
            </p>
            <p>
              My expertise spans across modern frameworks and technologies, allowing
              me to create seamless experiences across all platforms. I'm passionate
              about clean code, beautiful design, and delivering products that make
              a real impact.
            </p>
            <div className="stats">
              <div className="stat">
                <h4 className="gradient-text">50+</h4>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h4 className="gradient-text">5+</h4>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h4 className="gradient-text">30+</h4>
                <p>Happy Clients</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="features-grid"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card card"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
