import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion } from './motion'

gsap.registerPlugin(ScrollTrigger)

/*
 * Reveals every [data-reveal] child of the section when it scrolls into view.
 * Siblings inside the same [data-reveal-group] stagger together.
 */
export function useReveal(ref) {
  useLayoutEffect(() => {
    if (reducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
        const items = group.querySelectorAll('[data-reveal]')
        gsap.fromTo(
          items,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: 'top 82%' },
          }
        )
      })

      gsap.utils
        .toArray('[data-reveal]:not([data-reveal-group] [data-reveal])')
        .forEach((el) => {
          gsap.fromTo(
            el,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%' },
            }
          )
        })
    }, ref)

    return () => ctx.revert()
  }, [ref])
}
