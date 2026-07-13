const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const ICONS = {
  cloud: (
    <g {...stroke}>
      <path d="M7 17a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 7.6 4.3 4.3 0 0 1 17.5 17H7z" />
      <path d="M9 20.5h.01M12 20.5h.01M15 20.5h.01" strokeWidth="2.2" />
    </g>
  ),
  people: (
    <g {...stroke}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.7-3 2.9-4.5 5.5-4.5s4.8 1.5 5.5 4.5" />
      <circle cx="17" cy="9.5" r="2.2" />
      <path d="M16.4 14.6c2.3.2 3.7 1.6 4.2 3.9" />
    </g>
  ),
  gear: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4L18 18M18 6l-1.6 1.6M7.6 16.4L6 18" />
    </g>
  ),
  graph: (
    <g {...stroke}>
      <circle cx="6" cy="18" r="2.6" />
      <circle cx="18" cy="6" r="2.6" />
      <circle cx="18.5" cy="17.5" r="2" />
      <path d="M8 16.2 16 7.8M8.6 17.8l7.9-.2" />
    </g>
  ),
  app: (
    <g {...stroke}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M4 9h16M8 6.5h.01M11 6.5h.01" strokeWidth="2" />
      <path d="M8 13l2 2-2 2M12.5 17H16" />
    </g>
  ),
  edu: (
    <g {...stroke}>
      <path d="M12 4.5 21 9l-9 4.5L3 9l9-4.5z" />
      <path d="M6.5 11v4.2c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8V11" />
      <path d="M21 9v5" />
    </g>
  ),
  cert: (
    <g {...stroke}>
      <circle cx="12" cy="10" r="5" />
      <path d="m9.5 14.5-1.7 5 4.2-2.2 4.2 2.2-1.7-5" />
      <path d="m10.2 10 1.3 1.3 2.5-2.6" />
    </g>
  ),
  code: (
    <g {...stroke}>
      <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13 5.5l-2 13" />
    </g>
  ),
  net: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c-2.6 2.3-3.9 5.1-3.9 8.5s1.3 6.2 3.9 8.5c2.6-2.3 3.9-5.1 3.9-8.5S14.6 5.8 12 3.5z" />
    </g>
  ),
  shield: (
    <g {...stroke}>
      <path d="M12 3.5 19 6v5.5c0 4.4-2.9 7.6-7 9-4.1-1.4-7-4.6-7-9V6l7-2.5z" />
      <path d="m9 11.8 2.1 2.1 3.9-4.1" />
    </g>
  ),
  monitor: (
    <g {...stroke}>
      <rect x="3.5" y="4.5" width="17" height="12" rx="2" />
      <path d="M6.5 13.5 9.5 10l2.5 2.5 4-5" />
      <path d="M9 20h6M12 16.5V20" />
    </g>
  ),
  db: (
    <g {...stroke}>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6" />
      <path d="M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
    </g>
  ),
}

export function Icon({ name, size = 24, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      {ICONS[name] || ICONS.cloud}
    </svg>
  )
}

export function UiIcon({ name, size = 16 }) {
  const paths = {
    github: (
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.7-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.7 0 3.84-2.34 4.68-4.57 4.93.36.3.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
      />
    ),
    linkedin: (
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM1.2 8.4h3.6V23H1.2V8.4zm6.4 0h3.45v2h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.4 4.3 5.5V23h-3.6v-7.6c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.9 1.95-2.9 3.97V23H7.6V8.4z"
      />
    ),
    mail: (
      <g {...stroke}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 7 8.5 6 8.5-6" />
      </g>
    ),
    phone: (
      <path
        {...stroke}
        d="M7.5 3.5h2.6l1.4 4-2 1.5a12.5 12.5 0 0 0 5.5 5.5l1.5-2 4 1.4v2.6c0 1.1-.9 2.1-2 2A16.5 16.5 0 0 1 5.4 5.5c-.1-1.1.9-2 2.1-2z"
      />
    ),
    download: <g {...stroke}><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15" /></g>,
    external: <g {...stroke}><path d="M14 4h6v6M20 4l-9 9M19 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5.5" /></g>,
    close: <g {...stroke}><path d="M6 6l12 12M18 6L6 18" /></g>,
    pin: <g {...stroke}><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></g>,
    calendar: <g {...stroke}><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 10h16M8 3v4M16 3v4" /></g>,
    check: <g {...stroke}><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.7 2.7L16.5 9" /></g>,
    search: <g {...stroke}><circle cx="11" cy="11" r="6.5" /><path d="m15.8 15.8 4.7 4.7" /></g>,
    sun: <g {...stroke}><circle cx="12" cy="12" r="4.2" /><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7" /></g>,
    moon: <g {...stroke}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" /></g>,
    shell: <g {...stroke}><path d="m5 7 5 5-5 5M12.5 17H19" /></g>,
    copy: <g {...stroke}><rect x="8.5" y="8.5" width="12" height="12" rx="2" /><path d="M15.5 5.5v-1a1 1 0 0 0-1-1h-10a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1" /></g>,
    braces: <g {...stroke}><path d="M9 4.5c-2 0-2.5 1-2.5 2.5v2.5c0 1.5-.7 2.5-2 2.5 1.3 0 2 1 2 2.5V17c0 1.5.5 2.5 2.5 2.5M15 4.5c2 0 2.5 1 2.5 2.5v2.5c0 1.5.7 2.5 2 2.5-1.3 0-2 1-2 2.5V17c0 1.5-.5 2.5-2.5 2.5" /></g>,
    info: <g {...stroke}><circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.5h.01" strokeWidth="2.2" /></g>,
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      {paths[name]}
    </svg>
  )
}
