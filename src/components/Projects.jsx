import { useRef, useState } from 'react'
import { useReveal } from '../utils/useReveal'
import Magnetic from './Magnetic'
import '../styles/section-work.css'

const PROJECTS = [
  {
    id: 'kanban',
    tabLabel: 'AI Kanban Board',
    caseNo: '01',
    role: 'Backend Developer',
    stamp: 'IN PROGRESS',
    stampColor: 'coral',
    title: 'AI Kanban Board',
    tagline: 'Real-time, AI-powered project management.',
    description:
      'Developing backend REST APIs for a full-stack, real-time AI-powered Kanban board. Google Gemini turns a one-line goal into a prioritized backlog, breaks large tasks into subtasks, and writes sprint summaries. Socket.IO drives live drag-and-drop sync, presence, and instant board updates across every connected client.',
    tags: ['PostgreSQL', 'Express', 'React', 'Node.js', 'Socket.IO', 'Gemini AI'],
    link: null,
    rotate: -1.1,
  },
  {
    id: 'morph-resume',
    tabLabel: 'Morph Resume',
    caseNo: '02',
    role: 'Backend Developer',
    stamp: 'BACKEND COMPLETE',
    stampColor: 'teal',
    title: 'Morph Resume',
    tagline: 'ATS score & optimization platform.',
    description:
      'Backend REST APIs handling resume upload, parsing, ATS scoring, and version history. Google Gemini 2.5 Flash analyzes parsed resume content to generate an ATS compatibility score, and a suggestion engine detects generic wording and recommends stronger, industry-relevant phrasing.',
    tags: ['MERN', 'Gemini 2.5 Flash', 'Tailwind CSS', 'shadcn/ui'],
    link: 'https://github.com/Meet-ops/Morph-Resume',
    rotate: 0.9,
  },
  {
    id: 'stayzy',
    tabLabel: 'StayZy',
    caseNo: '03',
    role: 'Full-Stack Developer (frontend & backend)',
    stamp: 'FULL-STACK',
    stampColor: 'grape',
    title: 'StayZy',
    tagline: 'Full-stack accommodation platform.',
    description:
      'A full-stack rental listing platform built end to end — EJS templating on the frontend, Node/Express/MongoDB on the backend — with full CRUD, JWT-based auth, and protected routes. Cloudinary handles image storage, Mapbox GL JS powers interactive location maps, and every listing has a review and rating system.',
    tags: ['MongoDB', 'Express.js', 'Node.js', 'EJS', 'Cloudinary', 'Mapbox GL JS'],
    link: 'https://github.com/Meet-ops/StayZy',
    rotate: -0.7,
  },
]

export default function Projects() {
  const rootRef = useRef(null)
  const [active, setActive] = useState(0)
  useReveal(rootRef)

  const current = PROJECTS[active]

  return (
    <section className="section-block case-section" id="work" ref={rootRef}>
      <div className="section-inner">
        <div className="case-heading" data-reveal>
          <h2 className="case-heading-title">Case files</h2>
          <p className="case-heading-lede">
            Three real builds. Click through the files below.
          </p>
        </div>

        <div className="case-drawer">
          <div className="case-tabs" role="tablist" aria-label="Project case files" data-reveal-group>
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`case-tab-${p.id}`}
                aria-selected={i === active}
                aria-controls={`case-panel-${p.id}`}
                className={`case-tab case-tab--${p.stampColor} ${
                  i === active ? 'is-active' : ''
                }`}
                onClick={() => setActive(i)}
                data-reveal
              >
                {p.tabLabel}
              </button>
            ))}
          </div>

          <div className="case-stackwrap">
            <span className="case-stack case-stack--1" aria-hidden="true" />
            <span className="case-stack case-stack--2" aria-hidden="true" />

            <div
              className="case-panel"
              key={current.id}
              id={`case-panel-${current.id}`}
              role="tabpanel"
              aria-labelledby={`case-tab-${current.id}`}
              tabIndex={0}
              style={{ '--rot': `${current.rotate}deg` }}
            >
              <span className="case-panel-caseno">
                Case No. {current.caseNo} &mdash; {current.role}
              </span>

              <h3 className="case-panel-title">{current.title}</h3>

              <span className={`case-stamp case-stamp--${current.stampColor}`}>
                {current.stamp}
              </span>

              <p className="case-panel-tagline">{current.tagline}</p>
              <p className="case-panel-desc">{current.description}</p>

              <ul className="case-tags">
                {current.tags.map((tag) => (
                  <li key={tag} className="case-tag">
                    {tag}
                  </li>
                ))}
              </ul>

              {current.link ? (
                <Magnetic
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-link"
                >
                  View the repo <span aria-hidden="true">&rarr;</span>
                </Magnetic>
              ) : (
                <p className="case-note">Case still open &mdash; repo coming soon.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
