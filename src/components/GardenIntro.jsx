import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { GardenEngine } from '../lib/garden'

export default function GardenIntro({ onComplete }) {
  const root = useRef(null)
  const canvas = useRef(null)
  const complete = useRef(onComplete)
  complete.current = onComplete

  useLayoutEffect(() => {
    const element = root.current
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const engine = new GardenEngine(canvas.current)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new ResizeObserver(() => engine.resize())
    observer.observe(canvas.current)
    const start = performance.now()
    const render = () => engine.draw(reduce ? 3500 : performance.now() - start, reduce)
    render()
    if (!reduce) gsap.ticker.add(render)
    const finish = gsap.timeline({ onComplete: () => complete.current() })
      .to(element, { opacity: 0, duration: reduce ? 0 : .5, ease: 'power2.inOut' }, reduce ? .25 : 3.6)
    return () => { finish.kill(); gsap.ticker.remove(render); observer.disconnect(); document.body.style.overflow = oldOverflow }
  }, [])

  return <div ref={root} className="garden-intro" role="dialog" aria-modal="true" aria-label="Welcome to Het Patel's portfolio" onKeyDown={event => { if (event.key === 'Escape') complete.current() }}>
    <p className="garden-intro-label mono">A little growth. A lot of possibility.</p>
    <canvas ref={canvas} aria-hidden="true" />
    <div className="garden-intro-bottom"><span className="mono">Het Patel / Mobile & web developer</span><button className="text-link" onClick={() => complete.current()} autoFocus>Skip intro <span aria-hidden="true">↗</span></button></div>
  </div>
}
