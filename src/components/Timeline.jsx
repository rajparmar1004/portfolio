import { timeline } from '../data/resume.js'

const TYPE_LABELS = {
  work: 'Work',
  education: 'Education',
  research: 'Research',
  project: 'Project',
}

export default function Timeline() {
  const { start, end, rows } = timeline
  const now = new Date().getFullYear() + new Date().getMonth() / 12
  const span = end - start
  const pct = (v) => `${(Math.min(Math.max(v, start), end) - start) / span * 100}%`

  const years = []
  for (let y = Math.ceil(start); y <= Math.floor(end); y++) years.push(y)

  return (
    <section className="tl" aria-label="Career timeline">
      <header className="tl-header">
        <h2>Availability</h2>
        <span className="tl-sub">career uptime, {Math.ceil(start)} – present</span>
        <div className="tl-legend">
          {Object.entries(TYPE_LABELS).map(([type, label]) => (
            <span key={type} className="tl-legend-item">
              <span className={`tl-swatch tl-${type}`} />
              {label}
            </span>
          ))}
        </div>
      </header>

      <div className="tl-chart">
        <div className="tl-axis">
          {years.map((y) => (
            <span key={y} className="tl-year" style={{ left: pct(y) }}>
              {y}
            </span>
          ))}
          <span className="tl-now" style={{ left: pct(now) }}>
            <em>today</em>
          </span>
        </div>

        {rows.map((row) => {
          const clipped = row.start < start
          const ongoing = row.end == null
          const to = ongoing ? now : row.end
          return (
            <div className="tl-row" key={row.label}>
              <span className="tl-label">{row.label}</span>
              <div className="tl-track">
                {years.map((y) => (
                  <span key={y} className="tl-gridline" style={{ left: pct(y) }} />
                ))}
                <span className="tl-nowline" style={{ left: pct(now) }} />
                <span
                  className={[
                    'tl-bar',
                    `tl-${row.type}`,
                    clipped ? 'tl-clipped' : '',
                    ongoing ? 'tl-ongoing' : '',
                  ].join(' ')}
                  style={{
                    left: pct(row.start),
                    width: `calc(${pct(to)} - ${pct(row.start)})`,
                  }}
                  title={`${row.label} · ${row.dates}`}
                />
              </div>
              <span className="tl-dates">{row.dates}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
