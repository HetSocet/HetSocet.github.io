import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { TbArrowUpRight, TbArrowDown, TbArrowUp, TbDownload, TbSun, TbMoon, TbMenu2, TbX, TbCopy, TbCheck, TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { profile, projects } from './data/projects'
import GardenIntro from './components/GardenIntro'
import SelectedWork from './components/SelectedWork'
import ProjectSlider from './components/ProjectSlider'
import FooterWave from './components/FooterWave'
import './App.css'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
const featured = projects.filter(project => project.featured)
const categories = ['All', 'Mobile', 'Web', 'Extensions']
const Icon = ({ children }) => <span className="icon" aria-hidden="true">{children}</span>

function Motion({ revision }) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
      const smoother = ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: .85, effects: false, normalizeScroll: false,
        onFocusIn: (_, event) => {
          if (!document.querySelector('#smooth-content').contains(event.target) || event.target.closest('.slider-card, .cover-card')) return false
        },
      })
      return () => smoother.kill()
    })
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } })
      timeline.from('.hero-copy > *', { y: 35, opacity: 0, stagger: .12 })
      gsap.to('.hero-art-inner', { y: -55, rotation: 14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.utils.toArray('[data-reveal]').forEach(element => {
        gsap.from(element, { y: 32, opacity: 0, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } })
      })
    })
    media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-art', { rotation: -8, duration: 1.1, delay: .15, ease: 'power3.out' })
    })
    const refresh = () => ScrollTrigger.refresh()
    document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => { media.revert(); window.removeEventListener('load', refresh) }
  }, [])
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [revision])
  return null
}

function ProjectVisual({ project, gallery = false }) {
  return <div className={`project-visual visual-${project.id} ${gallery ? 'visual-gallery' : ''}`} aria-hidden={!gallery}>
    <div className="screen-pair">
      <img src={`/images/optimized/${project.id}-1.webp`} srcSet={`/images/optimized/${project.id}-1-small.webp 240w, /images/optimized/${project.id}-1.webp 480w`} sizes="(max-width: 767px) 36vw, 240px" alt={gallery ? `${project.name} app screen` : ''} width="480" height="1040" loading="lazy" decoding="async" />
      <img src={`/images/optimized/${project.id}-2.webp`} srcSet={`/images/optimized/${project.id}-2-small.webp 240w, /images/optimized/${project.id}-2.webp 480w`} sizes="(max-width: 767px) 36vw, 240px" alt={gallery ? `Another screen from ${project.name}` : ''} width="480" height="1040" loading="lazy" decoding="async" />
    </div>
  </div>
}

