import { useEffect, useRef, useState } from 'react'
import { profile, groups, allNodes } from '../data/resume.js'
import { UiIcon } from './Icons.jsx'

const pad = (s, n) => String(s ?? '').padEnd(n)

function run(raw) {
  const cmd = raw.trim().replace(/\s+/g, ' ')
  if (!cmd) return ''
  if (cmd === 'help')
    return [
      'Available commands:',
      '  az account show           contact & profile info',
      '  az group list             resource groups (resume sections)',
      '  az resource list          every resource on the canvas',
      '  az resource show <id>     one resource in detail (try: adsynth)',
      '  whoami                    who is this guy',
      '  clear                     clear the terminal',
      '  exit                      close Cloud Shell',
    ].join('\n')
  if (cmd === 'whoami') return `${profile.name} — ${profile.title} (${profile.location})`
  if (cmd === 'az account show')
    return JSON.stringify(
      {
        name: profile.name,
        title: profile.title,
        location: profile.location,
        email: profile.email,
        phone: profile.phone,
        github: profile.github,
        linkedin: profile.linkedin,
        state: 'Enabled',
      },
      null,
      2,
    )
  if (cmd === 'az group list')
    return groups.map((g) => `${pad(g.name, 26)}${g.caption}`).join('\n')
  if (cmd === 'az resource list') {
    const lines = [
      `${pad('ID', 16)}${pad('NAME', 26)}${pad('GROUP', 24)}STATUS`,
      '-'.repeat(76),
    ]
    for (const g of groups)
      for (const n of g.nodes)
        lines.push(`${pad(n.id, 16)}${pad(n.name, 26)}${pad(g.name, 24)}${n.statusLabel}`)
    return lines.join('\n')
  }
  const show = cmd.match(/^az resource show (\S+)$/)
  if (show) {
    const n = allNodes.find((x) => x.id === show[1])
    if (!n) return `ERROR: resource '${show[1]}' not found. Run 'az resource list' for ids.`
    return JSON.stringify(
      {
        id: n.id,
        name: n.name,
        type: n.type,
        status: n.statusLabel,
        dates: n.dates,
        location: n.location,
        highlights: n.bullets?.length ? n.bullets : undefined,
        services: n.skills,
        tags: n.tags?.length ? n.tags : undefined,
      },
      null,
      2,
    )
  }
  if (cmd.startsWith('az ')) return "ERROR: unrecognized az command. Type 'help'."
  return `zsh: command not found: ${cmd.split(' ')[0]} — type 'help'`
}

export default function Terminal({ open, onClose }) {
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight)
  }, [history, open])

  if (!open) return null

  const submit = (e) => {
    e.preventDefault()
    const cmd = input.trim()
    setInput('')
    if (cmd === 'clear') return setHistory([])
    if (cmd === 'exit') return onClose()
    setHistory((h) => [...h, { cmd, out: run(cmd) }])
  }

  return (
    <div className="terminal" role="dialog" aria-label="Cloud Shell">
      <div className="terminal-bar">
        <span className="terminal-title">
          <UiIcon name="shell" size={14} /> Cloud Shell — raj-parmar-production (bash)
        </span>
        <button className="terminal-close" onClick={onClose} aria-label="Close terminal">
          <UiIcon name="close" size={15} />
        </button>
      </div>
      <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
        <p className="terminal-line terminal-welcome">
          Welcome to Cloud Shell. Type 'help' to get started.
        </p>
        {history.map((h, i) => (
          <div key={i}>
            <p className="terminal-line">
              <span className="terminal-prompt">raj@azure:~$</span> {h.cmd}
            </p>
            {h.out && <pre className="terminal-out">{h.out}</pre>}
          </div>
        ))}
        <form className="terminal-line terminal-input" onSubmit={submit}>
          <span className="terminal-prompt">raj@azure:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
            spellCheck="false"
            autoComplete="off"
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  )
}
