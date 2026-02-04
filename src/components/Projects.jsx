import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import './Projects.css'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      title: 'E-Commerce Mobile App',
      description: 'A full-featured e-commerce mobile application built with React Native, featuring real-time inventory, payment integration, and beautiful UI/UX.',
      tags: ['React Native', 'Firebase', 'Stripe', 'Redux'],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
      github: '#',
      live: '#'
    },
    {
      title: 'Task Management Dashboard',
      description: 'Modern web dashboard for project and task management with real-time collaboration, drag-and-drop interface, and analytics.',
      tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
      github: '#',
      live: '#'
    },
    {
      title: 'Social Media Platform',
      description: 'A social networking platform with real-time messaging, post sharing, and interactive features built for seamless user engagement.',
      tags: ['Next.js', 'PostgreSQL', 'Socket.io', 'AWS'],
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop',
      github: '#',
      live: '#'
    },
    {
      title: 'Fitness Tracking App',
      description: 'Mobile app for tracking workouts, nutrition, and progress with AI-powered recommendations and social features.',
      tags: ['Flutter', 'Firebase', 'TensorFlow', 'Material UI'],
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=500&fit=crop',
      github: '#',
      live: '#'
    },
    {
      title: 'Real Estate Portal',
      description: 'Comprehensive real estate platform with advanced search, virtual tours, and property management features.',
      tags: ['Vue.js', 'Python', 'Django', 'Google Maps API'],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
      github: '#',
      live: '#'
    },
    {
      title: 'Learning Management System',
      description: 'Educational platform with video streaming, interactive quizzes, progress tracking, and certification system.',
      tags: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop',
      github: '#',
      live: '#'
    }
  ]

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <div className="projects-grid" ref={ref}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <a href={project.github} className="project-link">
                    <FaGithub />
                  </a>
                  <a href={project.live} className="project-link">
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
