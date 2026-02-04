import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './Cursor.css'

const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      />
      <motion.div
        className="cursor-outline"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 100, mass: 0.8 }}
      />
    </>
  )
}

export default Cursor
