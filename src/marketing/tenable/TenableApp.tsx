'use client';

import { useRef } from 'react';
import { gsap, useGSAP, FULL_MOTION_QUERY } from '../../lib/gsap';
import TenableMark from './TenableMark';
import IntegrationConsole from './IntegrationConsole';
import './marketing-base.css';
import './tenable.css';

/**
 * TenableApp — an ad-hoc, personalized application page for Bar Moshe's
 * "Full Stack Engineer, Integrations Frameworks" application to Tenable (Tel
 * Aviv, Tenable One). Rebuilt to look like the real tenable.com AI-era brand: a
 * dark charcoal surface, the lime/chartreuse accent, white type, and the
 * signature rotating heptagon "octogram" mark that collapses into a solid
 * hexagon as you scroll the hero (GSAP ScrollTrigger). It speaks the team's own
 * language (integration frameworks, data ingestion, AI-driven workflows, one
 * exposure view) and makes the case for Bar in Tenable's brand.
 *
 * English, LTR. Self-contained: mounts `.mp-root` only to inherit the marketing
 * reset / focus base, then overrides everything via `.tn-root`. No LangProvider,
 * no shared #work emulators, no i18n coupling: every visual here is built fresh
 * for this application. All motion is gated on prefers-reduced-motion and the
 * page is fully legible with no JS.
 */

const EMAIL =
  'mailto:1barmoshe1@gmail.com?subject=Full%20Stack%20Engineer%2C%20Integrations%20Frameworks%20application%20from%20Bar%20Moshe';
const CV = '/Bar_Moshe_Resume.pdf';

type Proof = {
  tag: string;
  title: string;
  desc: string;
  href: string;
  open: string;
  visual: React.ReactNode;
};

// Connector framework: a source panel feeding the platform through a pulsing wire.
const MdpVisual = (
  <svg className="tn-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <rect className="tn-vis__panel" x="14" y="26" width="78" height="68" rx="8" />
    <rect className="tn-vis__line" x="24" y="38" width="44" height="6" rx="3" />
    <rect className="tn-vis__line tn-vis__line--soft" x="24" y="52" width="58" height="4" rx="2" />
    <rect className="tn-vis__line tn-vis__line--soft" x="24" y="62" width="40" height="4" rx="2" />
    <rect className="tn-vis__line tn-vis__line--soft" x="24" y="76" width="50" height="4" rx="2" />
    <line className="tn-vis__wire" x1="94" y1="60" x2="128" y2="60" />
    <line className="tn-vis__flow" x1="94" y1="60" x2="128" y2="60" />
    <circle className="tn-vis__pulse" r="3.5" />
    <rect className="tn-vis__art" x="130" y="22" width="76" height="76" rx="8" />
    <rect className="tn-vis__art-bar" x="140" y="34" width="46" height="8" rx="3" />
    <rect className="tn-vis__line tn-vis__line--soft" x="140" y="50" width="54" height="4" rx="2" />
    <rect className="tn-vis__chip" x="140" y="74" width="22" height="14" rx="4" />
    <rect className="tn-vis__chip tn-vis__chip--b" x="168" y="74" width="22" height="14" rx="4" />
  </svg>
);

// Ingestion: three language workers feeding one central pipeline node.
const OrchestrateVisual = (
  <svg className="tn-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <line className="tn-vis__edge" x1="40" y1="26" x2="110" y2="60" />
    <line className="tn-vis__edge" x1="40" y1="60" x2="110" y2="60" />
    <line className="tn-vis__edge" x1="40" y1="94" x2="110" y2="60" />
    <line className="tn-vis__edge tn-vis__edge--out" x1="110" y1="60" x2="186" y2="60" />
    <g className="tn-vis__worker"><rect x="14" y="18" width="36" height="16" rx="5" /><text x="32" y="30">Go</text></g>
    <g className="tn-vis__worker"><rect x="14" y="52" width="36" height="16" rx="5" /><text x="32" y="64">Py</text></g>
    <g className="tn-vis__worker"><rect x="14" y="86" width="36" height="16" rx="5" /><text x="32" y="98">TS</text></g>
    <circle className="tn-vis__hub" cx="110" cy="60" r="16" />
    <circle className="tn-vis__hub-ring" cx="110" cy="60" r="16" />
    <rect className="tn-vis__sink" x="186" y="50" width="20" height="20" rx="5" />
  </svg>
);

