import { useRef } from 'react'
import { useReveal } from '../utils/useReveal'
import '../styles/section-about.css'

const FACTS = [
  {
    id: 'gpa',
    rotate: -3,
    accent: 'coral',
    text: '9.34 / 10 CGPA — top of the IT cohort.',
  },
  {
    id: 'builds',
    rotate: 2.5,
    accent: 'teal',
    text: 'Three full-stack builds shipped. Zero tutorial clones.',
  },
  {
    id: 'docs',
    rotate: -1.5,
    accent: 'sun',
    text: 'Reads the Postgres docs before Stack Overflow.',
  },
  {
    id: 'stack',
    rotate: 3.5,
    accent: 'grape',
    text: 'React · Node · Express · PostgreSQL · Socket.IO · Gemini API',
  },
  {
    id: 'grad',
    rotate: -2.5,
    accent: 'coral',
    text: 'Graduating May 2027 — looking for where to build next.',
  },
]

export default function About() {
  const rootRef = useRef(null)
  useReveal(rootRef)

  return (
    <section className="section-block field-section" id="about" ref={rootRef}>
      <div className="section-inner">
        <div className="field-heading" data-reveal>
          <span className="field-heading-kicker">Field notes</span>
          <h2 className="field-heading-title">
            Pinned to the board while I figure things out.
          </h2>
        </div>

        <div className="field-board" data-reveal-group>
          <span className="field-board-clip field-board-clip--tl" aria-hidden="true" />
          <span className="field-board-clip field-board-clip--br" aria-hidden="true" />

          <article
            className="field-card field-card--intro"
            data-reveal
            style={{ '--rot': '-2deg' }}
          >
            <span className="field-pin" aria-hidden="true" />
            <p className="field-card-text">
              I&rsquo;m Meet — a B.Tech IT student at Silver Oak University,
              Ahmedabad. I learn by finishing things: real REST APIs, real
              auth, real-time systems, real AI integrations. No tutorial
              clones, no half-built repos.
            </p>
            <span className="field-caption">still compiling&hellip;</span>
          </article>

          {FACTS.map((fact, i) => (
            <article
              key={fact.id}
              className={`field-card field-card--fact field-card--${fact.accent} field-card--p${i + 1}`}
              data-reveal
              style={{ '--rot': `${fact.rotate}deg` }}
            >
              <span className="field-pin" aria-hidden="true" />
              <p className="field-card-text">{fact.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
