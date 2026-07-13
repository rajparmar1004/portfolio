import { useEffect } from 'react'
import { caseStudies, caseStudyList } from '../data/caseStudies.js'
import { allNodes } from '../data/resume.js'
import { Icon, UiIcon } from './Icons.jsx'

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

function TocLink({ heading }) {
  const id = slug(heading)
  return (
    <li>
      <a
        href={`#${id}`}
        onClick={(e) => {
          e.preventDefault()
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
      >
        {heading}
      </a>
    </li>
  )
}

export default function DocsPage({ id }) {
  const study = caseStudies[id]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])

  if (!study) {
    return (
      <div className="docs">
        <div className="docs-missing">
          <h1>404 — DocumentNotFound</h1>
          <p>No case study named “{id}” exists in this subscription.</p>
          <a className="btn btn-primary" href="#/">← Back to architecture</a>
        </div>
      </div>
    )
  }

  const node = allNodes.find((n) => n.id === study.nodeId)
  const others = caseStudyList.filter((s) => s.id !== study.id)

  return (
    <div className="docs">
      <nav className="docs-crumb" aria-label="Breadcrumb">
        <a href="#/">portal</a>
        <span>›</span>
        <a href="#/">raj-parmar-production</a>
        <span>›</span>
        <span>docs</span>
        <span>›</span>
        <span className="docs-crumb-current">{study.id}</span>
      </nav>

      <div className="docs-layout">
        <article className="docs-article">
          <header className="docs-header">
            {node && (
              <span className={`node-icon icon-${node.icon} docs-icon`}>
                <Icon name={node.icon} size={30} />
              </span>
            )}
            <h1>{study.title}</h1>
            <p className="docs-subtitle">{study.subtitle}</p>
            <div className="docs-meta">
              <span className="meta-item"><Icon name="people" size={14} />{study.role}</span>
              <span className="meta-item"><UiIcon name="calendar" size={14} />{study.timeframe}</span>
            </div>
            <div className="chips docs-stack">
              {study.stack.map((s) => (
                <span className="chip" key={s}>{s}</span>
              ))}
            </div>
          </header>

          {study.flow && (
            <div className="docs-flow" aria-label="Architecture flow">
              {study.flow.map((step, i) => (
                <span key={step} className="docs-flow-item">
                  <span className="docs-flow-step">{step}</span>
                  {i < study.flow.length - 1 && <span className="docs-flow-arrow">→</span>}
                </span>
              ))}
            </div>
          )}

          {study.sections.map((sec) => (
            <section key={sec.heading} id={slug(sec.heading)} className="docs-section">
              <h2>{sec.heading}</h2>
              {sec.body?.map((p, i) => <p key={i}>{p}</p>)}
              {sec.bullets && (
                <ul>
                  {sec.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </section>
          ))}

          <footer className="docs-footer">
            <a className="btn btn-primary" href="#/">← Back to architecture</a>
            {study.links.map((l) => (
              <a key={l.url} className="btn" href={l.url} target="_blank" rel="noreferrer">
                <UiIcon name="external" size={14} />
                {l.label}
              </a>
            ))}
          </footer>

          {others.length > 0 && (
            <div className="docs-more">
              <h3>More documentation</h3>
              <div className="docs-more-links">
                {others.map((s) => (
                  <a key={s.id} className="docs-more-card" href={`#/docs/${s.id}`}>
                    <span className="docs-more-title">{s.title}</span>
                    <span className="docs-more-sub">{s.timeframe}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </article>

        <aside className="docs-toc">
          <h4>In this article</h4>
          <ul>
            {study.sections.map((sec) => (
              <TocLink key={sec.heading} heading={sec.heading} />
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