// Full-stack app: streaming rows with a now-playing accent bar.
const AppVisual = (
  <svg className="tn-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <rect className="tn-vis__panel" x="14" y="16" width="192" height="88" rx="9" />
    <circle className="tn-vis__disc" cx="40" cy="40" r="13" />
    <rect className="tn-vis__line" x="62" y="32" width="80" height="6" rx="3" />
    <rect className="tn-vis__line tn-vis__line--soft" x="62" y="44" width="54" height="4" rx="2" />
    <rect className="tn-vis__row" x="26" y="68" width="168" height="9" rx="4.5" />
    <rect className="tn-vis__row tn-vis__row--play" x="26" y="84" width="110" height="9" rx="4.5" />
    <g className="tn-vis__eq" aria-hidden="true">
      <rect x="150" y="82" width="4" height="12" rx="2" />
      <rect x="158" y="78" width="4" height="16" rx="2" />
      <rect x="166" y="84" width="4" height="10" rx="2" />
      <rect x="174" y="80" width="4" height="14" rx="2" />
    </g>
  </svg>
);

const PROOF: Proof[] = [
  {
    tag: 'OPEN SOURCE · MCP SERVER + PLUGINS',
    title: 'MDP',
    desc: 'A Markdown to document compiler, published on npm, with an MCP server and Claude Code and Codex plugins so other tools and agents extend it. A developer-facing framework: a clean surface someone else plugs into and builds on.',
    href: 'https://barmoshe.github.io/mdp/',
    open: 'Open MDP',
    visual: MdpVisual,
  },
  {
    tag: 'INGESTION · CODE EXCHANGE',
    title: 'Cross-language orchestration',
    desc: 'One Temporal workflow coordinating Go, Python, and TypeScript workers as a single durable pipeline. Featured on Temporal’s Code Exchange. The distributed-systems and data-flow muscle behind ingesting from many sources at once.',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
    open: 'See the writeup',
    visual: OrchestrateVisual,
  },
  {
    tag: 'FULL STACK · API → UI',
    title: 'Israelify',
    desc: 'A streaming app with a Node API, auth, middleware, and a custom logger behind a React front end. A REST API designed and consumed to power a rich, interactive UI, end to end.',
    href: 'https://github.com/barmoshe/Israelify-backend',
    open: 'View the code',
    visual: AppVisual,
  },
];

type Fit = { k: string; lead: string; body: string };

const FIT: Fit[] = [
  {
    k: 'Full stack across the seam',
    lead: 'React + TypeScript over Node, Go, and Python.',
    body: 'I ship the whole feature: a data-driven React and TypeScript UI on top of services I also write. Israelify is a React front end over a Node API I built; the design of the API and the shape of the UI it powers were one job, not two.',
  },
  {
    k: 'Frameworks others extend',
    lead: 'MCP server, editor plugins, a plan-mode hook.',
    body: 'MDP is not just an app, it is a surface other tools plug into: an MCP server plus Claude Code and Codex plugins. That is the role’s core, building the framework that lets internal teams, partners, and the community customize and extend the platform.',
  },
  {
    k: 'Data ingestion and distributed systems',
    lead: 'Durable pipelines, cloud-native, end to end.',
    body: 'The Temporal project ingests work across Go, Python, and TypeScript workers behind one durable workflow. Reasoning about data flow and performance from source to store, on EKS and Kubernetes, is home ground for an integrations role.',
  },
  {
    k: 'Production-first, browser to data layer',
    lead: 'Owned design through deploy, then run it.',
    body: 'I own features from design to deploy with minimal supervision, then keep them alive: EKS, Terraform, and CI/CD from the Wix DevOps track, applied daily as the primary engineer at an early-stage startup. I debug across the whole stack, from devtools to the logs.',
  },
];

