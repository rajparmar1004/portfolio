import { useEffect } from 'react'
import { Icon, UiIcon } from './Icons.jsx'
import { caseStudies } from '../data/caseStudies.js'

export default function Blade({ node, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!node) return null

  return (
    <>
      <div className="blade-backdrop" onClick={onClose} />
      <aside className="blade" role="dialog" aria-label={node.name}>
        <header className="blade-header">
          <span className={`node-icon icon-${node.icon}`}>
            <Icon name={node.icon} size={28} />
          </span>
          <div className="blade-title">
            <h2>{node.name}</h2>
            <p>{node.type}</p>
          </div>
          <button className="blade-close" onClick={onClose} aria-label="Close panel">
            <UiIcon name="close" size={18} />
          </button>
        </header>

        <div className="blade-meta">
          <span className={`status status-${node.status}`}>
            <span className="status-dot" />
            {node.statusLabel}
          </span>
          {node.dates && (
            <span className="meta-item">
              <UiIcon name="calendar" size={14} />
              {node.dates}
            </span>
          )}
          {node.location && (
            <span className="meta-item">
              <UiIcon name="pin" size={14} />
              {node.location}
            </span>
          )}
        </div>

        {node.bullets?.length > 0 && (
          <div className="blade-section">
            <h3>Overview</h3>
            <ul className="blade-bullets">
              {node.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {node.skills?.length > 0 && (
          <div className="blade-section">
            <h3>Services in this group</h3>
            <div className="chips">
              {node.skills.map((s) => (
                <span className="chip" key={s}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {node.tags?.length > 0 && (
          <div className="blade-section">
            <h3>Tags</h3>
            <div className="chips">
              {node.tags.map((t) => (
                <span className="chip chip-tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        )}

        <div className="blade-actions">
          {caseStudies[node.id] && (
            <a className="btn btn-primary" href={`#/docs/${node.id}`}>
              View full documentation
            </a>
          )}
          {node.link && (
            <a
              className={caseStudies[node.id] ? 'btn' : 'btn btn-primary'}
              href={node.link.url}
              target="_blank"
              rel="noreferrer"
            >
              <UiIcon name="external" size={15} />
              {node.link.label}
            </a>
          )}
        </div>
      </aside>
    </>
  )
}
