import { useEffect, useRef, useState } from 'react'
import { groups } from '../data/resume.js'
import { Icon, UiIcon } from './Icons.jsx'

const INDEX = groups.flatMap((g) =>
  g.nodes.map((node) => ({
    node,
    group: g.caption,
    hay: [node.name, node.type, ...(node.tags || []), ...(node.skills || []), g.caption]
      .join(' ')
      .toLowerCase(),
  })),
)

export default function CommandPalette({ open, onClose, onPick }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      // Focus after the modal renders
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  if (!open) return null

  const q = query.trim().toLowerCase()
  const results = q ? INDEX.filter((e) => e.hay.includes(q)) : INDEX

  const pick = (entry) => {
    if (!entry) return
    onPick(entry.node)
    onClose()
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    }
    if (e.key === 'Enter') pick(results[active])
  }

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="palette" role="dialog" aria-label="Search resources">
        <div className="palette-input">
          <UiIcon name="search" size={17} />
          <input
            ref={inputRef}
            value={query}
            placeholder="Search roles, projects, skills, certs…"
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={onKeyDown}
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette-results" ref={listRef}>
          {results.length === 0 && <li className="palette-empty">No resources match “{query}”</li>}
          {results.map((entry, i) => (
            <li key={entry.node.id}>
              <button
                className={i === active ? 'palette-item is-active' : 'palette-item'}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(entry)}
              >
                <span className={`node-icon icon-${entry.node.icon}`}>
                  <Icon name={entry.node.icon} size={18} />
                </span>
                <span className="palette-text">
                  <span className="palette-name">{entry.node.name}</span>
                  <span className="palette-type">{entry.node.type}</span>
                </span>
                <span className="palette-group">{entry.group}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
