import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Cursor.css'

const DOT_ANGLES = [0, 60, 120, 180, 240, 300].map(deg => deg * (Math.PI / 180))
const DOT_CONFIG = DOT_ANGLES.map((angle, i) => ({
  angle,
  dist: 26 + (i % 3) * 8,
  size: 3 + (i % 2) * 2.5,
  delay: i * 0.025,
}))

let nextId = 0

const ClickSplash = ({ x, y }) => (
  <div className="click-splash" style={{ left: x, top: y }}>
    <motion.div
      className="click-ring"
      initial={{ scale: 0, opacity: 0.85 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.div
      className="click-ring click-ring--inner"
      initial={{ scale: 0, opacity: 0.6 }}
      animate={{ scale: 1.8, opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.04 }}
    />
    {DOT_CONFIG.map((dot, i) => (
      <motion.div
        key={i}
        className="click-ink-dot"
        style={{ width: dot.size, height: dot.size }}
        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        animate={{
          x: Math.cos(dot.angle) * dot.dist,
          y: Math.sin(dot.angle) * dot.dist,
          opacity: 0,
          scale: 0.2,
        }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: dot.delay }}
      />
    ))}
    <motion.div
      className="click-star"
      initial={{ scale: 0, opacity: 1, rotate: 0 }}
      animate={{ scale: 1.4, opacity: 0, rotate: 45 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    />
  </div>
)

const Cursor = () => {
  const [clicks, setClicks] = useState([])

  const spawnSplash = useCallback((x, y) => {
    const id = ++nextId
    setClicks(prev => [...prev, { id, x, y }])
    setTimeout(() => setClicks(prev => prev.filter(c => c.id !== id)), 800)
  }, [])

  useEffect(() => {
    const onClick = e => spawnSplash(e.clientX, e.clientY)
    const onTouch = e => {
      const t = e.touches[0] || e.changedTouches[0]
      if (t) spawnSplash(t.clientX, t.clientY)
    }
    window.addEventListener('click', onClick)
    window.addEventListener('touchstart', onTouch, { passive: true })
    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('touchstart', onTouch)
    }
  }, [spawnSplash])

  return (
    <AnimatePresence>
      {clicks.map(({ id, x, y }) => (
        <ClickSplash key={id} x={x} y={y} />
      ))}
    </AnimatePresence>
  )
}

export default Cursor
