import { useLayoutEffect, useRef } from 'react'
import { TbArrowLeft, TbArrowRight } from 'react-icons/tb'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export default function SelectedWork({ projects, onSelect, ready }) {
  const root = useRef(null)
  const viewport = useRef(null)
  const track = useRef(null)
  const trigger = useRef(null)
  const count = useRef(null)

  useLayoutEffect(() => {
    if (!ready) return
    const media = gsap.matchMedia()
    media.add('(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.current.scrollWidth - viewport.current.clientWidth)
      const tween = gsap.to(track.current, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: .7, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: self => { if (count.current) count.current.textContent = `${String(Math.round(self.progress * (projects.length - 1)) + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}` },
        },
      })
      trigger.current = tween.scrollTrigger
      return () => { trigger.current = null }
    }, root)
    const refresh = () => ScrollTrigger.refresh()
    document.fonts.ready.then(refresh)
    return () => media.revert()
  }, [ready, projects.length])

  function go(direction, index) {
    if (ScrollSmoother.get()?.paused()) return
    const st = trigger.current
    const cards = Array.from(track.current.children)
    if (st) {
      const next = index ?? Math.max(0, Math.min(projects.length - 1, Math.round(st.progress * (projects.length - 1)) + direction))
      const position = st.start + next / (projects.length - 1) * (st.end - st.start)
      const smoother = ScrollSmoother.get()
      if (smoother) smoother.scrollTo(position, true)
      else window.scrollTo({ top: position, behavior: 'smooth' })
    } else {
      const next = index ?? Math.max(0, Math.min(projects.length - 1, Math.round(viewport.current.scrollLeft / (cards[0].offsetWidth + 24)) + direction))
      viewport.current.scrollTo({ left: cards[next].offsetLeft - cards[0].offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      count.current.textContent = `${String(next + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`
    }
  }

  return <section id="work" ref={root} className="selected-work" tabIndex="-1" aria-labelledby="work-title">
    <div className="container gallery-header"><h2 id="work-title">Selected work<span className="heading-dot">.</span></h2><div className="gallery-controls"><span ref={count} className="mono" aria-hidden="true">01 / {String(projects.length).padStart(2, '0')}</span><button className="icon-button" onClick={() => go(-1)} aria-label="Previous selected project"><TbArrowLeft /></button><button className="icon-button" onClick={() => go(1)} aria-label="Next selected project"><TbArrowRight /></button></div></div>
    <div ref={viewport} className="selected-viewport" role="region" aria-label="Selected project covers" onScroll={() => {
      if (trigger.current) return
      const card = track.current.firstElementChild
      const index = Math.min(projects.length - 1, Math.round(viewport.current.scrollLeft / (card.offsetWidth + 24)))
      count.current.textContent = `${String(index + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`
    }}>
      <div ref={track} className="selected-track">{projects.map((project, index) => <button key={project.id} className="cover-card" onClick={() => onSelect(project)} onFocus={event => { if (event.target.matches(':focus-visible')) go(0, index) }} aria-label={`View ${project.name} project`}><img src={project.cover} width="1536" height="1024" alt="" loading="eager" decoding="async" /></button>)}</div>
    </div>
  </section>
}
