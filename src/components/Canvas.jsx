import { useEffect, useRef, useState } from 'react'
import { groups, edges } from '../data/resume.js'
import { Icon } from './Icons.jsx'

function ResourceNode({ node, selected, dimmed, onSelect }) {
  return (
    <button
      className={`node ${selected ? 'is-selected' : ''} ${dimmed ? 'is-dimmed' : ''}`}
      data-node-id={node.id}
      onClick={() => onSelect(node)}
      aria-label={`${node.name} — ${node.type}`}
    >
      <span className={`node-icon icon-${node.icon}`}>
        <Icon name={node.icon} size={26} />
      </span>
      <span className="node-text">
        <span className="node-name">{node.name}</span>
        <span className="node-type">{node.type}</span>
      </span>
      <span className={`status status-${node.status}`} title={node.statusLabel}>
        <span className="status-dot" />
        {node.statusLabel}
      </span>
    </button>
  )
}

function ConnectorLayer({ canvasRef, selectedId }) {
  const [lines, setLines] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const compute = () => {
      const canvasBox = canvas.getBoundingClientRect()
      const next = []
      for (const [from, to] of edges) {
        const a = canvas.querySelector(`[data-node-id="${from}"]`)
        const b = canvas.querySelector(`[data-node-id="${to}"]`)
        if (!a || !b) continue
        const ra = a.getBoundingClientRect()
        const rb = b.getBoundingClientRect()
        const x1 = ra.left + ra.width / 2 - canvasBox.left
        const y1 = ra.top + ra.height - canvasBox.top
        const x2 = rb.left + rb.width / 2 - canvasBox.left
        const y2 = rb.top - canvasBox.top
        const bend = Math.max(30, (y2 - y1) / 2)
        next.push({
          from,
          to,
          d: `M ${x1} ${y1} C ${x1} ${y1 + bend}, ${x2} ${y2 - bend}, ${x2} ${y2}`,
        })
      }
      setLines(next)
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(canvas)
    window.addEventListener('resize', compute)
    // Recompute once fonts settle
    const t = setTimeout(compute, 400)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
      clearTimeout(t)
    }
  }, [canvasRef])

  return (
    <svg className="connectors" aria-hidden="true">
      {lines.map((l) => {
        const active = selectedId && (l.from === selectedId || l.to === selectedId)
        return (
          <g key={`${l.from}-${l.to}`} className={active ? 'edge is-active' : 'edge'}>
            <path className="edge-line" d={l.d} />
            <path className="edge-flow" d={l.d} />
          </g>
        )
      })}
    </svg>
  )
}

export default function Canvas({ selectedNode, onSelect, onExport }) {
  const canvasRef = useRef(null)
  const selectedId = selectedNode?.id

  // Nodes connected to the current selection stay lit; the rest dim slightly.
  const related = new Set()
  if (selectedId) {
    related.add(selectedId)
    for (const [a, b] of edges) {
      if (a === selectedId) related.add(b)
      if (b === selectedId) related.add(a)
    }
  }

  return (
    <div className="canvas" ref={canvasRef} id="architecture">
      <div className="canvas-label">
        <span className="canvas-label-chip">Subscription</span>
        <span className="canvas-label-name">raj-parmar-production</span>
        <span className="canvas-hint">Click any resource to open its blade</span>
        <button className="canvas-export" onClick={onExport}>
          {'{ }'} Export template
        </button>
      </div>
      <ConnectorLayer canvasRef={canvasRef} selectedId={selectedId} />
      {groups.map((group) => (
        <section key={group.id} className="rg" style={{ gridArea: group.area }}>
          <header className="rg-header">
            <span className="rg-bracket">[ ]</span>
            <span className="rg-name">{group.name}</span>
            <span className="rg-caption">{group.caption}</span>
          </header>
          <div className={`rg-body rg-${group.area}`}>
            {group.nodes.map((node) => (
              <ResourceNode
                key={node.id}
                node={node}
                selected={node.id === selectedId}
                dimmed={selectedId ? !related.has(node.id) : false}
                onSelect={onSelect}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
