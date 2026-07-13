// Case-study pages (#/docs/<id>). Keyed by the canvas node id they belong to.
//
// ADSynth and LiveWell are written from Raj's actual papers:
//   - "Generating Multi-Tenant Hybrid AD–Entra Identity Graphs with First-Class
//     Non-Human Principals for Attack-Path Analysis" (with Hung Nguyen)
//   - "LiveWell: An Advanced AI Architecture for a Digital Behavior Change
//     Intervention in Healthy Ageing" (COMP SCI 7092)
// Sections marked TODO(Raj) are still drafts awaiting his first-hand detail.

export const caseStudies = {
  adsynth: {
    id: 'adsynth',
    nodeId: 'adsynth',
    title: 'Generating Multi-Tenant Hybrid AD–Entra Identity Graphs for Attack-Path Analysis',
    subtitle:
      'A synthetic identity-graph generator that models the hybrid cloud/on-prem seam — with non-human identities as first-class citizens. Workshop paper co-authored with Hung Nguyen (University of Adelaide).',
    role: 'Research Software Engineer · first author',
    timeframe: '2025 – 2026 · University of Adelaide',
    stack: ['Python', 'Neo4j', 'Cypher', 'BloodHound', 'Active Directory', 'Entra ID', 'MITRE ATT&CK'],
    links: [{ label: 'View on GitHub', url: 'https://github.com/AUCyberLab/ADSynth/tree/raj-a1940811' }],
    flow: [
      'Config Θ + seeds',
      'Multi-tenant topology',
      'Principals (human + NHI)',
      'Hybrid bridge (PHS / PTA / AD FS)',
      'Permissions + misconfigs',
      'Validate → Neo4j export',
    ],
    sections: [
      {
        heading: 'Background',
        body: [
          'Attack-path analysis tools like BloodHound model an organisation’s identity infrastructure as a graph — users, groups, computers, service identities, and the permission edges between them — and use graph analytics to reveal privilege-escalation paths that are impossible to reason about manually. Research on defending these systems needs realistic graph datasets, but real corporate identity graphs are among the most sensitive data an organisation owns, so synthetic generators (ADSynth, BadBlood, adsimulator, DBCreator) fill the gap.',
          'The problem: those generators model on-premises Active Directory only. Modern enterprises are hybrid — on-prem AD synchronised with Microsoft Entra ID tenants — and the cross-boundary “seam” between them is precisely where modern attacks operate. MITRE ATT&CK tracks this as its own sub-technique (T1556.007, Hybrid Identity), and Microsoft’s reporting on the Storm-0501 campaigns describes attackers exploiting exactly these seams in enterprises where multiple AD domains sync to multiple Entra tenants.',
        ],
      },
      {
        heading: 'The gap',
        body: [
          'Two things were missing from existing generators. First, multi-tenant hybrid topology: real enterprises run multiple AD domains synchronised to multiple Entra tenants — including the messy, incident-documented case where a single domain syncs to more than one tenant. Second, non-human identities: synchronisation accounts, service principals, managed identities, and automation accounts perform the highest-privilege operations in hybrid environments and sit on the critical path of real intrusions, yet most generators model only human users and groups.',
        ],
      },
      {
        heading: 'The framework',
        body: [
          'The generator extends the ADSynth metagraph ontology with Entra entities and hybrid bridge relationships, and models all three canonical hybrid identity modes — Password Hash Synchronization, Pass-Through Authentication, and AD FS federation — as first-class configuration choices, each with its required bridge components (Entra Connect hosts, PTA agents, AD FS servers) and mode-specific semantic invariants.',
          'The pipeline runs in five stages: multi-tenant topology → principal generation (human and non-human) → hybrid bridge instantiation → permissions and misconfiguration injection → validation and export. The design choice I care most about is per-link synchronisation principals: a distinct SyncIdentity node for every domain–tenant sync link, so that when one domain syncs to three tenants, cross-tenant privilege provenance stays unambiguous instead of collapsing into one blurred connector. Privileges follow heavy-tailed distributions (most automation is scoped, a small tail is highly privileged), and “lived-in” hygiene gaps — unowned identities, stale credential rotation — are injected at configurable rates, because too-clean graphs produce no meaningful attack paths.',
          'Every run is driven by a config and a five-part seed vector, validates its invariants fail-fast before export, and emits a reproducibility bundle (full config, seeds, schema version, artifacts) so any published result can be regenerated exactly. Graphs export to Neo4j in a BloodHound-compatible schema, aligned with the ecosystem’s OpenGraph extensibility direction.',
        ],
      },
      {
        heading: 'Evaluation & results',
        body: [
          'The default evaluation scenario is a three-tenant enterprise (parent plus two subsidiaries) generated under each hybrid mode across ten independent seeds — roughly 1,750 nodes and 4,600 edges per graph, with tight variance (±23 nodes) across seeds. Semantic-validity invariants passed at 100% across all modes.',
        ],
        bullets: [
          'Ablations prove the modeling choices matter: strip out non-human identities and seam coverage plus NHI path presence drop to exactly zero — the automation plane simply disappears from the analysis.',
          'Collapsing per-link sync principals into one shared connector understates seam chokepoint coverage (0.050 vs 0.064 for the full model) and breaks the per-link invariant (pass rate degrades to 0.75) — the blind spot the design exists to prevent.',
          'In full-model graphs, every generated attack path traverses at least one non-human identity — matching real-world incident patterns where attackers pivot through service identities rather than heavily monitored human admins.',
        ],
      },
      {
        heading: 'Outcomes',
        body: [
          'The work is written up as a workshop paper co-authored with Hung Nguyen, with the generator, schemas, and reproducible configurations to be released for benchmarking hybrid identity defenses. Exported graphs load directly into Neo4j and support BloodHound-style Cypher query packs — the cross-tenant “blast radius” queries (compromise in one tenant traversing on-prem back into a sibling tenant) render straight out of the box.',
        ],
      },
      {
        // TODO(Raj): personalize — a real lesson from the project lands harder.
        heading: 'What I’d do differently',
        body: [
          'Two things. I’d push the population scale harder, earlier — the evaluation demonstrates structural correctness at thousands of nodes, but the original ADSynth work made scalability a headline claim, and hybrid seam metrics at enterprise scale (hundreds of thousands of principals) would strengthen the benchmarking story. And I’d wire the BloodHound query pack into CI from day one, so every generator change is continuously validated against the workflows analysts actually run, rather than checked at export time.',
        ],
      },
    ],
  },

  livewell: {
    id: 'livewell',
    nodeId: 'livewell',
    title: 'LiveWell: An AI Architecture for Healthy-Ageing Behaviour Change',
    subtitle:
      'An Azure-native AI health companion that helps older adults reduce frailty risk — proactive nudging, personalized AI chat with persistent memory, and a load-tested cloud backend. Built by a 3-person team I led.',
    role: 'Full Stack Engineer & Backend Lead',
    timeframe: '2025 · University of Adelaide',
    stack: [
      'React Native',
      'Node.js',
      'Express',
      'Azure App Service',
      'API Management',
      'Cosmos DB',
      'Azure OpenAI',
      'Azure Functions',
      'Key Vault',
      'JWT',
    ],
    links: [{ label: 'View on GitHub', url: 'https://github.com/a1940811/livewell-backend' }],
    flow: [
      'Mobile / web app',
      'Azure API Management',
      'App Service (Express API)',
      'Cosmos DB · Azure OpenAI',
      'Azure Functions (nudges)',
    ],
    sections: [
      {
        heading: 'Background',
        body: [
          'Frailty — increased vulnerability to health decline and loss of independence — is one of the defining public-health challenges of ageing populations. LiveWell is a digital behaviour change intervention that operationalizes the AVOID framework (Activity, Vaccination, Optimising medication, Interaction, Diet) developed by the Canadian Frailty Network: users complete a frailty assessment, set goals across the five pillars, and get “the right nudge at the right time” from an AI companion.',
          'It was built by a three-person team; I led the project end-to-end — architecture, technical direction, the entire backend — while unblocking the team on the hardest React Native issues. The system is documented in a research paper written for COMP SCI 7092 (Mobile and Wireless Systems).',
        ],
      },
      {
        heading: 'Architecture',
        body: [
          'The backend is cloud-native on Azure. All client traffic enters through Azure API Management, which acts as the secure front door — authentication, rate limiting, and routing — decoupling clients from the backend. The core is a Node.js/Express application on Azure App Service exposing 35+ REST endpoints for tracking, community, and auth, connected to Cosmos DB (Mongo API, via Mongoose) as the primary datastore and Azure OpenAI for generative features. Key Vault holds all secrets, Azure Monitor and Log Analytics provide observability, and Entra ID manages platform access.',
          'Authentication is JWT-based: credentials are verified against hashed values, the App Service signs tokens with a Key Vault-held secret, and both the API Management gateway and Express middleware validate bearer tokens statelessly — so the service scales horizontally with no session store. Deployment is CI/CD: pushes to main trigger a GitHub Action that builds, tests, and auto-deploys to App Service.',
        ],
      },
      {
        heading: 'Data modeling for health tracking',
        body: [
          'Each AVOID pillar maps to concrete data models. A central User model carries a profileV2 sub-document — validated frailty score (0–5), medical conditions, medications, vaccination history — plus goal state. Granular trackers (WorkoutLog, DailyMealPlan, DailyWaterLog, StepEntry) are indexed by user and date for fast queries.',
          'The detail I’m most pleased with: the high-volume daily logs (water, steps) carry a 7-day time-to-live index, so granular records purge themselves automatically while long-term progress persists in aggregated stats on the User model. The database stays fast without a single cleanup job. Community features are privacy-first by design — leaderboard participation is opt-in via explicit user-controlled settings.',
        ],
      },
      {
        heading: 'The AI orchestration layer',
        body: [
          'The chatbot is not a proxy to Azure OpenAI — the backend is an orchestrator that gives the model memory, context, and purpose. Conversation history persists in the User document (conversationMemory), so a user can continue a conversation days later on a different device. On each message, the orchestrator retrieves history plus live health context and composes the full prompt: “You are a gentle, motivating health assistant. The user is 72, has a frailty score of 4, lists osteoarthritis, has logged 5,000 of their 42,000 weekly steps, and prefers detailed responses…”',
          'Naively replaying full history makes long-running conversations — exactly what a health companion exists for — the most expensive thing in the product. The memory layer summarizes older conversation segments while preserving recent exchanges verbatim, and prunes aggressively; that design cut token usage by 60%+ while preserving response quality. Users also control verbosity directly through a brief/balanced/detailed preference injected into the system prompt.',
          'The same orchestration generates structured content: meal plans are produced via few-shot prompts that demand JSON output, validated against the DailyMealPlan schema before storage — a guard against hallucinated or malformed AI output — with one-tap regeneration tracked to prevent abuse.',
        ],
      },
      {
        heading: 'Proactive nudging',
        body: [
          'Support can’t be purely reactive, so timer-triggered Azure Functions run the proactive side: an exercise nudge checks workout logs, a hydration nudge compares water intake against goals, and a medication nudge covers the Optimising Medication pillar. Every function checks the user’s notification preferences before sending anything — respectful nudging and user autonomy are design principles, not afterthoughts.',
          'A weekly function closes the loop: it aggregates the week’s progress, has Azure OpenAI write an encouraging-but-honest reflection calibrated to the user’s frailty score, and delivers it through the chatbot with a reflective question (“You did great on steps, but we missed the water goal — what could we change next week?”). Goals then adjust progressively based on sustained achievement.',
        ],
      },
      {
        heading: 'Performance under load',
        body: [
          'To validate the architecture, I load-tested the deployed system with Azure Load Testing through the API Management gateway: 177,433 requests over 5 minutes — 589 requests/second sustained — with a 90th-percentile response time of 124 ms and a 0% error rate. The async architecture keeps slower Azure OpenAI calls (1–3 s) from blocking the rest of the API.',
        ],
      },
      {
        // TODO(Raj): personalize with a real retrospective.
        heading: 'What I’d do differently',
        body: [
          'I’d define the chatbot’s evaluation criteria before optimising it. “Preserving response quality” was initially judged by hand; a small automated eval set from day one would have made the memory-design iterations faster and the 60% token saving easier to defend. I’d also move beyond simulated users sooner — real-world testing with older adults is where nudging policies prove themselves.',
        ],
      },
    ],
  },

  celebal: {
    id: 'celebal',
    nodeId: 'celebal',
    title: 'Enterprise Cloud Migrations at Celebal Technologies',
    subtitle:
      'Two years operating production Azure/AWS platforms for 5+ enterprise clients — IaC, monitoring, on-call, and security hardening.',
    role: 'Cloud Infra & Security Engineer',
    timeframe: 'Dec 2021 – Jan 2024 · Jaipur, IN',
    stack: ['Azure', 'AWS', 'Terraform', 'CI/CD', 'Log Analytics', 'RBAC', 'Networking'],
    links: [],
    flow: [
      'On-prem estate',
      'Terraform + CI/CD',
      'Azure / AWS landing zones',
      'Log Analytics monitoring',
      'RBAC + network policies',
    ],
    sections: [
      {
        heading: 'Background',
        body: [
          'At Celebal Technologies I designed and operated enterprise platforms on Azure and AWS for more than five enterprise clients — real production environments with real on-call, not lab work. The core of the role was moving clients from on-premises estates onto the cloud and then running what we built.',
        ],
      },
      {
        heading: 'Infrastructure as code',
        body: [
          'Hand-built cloud environments drift, and drift is where outages and security holes live. I built CI/CD pipelines around Terraform so that environments were declared, reviewed, and reproducible — speeding releases by 30% and improving consistency across 500+ resources. Once infrastructure is code, every change gets a review and every environment can be rebuilt from scratch.',
        ],
      },
      {
        heading: 'Monitoring and on-call',
        body: [
          'I managed production cloud services on-call and built the monitoring and alerting pipelines (Azure Log Analytics) that made on-call survivable — cutting incident response time by 25%. The lesson that stuck: an alert that doesn’t tell the responder what to do is just noise with a pager attached.',
        ],
      },
      {
        heading: 'Security hardening',
        body: [
          'Migrations were also the moment to fix identity and network security properly: applying RBAC and network security policies as clients landed in the cloud cut security incidents by 90%. Least-privilege is dramatically easier to enforce when you introduce it during a migration than to retrofit afterwards.',
        ],
      },
      {
        // TODO(Raj): personalize — a specific war story beats a general lesson.
        heading: 'What it taught me',
        body: [
          'Enterprise cloud work is 20% architecture and 80% operational discipline. The diagrams are the easy part; the value is in pipelines that make the right thing the default, monitoring that tells the truth at 3am, and security controls that survive contact with real users.',
        ],
      },
    ],
  },
}

export const caseStudyList = Object.values(caseStudies)
