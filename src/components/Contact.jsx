import { useRef } from 'react'
import { useReveal } from '../utils/useReveal'
import Magnetic from './Magnetic'
import '../styles/section-contact.css'

const ROUTES = [
  {
    id: 'github',
    label: 'github',
    value: 'Meet-ops',
    href: 'https://github.com/Meet-ops',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'linkedin',
    value: 'barvaliyameet',
    href: 'https://linkedin.com/in/barvaliyameet',
    external: true,
  },
  {
    id: 'phone',
    label: 'phone',
    value: '+91 90169 52839',
    href: 'tel:+919016952839',
    external: false,
  },
]

function Postmark() {
  return (
    <svg className="channel-postmark" viewBox="0 0 120 60" aria-hidden="true">
      <circle cx="40" cy="30" r="25" fill="none" stroke="var(--ink-faint)" strokeWidth="1.6" />
      <circle cx="40" cy="30" r="18" fill="none" stroke="var(--ink-faint)" strokeWidth="1" />
      <line x1="70" y1="17" x2="113" y2="12" stroke="var(--ink-faint)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="70" y1="30" x2="117" y2="30" stroke="var(--ink-faint)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="70" y1="43" x2="113" y2="48" stroke="var(--ink-faint)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export default function Contact() {
  const rootRef = useRef(null)
  useReveal(rootRef)

  return (
    <section className="section-block channel-section" id="contact" ref={rootRef}>
      <div className="section-inner channel-inner">
        <div className="channel-postcard" data-reveal-group>
          <div className="channel-message">
            <p className="channel-kicker" data-reveal>open channel</p>
            <h2 className="channel-headline" data-reveal>
              Got a role where I can build for real?
            </h2>
            <p className="channel-sub" data-reveal>
              I reply fast, I keep it honest, and I&rsquo;m ready to move &mdash;
              internship or first full-time role, on-site or remote.
            </p>

            <div className="channel-cta-row" data-reveal>
              <Magnetic
                className="btn btn--primary btn--lg signal-cta"
                href="mailto:barvaliyameet@gmail.com"
              >
                barvaliyameet@gmail.com
              </Magnetic>
            </div>
          </div>

          <div className="channel-divider" aria-hidden="true" />

          <div className="channel-address">
            <div className="channel-stampzone" data-reveal>
              <Postmark />
              <span className="channel-stamp">
                <span className="channel-stamp-mark">MB</span>
              </span>
            </div>

            <ul className="channel-routes" data-reveal>
              {ROUTES.map((route) => (
                <li className="channel-route" key={route.id}>
                  <a
                    href={route.href}
                    target={route.external ? '_blank' : undefined}
                    rel={route.external ? 'noreferrer' : undefined}
                  >
                    <span className="channel-route-label">{route.label}</span>
                    <span className="channel-route-value">{route.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="channel-footer">
          <span>Meet Barvaliya &mdash; Ahmedabad, Gujarat</span>
          <span>Built with React &amp; GSAP</span>
        </div>
      </div>
    </section>
  )
}
