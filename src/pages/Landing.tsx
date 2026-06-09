import {
  ArrowRight,
  Check,
  ChevronRight,
  FileText,
  Sparkles,
  Zap,
  Lock,
  Search,
  Layers,
  MousePointerClick,
  Folder,
  Github,
  Twitter,
  Linkedin,
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Header />
      <Hero />
      <LogoStrip />
      <FeatureGrid />
      <CitationShowcase />
      <Integrations />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-6">
        <a href="/" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-brand-500/20 text-brand-300">
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">PageCite</span>
        </a>
        <nav className="hidden items-center gap-5 text-sm text-ink-dim md:flex">
          <a className="hover:text-ink" href="#features">Features</a>
          <a className="hover:text-ink" href="#how">How it works</a>
          <a className="hover:text-ink" href="#pricing">Pricing</a>
          <a className="hover:text-ink" href="#faq">FAQ</a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a className="btn-ghost h-8" href="https://github.com" aria-label="GitHub">
            <Github className="h-3.5 w-3.5" />
          </a>
          <a className="btn-ghost h-8 hidden sm:inline-flex" href="#cta">Sign in</a>
          <a className="btn-primary h-8" href="/view">
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-fade" />
      <div className="absolute inset-0 ring-mesh opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elev/60 px-3 py-1 text-xs text-ink-dim">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Now in beta — Google Drive + SharePoint
          </div>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            <span className="gradient-text">Chat with every PDF in a folder.</span>
            <br />
            <span className="text-ink-dim">Citations that jump to the page.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-ink-dim md:text-lg">
            PageCite reads every page of every PDF in your Google Drive folder and answers
            questions with citations that open to the exact page — not just the file. Built for
            safety, legal, HR, and ops teams drowning in policy docs.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a className="btn-primary h-10 px-5" href="/view">
              Get started <ArrowRight className="h-4 w-4" />
            </a>
            <a className="btn-outline h-10 px-5" href="#cta">Contact sales</a>
          </div>
          <div className="mt-5 flex items-center justify-center gap-3 text-[11px] text-ink-mute">
            <span className="inline-flex items-center gap-1"><Check className="h-3 w-3 text-emerald-400" /> Free for 14 days</span>
            <span className="inline-flex items-center gap-1"><Check className="h-3 w-3 text-emerald-400" /> No credit card</span>
            <span className="inline-flex items-center gap-1"><Check className="h-3 w-3 text-emerald-400" /> SOC 2 in progress</span>
          </div>
        </div>

        <HeroProduct />
      </div>
    </section>
  );
}

