import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { reducedMotion } from '../utils/motion'

/*
 * The signature element: a coral dot that ends the name and quietly watches
 * the cursor, blinking every few seconds.
 */
export default function LivingDot() {
  const dotRef = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const dot = dotRef.current
    const pupils = dot.querySelectorAll('.living-dot-pupil')
    const eyes = dot.querySelectorAll('.living-dot-eye')

    const xTo = gsap.quickTo(pupils, 'x', { duration: 0.3, ease: 'power2.out' })
    const yTo = gsap.quickTo(pupils, 'y', { duration: 0.3, ease: 'power2.out' })

    const onMove = (e) => {
      const rect = dot.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx)
      const dist = Math.min(
        Math.hypot(e.clientX - cx, e.clientY - cy) / 90,
        1
      )
      const max = rect.width * 0.11
      xTo(Math.cos(angle) * max * dist)
      yTo(Math.sin(angle) * max * dist)
    }
    window.addEventListener('mousemove', onMove)

    const blink = gsap.timeline({ repeat: -1, repeatDelay: 3.4 })
    blink
      .to(eyes, { scaleY: 0.12, duration: 0.09, ease: 'power2.in' })
      .to(eyes, { scaleY: 1, duration: 0.14, ease: 'power2.out' })

    return () => {
      window.removeEventListener('mousemove', onMove)
      blink.kill()
    }
  }, [])

  return (
    <span className="living-dot" ref={dotRef} aria-hidden="true">
      <span className="living-dot-eye">
        <span className="living-dot-pupil" />
      </span>
      <span className="living-dot-eye">
        <span className="living-dot-pupil" />
      </span>
    </span>
  )
}
