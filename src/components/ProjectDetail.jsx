import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ProjectDetail.css'

const ProjectDetail = ({ project, onClose }) => {
  const [bookOpen, setBookOpen] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const isMobile = useRef(typeof window !== 'undefined' && window.innerWidth <= 820)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    isMobile.current = window.innerWidth <= 820
    // On mobile: content is immediately visible (no flip to wait for)
    // On desktop: stagger flip then content
    const openTimer = setTimeout(() => setBookOpen(true), isMobile.current ? 0 : 200)
    const contentTimer = setTimeout(() => setContentVisible(true), isMobile.current ? 150 : 900)
    return () => {
      clearTimeout(openTimer)
      clearTimeout(contentTimer)
      document.body.style.overflow = ''
    }
  }, [])

  const handleClose = () => {
    setContentVisible(false)
    setBookOpen(false)
    setTimeout(onClose, 700)
  }

  return (
    <motion.div
      className="pd-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleClose}
    >
      {/* Floating dust particles */}
      <div className="pd-particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`pd-particle pd-particle-${i + 1}`} />
        ))}
      </div>

      <motion.div
        className="pd-book-wrapper"
        initial={isMobile.current ? { y: '100%', opacity: 1 } : { scale: 0.6, opacity: 0, y: 60 }}
        animate={isMobile.current ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
        exit={isMobile.current ? { y: '100%', opacity: 1 } : { scale: 0.6, opacity: 0, y: 60 }}
        transition={isMobile.current
          ? { type: 'spring', stiffness: 260, damping: 30 }
          : { type: 'spring', stiffness: 180, damping: 22 }}
        onClick={e => e.stopPropagation()}
      >
        <div className={`pd-book ${bookOpen ? 'pd-book--open' : ''}`}>

          {/* LEFT PAGE — book cover (flips open) */}
          <div className="pd-cover">
            <div className="pd-cover-front">
              <div className="pd-cover-image">
                <img src={project.image} alt={project.title} />
                <div className="pd-cover-overlay" />
              </div>
              <div className="pd-cover-label">
                <span className="hand pd-cover-tag">Project</span>
                <h2 className="serif pd-cover-title">{project.title}</h2>
                <span className="hand pd-cover-year">{project.year}</span>
              </div>
              <div className="pd-cover-corner-fold" />
            </div>
            <div className="pd-cover-back">
              <div className="pd-cover-back-inner">
                <div className="pd-ruled-lines">
                  {[...Array(12)].map((_, i) => <div key={i} className="pd-ruled-line" />)}
                </div>
                <p className="hand pd-back-note">← flip back to close</p>
              </div>
            </div>
          </div>

          {/* SPINE */}
          <div className="pd-spine">
            <span className="hand pd-spine-text">{project.title}</span>
          </div>

          {/* RIGHT PAGE — project detail content */}
          <div className="pd-page">
            {/* Page grid lines */}
            <div className="pd-page-grid" />

            <div className={`pd-page-content ${contentVisible ? 'pd-page-content--visible' : ''}`}>
              <button className="hand pd-close-btn" onClick={handleClose}>✕ close</button>

              <div className="pd-page-header">
                <span className="hand pd-page-tag">{project.year} · {project.role}</span>
                <h2 className="serif pd-page-title">{project.title}</h2>
              </div>

              <p className="hand pd-page-desc">{project.fullDescription}</p>

              <div className="pd-divider" />

              <div className="pd-features">
                <h4 className="hand pd-section-label">Key Features</h4>
                <ul className="pd-feature-list">
                  {project.features.map((f, i) => (
                    <li key={i} className="hand pd-feature-item">
                      <span className="pd-bullet">◆</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pd-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="hand pd-tag">{tag}</span>
                ))}
              </div>

              {project.links && (
                <div className="pd-links">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hand pd-link-btn"
                      onClick={e => e.stopPropagation()}
                    >
                      GitHub ⟶
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="hand pd-link-btn pd-link-btn--primary"
                      onClick={e => e.stopPropagation()}
                    >
                      Live Demo ⟶
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Page number */}
            <span className="hand pd-page-num">0{project.pageNum || 1}</span>
          </div>
        </div>

        {/* Book shadow */}
        <div className={`pd-book-shadow ${bookOpen ? 'pd-book-shadow--open' : ''}`} />
      </motion.div>

      <p className="hand pd-hint">click outside to close</p>
    </motion.div>
  )
}

export default ProjectDetail
