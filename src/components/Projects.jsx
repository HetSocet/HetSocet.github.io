import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import petFinderImg from '../assets/petfinder.png'
import mrBrushImg from '../assets/mr_brush.png'
import ProjectDetail from './ProjectDetail'
import './Projects.css'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      title: 'Pet Finder',
      description: 'A dedicated platform for pet adoption, connecting loving homes with animals in need.',
      fullDescription: 'Pet Finder bridges the gap between animals in shelters and loving homes. The app features real-time listings, in-app messaging, and a matching algorithm that pairs pets with compatible adopters based on lifestyle preferences and living situation.',
      tags: ['FlutterFlow', 'Firebase', 'Firestore'],
      image: petFinderImg,
      year: '2023',
      role: 'Mobile Developer',
      pageNum: 1,
      features: [
        'Real-time pet listings with photo galleries',
        'In-app messaging between adopters and shelters',
        'Smart matching based on lifestyle preferences',
        'Push notifications for new pet matches',
        'Shelter dashboard for listing management',
      ],
      links: {
        github: 'https://github.com',
      },
    },
    {
      title: 'Mr. Brush',
      description: 'An AI-powered image generation application that brings your creative prompts to life.',
      fullDescription: "Mr. Brush is an AI-powered creative studio that transforms text prompts into stunning artwork. Integrating Google Gemini's vision model with a sleek React Native interface, it lets users generate, save, and share AI artwork — with Razorpay handling premium subscriptions.",
      tags: ['Gemini', 'React Native', 'Razorpay', 'Expo'],
      image: mrBrushImg,
      year: '2024',
      role: 'Full Stack Developer',
      pageNum: 2,
      features: [
        'Text-to-image generation via Gemini API',
        'Gallery with save and share functionality',
        'Premium subscription tiers via Razorpay',
        'Style presets and prompt history',
        'Cross-platform iOS & Android support',
      ],
      links: {
        github: 'https://github.com',
        live: 'https://example.com',
      },
    },
  ]

  return (
    <>
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
              onClick={() => setSelectedProject(project)}
              style={{ cursor: 'pointer' }}
            >
              <div className="project-image-sketch">
                <img src={project.image} alt={project.title} />
                <div className="project-open-hint hand">open ⟶</div>
              </div>
              <div className="project-content-sketch">
                <div className="project-title-row">
                  <h3 className="hand text-accent">{project.title}</h3>
                  <span className="arrow-icon hand text-accent">⟶</span>
                </div>
                <p className="hand text-small">{project.description}</p>
                <div className="project-tags-sketch">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="tag-sketch hand">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            key={selectedProject.title}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Projects
