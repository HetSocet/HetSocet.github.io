import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import brandStamp from './assets/brand_stamp.png'
import './App.css'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredSticker, setHoveredSticker] = useState(null)

  // Import all sticker images
  const stickers = import.meta.glob('./assets/sticker/*.png', { eager: true })
  const stickersList = Object.entries(stickers).map(([path, module]) => {
    const fileName = path.split('/').pop()
    const name = fileName.replace('.png', '')
    return {
      name,
      url: module.default
    }
  })

  // Split stickers for left and right sides
  const leftStickers = stickersList.slice(0, Math.ceil(stickersList.length / 2))
  const rightStickers = stickersList.slice(Math.ceil(stickersList.length / 2))

  // Show stickers 1.25 times (full set + 25% more)
  const additionalCount = Math.ceil(leftStickers.length * 0.2)
  
  const repeatedLeftStickers = [...leftStickers, ...leftStickers.slice(0, additionalCount)]
  const repeatedRightStickers = [...rightStickers, ...rightStickers.slice(0, additionalCount)]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className="App">
      {/* Decorative Side Borders with Stickers */}
      <aside className="side-border-left">
        {repeatedLeftStickers.map((sticker, index) => (
          <div
            key={`left-${index}`}
            className="sticker-wrapper"
            onMouseEnter={() => setHoveredSticker(`left-${index}`)}
            onMouseLeave={() => setHoveredSticker(null)}
          >
            <img src={sticker.url} alt={sticker.name} className="sticker-image" />
            {hoveredSticker === `left-${index}` && (
              <div className="sticker-name">{sticker.name}</div>
            )}
          </div>
        ))}
      </aside>
      <aside className="side-border-right">
        {repeatedRightStickers.map((sticker, index) => (
          <div
            key={`right-${index}`}
            className="sticker-wrapper"
            onMouseEnter={() => setHoveredSticker(`right-${index}`)}
            onMouseLeave={() => setHoveredSticker(null)}
          >
            <img src={sticker.url} alt={sticker.name} className="sticker-image" />
            {hoveredSticker === `right-${index}` && (
              <div className="sticker-name">{sticker.name}</div>
            )}
          </div>
        ))}
      </aside>
      <div className="notebook-container">
        <div className="notebook-page">
          <Navbar scrollY={scrollY} />
          <Hero />
          <About />
          {/* <Skills /> - Combining or adjusting as per design if needed */}
          <Projects />
          {/* <Contact /> - The footer has a connect section in the image */}
          <Footer />
          <div className="ribbon"></div>
        </div>
      </div>
    </div>
  )
}

export default App
