import { useLayoutEffect, useRef, useState } from 'react'
import { TbArrowLeft, TbArrowRight, TbArrowUpRight, TbWorld, TbPuzzle } from 'react-icons/tb'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
gsap.registerPlugin(Draggable)

export default function ProjectSlider({ projects, onSelect }) {
  const viewport = useRef(null)
  const cards = useRef([])
  const controller = useRef(null)
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add({ reduced: '(prefers-reduced-motion: reduce)', regular: '(prefers-reduced-motion: no-preference)' }, context => {
      const reduce = context.conditions.reduced
      setReduced(reduce)
      const proxy = document.createElement('div')
      const state = { position: 0 }
      let width = 300, spacing = 326, dragStart = 0, gesture = false, tween
      const length = projects.length
      const wrap = gsap.utils.wrap(-length / 2, length / 2)
      const wrappedIndex = gsap.utils.wrap(0, length)
      function draw() {
        const center = viewport.current.clientWidth / 2 - width / 2
        cards.current.slice(0, length).forEach((card, index) => {
          if (!card) return
          const delta = wrap(index - state.position)
          gsap.set(card, { x: center + delta * spacing, scale: reduce ? 1 : 1 - Math.min(Math.abs(delta), 2) * .055, opacity: Math.abs(delta) > 3 ? 0 : 1, zIndex: Math.max(1, 5 - Math.round(Math.abs(delta))) })
          card.inert = Math.abs(delta) > 1.6
          card.setAttribute('aria-hidden', Math.abs(delta) > 1.6 ? 'true' : 'false')
        })
      }
      function move(position, instant = false) {
        tween?.kill()
        setActive(wrappedIndex(Math.round(position)))
        tween = gsap.to(state, { position, duration: reduce || instant ? 0 : .65, ease: 'power3.out', onUpdate: draw })
      }
      controller.current = { next: (direction, focus = false) => {
        const next = Math.round(state.position) + direction
        move(next)
        if (focus) { const card = cards.current[wrappedIndex(next)]; card.inert = false; card.focus({ preventScroll: true }) }
      }, dragged: () => gesture }
      const resize = () => { width = cards.current[0]?.offsetWidth || 300; spacing = width + (viewport.current.clientWidth < 768 ? 18 : 26); draw() }
      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(viewport.current)
      const drag = Draggable.create(proxy, {
        trigger: viewport.current, type: 'x', minimumMovement: 8,
        onPress() { tween?.kill(); dragStart = state.position; gesture = false },
        onDrag() { gesture = true; state.position = dragStart + (this.startX - this.x) / spacing; draw() },
        onDragEnd() { move(Math.round(state.position)) },
        onClick() { gesture = false },
      })[0]
      setActive(0); resize()
      return () => { tween?.kill(); drag.kill(); resizeObserver.disconnect(); controller.current = null; cards.current.forEach(card => { if (card) card.inert = false }) }
    }, viewport)
    return () => media.revert()
  }, [projects])

  return <div className="project-slider" role="region" aria-roledescription="carousel" aria-label="All projects">
    <div ref={viewport} className={`slider-viewport ${reduced ? 'reduced-slider' : ''}`} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); controller.current?.next(event.key === 'ArrowRight' ? 1 : -1, true) } }}>
      {projects.map((project, index) => <button ref={node => { cards.current[index] = node }} className={`slider-card slider-${project.id}`} key={project.id} tabIndex={index === active ? 0 : -1} onClick={() => { if (!controller.current?.dragged()) onSelect(project) }} aria-label={`${project.category}, ${project.name}, ${project.field}. View project`}>
        <span className="slider-brand" style={{ '--project-tint': project.tint || '#e2e7dc' }}>{project.logo ? <img src={project.logo} width="160" height="160" alt="" loading="lazy" /> : <span className="project-lettermark" aria-hidden="true">{project.category === 'Extensions' ? <TbPuzzle /> : <TbWorld />}<span>{project.name}</span></span>}</span>
        <span className="slider-card-info"><span className="mono">{project.category}</span><span className="slider-card-name">{project.name}<TbArrowUpRight aria-hidden="true" /></span><span className="slider-card-field">{project.field}</span></span>
      </button>)}
    </div>
    <div className="slider-controls"><button className="icon-button" aria-label="Previous project" onClick={() => controller.current?.next(-1)}><TbArrowLeft /></button><p className="mono" role="status">{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} <span className="slider-current-name">{projects[active]?.name}</span></p><button className="icon-button" aria-label="Next project" onClick={() => controller.current?.next(1)}><TbArrowRight /></button></div>
  </div>
}
