import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import Magnetic from './Magnetic'
import LivingDot from './LivingDot'
import { reducedMotion } from '../utils/motion'

const MARQUEE = [
  'React',
  'Node.js',
  'Express',
  'PostgreSQL',
  'MongoDB',
  'Socket.IO',
  'Gemini AI',
  'Tailwind CSS',
  'REST APIs',
  'JWT Auth',
]

const DOT_COLORS = ['coral', 'sun', 'teal', 'grape']

function SplitWord({ word, className = '' }) {
  return (
    <span className={`hero-word ${className}`} aria-hidden="true">
      {word.split('').map((ch, i) => (
        <span className="hero-ch-wrap" key={i}>
          <span className="hero-ch">{ch}</span>
        </span>
      ))}
    </span>
  )
}

export default function Hero({ start }) {
  const rootRef = useRef(null)

  // Hide the entrance-animated elements the instant Hero mounts — well
  // before the preloader even begins its exit slide. If we waited for
  // `start` to do this hiding, the preloader's slide-away would reveal
  // a fully-visible, unanimated hero for a frame, which would then
  // snap hidden and re-animate: exactly the "flash then animate" bug.
  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.set('.hero-badge', { y: -18, opacity: 0 })
      gsap.set('.hero-ch', { yPercent: 112 })
      gsap.set('.living-dot', { scale: 0, transformOrigin: '50% 80%' })
      gsap.set('.hero-sub', { y: 24, opacity: 0 })
      gsap.set('.hero-cta', { y: 18, opacity: 0, scale: 0.92 })
      gsap.set('.hero-shape', { opacity: 0, scale: 0.4 })
      gsap.set('.hero-scroll', { opacity: 0 })
      gsap.set('.hero-marquee', { opacity: 0 })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (!start || reducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to('.hero-ch', {
        yPercent: 0,
        duration: 0.9,
        ease: 'back.out(1.4)',
        stagger: 0.035,
      })
        .to(
          '.living-dot',
          { scale: 1, duration: 0.6, ease: 'back.out(2.4)' },
          '-=0.45'
        )
        .to('.hero-badge', { y: 0, opacity: 1, duration: 0.5 }, '-=0.55')
        .to('.hero-sub', { y: 0, opacity: 1, duration: 0.6 }, '-=0.35')
        .to(
          '.hero-cta',
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: 'back.out(1.8)',
            stagger: 0.08,
          },
          '-=0.4'
        )
        .to(
          '.hero-shape',
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.7)',
            stagger: 0.07,
          },
          '-=0.6'
        )
        .to('.hero-scroll', { opacity: 1, duration: 0.6 }, '-=0.3')
        .to('.hero-marquee', { opacity: 1, duration: 0.6 }, '<')

      gsap.utils.toArray('.hero-shape').forEach((shape, i) => {
        gsap.to(shape, {
          y: i % 2 === 0 ? -14 : 14,
          duration: 2.6 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.6,
        })
      })
    }, rootRef)

    const root = rootRef.current
    const parallax = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      root.querySelectorAll('.hero-shape').forEach((shape, i) => {
        const depth = (i % 3) + 1
        gsap.to(shape, {
          xPercent: nx * depth * 6,
          duration: 1.1,
          ease: 'power2.out',
        })
      })
    }
    window.addEventListener('mousemove', parallax)

    return () => {
      window.removeEventListener('mousemove', parallax)
      ctx.revert()
    }
  }, [start])

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="hero-shapes" aria-hidden="true">
        <span className="hero-shape hero-shape--circle" />
        <span className="hero-shape hero-shape--pill" />
        <span className="hero-shape hero-shape--ring" />
        <span className="hero-shape hero-shape--star">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2c.7 5.2 4.8 9.3 10 10-5.2.7-9.3 4.8-10 10-.7-5.2-4.8-9.3-10-10 5.2-.7 9.3-4.8 10-10Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="hero-shape hero-shape--squiggle">
          <svg viewBox="0 0 90 20" fill="none">
            <path
              d="M2 10c7-10 14 10 21 0s14 10 21 0 14 10 21 0 14 10 22 0"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>

      <div className="hero-center">
        <p className="hero-badge">
          <span className="hero-badge-dot" />
          Open to developer roles
        </p>

        <h1 className="hero-name">
          <span className="sr-only">Meet Barvaliya</span>
          <span className="hero-line">
            <SplitWord word="Meet" />
          </span>
          <span className="hero-line hero-line--last">
            <SplitWord word="Barvaliya" />
            <LivingDot />
          </span>
        </h1>

        <p className="hero-sub">
          Full-stack developer crafting <em>real-time</em>,{' '}
          <em>AI-powered</em> web apps with the MERN &amp; PERN stacks —
          from Ahmedabad, India.
        </p>

        <div className="hero-ctas">
          <Magnetic className="btn btn--primary hero-cta" href="#work">
            See my work
            <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 2v11M3.5 8.5 8 13l4.5-4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Magnetic>
          <Magnetic
            className="btn btn--ghost hero-cta"
            href="https://github.com/Meet-ops"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 12 12 4M6 4h6v6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Magnetic>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-label">scroll</span>
        <span className="hero-scroll-line" />
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-track">
          {[0, 1].map((copy) => (
            <div className="hero-marquee-group" key={copy}>
              {MARQUEE.map((item, i) => (
                <span className="hero-marquee-item" key={item}>
                  {item}
                  <span
                    className={`hero-marquee-dot hero-marquee-dot--${DOT_COLORS[i % DOT_COLORS.length]}`}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
