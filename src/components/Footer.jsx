import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer-sketch">
      <div className="footer-content-sketch">
        <h2 className="serif footer-quote-sketch">
          Let's build something <span className="hand text-accent">honest</span>.
        </h2>

        <div className="footer-links-sketch hand">
          <a href="mailto:hetwork0312@gmail.com" className="footer-link-sketch">Email</a>
          <a href="#" className="footer-link-sketch">LinkedIn</a>
          <a href="#" className="footer-link-sketch">Dribbble</a>
          <a href="#" className="footer-link-sketch">Read.cv</a>
        </div>

        <div className="footer-bottom-sketch hand text-grey">
          <p>© Het 2024 — Drawn with heart.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
