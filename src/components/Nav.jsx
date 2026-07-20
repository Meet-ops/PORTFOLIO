import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

function formatTime() {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState(formatTime)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="nav-logo" href="#top" aria-label="Meet Barvaliya — back to top">
          meet<span className="nav-logo-dot">.</span>
        </a>
        <nav className="nav-links" aria-label="Main">
          {LINKS.map((link) => (
            <a key={link.href} className="nav-link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <span className="nav-meta" aria-hidden="true">
            {time} IST · AHMEDABAD, IN
          </span>
          <a
            className="nav-resume"
            href="/Meet-Barvaliya-Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  )
}
