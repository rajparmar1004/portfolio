import { useEffect, useMemo, useState } from 'react'
import { profile, metrics, allNodes } from './data/resume.js'
import Canvas from './components/Canvas.jsx'
import Blade from './components/Blade.jsx'
import DocsPage from './components/DocsPage.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import Terminal from './components/Terminal.jsx'
import ExportTemplate from './components/ExportTemplate.jsx'
import Timeline from './components/Timeline.jsx'
import { UiIcon } from './components/Icons.jsx'

const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)

function TopBar({ onSearch, onTerminal, theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <span className="topbar-logo" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <circle cx="7" cy="17" r="3.2" fill="currentColor" opacity="0.9" />
            <circle cx="17" cy="7" r="3.2" fill="currentColor" />
            <path d="M9.5 14.5 14.5 9.5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </span>
        <span className="topbar-path">
          <span className="topbar-home">portal</span>
          <span className="topbar-sep">›</span>
          <span className="topbar-sub">raj-parmar-production</span>
        </span>
      </div>

      <button className="topbar-search" onClick={onSearch}>
        <UiIcon name="search" size={15} />
        <span className="topbar-search-text">Search resources…</span>
        <kbd>{isMac ? '⌘' : 'Ctrl+'}K</kbd>
      </button>

      <nav className="topbar-links">
        <button onClick={onTerminal} title="Cloud Shell ( ` )" aria-label="Open Cloud Shell">
          <UiIcon name="shell" />
        </button>
        <button
          onClick={onToggleTheme}
          title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          aria-label="Toggle theme"
        >
          <UiIcon name={theme === 'light' ? 'moon' : 'sun'} />
        </button>
        <a href={`mailto:${profile.email}`} title={profile.email} aria-label="Email">
          <UiIcon name="mail" />
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub">
          <UiIcon name="github" />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn">
          <UiIcon name="linkedin" />
        </a>
        <a className="btn btn-topbar" href={profile.resumeFile} download="Raj-Parmar-Resume.pdf">
          <UiIcon name="download" size={14} />
          Résumé
        </a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <p className="hero-kicker">Cloud Infra · Security · SRE</p>
      <h1>{profile.name}</h1>
      <p className="hero-title">{profile.title}</p>
      <p className="hero-summary">{profile.summary}</p>
      <div className="hero-meta">
        <span className="meta-item"><UiIcon name="pin" size={14} />{profile.location}</span>
        <a className="meta-item" href={`mailto:${profile.email}`}><UiIcon name="mail" size={14} />{profile.email}</a>
        <a className="meta-item" href={`tel:${profile.phone.replace(/\s/g, '')}`}><UiIcon name="phone" size={14} />{profile.phone}</a>
      </div>
    </section>
  )
}

function MetricsBar() {
  return (
    <section className="metrics" aria-label="Career metrics">
      {metrics.map((m) => (
        <div className="metric" key={m.label}>
          <span className="metric-value">{m.value}</span>
          <span className="metric-label">{m.label}</span>
        </div>
      ))}
    </section>
  )
}

function InfoBanner() {
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem('infoBannerDismissed') === '1',
  )
  if (dismissed) return null
  const dismiss = () => {
    localStorage.setItem('infoBannerDismissed', '1')
    setDismissed(true)
  }
  return (
    <div className="info-banner" role="note">
      <span className="info-banner-icon"><UiIcon name="info" size={17} /></span>
      <p>
        <strong>First time here?</strong> This site is designed to look like Microsoft Azure —
        the cloud platform I work in every day. The diagram below is my career drawn the way
        engineers draw cloud systems: every box is a job, project, or skill.{' '}
        <strong>Click any box</strong> to open its details.
      </p>
      <button className="info-banner-dismiss" onClick={dismiss}>Got it</button>
    </div>
  )
}

let toastShown = false

function DeployToast() {
  const [phase, setPhase] = useState('hidden')
  useEffect(() => {
    if (toastShown) return
    toastShown = true
    const show = setTimeout(() => setPhase('visible'), 900)
    const hide = setTimeout(() => setPhase('hidden'), 6000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])
  return (
    <div className={`toast ${phase === 'visible' ? 'is-visible' : ''}`} role="status">
      <span className="toast-icon"><UiIcon name="check" size={18} /></span>
      <div>
        <strong>Deployment succeeded</strong>
        <p>raj-parmar-portfolio · all resources healthy</p>
      </div>
    </div>
  )
}

// Hash routes: '#/' main page, '#/resource/<id>' main page with that blade
// open, '#/docs/<id>' case-study page. Hash-based so it deploys anywhere
// static with no server config.
function parseHash() {
  const [page = '', id = ''] = location.hash.replace(/^#\/?/, '').split('/')
  return { page, id }
}

export default function App() {
  const [route, setRoute] = useState(parseHash)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  // Light is the default; dark only when the visitor explicitly toggled it.
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const selected = useMemo(
    () => (route.page === 'resource' ? allNodes.find((n) => n.id === route.id) ?? null : null),
    [route],
  )
  const openNode = (node) => {
    location.hash = `/resource/${node.id}`
  }
  const closeBlade = () => {
    location.hash = '/'
  }

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((v) => !v)
        return
      }
      const typing = /^(input|textarea|select)$/i.test(e.target.tagName)
      if (e.key === '`' && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setTerminalOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="page">
      <TopBar
        onSearch={() => setPaletteOpen(true)}
        onTerminal={() => setTerminalOpen((v) => !v)}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      />
      <main>
        {route.page === 'docs' ? (
          <DocsPage id={route.id} />
        ) : (
          <>
            <Hero />
            <MetricsBar />
            <InfoBanner />
            <Canvas
              selectedNode={selected}
              onSelect={openNode}
              onExport={() => setExportOpen(true)}
            />
            <Timeline />
          </>
        )}
      </main>
      <footer className="footer">
        <p>
          Designed as a cloud architecture diagram — because that's what I build.{' '}
          <a href={profile.github} target="_blank" rel="noreferrer">github.com/rajparmar1004</a>
        </p>
        <p className="footer-hints">
          <kbd>{isMac ? '⌘' : 'Ctrl+'}K</kbd> search · <kbd>`</kbd> Cloud Shell
        </p>
      </footer>
      <Blade node={selected} onClose={closeBlade} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onPick={openNode} />
      <ExportTemplate open={exportOpen} onClose={() => setExportOpen(false)} />
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <DeployToast />
    </div>
  )
}
