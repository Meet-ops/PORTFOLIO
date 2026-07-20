import { useRef } from 'react'
import { useReveal } from '../utils/useReveal'
import '../styles/section-signal.css'

const PRINCIPLES = [
  'ship the ugly version first, refactor after',
  'read the error before you google it',
  'a good schema saves a hundred bad queries',
  "if it's not tested by hand once, it's not done",
]

function HandCheck() {
  return (
    <svg viewBox="0 0 20 18" className="signal-check" aria-hidden="true">
      <path
        d="M2 9.5 L7.5 15 L18 2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function SignalNote() {
  const rootRef = useRef(null)
  useReveal(rootRef)

  return (
    <section className="section-block signal-section" id="signal" ref={rootRef}>
      <div className="section-inner signal-inner">
        <div className="signal-note" data-reveal>
          <span className="signal-pin" aria-hidden="true" />

          <h2 className="signal-heading">notes to self</h2>
          <p className="signal-subheading">how I actually build things</p>

          <ul className="signal-list">
            {PRINCIPLES.map((principle, i) => {
              const isLast = i === PRINCIPLES.length - 1
              return (
                <li className="signal-item" key={principle}>
                  <span
                    className={`signal-mark${isLast ? ' signal-mark--check' : ''}`}
                    aria-hidden="true"
                  >
                    {isLast ? <HandCheck /> : '–'}
                  </span>
                  <span className="signal-text">{principle}</span>
                </li>
              )
            })}
          </ul>

          <span className="signal-signoff">&mdash; meet</span>
        </div>
      </div>
    </section>
  )
}
