import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import Toolbench from './components/Toolbench'
import SignalNote from './components/SignalNote'
import Contact from './components/Contact'
import { reducedMotion } from './utils/motion'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(() => reducedMotion())

  useEffect(() => {
    if (reducedMotion()) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [loaded])

  return (
    <>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <Nav />
      <main>
        <Hero start={loaded} />
        <About />
        <Timeline />
        <Projects />
        <Toolbench />
        <SignalNote />
        <Contact />
      </main>
    </>
  )
}
