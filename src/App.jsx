import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import brandStamp from './assets/brand_stamp.png'
import './App.css'

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="App">
      {/* Decorative Side Borders */}
      <aside className="side-border-left">
        <img src={brandStamp} alt="stamp" className="stamp-icon" />
        <img src={brandStamp} alt="stamp" className="stamp-icon" />
        <img src={brandStamp} alt="stamp" className="stamp-icon" />
      </aside>
      <aside className="side-border-right">
        <img src={brandStamp} alt="stamp" className="stamp-icon rotate-180" />
        <img src={brandStamp} alt="stamp" className="stamp-icon rotate-180" />
        <img src={brandStamp} alt="stamp" className="stamp-icon rotate-180" />
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
