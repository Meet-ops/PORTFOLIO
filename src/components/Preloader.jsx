import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onDone }) {
  const rootRef = useRef(null)
  const countRef = useRef(null)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { n: 0 }
      const tl = gsap.timeline({
        onComplete: () => doneRef.current(),
      })

      tl.set('.preloader-mark', { opacity: 0, y: 14 })
        .set('.preloader-meta', { opacity: 0 })
        .set('.preloader-bar-fill', { scaleX: 0 })
        .set('.preloader-glow', { opacity: 0, scale: 0.7 })

      tl.to('.preloader-glow', {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power2.out',
      })
        .to(
          '.preloader-mark',
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
          '-=0.6'
        )
        .to(
          '.preloader-meta',
          { opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.25'
        )
        .to(
          '.preloader-bar-fill',
          { scaleX: 1, duration: 1.1, ease: 'power2.inOut' },
          '-=0.15'
        )
        .to(
          counter,
          {
            n: 100,
            duration: 1.1,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = String(
                  Math.round(counter.n)
                ).padStart(3, '0')
              }
            },
          },
          '<'
        )
        .to('.preloader-inner', {
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: 'power2.in',
        })
        .to(
          rootRef.current,
          {
            yPercent: -100,
            duration: 0.75,
            ease: 'power4.inOut',
          },
          '-=0.05'
        )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <span className="preloader-glow" />
      <div className="preloader-inner">
        <p className="preloader-mark">
          M<span className="preloader-mark-accent">.</span>B
          <span className="preloader-mark-accent">.</span>
        </p>
        <div className="preloader-meta">
          <div className="preloader-bar">
            <span className="preloader-bar-fill" />
          </div>
          <div className="preloader-row">
            <span>OPENING DOSSIER</span>
            <span>
              <span ref={countRef}>000</span>%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
