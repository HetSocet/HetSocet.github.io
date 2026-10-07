import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
gsap.registerPlugin(MorphSVGPlugin)

export default function FooterWave({ ready }) {
  const path = useRef(null)
  useLayoutEffect(() => {
    if (!ready) return
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let bounce
      const spring = self => {
        const velocity = gsap.utils.clamp(0, 1, Math.abs(self.getVelocity()) / 4500)
        bounce?.kill()
        bounce = gsap.fromTo(path.current, { morphSVG: `M0 80 Q720 ${210 + velocity * 65} 1440 80 L1440 180 L0 180 Z` }, { morphSVG: 'M0 80 Q720 80 1440 80 L1440 180 L0 180 Z', duration: 1.8, ease: `elastic.out(${1 + velocity * .3}, 0.35)`, overwrite: true })
      }
      const trigger = ScrollTrigger.create({ trigger: '#contact', start: 'top bottom', onEnter: spring, onEnterBack: spring })
      return () => { bounce?.kill(); trigger.kill() }
    })
    return () => media.revert()
  }, [ready])
  return <svg className="footer-wave" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true"><path ref={path} d="M0 80 Q720 80 1440 80 L1440 180 L0 180 Z" /></svg>
}