function HeroProduct() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl">
      <div className="absolute -inset-x-12 -top-10 -bottom-10 -z-10 hero-grid" />
      <div className="card overflow-hidden">
        {/* mock app */}
        <div className="flex h-[480px] md:h-[560px]">
          <div className="hidden w-56 shrink-0 border-r border-border bg-bg-subtle p-3 md:block">
            <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-mute">
              <Folder className="h-3 w-3" /> Safety / OSHA
            </div>
            <div className="space-y-1">
              {['Fall Protection (Subpart M)', 'Lockout/Tagout', 'Harness Checklist'].map((t, i) => (
                <div
                  key={t}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${
                    i === 0 ? 'bg-brand-500/10 text-ink ring-1 ring-brand-500/30' : 'text-ink-dim'
                  }`}
                >
                  <FileText className="h-3 w-3" />
                  <span className="truncate">{t}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-mute">
              <Folder className="h-3 w-3" /> Safety / PPE
            </div>
            <div className="space-y-1">
              {['Glove Selection Guide'].map((t) => (
                <div key={t} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-ink-dim">
                  <FileText className="h-3 w-3" />
                  <span className="truncate">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-b from-bg to-[#0c0e16] p-6">
            <div className="mx-auto h-full max-w-md rounded-md bg-white p-6 text-[11px] text-neutral-800 shadow-2xl shadow-black/50">
              <div className="mb-2 text-[9px] uppercase tracking-wider text-neutral-500">
                OSHA 1926.501 — Fall Protection (Subpart M)
              </div>
              <div className="text-[10px] text-neutral-400">Page 1 of 6</div>
              <div className="mt-3 space-y-2 font-serif leading-relaxed text-neutral-800">
                <p>
                  1926.501 — Duty to have fall protection. Unprotected sides, edges, holes,
                  walking surfaces, ramps, runways, and excavations{' '}
                  <mark className="rounded bg-brand-300/40 px-0.5">6 feet or more</mark> above
                  lower levels require fall protection.
                </p>
                <p>
                  Each employee on a walking/working surface with an unprotected side or edge 6
                  ft or more above a lower level shall be protected by guardrail, safety net, or
                  personal fall arrest system.
                </p>
              </div>
            </div>
          </div>
          <div className="hidden w-80 shrink-0 border-l border-border bg-bg-subtle md:block">
            <div className="flex items-center gap-2 border-b border-border p-3">
              <div className="grid h-6 w-6 place-items-center rounded-md bg-brand-500/20 text-brand-300">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div className="text-sm font-semibold">Ask the folder</div>
            </div>
            <div className="space-y-3 p-3 text-xs">
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-br-sm bg-brand-500 px-3 py-1.5 text-white">
                  When is fall protection required?
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bg-elev text-brand-300">
                  <Sparkles className="h-3 w-3" />
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-border bg-bg-card px-3 py-2 text-[11px] text-ink/90">
                  Fall protection is required at{' '}
                  <span className="rounded bg-brand-500/20 px-1 text-brand-200">6 ft</span> or
                  more above a lower level.{' '}
                  <a className="link-cite" href="#">OSHA-1926-501-Fall-Protection · p.1</a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bg-elev text-brand-300">
                  <Sparkles className="h-3 w-3" />
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-border bg-bg-card px-3 py-2 text-[11px] text-ink/90">
                  Covers for holes must support{' '}
                  <span className="rounded bg-brand-500/20 px-1 text-brand-200">2× weight</span>{' '}
                  of employees, equipment, and materials.{' '}
                  <a className="link-cite" href="#">OSHA-1926-501-Fall-Protection · p.2</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoStrip() {
  // No fabricated logos — using generic wordmarks that read as placeholders, not real companies.
  const brands = ['acme.co', 'northwind', 'globex', 'initech', 'umbrella', 'stark.io'];
  return (
    <section className="border-y border-border bg-bg-subtle/40">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-3 text-center text-[11px] uppercase tracking-wider text-ink-mute">
          Trusted by safety & compliance teams
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {brands.map((b) => (
            <div key={b} className="font-mono text-sm font-semibold tracking-tight text-ink-mute/80">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    {
      icon: Search,
      title: 'Reads every page of every PDF',
      body:
        'Drop in a Google Drive folder. We index the full text of every page — not just the first page, not just the table of contents.',
    },
    {
      icon: MousePointerClick,
      title: 'Citations that jump to the page',
      body:
        'Every answer is grounded in a [file · p.N] link. Click it and the viewer scrolls to the exact page with the relevant text highlighted.',
    },
    {
      icon: Layers,
      title: 'Handles messy real-world folders',
      body:
        'Subfolders, mixed authors, scanned-with-OCR docs, hundreds of files. PageCite scopes retrieval to the folder you point it at — never bleeds into the wrong drive.',
    },
    {
      icon: Lock,
      title: 'Stays inside your permissions',
      body:
        'We only read files the user can already see. RLS-style row filtering on every page-chunk query, no silent scope creep.',
    },
    {
      icon: Zap,
      title: 'Sub-second answers',
      body:
        'Embedding index + BM25 rerank. No waiting on a 30-second "thinking" animation. Chat feels like a real teammate who already read everything.',
    },
    {
      icon: Sparkles,
      title: 'Bring your own model',
      body:
        'Works with Gemini, OpenAI, Anthropic, or local models. PageCite is the retrieval + viewer layer; you pick the LLM.',
    },
  ];
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-300">
          Features
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          The viewer that actually works.
        </h2>
        <p className="mt-4 text-ink-dim">
          When the AI has a folder of 200 PDFs, generic chatbots lose the thread. PageCite
          scopes, cites, and links — every single answer.
        </p>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="card group p-5 transition-colors hover:border-border-strong"
          >
            <div className="mb-4 grid h-9 w-9 place-items-center rounded-lg bg-brand-500/15 text-brand-300 ring-1 ring-brand-500/30">
              <f.icon className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold tracking-tight text-ink">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CitationShowcase() {
  return (
    <section id="how" className="border-t border-border bg-bg-subtle/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-300">
              The core problem
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              The first page is never the right page.
            </h2>
            <p className="mt-4 text-ink-dim">
              Generic AI summarizers answer from whatever page they found first. If the source
              PDF has 80 pages, the citation points to page 1 — and the user has to scroll
              around to find what was actually referenced.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                'Citation links carry the page anchor — not just the file path.',
                'Viewer auto-scrolls to and highlights the cited text.',
                'One click in chat → instantly on the right page.',
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                  <span className="text-ink/90">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card overflow-hidden">
            <div className="border-b border-border bg-bg-subtle/50 p-3">
              <div className="flex items-center gap-2 text-xs text-ink-dim">
                <span className="font-mono">/view?file=OSHA-1926-501.pdf&page=3</span>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> jumped via citation
                </span>
              </div>
            </div>
            <div className="bg-white p-5 text-[11px] text-neutral-800">
              <div className="mb-1 text-[9px] uppercase tracking-wider text-neutral-500">
                OSHA 1926.501 — Fall Protection (Subpart M)
              </div>
              <div className="text-[10px] text-neutral-400">Page 3 of 6</div>
              <div className="mt-3 space-y-2 font-serif leading-relaxed">
                <p>
                  Roofing work on low-slope roofs. Where employees work on low-slope roofs (slope
                  less than or equal to 4:12) and are{' '}
                  <mark className="rounded bg-brand-300/60 px-0.5 ring-2 ring-brand-500">
                    6 ft or more above a lower level
                  </mark>
                  , fall protection is required when work is performed within{' '}
                  <mark className="rounded bg-brand-300/60 px-0.5 ring-2 ring-brand-500">
                    6 ft of the roof edge
                  </mark>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  const items = [
    { name: 'Google Drive', tag: 'Shared drives included' },
    { name: 'SharePoint', tag: 'Coming Q3' },
    { name: 'Gemini', tag: 'Default LLM' },
    { name: 'OpenAI / Anthropic', tag: 'BYO key' },
    { name: 'Slack', tag: 'Mention @pagecite' },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center text-xs font-semibold uppercase tracking-wider text-ink-mute">
        Integrations
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {items.map((i) => (
          <div
            key={i.name}
            className="card flex items-center gap-2 px-3 py-2"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            <span className="text-sm font-medium">{i.name}</span>
            <span className="text-[10px] text-ink-mute">· {i.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      blurb: 'Try it on a single folder.',
      cta: 'Get started',
      features: [
        '1 Google Drive folder',
        'Up to 50 PDFs / 1,000 pages',
        'Gemini model',
        '30-day message history',
      ],
    },
    {
      name: 'Pro',
      price: '$29',
      blurb: 'per seat / month',
      cta: 'Start 14-day trial',
      featured: true,
      features: [
        'Unlimited folders',
        'Up to 5,000 pages / seat',
        'BYO model (OpenAI, Anthropic)',
        'Slack integration',
        'Unlimited history',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      blurb: 'SSO, audit logs, on-prem',
      cta: 'Contact sales',
      features: [
        'SSO + SCIM',
        'SharePoint + S3 connectors',
        'On-prem / VPC deployment',
        'Audit log export',
        'Dedicated success engineer',
      ],
    },
  ];
  return (
    <section id="pricing" className="border-t border-border bg-bg-subtle/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-300">
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Simple, per-seat pricing.
          </h2>
          <p className="mt-4 text-ink-dim">
            Start free. Upgrade when your team is hooked.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`card relative flex flex-col p-6 ${
                t.featured ? 'ring-1 ring-brand-500/60 shadow-glow' : ''
              }`}
            >
              {t.featured && (
                <div className="absolute -top-2.5 right-4 rounded-full bg-brand-500 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                  Most popular
                </div>
              )}
              <div className="text-sm font-semibold tracking-tight text-ink">{t.name}</div>
              <div className="mt-1 text-xs text-ink-mute">{t.blurb}</div>
              <div className="mt-4 text-3xl font-bold tracking-tight text-ink">
                {t.price}
                {t.price !== 'Custom' && (
                  <span className="text-sm font-normal text-ink-mute"> / mo</span>
                )}
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-ink-dim">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-300" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-6 ${t.featured ? 'btn-primary' : 'btn-outline'} h-9`}
              >
                {t.cta} <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: 'How is this different from just asking Gemini?',
      a: "Generic AI loses track on folders of mixed PDFs. PageCite scopes retrieval to the folder you choose, cites the exact page on every answer, and links into a real viewer — so users can verify in one click.",
    },
    {
      q: 'Does it work on scanned PDFs?',
      a: 'Yes. We OCR pages that have no text layer and re-index the OCR output. Latency is slightly higher on first ingest, but search quality matches native-text docs.',
    },
    {
      q: 'Can it stay inside our security perimeter?',
      a: 'Yes. Enterprise tier runs in your VPC or on-prem. Free / Pro use a SOC 2-in-progress cloud with row-level scoping and no training on your data.',
    },
    {
      q: 'Which LLMs do you support?',
      a: 'Gemini, OpenAI, Anthropic, and any OpenAI-compatible endpoint. We do the retrieval and rendering — you pick the model.',
    },
  ];
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Questions</h2>
      <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-bg-card">
        {items.map((it) => (
          <details key={it.q} className="group p-5 [&[open]]:bg-bg-subtle/50">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-ink">
              {it.q}
              <ChevronRight className="h-4 w-4 text-ink-mute transition-transform group-open:rotate-90" />
            </summary>
            <p className="mt-2 text-sm text-ink-dim">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="cta" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="card relative overflow-hidden p-10 text-center">
          <div className="absolute inset-0 ring-mesh opacity-50" />
          <div className="relative">
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
              Stop linking to the first page.
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-ink-dim">
              Point PageCite at a folder. Ask a question. Get a citation that opens the
              page — not the cover.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <a className="btn-primary h-10 px-5" href="/view">
                Get started <ArrowRight className="h-4 w-4" />
              </a>
              <a className="btn-outline h-10 px-5" href="mailto:sales@pagecite.dev">
                Contact sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Integrations', 'Changelog'],
    },
    {
      title: 'Resources',
      links: ['Docs', 'API', 'Status', 'Security'],
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Contact'],
    },
  ];
  return (
    <footer className="border-t border-border bg-bg-subtle/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-md bg-brand-500/20 text-brand-300">
                <FileText className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold tracking-tight">PageCite</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-ink-dim">
              The AI viewer that cites the page, not just the file.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a className="btn-ghost h-8 w-8 p-0" href="https://github.com" aria-label="GitHub"><Github className="h-3.5 w-3.5" /></a>
              <a className="btn-ghost h-8 w-8 p-0" href="https://twitter.com" aria-label="Twitter"><Twitter className="h-3.5 w-3.5" /></a>
              <a className="btn-ghost h-8 w-8 p-0" href="https://linkedin.com" aria-label="LinkedIn"><Linkedin className="h-3.5 w-3.5" /></a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-mute">
                {c.title}
              </div>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a className="text-sm text-ink-dim hover:text-ink" href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-ink-mute md:flex-row md:items-center">
          <span>© 2026 PageCite Labs, Inc.</span>
          <div className="flex items-center gap-4">
            <a className="hover:text-ink" href="#">Privacy</a>
            <a className="hover:text-ink" href="#">Terms</a>
            <a className="hover:text-ink" href="#">DPA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
