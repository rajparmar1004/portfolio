import { useMemo, useState } from 'react'
import { profile, groups } from '../data/resume.js'
import { UiIcon } from './Icons.jsx'

function buildTemplate() {
  return {
    $schema: 'https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#',
    contentVersion: '1.0.0.0',
    metadata: {
      generator: 'raj-parmar-portfolio',
      description: `${profile.name} — ${profile.title}`,
      contact: { email: profile.email, github: profile.github, linkedin: profile.linkedin },
    },
    parameters: {
      opportunity: {
        type: 'string',
        metadata: { description: 'The role you would like to deploy Raj into' },
      },
    },
    resources: groups.flatMap((g) =>
      g.nodes.map((n) => ({
        type: `RajParmar.Career/${g.name.replace('rg-', '')}`,
        apiVersion: '2026-07-01',
        name: n.id,
        location: n.location || profile.location,
        properties: {
          displayName: n.name,
          role: n.type,
          status: n.statusLabel,
          dates: n.dates,
          highlights: n.bullets?.length ? n.bullets : undefined,
          services: n.skills,
        },
        tags: n.tags?.length ? n.tags : undefined,
      })),
    ),
    outputs: {
      hireDecision: {
        type: 'string',
        value: "[if(equals(parameters('opportunity'), ''), 'reach out anyway', 'yes')]",
      },
    },
  }
}

// Minimal JSON syntax highlighter. Escapes HTML first; resume content
// contains no double quotes, so the string regexes stay simple.
function highlight(json) {
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"([^"]*)":/g, '<span class="j-key">"$1"</span>:')
    .replace(/: "([^"]*)"/g, ': <span class="j-str">"$1"</span>')
    .replace(/(^|[[,]\s*)"([^"]*)"/gm, '$1<span class="j-str">"$2"</span>')
    .replace(/: (\d[\d.]*)/g, ': <span class="j-num">$1</span>')
}

export default function ExportTemplate({ open, onClose }) {
  const [copied, setCopied] = useState(false)
  const json = useMemo(() => JSON.stringify(buildTemplate(), null, 2), [])

  if (!open) return null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="export" role="dialog" aria-label="Export template">
        <header className="export-header">
          <span className="export-title">
            <UiIcon name="braces" size={16} /> Export template — raj-parmar-production
          </span>
          <div className="export-actions">
            <button className="btn btn-sm" onClick={copy}>
              <UiIcon name="copy" size={14} />
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
            <button className="terminal-close" onClick={onClose} aria-label="Close">
              <UiIcon name="close" size={15} />
            </button>
          </div>
        </header>
        <p className="export-note">
          Deployment template for one (1) cloud infra & security engineer. Fully reproducible.
        </p>
        <pre className="export-code" dangerouslySetInnerHTML={{ __html: highlight(json) }} />
      </div>
    </>
  )
}
