import { useRef } from 'react'
import { useReveal } from '../utils/useReveal'
import '../styles/section-timeline.css'

const ENTRIES = [
  {
    hash: '9f3a1c7',
    title: 'AI Kanban Board',
    org: null,
    role: 'Backend Developer',
    dates: '2026 – Present',
    status: 'in progress',
    desc: 'Real-time PERN project-management platform with Gemini-powered backlog generation and Socket.IO live sync, currently in progress.',
    tags: ['PostgreSQL', 'Express', 'Socket.IO', 'Gemini AI'],
    current: true,
  },
  {
    hash: 'c48e2d0',
    title: 'Silver Oak University',
    org: null,
    role: 'B.Tech, Information Technology',
    dates: '2023 – 2027',
    status: 'in progress',
    desc: 'CGPA 9.34/10, consistently ranked among the top performers in the IT department.',
    tags: ['ACADEMIC'],
    current: false,
  },
  {
    hash: '5b7f0a4',
    title: 'Sigma 4.0 Program',
    org: 'Apna College',
    role: 'Full-Stack + DSA Intensive',
    dates: 'Completed',
    status: 'completed',
    desc: 'Intensive program strengthening problem-solving and production engineering fundamentals alongside full-stack skills.',
    tags: [],
    current: false,
  },
  {
    hash: 'e21d9f6',
    title: 'Full-Stack Development',
    org: 'Udemy',
    role: 'Coursework',
    dates: 'Completed',
    status: 'completed',
    desc: 'Covered frontend, backend, databases, and deployment; applied directly to StayZy and Morph Resume.',
    tags: [],
    current: false,
  },
]

export default function Timeline() {
  const rootRef = useRef(null)
  useReveal(rootRef)

  return (
    <section className="section-block log-section" id="timeline" ref={rootRef}>
      <div className="section-inner">
        <div className="log-terminal" data-reveal>
          <div className="log-terminal-bar">
            <span className="log-terminal-dot log-terminal-dot--coral" aria-hidden="true" />
            <span className="log-terminal-dot log-terminal-dot--sun" aria-hidden="true" />
            <span className="log-terminal-dot log-terminal-dot--teal" aria-hidden="true" />
            <span className="log-terminal-path">meet@barvaliya:~/build-log</span>
          </div>
          <div className="log-terminal-body">
            <span className="log-terminal-prompt-sign">$</span> git log --reverse --stat
            <span className="log-terminal-cursor" aria-hidden="true" />
          </div>
        </div>

        <div className="log-heading" data-reveal>
          <h2 className="log-title">Build log</h2>
          <p className="log-subtitle">
            Not a job history yet — a running log of what I've actually finished.
          </p>
        </div>

        <div data-reveal-group>
          <ol className="log-list">
            {ENTRIES.map((entry) => (
              <li
                key={entry.hash}
                className={`log-entry${entry.current ? ' log-entry--current' : ''}`}
                data-reveal
              >
                <span className={`log-dot${entry.current ? ' log-dot--current' : ''}`} aria-hidden="true">
                  {entry.current && <span className="log-dot-pulse" aria-hidden="true" />}
                </span>

                <div className="log-card">
                  <div className="log-card-top">
                    <span className="log-hash">{entry.hash}</span>
                    {entry.current && <span className="log-head-badge">HEAD →</span>}
                    <span className={`log-status log-status--${entry.status.replace(/\s+/g, '-')}`}>
                      {entry.status}
                    </span>
                  </div>

                  <h3 className="log-message">
                    {entry.title}
                    {entry.org && <span className="log-message-org"> — {entry.org}</span>}
                  </h3>

                  <p className="log-meta">
                    {entry.dates} <span className="log-meta-sep">·</span> {entry.role}
                  </p>

                  <p className="log-desc">{entry.desc}</p>

                  {entry.tags.length > 0 && (
                    <ul className="log-tags">
                      {entry.tags.map((tag) => (
                        <li key={tag} className="log-tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