function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null)
  useEffect(() => {
    if (!project) return
    const node = dialog.current
    const smoother = ScrollSmoother.get()
    const oldOverflow = document.body.style.overflow
    smoother?.paused(true)
    document.body.style.overflow = 'hidden'
    node.showModal()
    return () => { node.close(); document.body.style.overflow = oldOverflow; smoother?.paused(false) }
  }, [project])
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    {project && <div className="dialog-content">
      <button className="icon-button dialog-close" aria-label="Close project" onClick={onClose} autoFocus><TbX /></button>
      <p className="mono muted">{project.field}</p>
      {project.logo && <img className="dialog-logo" src={project.logo} alt="" width="64" height="64" />}
      <h2 id="project-title">{project.name}</h2>
      <p className="dialog-description">{project.description}</p>
      {project.featured && <ProjectVisual project={project} gallery />}
      <div className="dialog-role"><span className="mono muted">My role</span><strong>{project.role}</strong></div>
      <h3>What I worked on</h3>
      <ul className="contribution-list">{project.contribution.map(item => <li key={item}>{item}</li>)}</ul>
      <div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="dialog-store-links"><a className="button button-dark" href={project.url} target="_blank" rel="noreferrer">{project.category === 'Extensions' ? 'View on Chrome Web Store' : project.url.includes('play.google') ? 'View on Google Play' : project.url.includes('apps.apple') ? 'View on App Store' : 'Visit website'}<Icon><TbArrowUpRight /></Icon></a>{project.appleUrl && <a className="button button-outline" href={project.appleUrl} target="_blank" rel="noreferrer">App Store<Icon><TbArrowUpRight /></Icon></a>}</div>
    </div>}
  </dialog>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  const [filter, setFilter] = useState('All')
  const [introPlaying, setIntroPlaying] = useState(() => { try { return !sessionStorage.getItem('het-intro-seen') && !location.hash } catch { return !location.hash } })
  const [selectedProject, setSelectedProject] = useState(null)
  const [copyStatus, setCopyStatus] = useState('')
  const copyTimer = useRef(null)
  const menuButton = useRef(null)
  const filtered = useMemo(() => projects.filter(project => filter === 'All' || project.category === filter), [filter])
  const finishIntro = useCallback(() => {
    try { sessionStorage.setItem('het-intro-seen', 'true') } catch {}
    setIntroPlaying(false)
    requestAnimationFrame(() => document.querySelector('#home')?.focus({ preventScroll: true }))
  }, [])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-color-scheme: dark)')
    const update = event => { try { if (localStorage.getItem('het-theme')) return } catch {} setTheme(event.matches ? 'dark' : 'light') }
    preference.addEventListener('change', update)
    return () => { preference.removeEventListener('change', update); clearTimeout(copyTimer.current) }
  }, [])
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  useEffect(() => {
    if (!menuOpen) return
    const escape = event => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() } }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [menuOpen])

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    try { localStorage.setItem('het-theme', next) } catch {}
  }
  function navigate(event) {
    const anchor = event.target.closest('a[href^="#"]')
    if (!anchor || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    const target = document.querySelector(anchor.getAttribute('href'))
    if (!target) return
    event.preventDefault()
    setMenuOpen(false)
    const smoother = ScrollSmoother.get()
    const pinned = ScrollTrigger.getAll().find(trigger => trigger.trigger === target && trigger.pin)
    if (smoother) smoother.scrollTo(pinned ? pinned.start : target, true, 'top 90px')
    else if (pinned) window.scrollTo({ top: pinned.start, behavior: 'smooth' })
    else target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    history.pushState(null, '', anchor.getAttribute('href'))
    target.focus({ preventScroll: true })
  }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopyStatus('Email copied') }
    catch { setCopyStatus('Copy unavailable. Use the email link to get in touch.') }
    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopyStatus(''), 4000)
  }

  return <div onClick={navigate}>
    {!introPlaying && <Motion revision={filter} />}
    <a className="skip-link" href="#main" inert={introPlaying}>Skip to content</a>
    <header className="site-header" inert={introPlaying}>
      <div className="nav-inner">
        <a href="#home" className="wordmark" aria-label="Het Patel, home">het<span>.</span></a>
        <nav id="main-nav" aria-label="Main navigation" className={menuOpen ? 'navigation is-open' : 'navigation'}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work <sup>04</sup></a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#archive" onClick={() => setMenuOpen(false)}>All projects</a>
          <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Let’s talk <TbArrowUpRight aria-hidden="true" /></a>
        </nav>
        <div className="nav-actions">
          <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? <TbMoon /> : <TbSun />}</button>
          <button ref={menuButton} className="icon-button menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <TbX /> : <TbMenu2 />}</button>
        </div>
      </div>
    </header>
    <div id="smooth-wrapper" inert={introPlaying}><div id="smooth-content">
      <main id="main" tabIndex="-1">
        <section id="home" className="hero container" tabIndex="-1" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Het Patel / Mobile & web developer</p>
            <h1 id="hero-title">Good ideas.<br /><span>Built for real.</span></h1>
            <p className="hero-description">I build thoughtful mobile apps and web experiences, taking everyday ideas from the first sketch to the final release.</p>
            <a className="button button-dark" href="#work">Explore my work <Icon><TbArrowDown /></Icon></a>
          </div>
          <div className="hero-art" aria-hidden="true"><div className="hero-art-inner"><img src="/images/optimized/chrome-asterisk.webp" alt="" width="900" height="900" fetchPriority="high" /></div></div>
        </section>
        <SelectedWork projects={featured} onSelect={setSelectedProject} ready={!introPlaying} />
        <section id="about" className="about-section container section-space" tabIndex="-1" aria-labelledby="about-title">
          <div className="about-top" data-reveal><p className="mono muted">A little about me</p><h2 id="about-title">A developer’s mind.<br /><span className="muted">A product person’s heart.</span></h2></div>
          <div className="about-grid">
            <div className="about-intro" data-reveal><span className="name-monogram" aria-hidden="true">h<span>p.</span></span><p>I’m Het, a software developer in Ahmedabad. I like figuring out how things work, then making them work better for the people using them.</p><p>At Brilworks, I build mobile and web products with React Native, FlutterFlow, and Firebase. My work spans interfaces, APIs, payments, and the details that make a release ready.</p><a href="/het-resume.pdf" className="text-link" download>Download my resume <TbDownload aria-hidden="true" /></a></div>
            <div className="about-details" data-reveal>
              <div className="experience-block"><span className="mono muted">Experience</span><h3>Software Developer</h3><div className="experience-meta"><span>Brilworks Software</span><span>Aug 2024 - Present</span></div><p>Mobile and web development, API integrations, subscriptions, and product delivery.</p></div>
              <div className="education-block"><span className="mono muted">Education</span><h3>B.Tech, Computer Engineering</h3><div className="experience-meta"><span>Silver Oak University</span><span>2022 - 2026</span></div><p>CGPA 9.38</p></div>
            </div>
          </div>
          <div id="skills" className="skills-strip" data-reveal><span className="mono">My everyday toolkit</span><div>{['React Native', 'FlutterFlow', 'React', 'Next.js', 'Firebase', 'Supabase', 'JavaScript'].map(skill => <span key={skill}>{skill}</span>)}</div></div>
        </section>
        <section id="archive" className="archive-section section-space" tabIndex="-1" aria-labelledby="archive-title">
          <div className="container"><div className="section-heading" data-reveal><h2 id="archive-title">There’s more to the story<span className="heading-dot">.</span></h2><p>Mobile apps, web products, and small tools that make a difference.</p></div>
          <div className="archive-toolbar"><div className="filters" role="group" aria-label="Filter projects">{categories.map(category => <button key={category} className={filter === category ? 'filter active' : 'filter'} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}<span>{category === 'All' ? projects.length : projects.filter(project => project.category === category).length}</span></button>)}</div><span className="mono archive-count">{filtered.length} projects</span></div></div>
          <ProjectSlider projects={filtered} onSelect={setSelectedProject} />
        </section>
        <section id="contact" className="contact-section" tabIndex="-1" aria-labelledby="contact-title"><FooterWave ready={!introPlaying} /><div className="container">
          <div className="contact-top" data-reveal><p className="mono muted">Have something in mind?</p><h2 id="contact-title">Let’s make<br />something <span>good.</span></h2><a className="contact-arrow" href={`mailto:${profile.email}`} aria-label="Email Het Patel"><TbArrowUpRight /></a></div>
          <div className="contact-bottom"><div className="email-group"><a href={`mailto:${profile.email}`} className="email-link">{profile.email}</a><button className="icon-button copy-button" aria-label="Copy email address" onClick={copyEmail}>{copyStatus === 'Email copied' ? <TbCheck /> : <TbCopy />}</button><span role="status" className="copy-status">{copyStatus}</span></div><div className="social-links"><a href={profile.linkedin} target="_blank" rel="noreferrer"><TbBrandLinkedin aria-hidden="true" /> LinkedIn <TbArrowUpRight aria-hidden="true" /></a><a href={profile.github} target="_blank" rel="noreferrer"><TbBrandGithub aria-hidden="true" /> GitHub <TbArrowUpRight aria-hidden="true" /></a></div></div>
          <footer className="footer"><p>© {new Date().getFullYear()} Het Patel</p><button className="replay-intro" onClick={() => { ScrollSmoother.get()?.scrollTop(0); window.scrollTo({ top: 0, behavior: 'instant' }); setIntroPlaying(true) }}>Replay intro</button><a href="#home">Back to top <TbArrowUp aria-hidden="true" /></a></footer>
        </div></section>
      </main>
    </div></div>
    <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    {introPlaying && <GardenIntro onComplete={finishIntro} />}
  </div>
}

export default App
