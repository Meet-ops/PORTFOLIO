import { useRef } from 'react'
import gsap from 'gsap'
import { reducedMotion } from '../utils/motion'

export default function Magnetic({ children, strength = 0.32, className = '', ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (reducedMotion()) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const onLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.35)',
    })
  }

  const Tag = rest.href ? 'a' : 'button'

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  )
}
