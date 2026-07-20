import { useRef, useState } from 'react'
import { useReveal } from '../utils/useReveal'
import '../styles/section-toolbench.css'

const DRAWERS = [
  {
    label: 'Languages',
    accent: 'coral',
    tools: ['JavaScript', 'HTML5', 'CSS3'],
  },
  {
    label: 'Frontend',
    accent: 'teal',
    tools: ['React.js', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    label: 'Backend',
    accent: 'grape',
    tools: ['Node.js', 'Express.js', 'REST APIs', 'Socket.IO', 'Gemini API'],
  },
  {
    label: 'Databases',
    accent: 'sun',
    tools: ['MongoDB', 'Mongoose', 'PostgreSQL'],
  },
  {
    label: 'Tools',
    accent: 'coral',
    tools: ['Git', 'GitHub', 'Postman', 'VS Code', 'npm'],
  },
  {
    label: 'Core CS / DSA',
    accent: 'teal',
    tools: ['Arrays', 'Linked Lists', 'Recursion', 'Searching', 'Sorting'],
  },
]

export default function Toolbench() {
  const rootRef = useRef(null)
  useReveal(rootRef)
  const [open, setOpen] = useState(() => new Set())

  function toggle(i) {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <section className="section-block bench-section" id="skills" ref={rootRef}>
      <div className="section-inner">
        <header className="bench-head" data-reveal>
          <p className="bench-kicker">Open a drawer.</p>
          <h2 className="bench-title">The toolbench</h2>
          <p className="bench-lede">
            Six drawers, sorted by what they're for. Click one to see what's
            actually inside.
          </p>
        </header>

        <div className="bench-grid" data-reveal-group>
          {DRAWERS.map((drawer, i) => {
            const isOpen = open.has(i)
            return (
              <div
                key={drawer.label}
                className={`bench-drawer bench-drawer--${drawer.accent}${
                  isOpen ? ' is-open' : ''
                }`}
                data-reveal
              >
                <button
                  type="button"
                  className="bench-drawer-face"
                  aria-expanded={isOpen}
                  aria-controls={`bench-panel-${i}`}
                  onClick={() => toggle(i)}
                >
                  <span className="bench-drawer-handle" aria-hidden="true" />
                  <span className="bench-drawer-top">
                    <span className="bench-drawer-label">{drawer.label}</span>
                    <span className="bench-drawer-count">
                      {drawer.tools.length} tools
                    </span>
                  </span>
                  <span className="bench-drawer-toggle" aria-hidden="true">
                    <span className="bench-drawer-toggle-bar bench-drawer-toggle-bar--v" />
                    <span className="bench-drawer-toggle-bar" />
                  </span>
                </button>

                <div
                  className="bench-drawer-panel"
                  id={`bench-panel-${i}`}
                  role="region"
                >
                  <div className="bench-drawer-panel-inner">
                    <ul className="bench-chip-row">
                      {drawer.tools.map((tool) => (
                        <li className="bench-chip" key={tool}>
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