export default function TenableApp() {
  const scope = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!matchMedia(FULL_MOTION_QUERY).matches) return;

      // Hero entrance: clip-reveal the copy block, staggered.
      gsap.from('.tn-hero__copy > [data-rise]', {
        yPercent: 18,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.08,
      });

      // Signature scroll move: as the hero scrolls away, the open octogram rings
      // spin down and fade while the solid hexagon scales in — tenable.com's mark
      // morph, tied to scroll progress.
      const hero = heroRef.current;
      if (hero) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom 35%',
            scrub: 0.6,
          },
        });
        tl.to('.tn-mark--hero .tn-mark__rings', {
          opacity: 0.1,
          scale: 0.6,
          rotate: 150,
          transformOrigin: '50% 50%',
          ease: 'none',
        }, 0)
          .fromTo(
            '.tn-mark--hero .tn-mark__solid',
            { opacity: 0, scale: 0.55, transformOrigin: '50% 50%' },
            { opacity: 1, scale: 1, ease: 'none' },
            0,
          )
          .to('.tn-hero__visual', { yPercent: -8, ease: 'none' }, 0);
      }

      // Section reveals: fade-up each marked block as it enters.
      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      reveals.forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        });
      });
    },
    { scope },
  );

  return (
    <div className="mp-root tn-root" ref={scope}>
      <a className="tn-skip" href="#main">Skip to content</a>

      {/* ── Top navigation ──────────────────────────────────── */}
      <header className="tn-nav">
        <div className="tn-nav__inner">
          <a className="tn-brand" href="#main" aria-label="Bar Moshe">
            <TenableMark className="tn-nav__mark" />
            <span className="tn-wordmark">Bar Moshe</span>
          </a>
          <span className="tn-nav__tag">for Tenable</span>
          <nav className="tn-nav__links" aria-label="Sections">
            <a className="tn-nav__link" href="#demo">Demo</a>
            <a className="tn-nav__link" href="#work">Work</a>
            <a className="tn-nav__link" href="#fit">Why me</a>
          </nav>
          <div className="tn-nav__cta">
            <a className="tn-btn tn-btn--ghost tn-btn--sm" href={CV} target="_blank" rel="noopener noreferrer">Download CV</a>
            <a className="tn-btn tn-btn--primary tn-btn--sm" href={EMAIL}>
              <span className="tn-nav__full">Start a conversation</span>
              <span className="tn-nav__short">Let’s talk</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* ── Hero (dark, signature octogram) ───────────────── */}
        <section className="tn-hero" ref={heroRef}>
          <div className="tn-hero__visual" aria-hidden="true">
            <TenableMark variant="hero" />
          </div>
          <div className="tn-hero__inner">
            <div className="tn-hero__copy">
              <p className="tn-eyebrow" data-rise>
                <span className="tn-eyebrow__dot" />
                INTEGRATIONS FRAMEWORKS · TENABLE ONE · TEL AVIV
              </p>
              <h1 className="tn-title" data-rise>
                I build the integration frameworks behind{' '}
                <span className="tn-hl">one clear exposure view</span>
              </h1>
              <p className="tn-lede" data-rise>
                From a connector, through data ingestion, to a fast, intuitive frontend.
                Frameworks that let internal teams, partners, and the community extend the
                platform, and the full-stack craft to bridge complex backends with a UI
                people actually want to use.
              </p>
              <div className="tn-hero__cta" data-rise>
                <a className="tn-btn tn-btn--primary" href={EMAIL}>
                  Start a conversation
                  <span className="tn-btn__arrow" aria-hidden="true">→</span>
                </a>
                <a className="tn-btn tn-btn--ghost" href={CV} target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </div>
              <p className="tn-hero__trust" data-rise>
                <strong>Full stack engineer</strong> · React + TypeScript · Go / Python / Node · Tel Aviv, available to talk
              </p>
            </div>
          </div>
          <span className="tn-hero__scroll" aria-hidden="true">scroll</span>
        </section>

        {/* ── Trust strip ───────────────────────────────────── */}
        <div className="tn-trust">
          <div className="tn-trust__inner">
            <span className="tn-trust__item"><b>MCP server</b> for Claude Code &amp; Codex</span>
            <span className="tn-trust__sep" />
            <span className="tn-trust__item">Open source, <b>on npm</b></span>
            <span className="tn-trust__sep" />
            <span className="tn-trust__item">Featured on <b>Temporal Code Exchange</b></span>
            <span className="tn-trust__sep" />
            <span className="tn-trust__item">React · TypeScript · Go · Python</span>
          </div>
        </div>

        {/* ── Signature piece: from integration to exposure ─── */}
        <section id="demo" className="tn-section tn-section--soft">
          <div className="tn-wrap">
            <header className="tn-section__head" data-reveal>
              <p className="tn-kicker">From integration to exposure</p>
              <h2 className="tn-h2">Scattered sources should resolve into a single, trustworthy view.</h2>
              <p className="tn-sub">
                The kind of surface I build: a third-party source connects through the
                framework, assets and findings ingest, the data is normalized and
                deduplicated, and one exposure view surfaces in the browser. Built from
                scratch for this page in your brand.
              </p>
            </header>
            <div data-reveal>
              <IntegrationConsole />
            </div>
          </div>
        </section>

        {/* ── Proof of work ─────────────────────────────────── */}
        <section id="work" className="tn-section">
          <div className="tn-wrap">
            <header className="tn-section__head" data-reveal>
              <p className="tn-kicker">Proof, not claims</p>
              <h2 className="tn-h2">A few things I have shipped.</h2>
              <p className="tn-sub">Each one is live. Open it and check for yourself.</p>
            </header>
            <div className="tn-proof__grid">
              {PROOF.map((p) => (
                <a
                  key={p.title}
                  className="tn-pcard"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-reveal
                >
                  <div className="tn-pcard__screen">{p.visual}</div>
                  <div className="tn-pcard__body">
                    <span className="tn-pcard__tag">{p.tag}</span>
                    <h3 className="tn-pcard__title">{p.title}</h3>
                    <p className="tn-pcard__desc">{p.desc}</p>
                    <span className="tn-pcard__link" aria-hidden="true">{p.open} →</span>
                  </div>
                </a>
              ))}
            </div>
            <p className="tn-proof__more">
              More in{' '}
              <a href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">
                my portfolio
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── Why Bar, for this role ────────────────────────── */}
        <section id="fit" className="tn-section tn-section--soft">
          <div className="tn-wrap">
            <header className="tn-section__head" data-reveal>
              <p className="tn-kicker">Why me, for this role</p>
              <h2 className="tn-h2">Your posting, mapped to work I have already done.</h2>
            </header>
            <div className="tn-fit__grid">
              {FIT.map((f, i) => (
                <article className="tn-fcard" key={f.k} data-reveal>
                  <span className="tn-fcard__no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="tn-fcard__k">{f.k}</h3>
                  <p className="tn-fcard__lead">{f.lead}</p>
                  <p className="tn-fcard__body">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA band (lime) ───────────────────────────────── */}
        <section className="tn-cta">
          <div className="tn-cta__inner" data-reveal>
            <TenableMark className="tn-cta__mark" />
            <h2 className="tn-cta__title">Let’s close the gap together.</h2>
            <p className="tn-cta__sub">
              If the work above looks like the kind of engineer you want on the
              Integrations Frameworks team, I am one message away.
            </p>
            <div className="tn-cta__links">
              <a className="tn-btn tn-btn--oninvert" href={EMAIL}>Email me</a>
              <a className="tn-btn tn-btn--oninvert-ghost" href="https://www.linkedin.com/in/barmoshe/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="tn-btn tn-btn--oninvert-ghost" href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="tn-btn tn-btn--oninvert-ghost" href={CV} target="_blank" rel="noopener noreferrer">Download CV</a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer (dark) ───────────────────────────────────── */}
      <footer className="tn-footer">
        <div className="tn-footer__inner">
          <div className="tn-footer__brand">
            <span className="tn-footer__mark">
              <TenableMark className="tn-nav__mark" />
              <span className="tn-wordmark">tenable</span>
            </span>
            <p className="tn-footer__tag">
              An application page Bar Moshe built in Tenable’s brand for the Full Stack
              Engineer, Integrations Frameworks role in Tel Aviv. Not affiliated with Tenable.
            </p>
          </div>
          <div className="tn-footer__col">
            <p className="tn-footer__h">The work</p>
            <ul>
              <li><a className="tn-footer__link" href="https://barmoshe.github.io/mdp/" target="_blank" rel="noopener noreferrer">MDP + MCP server</a></li>
              <li><a className="tn-footer__link" href="https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal" target="_blank" rel="noopener noreferrer">Temporal Code Exchange</a></li>
              <li><a className="tn-footer__link" href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
          <div className="tn-footer__col">
            <p className="tn-footer__h">Get in touch</p>
            <ul>
              <li><a className="tn-footer__link" href={EMAIL}>1barmoshe1@gmail.com</a></li>
              <li><a className="tn-footer__link" href="https://www.linkedin.com/in/barmoshe/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="tn-footer__link" href={CV} target="_blank" rel="noopener noreferrer">Download CV</a></li>
            </ul>
          </div>
        </div>
        <div className="tn-footer__bottom">
          <div className="tn-footer__bottom-inner">
            <span>Built by Bar Moshe, in Tenable’s brand, for this application.</span>
            <span>Tel Aviv · 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
