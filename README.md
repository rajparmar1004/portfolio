# Raj Parmar — Interactive Portfolio

A portfolio website styled as an **Azure cloud architecture diagram**: career items are
cloud resources grouped into resource groups, connected by animated links. Clicking a
resource opens an Azure-portal-style "blade" with the details.

Features:

- **Light theme** modeled on Microsoft docs architecture diagrams, with a dark
  (graphite) toggle in the top bar — persisted, defaults to system preference
- **Command palette** — `Cmd/Ctrl+K` or the top-bar search: fuzzy-search every role,
  project, skill, and cert, and jump to its blade
- **Export template** — renders the whole career as a syntax-highlighted ARM template
- **Availability timeline** — Gantt-style career uptime chart (data in `timeline`)
- **Cloud Shell** — press `` ` `` for a fake az CLI (`az resource list`, `help`, …)
- **Case-study pages** — Microsoft-Learn-style write-ups at `#/docs/<id>`, reached
  via "View full documentation" in a blade; content in `src/data/caseStudies.js`
- **Deep links** — `#/resource/<id>` opens a blade directly (shareable URLs, back
  button works); hash-based routing, so no server config needed

## Run locally

```bash
npm install
npm run dev
```

## Edit content

All resume content lives in one file: [`src/data/resume.js`](src/data/resume.js).
Update `profile`, `metrics`, `groups` (the resources), and `edges` (the connector
lines between resources) — no component changes needed.

The downloadable résumé is `public/Raj-Parmar-Resume.pdf`; replace that file to update it.

## Deploy

Live at **https://black-ground-0b13af510.7.azurestaticapps.net** — an Azure Static
Web App (`raj-parmar-portfolio`, resource group `rg-portfolio`, Free tier).

Pushing to `main` auto-deploys via GitHub Actions
([.github/workflows/deploy.yml](.github/workflows/deploy.yml)); the deployment token
lives in the `AZURE_STATIC_WEB_APPS_API_TOKEN` repo secret.

Manual deploy also works:

```bash
npm run deploy   # builds and deploys to production (requires `az login`)
```

The deploy script fetches the deployment token from Azure on the fly, so no secrets
are stored in the repo. `public/staticwebapp.config.json` provides the SPA fallback.

Analytics: Azure Application Insights (`appi-portfolio` in `rg-portfolio`) via the
snippet in `index.html` — page views and SPA route changes, no cookies.

To add a custom domain: Azure portal → Static Web App → Custom domains (free,
includes managed TLS).
