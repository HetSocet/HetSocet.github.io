import { motion } from 'framer-motion'
import petFinderImg from '../assets/petfinder.png'
import mrBrushImg from '../assets/mr_brush.png'
import './Projects.css'

const Projects = () => {
  const projects = [
    {
      title: 'Pet Finder',
      description: 'A dedicated platform for pet adoption, connecting loving homes with animals in need.',
      tags: ['Flutter Flow', 'Firebase'],
      image: petFinderImg,
    },
    {
      title: 'Mr. Brush',
      description: 'An AI-powered image generation application that brings your creative prompts to life.',
      tags: ['Gemini', 'React Native', 'Razorpay'],
      image: mrBrushImg,
    }
  ]

  return (
    <section id="work" className="projects-section">
      <div className="projects-header">
        <h2 className="hand section-title-sketch">Selected Work</h2>
        <span className="hand year-tab">2022 — 2024</span>
      </div>

      <div className="projects-sketch-grid">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="sketch-card project-card-sketch"
            whileHover={{ scale: 1.02 }}
          >
            <div className="project-image-sketch">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-content-sketch">
              <div className="project-title-row">
                <h3 className="hand text-accent">{project.title}</h3>
                <span className="arrow-icon hand text-accent">⟶</span>
              </div>
              <p className="hand text-small">{project.description}</p>
              <div className="project-tags-sketch">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag-sketch hand">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Projects
